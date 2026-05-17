// Main entry — landing page, Ruffle SWF launcher, auth, lobby, leaderboard
// Online multiplayer: WebRTC stream from Host → Guest, keyboard relay Guest → Host

import { initLanding, setGameStartCallback, backToMenu } from "./landing.js";
import { initAuthUI } from "./ui-auth.js";
import { initLobbyUI } from "./lobby.js";
import { leaderboardUI } from "./leaderboard-ui.js";
import { multiplayer } from "./multiplayer.js";

window.__API_BASE__ = window.__API_BASE__ || window.location.origin;

let rufflePlayer = null;
let streamInterval = null;

function destroyGame() {
  if (window._remoteKeyHandler) {
    window.removeEventListener("keydown", window._remoteKeyHandler);
    window.removeEventListener("keyup", window._remoteKeyHandler);
    window._remoteKeyHandler = null;
  }
  if (streamInterval) { clearInterval(streamInterval); streamInterval = null; }
  multiplayer.onPeerKey = null;
  multiplayer.onRemoteStream = null;
  multiplayer.onStreamDisconnected = null;
  if (rufflePlayer) { rufflePlayer.remove(); rufflePlayer = null; }
  document.getElementById("game-canvas").innerHTML = "";
}

// === HOST: Load Ruffle + stream canvas to Guest ===

async function startGameAsHost(temple) {
  loadGameSWF(temple);
  setupHostStream();
}

async function startGameAsGuest(temple) {
  showGuestWaitingScreen();
  // Guest sends WASD keys, receives video stream
  setupGuestInputRelay();
}

function startGame(temple) {
  destroyGame();
  document.getElementById("screen-game").style.display = "flex";

  const isOnline = multiplayer.isConnected && multiplayer.roomId;
  if (isOnline && multiplayer.isHost) {
    document.getElementById("game-title").textContent =
      `HOST — Arrow Keys = Fireboy | Streaming to Guest`;
    document.getElementById("game-online-status").textContent = "Live";
    document.getElementById("game-online-status").style.color = "#e74c3c";
    startGameAsHost(temple);
  } else if (isOnline && !multiplayer.isHost) {
    document.getElementById("game-title").textContent =
      `GUEST — WASD = Watergirl | Watching Host`;
    document.getElementById("game-online-status").textContent = "Connected";
    document.getElementById("game-online-status").style.color = "#4ecca3";
    startGameAsGuest(temple);
  } else {
    document.getElementById("game-title").textContent =
      `${TEMPLES[temple]} — Arrow Keys: Fireboy | WASD: Watergirl`;
    loadGameSWF(temple);
  }
}

// === Load SWF in Ruffle ===

function loadGameSWF(temple) {
  const container = document.getElementById("game-canvas");
  container.innerHTML = "";
  container.style.position = "relative";

  const ruffle = window.RufflePlayer.newest();
  rufflePlayer = ruffle.createPlayer();

  rufflePlayer.load({ url: `../assets/temple/${temple}/game.swf`, base: `../assets/temple/${temple}/` });

  rufflePlayer.addEventListener("loadedmetadata", () => {
    console.log("SWF loaded:", temple);
    addInjectionTestUI();
    setupHostKeyRelay();
  });
}

// === Guest: Video-based spectator view ===

