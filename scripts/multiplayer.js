// Multiplayer client — wraps Socket.IO and REST API for online co-op
const API_BASE = window.__API_BASE__ || window.location.origin;

export class MultiplayerClient {
  constructor() {
    this.socket = null;
    this.token = localStorage.getItem("fwg_token");
    this.user = JSON.parse(localStorage.getItem("fwg_user") || "null");
    this.roomId = null;
    this.isHost = false;
    this.peer = null;
    this.onPeerMove = null;
    this.onPeerAction = null;
    this.onPeerKey = null;
    this.onRoomUpdate = null;
    this.onStageComplete = null;
  }

  get isConnected() {
    return this.socket?.connected ?? false;
  }

  get isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // --- Auth ---
  async requestMagicLink(email) {
    const res = await fetch(`${API_BASE}/api/auth/magic`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return res.json();
  }

  async verifyToken(magicToken) {
    const res = await fetch(`${API_BASE}/api/auth/verify?token=${encodeURIComponent(magicToken)}`);
    if (!res.ok) return null;
    const data = await res.json();
    this.token = data.token;
    this.user = data.user;
    localStorage.setItem("fwg_token", data.token);
    localStorage.setItem("fwg_user", JSON.stringify(data.user));
    return data;
  }

  async fetchMe() {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: this._headers(),
    });
    if (!res.ok) return null;
    return res.json();
  }

  logout() {
    this.disconnect();
    this.token = null;
    this.user = null;
    localStorage.removeItem("fwg_token");
    localStorage.removeItem("fwg_user");
  }

  // --- Connection ---
  connect() {
    return new Promise((resolve, reject) => {
      if (!this.token) return reject(new Error("Not authenticated"));

      // Dynamic import for Socket.IO client
      import("https://cdn.socket.io/4.8.1/socket.io.esm.min.js").then(({ io }) => {
        this.socket = io(API_BASE, {
          auth: { token: this.token },
          transports: ["websocket", "polling"],
        });

        this.socket.on("connect", () => {
          console.log("Socket connected:", this.socket.id);
          resolve();
        });

        this.socket.on("connect_error", (err) => {
          console.error("Socket error:", err.message);
          reject(err);
        });

        this._bindEvents();
        this._bindWebRTCEvents();
      }).catch(reject);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.roomId = null;
    this.isHost = false;
    this.peer = null;
  }

  _bindEvents() {
    this.socket.on("player:moved", (data) => {
      this.onPeerMove?.(data);
    });

    this.socket.on("player:acted", (data) => {
      this.onPeerAction?.(data);
    });

    this.socket.on("player:key", (data) => {
      this.onPeerKey?.(data);
    });

    this.socket.on("room:update", (data) => {
      this.onRoomUpdate?.(data);
    });

    this.socket.on("stage:completed", (data) => {
      this.onStageComplete?.(data);
    });
  }

  // --- Rooms ---
  createRoom(stage = 1) {
    return new Promise((resolve) => {
      this.isHost = true;
      this.socket.emit("room:create", { stage }, (res) => {
        this.roomId = res.roomId;
        resolve(res);
      });
    });
  }

  joinRoom(roomId) {
    return new Promise((resolve, reject) => {
      this.socket.emit("room:join", { roomId }, (res) => {
        if (res.error) return reject(new Error(res.error));
        this.roomId = roomId;
        this.isHost = false;
        resolve(res);
      });
    });
  }

  leaveRoom() {
    if (this.roomId) {
      this.socket.emit("room:leave");
      this.roomId = null;
      this.isHost = false;
    }
  }

  // --- Game events ---
  sendKeyState(key, pressed) {
    if (!this.roomId) return;
    this.socket.emit("player:key", { roomId: this.roomId, key, pressed });
  }

  sendMove(x, y, vx, vy) {
    if (!this.roomId) return;
    this.socket.emit("player:move", { roomId: this.roomId, x, y, vx, vy });
  }

  sendAction(action, payload = {}) {
    if (!this.roomId) return;
    this.socket.emit("player:action", { roomId: this.roomId, action, payload });
  }

  sendStageComplete(scores, times) {
    if (!this.roomId) return;
    this.socket.emit("stage:complete", { roomId: this.roomId, scores, times });
  }

  // --- Leaderboard ---
  async submitScore(stageId, score, timeMs) {
    const res = await fetch(`${API_BASE}/api/stages/complete`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify({ stageId, score, timeMs }),
    });
    return res.json();
  }

  async getLeaderboard(limit = 20, offset = 0) {
    const res = await fetch(`${API_BASE}/api/leaderboard?limit=${limit}&offset=${offset}`);
    return res.json();
  }

  async getBestTime(stageId) {
    const res = await fetch(`${API_BASE}/api/stages/${stageId}/best`, {
      headers: this._headers(),
    });
    return res.json();
  }

  _headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
  }

  // === WebRTC: Host streams game to guest ===

  async _getIceServers() {
    try {
      const res = await fetch(`${API_BASE}/api/config/ice-servers`);
      const data = await res.json();
      return data.iceServers;
    } catch (e) {
      console.warn("Failed to fetch ICE servers, falling back to STUN:", e);
      return [{ urls: "stun:stun.l.google.com:19302" }];
    }
  }

  async startStreaming() {
    if (!this.isHost || !this.roomId) {
      console.warn("[HOST] startStreaming: not host or no room");
      return;
    }
    console.log("[HOST] Fetching ICE servers...");
    const iceServers = await this._getIceServers();
    console.log("[HOST] ICE servers:", iceServers.length);
    this._pc = new RTCPeerConnection({ iceServers });
    const canvas = document.querySelector("#game-canvas canvas");
    if (!canvas) {
      console.error("[HOST] No Ruffle canvas found for captureStream");
      return;
    }
    console.log("[HOST] Capturing Ruffle canvas at 30fps...");
    const stream = canvas.captureStream(30);
    console.log("[HOST] captureStream resolved — tracks:", stream.getVideoTracks().length);
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
      console.log("[HOST] Video track:", videoTrack.label, "readyState:", videoTrack.readyState);
      this._pc.addTrack(videoTrack, stream);
    }
    videoTrack?.addEventListener("ended", () => {
      console.warn("[HOST] Video track ended");
      this._pc?.close();
    });

    // ICE candidate logging — serialize to plain object for Socket.IO
    this._pc.onicecandidate = (e) => {
      if (e.candidate) {
        const json = e.candidate.toJSON();
        console.log("[HOST] ICE candidate:", json.type, json.protocol, json.candidate?.substring(0, 30));
        this.socket.emit("call:ice-candidate", { roomId: this.roomId, candidate: json });
      } else {
        console.log("[HOST] ICE gathering complete (null candidate)");
      }
    };

    // Connection state
    this._pc.oniceconnectionstatechange = () => {
      const state = this._pc.iceConnectionState;
      console.log("[HOST] ICE state:", state);
      if (state === "disconnected" || state === "failed") {
        console.warn("[HOST] ICE disconnected/failed");
        this.onStreamDisconnected?.();
      }
    };

    this._pc.onconnectionstatechange = () => {
      console.log("[HOST] Connection state:", this._pc.connectionState);
    };

    // Create and send offer
    console.log("[HOST] Creating offer...");
    const offer = await this._pc.createOffer();
    await this._pc.setLocalDescription(offer);
    console.log("[HOST] Offer created, sending via socket");
    this.socket.emit("call:offer", { roomId: this.roomId, sdp: offer });
  }

  async handleOffer(sdp) {
    if (this.isHost) return;
    // Guard against duplicate offers (Socket.IO may replay events on reconnect)
    if (this._handlingOffer) {
      console.warn("[GUEST] Already processing an offer, ignoring duplicate");
      return;
    }
    this._handlingOffer = true;
    console.log("[GUEST] Received offer, setting up peer connection...");
    const iceServers = await this._getIceServers();
    console.log("[GUEST] ICE servers:", iceServers.length);
    this._pc = new RTCPeerConnection({
      iceServers,
      iceTransportPolicy: "relay",
    });

    this._pc.onicecandidate = (e) => {
      if (e.candidate) {
        const json = e.candidate.toJSON();
        console.log("[GUEST] ICE candidate:", json.type, json.protocol);
        this.socket.emit("call:ice-candidate", { roomId: this.roomId, candidate: json });
      }
    };

    this._pc.ontrack = (e) => {
      console.log("[GUEST] ontrack fired — streams:", e.streams.length, "video tracks:", e.streams[0]?.getVideoTracks().length);
      this.onRemoteStream?.(e.streams[0]);
    };

    this._pc.oniceconnectionstatechange = () => {
      console.log("[GUEST] ICE state:", this._pc.iceConnectionState);
      if (this._pc.iceConnectionState === "disconnected" || this._pc.iceConnectionState === "failed") {
        this.onStreamDisconnected?.();
      }
    };

    console.log("[GUEST] Creating answer...");
    try {
      await this._pc.setRemoteDescription(new RTCSessionDescription(sdp));
    } catch (e) {
      if (e.message.includes("wrong state")) {
        console.warn("[GUEST] Already processing an offer, ignoring duplicate");
        return;
      }
      throw e;
    }
    const answer = await this._pc.createAnswer();
    await this._pc.setLocalDescription(answer);
    console.log("[GUEST] Answer sent via socket");
    this.socket.emit("call:answer", { roomId: this.roomId, sdp: answer });
  }

  async handleAnswer(sdp) {
    if (!this._pc) return;
    // Serialize answer processing to prevent race conditions
    if (this._answering) {
      console.warn("[HOST] Already processing an answer, queuing...");
      return;
    }
    if (this._pc.signalingState !== "have-local-offer") {
      console.warn("[HOST] State is", this._pc.signalingState, "— cannot accept answer");
      return;
    }
    this._answering = true;
    try {
      console.log("[HOST] Setting remote answer...");
      await this._pc.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("[HOST] Remote answer set — state:", this._pc.signalingState);
    } catch(e) {
      console.error("[HOST] setRemoteDescription failed:", e.message);
    } finally {
      this._answering = false;
    }
  }

  async handleIceCandidate(candidate) {
    if (!this._pc) return;
    try {
      await this._pc.addIceCandidate(new RTCIceCandidate(candidate));
      console.log(`[${this.isHost ? "HOST" : "GUEST"}] Added ICE candidate:`, candidate.type, candidate.protocol);
    } catch(e) {
      console.warn(`[${this.isHost ? "HOST" : "GUEST"}] ICE candidate failed:`, e.message);
    }
  }

  hangUp() {
    if (this._pc) {
      this._pc.close();
      this._pc = null;
    }
    this.socket?.emit("call:hangup", { roomId: this.roomId });
  }

  _bindWebRTCEvents() {
    // Remove old listeners first to prevent duplicates on reconnect
    this.socket.off("call:offer");
    this.socket.off("call:answer");
    this.socket.off("call:ice-candidate");
    this.socket.off("call:hangup");

    this.socket.on("call:offer", async (data) => {
      await this.handleOffer(data.sdp);
    });
    this.socket.on("call:answer", async (data) => {
      await this.handleAnswer(data.sdp);
    });
    this.socket.on("call:ice-candidate", async (data) => {
      console.log(`[${this.isHost ? "HOST" : "GUEST"}] Received remote ICE candidate:`, data.candidate?.type, data.candidate?.protocol);
      await this.handleIceCandidate(data.candidate);
    });
    this.socket.on("call:hangup", () => {
      this.hangUp();
      this.onStreamDisconnected?.();
    });
  }
}

// Singleton
export const multiplayer = new MultiplayerClient();
