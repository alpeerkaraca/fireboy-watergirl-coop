import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { initSocket } from "./websocket/socket.js";
import { startGrpcServer } from "./grpc/server.js";
import { authRouter } from "./routes/auth.js";
import { leaderboardRouter } from "./routes/leaderboard.js";
import { stageRouter } from "./routes/stages.js";
import { agiProxyRouter } from "./routes/agi-proxy.js";
import { progressRouter } from "./routes/progress.js";
import { configRouter } from "./routes/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, "../../");

const app = express();
const httpServer = createServer(app);

app.use(compression());
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
const corsOrigin = process.env.CORS_ORIGIN || (process.env.NODE_ENV === "production" ? false : "*");
if (!corsOrigin && process.env.NODE_ENV === "production") {
  console.error("CORS_ORIGIN must be set in production");
  process.exit(1);
}
app.use(cors({ origin: corsOrigin || "*", methods: ["GET", "POST"] }));
app.use(express.json());

// Serve static files with long-term caching for assets
app.use(express.static(projectRoot, {
  maxAge: "1d",
  setHeaders: (res, path) => {
    if (path.endsWith(".wasm") || path.endsWith(".swf")) {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
  }
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many auth attempts" },
});
app.use("/api/auth/magic", authLimiter);

app.use("/api/auth", authRouter);
app.use("/api/leaderboard", leaderboardRouter);
app.use("/api/stages", stageRouter);
app.use("/api/agi-proxy", agiProxyRouter);
app.use("/api/progress", progressRouter);
app.use("/api/config", configRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

const io = initSocket(httpServer);
app.set("io", io);

const PORT = process.env.PORT || 3000;
const GRPC_PORT = process.env.GRPC_PORT || 50051;

httpServer.listen(PORT, () => {
  console.log(`HTTP+WS server on :${PORT}`);
});

startGrpcServer(GRPC_PORT).then(() => {
  console.log(`gRPC server on :${GRPC_PORT}`);
});
