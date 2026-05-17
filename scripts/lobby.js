// Lobby UI — create/join online rooms
import { multiplayer } from "./multiplayer.js";

export function initLobbyUI(onStartGame) {
  const container = document.createElement("div");
  container.id = "lobby-ui";
  container.innerHTML = `
    <div class="lobby-panel">
      <h3>Online Co-op</h3>
      <div id="lobby-disconnected">
        <p>Login to play online.</p>
        <button id="lobby-login-btn">Login / Sign Up</button>
      </div>
      <div id="lobby-connected" style="display:none">
        <div id="lobby-home">
          <button id="lobby-create">Create Room</button>
          <p>— or —</p>
          <input type="text" id="lobby-code-input" placeholder="Room code" maxlength="4" style="text-transform:uppercase" />
          <button id="lobby-join">Join Room</button>
          <p id="lobby-error"></p>
        </div>
        <div id="lobby-room" style="display:none">
          <p>Room: <strong id="lobby-room-code"></strong></p>
          <p id="lobby-players"></p>
          <button id="lobby-leave">Leave Room</button>
          <button id="lobby-start" style="display:none">Start Game</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Lobby styles
  const style = document.createElement("style");
  style.textContent = `
    #lobby-ui {
      position: fixed; top: 16px; right: 16px; z-index: 9999;
    }
    .lobby-panel {
      background: #1a1a2e; color: #eee;
      padding: 20px; border-radius: 8px;
      width: 260px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
      font-size: 13px;
    }
    .lobby-panel h3 { margin: 0 0 12px; color: #ff6b35; font-size: 16px; }
    .lobby-panel button {
      width: 100%; padding: 8px; border-radius: 4px;
      border: none; cursor: pointer; font-weight: 600;
      margin-bottom: 6px; transition: background 0.2s;
    }
    .lobby-panel input {
      width: 100%; padding: 8px; border-radius: 4px;
      border: 1px solid #333; background: #16213e; color: #fff;
      margin-bottom: 6px; font-size: 14px; text-align: center;
    }
    #lobby-create { background: #4ecca3; color: #1a1a2e; }
    #lobby-join { background: #3498db; color: #fff; }
    #lobby-start { background: #e74c3c; color: #fff; }
    #lobby-leave { background: #555; color: #fff; }
    #lobby-login-btn { background: #ff6b35; color: #fff; }
    #lobby-error { color: #ff4444; font-size: 12px; min-height: 16px; }
    .lobby-panel p { margin: 8px 0; color: #888; }
  `;
  document.head.appendChild(style);

  // Bind events
  document.getElementById("lobby-login-btn").onclick = () => {
    document.dispatchEvent(new CustomEvent("auth:open"));
  };
  document.getElementById("lobby-create").onclick = handleCreate;
  document.getElementById("lobby-join").onclick = handleJoin;
  document.getElementById("lobby-leave").onclick = handleLeave;
  document.getElementById("lobby-start").onclick = () => {
    onStartGame?.();
    container.style.display = "none";
  };
  document.getElementById("lobby-code-input").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleJoin();
  });

  // Listen for auth changes
  document.addEventListener("auth:done", updateUI);
  updateUI();
}

function updateUI() {
  const connected = multiplayer.isAuthenticated;
  document.getElementById("lobby-disconnected").style.display = connected ? "none" : "block";
  document.getElementById("lobby-connected").style.display = connected ? "block" : "none";
}

async function handleCreate() {
  const errEl = document.getElementById("lobby-error");
  errEl.textContent = "";

  if (!multiplayer.isConnected) {
    try {
      await multiplayer.connect();
    } catch {
      errEl.textContent = "Failed to connect. Check server.";
      return;
    }
  }

  try {
    const res = await multiplayer.createRoom();
    showRoom(res.roomId, true);
  } catch (e) {
    errEl.textContent = e.message;
  }
}

async function handleJoin() {
  const code = document.getElementById("lobby-code-input").value.trim().toUpperCase();
  const errEl = document.getElementById("lobby-error");
  errEl.textContent = "";

  if (!code) { errEl.textContent = "Enter a room code."; return; }

  if (!multiplayer.isConnected) {
    try {
      await multiplayer.connect();
    } catch {
      errEl.textContent = "Failed to connect. Check server.";
      return;
    }
  }

  try {
    const res = await multiplayer.joinRoom(code);
    showRoom(code, false);
  } catch (e) {
    errEl.textContent = e.message;
  }
}

function showRoom(code, isHost) {
  document.getElementById("lobby-home").style.display = "none";
  document.getElementById("lobby-room").style.display = "block";
  document.getElementById("lobby-room-code").textContent = code;
  document.getElementById("lobby-start").style.display = isHost ? "block" : "none";
  updateRoomPlayers();
}

function handleLeave() {
  multiplayer.leaveRoom();
  document.getElementById("lobby-home").style.display = "block";
  document.getElementById("lobby-room").style.display = "none";
}

function updateRoomPlayers() {
  // Called by room:update events from MultiplayerClient
  multiplayer.onRoomUpdate = (data) => {
    const names = data.players.map(p => p.username).join(" & ");
    document.getElementById("lobby-players").textContent =
      `Players: ${names || "waiting..."}`;
  };
}
