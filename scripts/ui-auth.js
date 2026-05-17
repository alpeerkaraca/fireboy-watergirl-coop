// Auth UI — magic link login modal
import { multiplayer } from "./multiplayer.js";

export function initAuthUI() {
  // Inject auth modal HTML
  const modal = document.createElement("div");
  modal.id = "auth-modal";
  modal.innerHTML = `
    <div class="auth-backdrop"></div>
    <div class="auth-dialog">
      <h2>Fireboy & Watergirl Online</h2>
      <div id="auth-step-email">
        <p>Enter your email to play online — no password needed.</p>
        <input type="email" id="auth-email" placeholder="you@example.com" autocomplete="email" />
        <button id="auth-send">Send Magic Link</button>
        <p class="auth-hint">We'll send you a one-click login link.</p>
      </div>
      <div id="auth-step-token" style="display:none">
        <p>Paste the token from your email (or click the link).</p>
        <input type="text" id="auth-token" placeholder="Paste token here" />
        <button id="auth-verify">Verify & Play</button>
      </div>
      <div id="auth-step-done" style="display:none">
        <p id="auth-welcome"></p>
        <button id="auth-logout">Logout</button>
      </div>
      <button class="auth-close" id="auth-close">✕</button>
      <p id="auth-error"></p>
    </div>
  `;
  modal.style.display = "none";
  document.body.appendChild(modal);

  // Inject auth styles
  const style = document.createElement("style");
  style.textContent = `
    #auth-modal {
      position: fixed; inset: 0; z-index: 10000;
      display: flex; align-items: center; justify-content: center;
    }
    .auth-backdrop {
      position: absolute; inset: 0; background: rgba(0,0,0,0.7);
    }
    .auth-dialog {
      position: relative;
      background: #1a1a2e; color: #eee;
      padding: 32px; border-radius: 12px;
      width: 380px; max-width: 90vw;
      box-shadow: 0 8px 40px rgba(0,0,0,0.5);
    }
    .auth-dialog h2 { margin: 0 0 16px; color: #ff6b35; }
    .auth-dialog p { font-size: 14px; margin-bottom: 12px; color: #aaa; }
    .auth-dialog input {
      width: 100%; padding: 10px; border-radius: 6px;
      border: 1px solid #333; background: #16213e; color: #fff;
      margin-bottom: 12px; font-size: 14px;
    }
    .auth-dialog button {
      width: 100%; padding: 10px; border-radius: 6px;
      border: none; cursor: pointer; font-weight: 600;
      background: #ff6b35; color: #fff;
      margin-bottom: 8px; transition: background 0.2s;
    }
    .auth-dialog button:hover { background: #e85d2c; }
    .auth-hint { font-size: 12px !important; color: #666 !important; }
    .auth-close {
      position: absolute; top: 12px; right: 12px;
      width: 28px !important; height: 28px;
      background: transparent !important; color: #666 !important;
      font-size: 18px; padding: 0 !important;
    }
    #auth-error { color: #ff4444; font-size: 13px; min-height: 18px; }
  `;
  document.head.appendChild(style);

  // Event bindings
  document.getElementById("auth-close").onclick = () => hideAuth();
  document.getElementById("auth-send").onclick = handleSendMagicLink;
  document.getElementById("auth-verify").onclick = handleVerifyToken;
  document.getElementById("auth-logout").onclick = handleLogout;
  document.getElementById("auth-email").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSendMagicLink();
  });
  document.getElementById("auth-token").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleVerifyToken();
  });

  // Auto-open if not authenticated
  if (!multiplayer.isAuthenticated) {
    showAuth();
  } else {
    showDone();
  }

  // Listen for external open events (from game.js header button)
  document.addEventListener("auth:open", () => showAuth());

  // Close button
  document.getElementById("auth-close").addEventListener("click", hideAuth);
  document.querySelector(".auth-backdrop")?.addEventListener("click", hideAuth);

  // Logout
  document.getElementById("auth-logout").addEventListener("click", handleLogout);
}

export function showAuth() {
  document.getElementById("auth-modal").style.display = "flex";
  document.getElementById("auth-step-email").style.display = "block";
  document.getElementById("auth-step-token").style.display = "none";
  document.getElementById("auth-step-done").style.display = "none";
  document.getElementById("auth-error").textContent = "";
}

function hideAuth() {
  document.getElementById("auth-modal").style.display = "none";
}

async function handleSendMagicLink() {
  const email = document.getElementById("auth-email").value.trim();
  const errEl = document.getElementById("auth-error");
  if (!email) { errEl.textContent = "Enter an email address."; return; }

  errEl.textContent = "Sending...";
  try {
    await multiplayer.requestMagicLink(email);
    document.getElementById("auth-step-email").style.display = "none";
    document.getElementById("auth-step-token").style.display = "block";
    errEl.textContent = "";
  } catch {
    errEl.textContent = "Failed to send. Try again.";
  }
}

async function handleVerifyToken() {
  const rawToken = document.getElementById("auth-token").value.trim();
  const errEl = document.getElementById("auth-error");
  if (!rawToken) { errEl.textContent = "Paste the token from your email."; return; }

  // Support full link paste: extract token param
  let token = rawToken;
  try {
    const url = new URL(rawToken);
    token = url.searchParams.get("token") || rawToken;
  } catch {}

  errEl.textContent = "Verifying...";
  try {
    const data = await multiplayer.verifyToken(token);
    if (!data) { errEl.textContent = "Invalid or expired token."; return; }
    showDone();
  } catch {
    errEl.textContent = "Verification failed.";
  }
}

function showDone() {
  document.getElementById("auth-step-email").style.display = "none";
  document.getElementById("auth-step-token").style.display = "none";
  document.getElementById("auth-step-done").style.display = "block";
  document.getElementById("auth-error").textContent = "";
  if (multiplayer.user) {
    document.getElementById("auth-welcome").textContent =
      `Logged in as ${multiplayer.user.username}`;
  }
  // Notify the rest of the app that auth completed
  document.dispatchEvent(new CustomEvent("auth:done"));
}

function handleLogout() {
  multiplayer.logout();
  hideAuth();
  document.dispatchEvent(new CustomEvent("auth:logout"));
}
