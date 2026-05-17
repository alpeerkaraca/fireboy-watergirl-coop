// Leaderboard UI — fetches and renders with temple filter support
import { multiplayer } from "./multiplayer.js";

export class LeaderboardUI {
  constructor() {
    this.modal = document.getElementById("leaderboard-modal");
    this.entriesEl = document.getElementById("lb-entries");
    this.templeFilter = "";
  }

  setTempleFilter(temple) {
    this.templeFilter = temple;
  }

  async show() {
    if (!this.modal) return;
    this.modal.style.display = "block";
    this.entriesEl.innerHTML = '<p style="color:#aaa;text-align:center;padding:20px">Loading...</p>';

    try {
      const data = await multiplayer.getLeaderboard(50);
      if (!data.entries || !data.entries.length) {
        this.entriesEl.innerHTML = '<p style="color:#aaa;text-align:center;padding:20px">No scores yet — be the first!</p>';
        return;
      }

      this.entriesEl.innerHTML = data.entries
        .map((e, i) => `
          <div class="lb-row">
            <span class="lb-rank">#${i + 1}</span>
            <span class="lb-name">${this._esc(e.username)}</span>
            <span class="lb-score">${(e.totalScore || 0).toLocaleString()}</span>
            <span class="lb-stages">${e.stagesCompleted || 0}★</span>
          </div>`)
        .join("");
    } catch {
      this.entriesEl.innerHTML = '<p style="color:#ff4444;text-align:center;padding:20px">Failed to load leaderboard</p>';
    }
  }

  hide() {
    if (this.modal) this.modal.style.display = "none";
  }

  _esc(str) {
    const div = document.createElement("div");
    div.textContent = str || "Player";
    return div.innerHTML;
  }
}

export const leaderboardUI = new LeaderboardUI();
