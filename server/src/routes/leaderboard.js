import { Router } from "express";
import { getLeaderboard } from "../services/leaderboard.js";

export const leaderboardRouter = Router();

leaderboardRouter.get("/", async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 50, 100);
  const offset = Math.max(parseInt(req.query.offset) || 0, 0);

  try {
    const data = await getLeaderboard(limit, offset);
    res.json(data);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});
