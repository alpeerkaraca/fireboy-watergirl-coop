import { Router } from "express";
import { requestMagicLink, verifyMagicToken, authMiddleware } from "../services/auth.js";
import { z } from "zod";

export const authRouter = Router();

const emailSchema = z.object({
  email: z.string().email().max(254).transform(e => e.toLowerCase().trim()),
});

authRouter.post("/magic", async (req, res) => {
  const parsed = emailSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    await requestMagicLink(parsed.data.email);
    // Always return success to prevent email enumeration
    res.json({ success: true, message: "If the email exists, a magic link was sent" });
  } catch (err) {
    console.error("Magic link error:", err);
    res.json({ success: true, message: "If the email exists, a magic link was sent" });
  }
});

authRouter.get("/verify", async (req, res) => {
  const token = req.query.token;
  if (!token || typeof token !== "string" || token.length > 128) {
    return res.status(400).json({ error: "Invalid token" });
  }

  try {
    const result = await verifyMagicToken(token);
    if (!result) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    res.json({
      token: result.jwtToken,
      user: { id: result.user.id, username: result.user.username, email: result.user.email },
    });
  } catch (err) {
    console.error("Verify error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

authRouter.get("/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});
