import crypto from "crypto";
import jwt from "jsonwebtoken";
import prisma from "./db.js";
import { sendMagicLink } from "./email.js";

const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === "production"
  ? (() => { throw new Error("JWT_SECRET must be set in production"); })()
  : "dev-secret-do-not-use-in-production");
const TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
const JWT_EXPIRY = "7d";

export function generateMagicToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function generateJwt(user) {
  return jwt.sign(
    { sub: user.id, username: user.username, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

export function verifyJwt(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export async function requestMagicLink(email) {
  const normalized = email.toLowerCase().trim();
  const token = generateMagicToken();

  await prisma.magicToken.create({
    data: {
      token,
      email: normalized,
      expiresAt: new Date(Date.now() + TOKEN_EXPIRY_MS),
    },
  });

  await sendMagicLink(normalized, token);
  return token;
}

export async function verifyMagicToken(token) {
  const record = await prisma.magicToken.findUnique({ where: { token } });

  if (!record) return null;
  if (record.used) return null;
  if (new Date() > record.expiresAt) return null;

  let user = await prisma.user.findUnique({ where: { email: record.email } });

  if (!user) {
    const username = record.email.split("@")[0] + "_" + crypto.randomBytes(3).toString("hex");
    try {
      user = await prisma.user.create({
        data: { username, email: record.email },
      });
    } catch (e) {
      if (e.code === "P2002") {
        user = await prisma.user.findUnique({ where: { email: record.email } });
      } else {
        throw e;
      }
    }
  }

  await prisma.magicToken.update({
    where: { id: record.id },
    data: { used: true, userId: user.id },
  });

  // Invalidate all other tokens for this email
  await prisma.magicToken.updateMany({
    where: { email: record.email, used: false },
    data: { used: true },
  });

  const jwtToken = generateJwt(user);
  return { user, jwtToken };
}

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }

  const payload = verifyJwt(header.slice(7));
  if (!payload) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = payload;
  next();
}
