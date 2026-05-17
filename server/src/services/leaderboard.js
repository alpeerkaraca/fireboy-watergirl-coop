import prisma from "./db.js";

export async function submitScore(userId, username, stageId, score, timeMs) {
  await prisma.score.create({
    data: { userId, stageId, value: score },
  });

  await prisma.stageTime.create({
    data: { userId, stageId, timeMs },
  });

  // Upsert leaderboard entry
  const allScores = await prisma.score.findMany({ where: { userId } });
  const allTimes = await prisma.stageTime.findMany({ where: { userId } });
  const stages = new Set([...allScores.map(s => s.stageId), ...allTimes.map(t => t.stageId)]);

  const totalScore = allScores.reduce((sum, s) => sum + s.value, 0);
  const totalTimeMs = allTimes.reduce((sum, t) => sum + t.timeMs, 0);

  await prisma.leaderboardEntry.upsert({
    where: { id: userId },
    update: {
      username,
      totalScore,
      totalTimeMs,
      stagesCompleted: stages.size,
    },
    create: {
      id: userId,
      username,
      totalScore,
      totalTimeMs,
      stagesCompleted: stages.size,
    },
  });

  const betterScores = await prisma.leaderboardEntry.count({
    where: { totalScore: { gt: totalScore } },
  });

  return { rank: betterScores + 1, totalPlayers: await prisma.leaderboardEntry.count() };
}

export async function getLeaderboard(limit = 50, offset = 0) {
  const [entries, total] = await Promise.all([
    prisma.leaderboardEntry.findMany({
      orderBy: { totalScore: "desc" },
      take: Math.min(limit, 100),
      skip: offset,
    }),
    prisma.leaderboardEntry.count(),
  ]);

  return { entries, total };
}

export async function getBestTime(userId, stageId) {
  const best = await prisma.stageTime.findFirst({
    where: { userId, stageId },
    orderBy: { timeMs: "asc" },
  });
  if (!best) return null;

  const fasterCount = await prisma.stageTime.count({
    where: { stageId, timeMs: { lt: best.timeMs } },
  });
  const totalPlayers = await prisma.stageTime.groupBy({
    by: ["userId"],
    where: { stageId },
  });

  return {
    bestTimeMs: best.timeMs,
    rank: fasterCount + 1,
    totalPlayers: totalPlayers.length,
  };
}
