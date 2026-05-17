import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { submitScore, getLeaderboard, getBestTime } from "../services/leaderboard.js";
import { requestMagicLink, verifyMagicToken } from "../services/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROTO_PATH = path.join(__dirname, "..", "..", "proto", "game.proto");

const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const gameProto = grpc.loadPackageDefinition(packageDef).game;

async function submitScoreHandler(call, callback) {
  try {
    const { user_id, stage_id, score, time_ms } = call.request;
    const result = await submitScore(user_id, "player", stage_id, score, time_ms);
    callback(null, { success: true, rank: result.rank, total_players: result.totalPlayers });
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

async function getLeaderboardHandler(call, callback) {
  try {
    const { limit, offset } = call.request;
    const data = await getLeaderboard(limit || 50, offset || 0);
    callback(null, { entries: data.entries, total: data.total });
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

async function getStageTimeHandler(call, callback) {
  try {
    const { user_id, stage_id } = call.request;
    const result = await getBestTime(user_id, stage_id);
    callback(null, {
      best_time_ms: result?.bestTimeMs || 0,
      rank: result?.rank || 0,
      total_players: result?.totalPlayers || 0,
    });
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

async function authenticateHandler(call, callback) {
  try {
    await requestMagicLink(call.request.email);
    callback(null, { success: true, message: "Magic link sent" });
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

async function verifyTokenHandler(call, callback) {
  try {
    const result = await verifyMagicToken(call.request.token);
    if (!result) {
      return callback({ code: grpc.status.UNAUTHENTICATED, message: "Invalid token" });
    }
    callback(null, {
      success: true,
      token_jwt: result.jwtToken,
      user_id: result.user.id,
      username: result.user.username,
    });
  } catch (err) {
    callback({ code: grpc.status.INTERNAL, message: err.message });
  }
}

export function startGrpcServer(port) {
  return new Promise((resolve, reject) => {
    const server = new grpc.Server();
    server.addService(gameProto.GameService.service, {
      SubmitScore: submitScoreHandler,
      GetLeaderboard: getLeaderboardHandler,
      GetStageTime: getStageTimeHandler,
      AuthenticateUser: authenticateHandler,
      VerifyToken: verifyTokenHandler,
    });

    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, boundPort) => {
        if (err) return reject(err);
        resolve(boundPort);
      }
    );
  });
}
