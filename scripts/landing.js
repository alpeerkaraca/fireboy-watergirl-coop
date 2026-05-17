// Landing page — temple selection, progress sync

const TEMPLES = {
  forest: { name: "Forest Temple", levels: 32 },
  light: { name: "Light Temple", levels: 41 },
  ice: { name: "Ice Temple", levels: 41 },
  crystal: { name: "Crystal Temple", levels: 4 },
};

let onGameStart = null;
let userProgress = {};

export function setGameStartCallback(fn) { onGameStart = fn; }

export async function loadUserProgress() {
  const token = localStorage.getItem("fwg_token");
  if (!token) return;
  try {
    const res = await fetch(`${window.__API_BASE__ || "http://localhost:3000"}/api/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      userProgress = await res.json();
      updateTempleCards();
    }
  } catch(e) {}
}

function updateTempleCards() {
  document.querySelectorAll(".temple-card").forEach(card => {
    const temple = card.dataset.temple;
    const completed = (userProgress[temple] || []).filter(p => p.completed).length;
    const info = card.querySelector(".temple-meta span:last-child");
    const total = TEMPLES[temple]?.levels || 0;
    if (completed > 0 && info) {
      info.textContent = `${completed}/${total} completed`;
    }
  });
}

export function saveProgress(temple, level, score, timeMs) {
  if (!userProgress[temple]) userProgress[temple] = [];
  const existing = userProgress[temple].find(p => p.level === level);
  if (existing) {
    existing.completed = true;
    existing.score = Math.max(existing.score, score);
  } else {
    userProgress[temple].push({ level, score, timeMs, completed: true });
  }
  updateTempleCards();

  // Sync to server
  const token = localStorage.getItem("fwg_token");
  if (token) {
    fetch(`${window.__API_BASE__ || "http://localhost:3000"}/api/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ temple, level, score, timeMs }),
    }).catch(() => {});
  }
}

export function initLanding() {
  document.querySelectorAll(".temple-card").forEach(card => {
    card.addEventListener("click", () => {
      const temple = card.dataset.temple;
      document.getElementById("screen-select").style.display = "none";
      document.getElementById("screen-game").style.display = "flex";
      document.getElementById("game-title").textContent =
        `${TEMPLES[temple].name} — Arrow Keys: Fireboy | WASD: Watergirl`;
      onGameStart?.(temple);
    });
  });
  document.getElementById("btn-back-menu").addEventListener("click", backToMenu);
  document.getElementById("screen-levels").style.display = "none";

  // Load saved progress
  loadUserProgress();
}

export function backToMenu() {
  document.getElementById("screen-game").style.display = "none";
  document.getElementById("screen-select").style.display = "block";
  document.dispatchEvent(new CustomEvent("game:stop"));
}
