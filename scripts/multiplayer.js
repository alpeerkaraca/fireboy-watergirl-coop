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

  async startStreaming(canvas) {
    if (!this.isHost || !this.roomId) return;
    const iceServers = await this._getIceServers();
    this._pc = new RTCPeerConnection({ iceServers });

    // Capture Ruffle canvas at 30fps
    const stream = canvas.captureStream(30);
    stream.getVideoTracks().forEach(track => this._pc.addTrack(track, stream));

    // Send ICE candidates to peer
    this._pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.socket.emit("call:ice-candidate", { roomId: this.roomId, candidate: e.candidate });
      }
    };

    // Connection state handling
    this._pc.oniceconnectionstatechange = () => {
      console.log("ICE state:", this._pc.iceConnectionState);
      if (this._pc.iceConnectionState === "disconnected" || this._pc.iceConnectionState === "failed") {
        this.onStreamDisconnected?.();
      }
    };

    // Create and send offer
    const offer = await this._pc.createOffer();
    await this._pc.setLocalDescription(offer);
    this.socket.emit("call:offer", { roomId: this.roomId, sdp: offer });
  }

  async handleOffer(sdp) {
    if (this.isHost) return;
    const iceServers = await this._getIceServers();
    this._pc = new RTCPeerConnection({ iceServers });

    this._pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.socket.emit("call:ice-candidate", { roomId: this.roomId, candidate: e.candidate });
      }
    };

    this._pc.ontrack = (e) => {
      this.onRemoteStream?.(e.streams[0]);
    };

    this._pc.oniceconnectionstatechange = () => {
      if (this._pc.iceConnectionState === "disconnected" || this._pc.iceConnectionState === "failed") {
        this.onStreamDisconnected?.();
      }
    };

    await this._pc.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await this._pc.createAnswer();
    await this._pc.setLocalDescription(answer);
    this.socket.emit("call:answer", { roomId: this.roomId, sdp: answer });
  }

  async handleAnswer(sdp) {
    if (!this._pc) return;
    await this._pc.setRemoteDescription(new RTCSessionDescription(sdp));
  }

  async handleIceCandidate(candidate) {
    if (!this._pc) return;
    try {
      await this._pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch(e) {}
  }

  hangUp() {
    if (this._pc) {
      this._pc.close();
      this._pc = null;
    }
    this.socket?.emit("call:hangup", { roomId: this.roomId });
  }

  _bindWebRTCEvents() {
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
