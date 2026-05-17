import prisma from "./db.js";

export async function getProgress(userId) {
  const entries = await prisma.userProgress.findMany({ where: { userId } });
  const result = {};
  for (const e of entries) {
    if (!result[e.temple]) result[e.temple] = [];
    result[e.temple].push({ level: e.level, score: e.score, timeMs: e.timeMs, completed: e.completed });
  }
  return result;
}

export async function saveProgress(userId, temple, level, score, timeMs) {
  return prisma.userProgress.upsert({
    where: { userId_temple_level: { userId, temple, level } },
    update: { score, timeMs: Math.min(timeMs, timeMs), completed: true },
    create: { userId, temple, level, score, timeMs, completed: true },
  });
}
