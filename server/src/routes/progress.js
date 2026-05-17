import { Router } from "express";
import { authMiddleware as authenticate } from "../services/auth.js";
import { getProgress, saveProgress } from "../services/progress.js";

export const progressRouter = Router();

progressRouter.get("/", authenticate, async (req, res) => {
  try {
    const data = await getProgress(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

progressRouter.post("/", authenticate, async (req, res) => {
  try {
    const { temple, level, score, timeMs } = req.body;
    if (!temple || !level) return res.status(400).json({ error: "temple and level required" });
    await saveProgress(req.user.id, temple, level, score || 0, timeMs || 0);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
