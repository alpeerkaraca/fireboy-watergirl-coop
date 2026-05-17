# Fireboy & Watergirl — Online Co-op

> The original Flash game, running in your browser. Play with a friend anywhere in the world.

Two players. Four temples. One goal — reach the exit together. Fireboy walks through fire, dies in water. Watergirl walks through water, dies in fire. Both die in green goo. Classic.

## Quick Start

```bash
cd server
cp .env.example .env
npm install
npx prisma generate --schema=prisma/schema.prisma
npx prisma db push --schema=prisma/schema.prisma
npm run dev
```

Open **`http://localhost:3000`**. Click a temple. Play.

## Features

- **Four original temples** — Forest (32 levels), Light (41), Ice (41), Crystal (4)
- **Online co-op** — Host streams game via WebRTC, guest controls Watergirl via WebSocket
- **Zero desync** — Single authoritative game instance, no input mirroring
- **Magic link auth** — No passwords. Enter email → click link → play.
- **Persistent progress** — Completed levels saved per user
- **Leaderboards** — Temple-filtered rankings
- **Original Armor Games URLs intercepted** — Score submissions route to your API

## Architecture

```
Browser (Player 1 — Host)          Browser (Player 2 — Guest)
┌────────────────────────┐         ┌──────────────────────┐
│ Custom Ruffle WASM     │         │ <video> WebRTC stream│
│ Original SWF running   │         │ WASD → WebSocket     │
│ Arrow keys → Fireboy   │         │                      │
│ canvas.captureStream ──┼─WebRTC─→│ watch & play         │
│ inject WASD ←──────────┼─WebSock─┼──sendKeyState()      │
└────────────────────────┘         └──────────────────────┘
                 │                           │
                 └─────── Express :3000 ──────┘
                          Socket.IO + REST + gRPC
                          Prisma + PostgreSQL/Valkey
```

## Stack

| Layer | Technology |
|-------|-----------|
| Game runtime | Custom Ruffle (Rust → WASM) with keyboard injection API |
| Frontend | Vanilla JS, WebRTC, WebSocket |
| Backend | Express + Socket.IO + gRPC |
| Database | PostgreSQL 17 (dev: SQLite) |
| Cache | Valkey 8 |
| Auth | Magic link → JWT (7-day expiry) |
| Reverse proxy | Nginx with TLS, rate limiting, caching |
| Containers | Rootless Podman, Alpine images |

## Project Layout

```
fireboy-coop/
├── index.html              Landing page — temple selection, game launcher
├── README.md               You are here
├── LICENSE                 MIT
├── story.md                The full journey (how it was built)
├── report.md               Technical decision log (all 15 phases)
├── CLAUDE.md               Developer guide
├── container-compose.yml   Podman compose for PostgreSQL + Valkey
├── fireboy-coop.alpeerkaraca.me.conf  Nginx config
├── scripts/
│   ├── game.js             Main orchestrator
│   ├── landing.js          Temple selection + progress
│   ├── multiplayer.js      Socket.IO + WebRTC peer connection
│   ├── ui-auth.js          Magic link login modal
│   ├── lobby.js            Room creation/joining
│   └── leaderboard-ui.js   Leaderboard panel
├── ruffle-build/           Custom Ruffle WASM + JS bindings
├── ruffle/                 Ruffle source (patched web/src/lib.rs)
├── assets/temple/          Original SWF files + sprites + sounds
├── data/levels/            Extracted level data (124 levels, JSON)
├── server/
│   ├── src/
│   │   ├── index.js        Express + static serving
│   │   ├── routes/         auth, leaderboard, stages, progress, agi-proxy, config
│   │   ├── websocket/      Socket.IO room management + signaling
│   │   ├── grpc/           gRPC score/leaderboard service
│   │   └── services/       auth, db, email, leaderboard, progress
│   ├── proto/game.proto    Protobuf definitions
│   ├── prisma/schema.prisma Database schema
│   └── test/               Test suites
└── tools/
    ├── extract-levels.js   Level data parser from decompiled AS
    └── pack-assets.js      Asset extraction pipeline
```

## Online Multiplayer

1. **Login** — both players authenticate with magic link
2. **Host** creates a room (4-character code)
3. **Guest** joins with the code
4. Both click the same temple
5. Host plays normally (Arrow keys = Fireboy), game streams to guest via WebRTC
6. Guest watches the stream, presses **W A D** to control Watergirl
7. Keys travel via WebSocket → host injects them into Ruffle → Watergirl moves

## Running in Production

```bash
# 1. Start containers
podman run -d --name fw-postgres --restart=unless-stopped \
  -e POSTGRES_USER=fwuser -e POSTGRES_PASSWORD=<password> \
  -e POSTGRES_DB=fireboycoop -p 127.0.0.1:54322:5432 \
  -v fw-postgres-data:/var/lib/postgresql/data \
  docker.io/library/postgres:17-alpine

podman run -d --name fw-valkey --restart=unless-stopped \
  -p 127.0.0.1:54323:6379 -v fw-valkey-data:/data \
  docker.io/valkey/valkey:8-alpine valkey-server --requirepass <password> --appendonly yes

# 2. Set production env vars
# DATABASE_URL=postgresql://fwuser:<password>@127.0.0.1:54322/fireboycoop
# JWT_SECRET=<64-char-hex>
# CORS_ORIGIN=https://fireboy-coop.alpeerkaraca.me
# NODE_ENV=production

# 3. Deploy Nginx config
# Copy fireboy-coop.alpeerkaraca.me.conf to /etc/nginx/sites-enabled/

# 4. Start
cd server && npm start
```

## Controls

| Player | Keys | Character |
|--------|------|-----------|
| Player 1 (Host) | Arrow keys | Fireboy |
| Player 2 (Guest) | W, A, D | Watergirl |

## Development

```bash
cd server
npm run dev           # Auto-restart on file changes
npm test              # Unit + integration tests
npm run test:coverage # With coverage
npm run security:audit # 21 OWASP checks
npm run perf:audit    # Performance benchmarks
```

## How It Was Built

- **[story.md](story.md)** — Narrative of the entire journey, from finding the decompiled source to production deployment. Written as a story.
- **[report.md](report.md)** — Technical decision log across all 15 phases. Every approach tried, every bug fixed, every architecture decision documented.
- **[CLAUDE.md](CLAUDE.md)** — Developer reference with architecture, anti-patterns, and conventions.

## License

MIT — see [LICENSE](LICENSE).

The original Fireboy & Watergirl games are the intellectual property of Oslo Albet. This project is an unofficial emulation layer and networking extension. The SWF files were extracted from publicly available game files using standard Flash decompilation tools.