function showGuestWaitingScreen() {
  const container = document.getElementById("game-canvas");
  container.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;
                width:100%;height:100%;background:#000;color:#fff;font-family:sans-serif">
      <p style="font-size:18px;color:#4ecca3;margin-bottom:8px">Connected to Host</p>
      <p style="font-size:14px;color:#888;margin-bottom:20px">Waiting for video stream...</p>
      <video id="remote-video" autoplay playsinline muted
             style="width:800px;height:640px;background:#111;border-radius:4px;display:block"></video>
      <p style="font-size:12px;color:#666;margin-top:12px">Use <b>W A D</b> keys to control Watergirl</p>
      <p style="font-size:11px;color:#555">You are viewing the Host's screen via WebRTC</p>
    </div>
  `;
  container.style.position = "relative";

  // Request host to start streaming
  multiplayer.socket?.emit("stream:start", { roomId: multiplayer.roomId });

  // Listen for incoming video stream
  let _guestOverlay = null;
  multiplayer.onRemoteStream = (stream) => {
    console.log("[GUEST] onRemoteStream — tracks:", stream.getVideoTracks().length);
    const video = document.getElementById("remote-video");
    if (!video) return;

    // Reset video element state to force re-decode
    video.pause();
    video.srcObject = null;
    video.load();
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;

    video.srcObject = stream;
    video.style.setProperty("border", "2px solid #4ecca3", "important");
    video.style.setProperty("z-index", "10", "important");
    console.log("[GUEST] srcObject set, readyState:", video.readyState);

    video.onloadedmetadata = () => {
      console.log("[GUEST] loadedmetadata —", video.videoWidth, "x", video.videoHeight);
      video.play().catch(e => console.warn("[GUEST] autoplay blocked:", e.message));
    };

    // Click-to-start overlay for browser autoplay policy
    _guestOverlay = document.createElement("div");
    _guestOverlay.innerHTML = '<button style="padding:15px 30px;font-size:20px;cursor:pointer;background:#4ecca3;border:none;border-radius:8px;color:#fff;font-weight:600">Stream Sync</button>';
    _guestOverlay.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:100;";
    _guestOverlay.onclick = () => {
      video.play().then(() => {
        _guestOverlay.remove();
        _guestOverlay = null;
        console.log("[GUEST] Stream playing via gesture");
      }).catch(e => console.error("[GUEST] Play failed:", e));
    };
    document.getElementById("game-canvas").appendChild(_guestOverlay);

    const statusP = document.querySelector("#game-canvas p");
    if (statusP) statusP.textContent = "Stream connected — click Sync Stream!";
  };

  multiplayer.onStreamDisconnected = () => {
    const video = document.getElementById("remote-video");
    if (video) video.srcObject = null;
  };
}

// === Host: Start streaming when guest requests ===

function setupHostStream() {
  multiplayer.socket?.on("stream:start-request", () => {
    multiplayer.startStreaming();
    console.log("WebRTC stream started — canvas captured at 30fps");
  });
}

// === Guest: Send WASD keys to host ===

function setupGuestInputRelay() {
  const keyMap = { KeyA: false, KeyD: false, KeyW: false };
  window._remoteKeyHandler = function(e) {
    if (!(e.code in keyMap)) return;
    if (keyMap[e.code] === (e.type === "keydown")) return;
    keyMap[e.code] = (e.type === "keydown");
    multiplayer.sendKeyState(e.code, keyMap[e.code]);
  };
  window.addEventListener("keydown", window._remoteKeyHandler);
  window.addEventListener("keyup", window._remoteKeyHandler);
}

// === Host: Inject guest's keys into Ruffle ===

function setupHostKeyRelay() {
  multiplayer.onPeerKey = (data) => {
    if (!rufflePlayer) return;
    if (data.pressed) {
      rufflePlayer.simulate_key_down(data.key);
    } else {
      rufflePlayer.simulate_key_up(data.key);
    }
  };
}

// === Test buttons for Watergirl injection ===

function injectRemoteKey(type, code) {
  if (!rufflePlayer) return false;
  if (type === "keydown" && typeof rufflePlayer.simulate_key_down === "function") {
    rufflePlayer.simulate_key_down(code); return true;
  }
  if (type === "keyup" && typeof rufflePlayer.simulate_key_up === "function") {
    rufflePlayer.simulate_key_up(code); return true;
  }
  return false;
}

function injectWatergirl(dir) {
  const codes = { left: "KeyA", right: "KeyD", jump: "KeyW" };
  const code = codes[dir];
  if (!code) return;
  injectRemoteKey("keydown", code);
  setTimeout(() => injectRemoteKey("keyup", code), 100);
}

function testSequence() {
  injectRemoteKey("keydown", "KeyD");
  setTimeout(() => {
    injectRemoteKey("keyup", "KeyD");
    injectRemoteKey("keydown", "KeyW");
    setTimeout(() => injectRemoteKey("keyup", "KeyW"), 200);
  }, 500);
}

function addInjectionTestUI() {
  document.querySelector(".injection-test-bar")?.remove();
  const bar = document.createElement("div");
  bar.className = "injection-test-bar";
  bar.innerHTML = [
    '<span style="color:#aaa;font-size:11px">Remote Player 2 Test:</span>',
    '<button data-dir="left">A</button>',
    '<button data-dir="right">D</button>',
    '<button data-dir="jump">W</button>',
    '<button data-auto="1">Auto</button>',
  ].join("");
  bar.style.cssText =
    "display:flex;align-items:center;gap:8px;padding:4px 12px;background:#1a1a2e;border-top:1px solid #333;flex-shrink:0";
  document.getElementById("screen-game").appendChild(bar);
  bar.querySelectorAll("button").forEach(btn => {
    btn.style.cssText =
      "padding:4px 12px;border-radius:4px;border:1px solid #555;background:#333;color:#fff;cursor:pointer;font-size:13px";
    btn.addEventListener("click", () => {
      if (btn.dataset.auto) testSequence();
      else injectWatergirl(btn.dataset.dir);
    });
  });
}

// === Auth & UI ===

const TEMPLES = {
  forest: "Forest Temple", light: "Light Temple",
  ice: "Ice Temple", crystal: "Crystal Temple",
};

function updateAuthUI() {
  const user = JSON.parse(localStorage.getItem("fwg_user") || "null");
  const btn = document.getElementById("btn-auth");
  const display = document.getElementById("user-display");
  const lobbyDisc = document.getElementById("lobby-disconnected");
  const lobbyConn = document.getElementById("lobby-connected");
  if (user) {
    if (display) display.textContent = user.username;
    if (btn) btn.textContent = "Logout";
    if (lobbyDisc) lobbyDisc.style.display = "none";
    if (lobbyConn) lobbyConn.style.display = "block";
  } else {
    if (display) display.textContent = "";
    if (btn) btn.textContent = "Login";
    if (lobbyDisc) lobbyDisc.style.display = "block";
    if (lobbyConn) lobbyConn.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  initLanding();
  setGameStartCallback(startGame);

  // Auto-verify magic link token BEFORE showing auth modal
  const urlParams = new URLSearchParams(window.location.search);
  const magicToken = urlParams.get("token");
  if (magicToken) {
    window.history.replaceState({}, document.title, window.location.pathname);
    try {
      console.log("[auto-verify] Verifying token...");
      const data = await multiplayer.verifyToken(magicToken);
      console.log("[auto-verify] Response:", data);
      if (data) {
        console.log("[auto-verify] Logged in as", data.user?.username);
        updateAuthUI();
      }
    } catch(e) {
      console.error("[auto-verify] Failed:", e.message, e);
      // Also try via REST directly as fallback
      const res = await fetch(`${window.location.origin}/api/auth/verify?token=${encodeURIComponent(magicToken)}`);
      console.log("[auto-verify] Direct fetch status:", res.status);
      if (res.ok) {
        const data = await res.json();
        console.log("[auto-verify] Direct fetch data:", data);
        localStorage.setItem("fwg_token", data.token);
        localStorage.setItem("fwg_user", JSON.stringify(data.user));
        multiplayer.token = data.token;
        multiplayer.user = data.user;
        updateAuthUI();
      }
    }
  }

  initAuthUI();
  initLobbyUI(() => {
    const t = document.querySelector(".temple-card.active")?.dataset?.temple || "forest";
    startGame(t);
  });

  document.getElementById("btn-auth").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem("fwg_user") || "null");
    if (user) {
      localStorage.removeItem("fwg_token");
      localStorage.removeItem("fwg_user");
      if (multiplayer.isConnected) multiplayer.disconnect();
      updateAuthUI();
    } else {
      document.dispatchEvent(new CustomEvent("auth:open"));
    }
  });
  document.getElementById("btn-leaderboard").addEventListener("click", async () => {
    await leaderboardUI.show();
  });
  document.getElementById("btn-lobby").addEventListener("click", () => {
    const p = document.getElementById("lobby-ui");
    if (p) p.style.display = p.style.display === "none" ? "block" : "none";
  });
  document.getElementById("btn-back-menu").addEventListener("click", () => {
    destroyGame();
    backToMenu();
  });

  updateAuthUI();
  document.addEventListener("auth:done", updateAuthUI);
  document.addEventListener("auth:logout", updateAuthUI);
  document.getElementById("lb-close").addEventListener("click", () => leaderboardUI.hide());
  document.getElementById("lb-backdrop").addEventListener("click", () => leaderboardUI.hide());
  document.getElementById("lb-temple-filter").addEventListener("change", (e) => {
    leaderboardUI.setTempleFilter(e.target.value);
    leaderboardUI.show();
  });
  document.addEventListener("game:stop", () => destroyGame());
});
