import crypto from "crypto";
import { Router } from "express";

const router = Router();

const TURN_SECRET = process.env.TURN_SECRET || "dev-turn-secret-change-in-production";
const TURN_URL = process.env.TURN_URL || "turn:45.151.3.26:3478";
const TURN_TTL = 86400; // 24 hours per credential

function generateTurnCreds() {
  const expiry = Math.floor(Date.now() / 1000) + TURN_TTL;
  const username = `${expiry}:fw-turn`;
  const password = crypto
    .createHmac("sha1", TURN_SECRET)
    .update(username)
    .digest("base64");
  return { username, credential: password };
}

router.get("/ice-servers", (_req, res) => {
  const creds = generateTurnCreds();
  const iceServers = [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
  ];

  if (process.env.TURN_URL) {
    iceServers.push({
      urls: TURN_URL,
      ...generateTurnCreds(),
    });
  }

  res.json({ iceServers });
});

export { router as configRouter };
