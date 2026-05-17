import { Server } from "socket.io";
import { verifyJwt } from "../services/auth.js";

const rooms = new Map(); // roomId -> { players: Map<socketId, {id, username}>, state: {...} }

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN || "*", methods: ["GET", "POST"] },
    pingInterval: 5000,
    pingTimeout: 10000,
    maxHttpBufferSize: 1e5, // 100KB
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication required"));
    }
    const payload = verifyJwt(token);
    if (!payload) {
      return next(new Error("Invalid token"));
    }
    socket.userId = payload.sub;
    socket.username = payload.username;
    next();
  });

  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.username} (${socket.id})`);

    socket.on("room:create", (data, ack) => {
      const roomId = data.roomId || generateRoomCode();
      rooms.set(roomId, {
        players: new Map(),
        stage: data.stage || 1,
        state: {},
      });
      joinRoom(io, socket, roomId);
      ack?.({ roomId });
    });

    socket.on("room:join", (data, ack) => {
      const room = rooms.get(data.roomId);
      if (!room) {
        return ack?.({ error: "Room not found" });
      }
      if (room.players.size >= 2) {
        return ack?.({ error: "Room full" });
      }
      joinRoom(io, socket, data.roomId);
      ack?.({ roomId: data.roomId, players: getRoomPlayers(room) });
    });

    socket.on("room:leave", () => {
      leaveCurrentRoom(io, socket);
    });

    socket.on("stream:start", (data) => {
      console.log(`[WS] stream:start from ${socket.id} in room ${data.roomId}`);
      socket.to(data.roomId).emit("stream:start-request");
    });

    socket.on("call:offer", (data) => {
      console.log(`[WS] call:offer from ${socket.id} in room ${data.roomId}`);
      socket.to(data.roomId).emit("call:offer", { playerId: socket.id, sdp: data.sdp });
    });

    socket.on("call:answer", (data) => {
      console.log(`[WS] call:answer from ${socket.id} in room ${data.roomId}`);
      socket.to(data.roomId).emit("call:answer", { playerId: socket.id, sdp: data.sdp });
    });

    socket.on("call:ice-candidate", (data) => {
      console.log(`[WS] call:ice-candidate from ${socket.id} in room ${data.roomId}`);
      socket.to(data.roomId).emit("call:ice-candidate", { playerId: socket.id, candidate: data.candidate });
    });

    socket.on("player:move", (data) => {
      socket.to(data.roomId).emit("player:moved", {
        playerId: socket.id,
        x: data.x,
        y: data.y,
        vx: data.vx,
        vy: data.vy,
      });
    });

    socket.on("player:action", (data) => {
      socket.to(data.roomId).emit("player:acted", {
        playerId: socket.id,
        action: data.action, // "jump", "coin", "hit", "door"
        payload: data.payload,
      });
    });

    socket.on("player:key", (data) => {
      socket.to(data.roomId).emit("player:key", {
        playerId: socket.id,
        key: data.key,
        pressed: data.pressed,
      });
    });

    // === WebRTC Signaling ===
    socket.on("call:offer", (data) => {
      socket.to(data.roomId).emit("call:offer", {
        playerId: socket.id,
        sdp: data.sdp,
      });
    });

    socket.on("call:answer", (data) => {
      socket.to(data.roomId).emit("call:answer", {
        playerId: socket.id,
        sdp: data.sdp,
      });
    });

    socket.on("call:ice-candidate", (data) => {
      socket.to(data.roomId).emit("call:ice-candidate", {
        playerId: socket.id,
        candidate: data.candidate,
      });
    });

    socket.on("call:hangup", (data) => {
      socket.to(data.roomId).emit("call:hangup", {
        playerId: socket.id,
      });
    });

    socket.on("stage:complete", (data) => {
      io.to(data.roomId).emit("stage:completed", {
        completedBy: socket.id,
        scores: data.scores,
        times: data.times,
      });
    });

    socket.on("disconnect", () => {
      leaveCurrentRoom(io, socket);
      console.log(`Player disconnected: ${socket.id}`);
    });
  });

  return io;
}

function joinRoom(io, socket, roomId) {
  socket.join(roomId);
  const room = rooms.get(roomId);
  if (room) {
    room.players.set(socket.id, {
      id: socket.id,
      username: socket.username,
      userId: socket.userId,
    });
    io.to(roomId).emit("room:update", {
      players: getRoomPlayers(room),
      roomId,
    });
  }
}

function leaveCurrentRoom(io, socket) {
  for (const [roomId, room] of rooms) {
    if (room.players.has(socket.id)) {
      room.players.delete(socket.id);
      socket.leave(roomId);
      if (room.players.size === 0) {
        rooms.delete(roomId);
      } else {
        io.to(roomId).emit("room:update", {
          players: getRoomPlayers(room),
          roomId,
        });
      }
      break;
    }
  }
}

function getRoomPlayers(room) {
  return Array.from(room.players.values());
}

function generateRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
