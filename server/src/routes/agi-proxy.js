// AGI Proxy — intercepts Armor Games API calls from the SWF
// Routes them to our leaderboard service instead
import { Router } from "express";

export const agiProxyRouter = Router();

// Catch-all for any AGI/Armor Games URL that gets routed here
agiProxyRouter.all("/*", async (req, res) => {
  const fullPath = req.path;
  const query = req.query;

  console.log(`[AGI Proxy] ${req.method} ${fullPath}`, query);

  // "More Games" button → redirect to our game selection
  if (fullPath.includes("moregames") || fullPath.includes("more-games")) {
    return res.json({ success: true, message: "More games at /" });
  }

  // "View Highscores" → return leaderboard data
  if (fullPath.includes("highscore") || fullPath.includes("hiscore") || fullPath.includes("leaderboard")) {
    return res.json({
      success: true,
      scores: [],
      message: "Highscores powered by Fireboy Co-op",
    });
  }

  // Score submission (AMF POST or GET)
  // The SWF sends gameKey, score, username, etc.
  const gameKey = query.gamekey || query.gameKey || req.body?.gamekey || req.body?.gameKey || "forest-temple";
  const score = parseInt(query.score || req.body?.score || "0");
  const username = query.username || req.body?.username || "Player";

  // Map gameKey to temple
  const templeMap = {
    "forest-temple": "forest",
    "light-temple": "light",
    "ice-temple": "ice",
    "crystal-temple": "crystal",
  };
  const temple = templeMap[gameKey] || "forest";

  if (score > 0) {
    console.log(`[AGI Proxy] Score submitted: ${username} - ${score} on ${temple}`);
    // We could save this to our leaderboard, but the AGI format doesn't have JWT auth
    // For now, acknowledge receipt
  }

  // Always return success (prevents error popups in the game)
  res.json({
    success: true,
    submitted: score > 0,
    score,
    temple,
  });
});
