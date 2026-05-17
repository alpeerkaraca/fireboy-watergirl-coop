import { Router } from "express";
import { authMiddleware } from "../services/auth.js";
import { submitScore, getBestTime } from "../services/leaderboard.js";
import { z } from "zod";

export const stageRouter = Router();

const scoreSchema = z.object({
  stageId: z.number().int().min(1).max(999),
  score: z.number().int().min(0).max(999999),
  timeMs: z.number().int().min(0).max(3600000),
});

stageRouter.post("/complete", authMiddleware, async (req, res) => {
  const parsed = scoreSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid score data", details: parsed.error.issues });
  }

  try {
    const result = await submitScore(
      req.user.sub,
      req.user.username,
      parsed.data.stageId,
      parsed.data.score,
      parsed.data.timeMs
    );
    res.json(result);
  } catch (err) {
    console.error("Stage complete error:", err);
    res.status(500).json({ error: "Failed to save score" });
  }
});

stageRouter.get("/:stageId/best", authMiddleware, async (req, res) => {
  const stageId = parseInt(req.params.stageId);
  if (isNaN(stageId) || stageId < 1 || stageId > 999) {
    return res.status(400).json({ error: "Invalid stage ID" });
  }

  try {
    const result = await getBestTime(req.user.sub, stageId);
    if (!result) {
      return res.json({ bestTimeMs: null, rank: null, totalPlayers: 0 });
    }
    res.json(result);
  } catch (err) {
    console.error("Stage best error:", err);
    res.status(500).json({ error: "Failed to fetch best time" });
  }
});
