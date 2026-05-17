# Fireboy & Watergirl Co-op — Project Guide

## Overview
Online multiplayer remake of Fireboy & Watergirl. Two players collaborate through puzzle-platformer temple levels. Built from **decompiled original ActionScript source** (square-nine repo) — 124 levels across 4 temples (Forest 32, Light 41, Ice 41, Crystal 4), 951 mechanisms, real assets extracted via pipeline.

## Architecture

```
fireboy-coop/
├── index.html              # Landing page — temple selection, level grid, game launcher
├── scripts/
│   ├── game.js             # Main orchestrator (landing + Phaser + auth + lobby)
│   ├── landing.js          # Temple selection, level grid, progress persistence
│   ├── engine/
│   │   ├── GameData.js     # Temple metadata, tile constants, level loader
│   │   ├── RealGameLevel.js # Phaser scene — temple-aware, all 10 mechanism types
│   │   └── RealGame.js     # Scene factory — creates temple/level Phaser configs
│   ├── multiplayer.js      # Socket.IO + REST client singleton
│   ├── ui-auth.js          # Magic link auth modal
│   ├── lobby.js            # Room creation/joining UI
│   └── leaderboard-ui.js   # Leaderboard panel with temple filtering
├── assets/
│   ├── temple/             # Per-temple assets (sprites, sounds, background)
│   │   ├── forest/         # 116 sprites, 27 sounds
│   │   ├── light/          # 130 sprites, 30 sounds
│   │   ├── ice/            # 157 sprites, 38 sounds
│   │   └── crystal/        # 165 sprites, 46 sounds
│   ├── arcade.xml          # Bitmap font definition
│   └── images/arcade.png   # Bitmap font texture
├── server/                 # Node.js backend (unchanged)
│   ├── src/                # Express + WebSocket + gRPC + services
│   ├── proto/              # Protobuf definitions
│   ├── prisma/             # Database schema
│   ├── test/               # Test suite
│   └── scripts/            # Security & performance audit scripts
├── tools/
│   ├── extract-levels.js   # Level data extractor from decompiled AS
│   └── pack-assets.js      # Asset pipeline from decompiled source
└── data/levels/            # 124 extracted level JSONs (29x39 tiles, mechanisms)
```

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Game engine | Phaser.js 3.80 | 2D physics, tilemaps, scenes |
| Transport | Socket.IO (WebSocket-first) | Minimal latency real-time multiplayer (< 25ms) |
| Fallback | gRPC | Low-latency binary protocol for leaderboard/auth |
| REST | Express | Auth endpoints, leaderboard queries |
| Auth | Magic link (JWT) | No passwords — email-based token auth |
| DB | SQLite (dev) / PostgreSQL (prod) via Prisma | Type-safe, migratable |
| Validation | Zod | Input validation on all API boundaries |
| Security | Helmet, rate-limit, JWT | OWASP Top 10 mitigation |
| Runtime | Node.js 20+ | ESM modules throughout |

## Screens

1. **Temple Selection** — 4 cards (Forest/Light/Ice/Crystal) with preview
2. **Level Selection** — Numbered grid, locked/unlocked/completed states
3. **Game** — Phaser canvas with temple-themed tiles, all mechanics
4. **Modals** — Auth (magic link), Leaderboard (with temple filter), Lobby (room codes)

## Key Design Decisions

### Why WebSockets over WebRTC?
- **Simplicity**: Only 2 players per room, no need for peer-to-peer NAT traversal.
- **Authoritative relay**: Server validates game state transitions, preventing cheating in leaderboards.
- **Socket.IO**: Built-in room management, auto-reconnect, fallback transport.

### Why Magic Link Auth?
- No passwords to store/hash/leak — reduces attack surface.
- Simple UX: enter email → click link → play.
- Single-use tokens expire in 15 minutes.

### Why gRPC + REST?
- gRPC for performance-critical paths (score submission, leaderboard polling).
- REST for Magic Link callback (browser-native GET with query params).

### Latency Targets
- WebSocket message relay: < 25ms within same region.
- HTTP endpoints: p95 < 100ms.
- gRPC calls: p95 < 50ms.

## Running Locally

```bash
# Backend
cd server
cp .env.example .env
npm install
npx prisma db push
npm run dev     # Starts HTTP+WS on :3000, gRPC on :50051

# Frontend
npx serve .     # Or any static file server on :5000
```

## Testing

```bash
# Unit + integration tests
npm test

# With coverage
npm run test:coverage

# Security audit (requires server running)
npm run security:audit

# Performance audit (requires server running)
npm run perf:audit
```

## Security Notes

- **Never** use `prisma.$queryRaw` with user input — always use parameterized queries via Prisma Client.
- **JWT secrets**: Must be set via `JWT_SECRET` env var in production (≥256-bit).
- **Rate limiting**: Auth endpoints capped at 5 req/15min per IP to prevent abuse.
- **Email enumeration**: Magic link endpoint always returns `{ success: true }` regardless of whether email exists.
- **WebSocket auth**: JWT required on connect; rooms max 2 players.
- **Payload limits**: Socket.IO max 100KB messages; Express JSON body 100KB default.
- **Magic tokens**: Single-use, expire in 15 min, all pending tokens invalidated on successful auth.

## Anti-patterns to Avoid

- Don't add raw SQL queries — always use Prisma Client.
- Don't increase auth rate limits without justification.
- Don't store user data in localStorage beyond JWT + user info.
- Don't remove Zod validation from API routes.
- Don't use `eval()` or `new Function()` anywhere.

## File Naming Conventions
- Scenes: PascalCase (`GameLevel.js`, `GameOver.js`)
- Services: camelCase descriptive (`auth.js`, `leaderboard.js`)
- Routes: lowercase plural (`stages.js`, not `stage.js`)
- Proto: snake_case `.proto` files
