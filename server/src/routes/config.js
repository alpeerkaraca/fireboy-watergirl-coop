import { Router } from "express";

const router = Router();

// In production, these should come from environment variables
// For example: TURN_URL, TURN_USERNAME, TURN_PASSWORD
const iceServers = [
  { urls: "stun:stun.l.google.com:19302" },
  { urls: "stun:stun1.l.google.com:19302" },
];

if (process.env.TURN_URL) {
  iceServers.push({
    urls: process.env.TURN_URL,
    username: process.env.TURN_USERNAME,
    credential: process.env.TURN_PASSWORD,
  });
}

router.get("/ice-servers", (req, res) => {
  res.json({ iceServers });
});

export { router as configRouter };
