// Multiplayer client — wraps Socket.IO and REST API for online co-op
const API_BASE = window.__API_BASE__ || window.location.origin;

export class MultiplayerClient {
  constructor() {
    this.socket = null;
    this.token = localStorage.getItem("fwg_token");
    this.user = JSON.parse(localStorage.getItem("fwg_user") || "null");
    this.roomId = null;
    this.isHost = false;
    
    // Game event listeners (callbacks)
    this.peer = null;
    this.onPeerMove = null;
    this.onPeerAction = null;
    this.onPeerKey = null;
    this.onRoomUpdate = null;
    this.onStageComplete = null;
    this.onRemoteStream = null;
    this.onStreamDisconnected = null;
    
    // WebRTC guards & state control flags
    this._pc = null;
    this._handlingOffer = false;
    this._answering = false;
    this._isStreamingInit = false; // Double-trigger protection
    this._webRTCBound = false;     // Prevent duplicate socket listeners
  }

  get isConnected() {
    return this.socket?.connected ?? false;
  }

  get isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // --- Auth & API calls ---
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
    this.hangUp();
  }

  _bindEvents() {
    this.socket.off("player:moved").on("player:moved", (data) => {
      this.onPeerMove?.(data);
    });

    this.socket.off("player:acted").on("player:acted", (data) => {
      this.onPeerAction?.(data);
    });

    this.socket.off("player:key").on("player:key", (data) => {
      this.onPeerKey?.(data);
    });

    this.socket.off("room:update").on("room:update", (data) => {
      this.onRoomUpdate?.(data);
    });

    this.socket.off("stage:completed").on("stage:completed", (data) => {
      this.onStageComplete?.(data);
    });
  }

  // --- Rooms & Gameplay ---
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
      this.hangUp();
    }
  }

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

    // 🛡️ Double-trigger protection
    if (this._isStreamingInit) {
      console.warn("[HOST] Yayın zaten başlatılıyor, mükerrer istek reddedildi.");
      return;
    }
    this._isStreamingInit = true;

    console.log("[HOST] Fetching ICE servers...");
    const iceServers = await this._getIceServers();
    console.log("[HOST] ICE servers:", iceServers.length);
    
    this._pc = new RTCPeerConnection({ iceServers });

    const sourceCanvas = document.querySelector("#game-canvas canvas");
    if (!sourceCanvas) {
      console.error("[HOST] No Ruffle canvas found for captureStream");
      this._isStreamingInit = false; // Release the lock on error
      return;
    }

    console.log("[HOST] Ruffle canvas found. Building Proxy Canvas pipeline...");

    // 1. Create a proxy 2D canvas to avoid WebGL lockups
    const proxyCanvas = document.createElement("canvas");
    proxyCanvas.width = sourceCanvas.width;
    proxyCanvas.height = sourceCanvas.height;
    const ctx = proxyCanvas.getContext("2d", { alpha: false }); // Alpha disabled for performance

    // 2. Synchronous render loop that copies each frame
    let isStreaming = true;
    const renderLoop = () => {
      if (!isStreaming) return;
      
      // Sync proxy if the resolution changes
      if (sourceCanvas.width !== proxyCanvas.width || sourceCanvas.height !== proxyCanvas.height) {
        proxyCanvas.width = sourceCanvas.width;
        proxyCanvas.height = sourceCanvas.height;
      }
      
      ctx.drawImage(sourceCanvas, 0, 0);
      requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // 3. Capture a clean stream from the proxy canvas
    const stream = proxyCanvas.captureStream(30);
    const videoTrack = stream.getVideoTracks()[0];
    
    if (videoTrack) {
      console.log("[HOST] Proxy canvas stream — track readyState:", videoTrack.readyState);
      this._pc.addTrack(videoTrack, stream);
    }
    
    videoTrack?.addEventListener("ended", () => {
      console.warn("[HOST] Video track ended");
      isStreaming = false; // Break the loop
      this.hangUp();
    });

    this._pc.onicecandidate = (e) => {
      if (e.candidate) {
        const json = e.candidate.toJSON();
        console.log("[HOST] Local ICE candidate found:", json.type, json.protocol);
        this.socket.emit("call:ice-candidate", { roomId: this.roomId, candidate: json });
      } else {
        console.log("[HOST] ICE gathering complete (null candidate)");
      }
    };

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

    console.log("[HOST] Creating offer...");
    try {
      const offer = await this._pc.createOffer();
      await this._pc.setLocalDescription(offer);
      console.log("[HOST] Offer created, sending via socket");
      this.socket.emit("call:offer", { roomId: this.roomId, sdp: offer });
    } catch (e) {
      console.error("[HOST] Error creating offer:", e);
      this._isStreamingInit = false;
    }
  }

  async handleOffer(sdp) {
    if (this.isHost) return;
    
    // 🛡️ Duplicate offer protection
    if (this._handlingOffer) {
      console.warn("[GUEST] Already processing an offer, ignoring duplicate");
      return;
    }
    
    this._handlingOffer = true;
    console.log("[GUEST] Received offer, setting up peer connection...");
    
    try {
      const iceServers = await this._getIceServers();
      console.log("[GUEST] ICE servers:", iceServers.length);
      
      this._pc = new RTCPeerConnection({
        iceServers,
        iceTransportPolicy: "relay", // In production, forcing relay can improve stability; "all" is also an option
      });

      this._pc.onicecandidate = (e) => {
        if (e.candidate) {
          const json = e.candidate.toJSON();
          console.log("[GUEST] Local ICE candidate found:", json.type, json.protocol);
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

      await this._pc.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("[GUEST] Creating answer...");
      const answer = await this._pc.createAnswer();
      await this._pc.setLocalDescription(answer);
      console.log("[GUEST] Answer sent via socket");
      this.socket.emit("call:answer", { roomId: this.roomId, sdp: answer });
    } catch (e) {
      console.error("[GUEST] Error in handleOffer:", e);
    } finally {
      this._handlingOffer = false;
    }
  }

  async handleAnswer(sdp) {
    if (!this._pc) return;
    
    // 🛡️ Duplicate-answer and race condition protection
    if (this._answering) {
      console.warn("[HOST] Already processing an answer, queuing...");
      return;
    }

    this._answering = true;
    try {
      // If the host hasn't finished the local offer, wait in short loops
      if (this._pc.signalingState !== "have-local-offer") {
        console.warn("[HOST] State is", this._pc.signalingState, "— waiting for local offer to settle...");
        let checkCount = 0;
        while (this._pc.signalingState !== "have-local-offer" && checkCount < 20) {
          await new Promise(r => setTimeout(r, 100));
          checkCount++;
        }
      }

      console.log("[HOST] Setting remote answer...");
      await this._pc.setRemoteDescription(new RTCSessionDescription(sdp));
      console.log("[HOST] Remote answer set — state:", this._pc.signalingState);
    } catch(e) {
      console.error("[HOST] setRemoteDescription failed:", e.message);
    } finally {
      this._answering = false;
    }
  }

  async handleIceCandidate(candidateData) {
    if (!candidateData) return;
    
    let waitCount = 0;
      while ((!this._pc || !this._pc.remoteDescription) && waitCount < 50) {
      await new Promise(r => setTimeout(r, 100)); // 100ms * 50 = max 5 seconds
      waitCount++;
    }

    if (!this._pc || !this._pc.remoteDescription) {
      console.error(`[${this.isHost ? "HOST" : "GUEST"}] Timeout! PeerConnection kurulamadı, aday çöpe gitti.`);
      return;
    }

    try {
      const iceCandidate = new RTCIceCandidate(candidateData);
      await this._pc.addIceCandidate(iceCandidate);
      console.log(`[${this.isHost ? "HOST" : "GUEST"}] Added ICE candidate successfully:`, candidateData.type, candidateData.protocol);
    } catch(e) {
      console.warn(`[${this.isHost ? "HOST" : "GUEST"}] ICE candidate failed to add:`, e.message);
    }
  }

  hangUp() {
    if (this._pc) {
      this._pc.close();
      this._pc = null;
    }
    this.socket?.emit("call:hangup", { roomId: this.roomId });
    
    this._handlingOffer = false;
    this._answering = false;
    this._isStreamingInit = false; 
  }

  _bindWebRTCEvents() {
    if (this._webRTCBound || !this.socket) return;
    this._webRTCBound = true;

    // Cleanup
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