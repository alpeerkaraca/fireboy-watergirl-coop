# The Making of Fireboy & Watergirl Online Co-op

## A Story of Dead Flash Games, Rust WASM, and Two Players Trying to Solve Puzzles Together

---

### Chapter 1: The Demo That Wasn't

It started with a GitHub search: "Fireboy and Watergirl open source." The result was `hadigghazi/FireBoy-and-WaterGirl` — a Phaser.js clone with three levels, some pixel art, and local co-op. Cute, but nowhere near the real thing. The real game had four temples, 128 levels, Box2D physics, pushers and levers and pulleys and winds, spinning diamonds that made sounds when you touched them, and a leaderboard that posted scores to Armor Games' long-dead API servers.

We cloned it anyway. Better to start somewhere than nowhere.

But the question kept nagging: where was the *real* source code?

---

### Chapter 2: The Square-Nine Treasure

Buried in a quiet GitHub repo — `square-nine/fireboy-and-watergirl-source` — sat 16,315 files. ActionScript extracted from the original SWF files using a decompiler. Four temples. Forest (32 levels), Light (41), Ice (41), Crystal (4). Every mechanism, every tile grid, every sound effect, every sprite frame.

This was it. The real game. Well, the decompiled corpse of it.

The files were incomprehensible at first — 95 `.as` files per temple, variable names lost to decompilation (`_loc6_`, `_loc7_`, `_loc8_`), Box2D physics calls in 39×29 tile grids embedded in thousand-line arrays. But the game logic was all there, frozen in time like a mosquito in amber.

We wrote a parser. `tools/extract-levels.js`. It read the decompiled ActionScript, found the level arrays, extracted the 39×29 tile grids, the start positions, the finish doors, and all 951 mechanisms. Regex after regex, bug after bug (the mechanism extraction had `))` where the source had `)` — that took an hour to find). But eventually: 124 level JSON files, each one a perfect snapshot of a single puzzle in the original game.

---

### Chapter 3: The Tile Map That Didn't Work

The first attempt at a game engine was Phaser.js. We built `RealGameLevel.js` — a scene that read the extracted JSON, parsed the tile grid, placed sprites, handled physics. It rendered. Technically. But it looked *wrong*.

The 39×29 grid wasn't a visual tilemap. It was a Box2D physics layout. The original game used Flash vector graphics — smooth, anti-aliased, with pre-rendered backgrounds and sprite animations. Our Phaser version rendered colored rectangles on a black background. Like playing the game through a spreadsheet.

We spent a day loading actual sprite PNGs from the decompiled source. GroundBox1 through GroundBox5. FireBox. WaterBox. BlueDiamond spinning frames. FireBoy and WaterGirl standing sprites. It looked better — but never like the original. The Flash renderer and the tile-based renderer were two different mediums, like translating a painting into LEGO bricks.

**Verdict:** Phaser tilemap approach — abandoned.

---

### Chapter 4: Ruffle, the Flash Emulator

Ruffle is a Flash emulator written in Rust, compiled to WebAssembly. It takes an SWF file and runs it in a browser — exact visuals, exact physics, exact everything. No modifications needed.

We copied the original SWFs from the decompiled source into `assets/temple/forest/game.swf`, pointed Ruffle at them, and...

It worked. The original game ran in the browser. The intro screen, the menu music, the level select with the spinning fly cursor. It was *exactly* the game you remember.

But the catch was immediate: this is a local co-op game. One keyboard, two players — Arrow keys for Fireboy, WASD for Watergirl. To make it online, we needed to give a second player on a different computer the ability to control Watergirl.

---

### Chapter 5: The Keyboard War

First attempt: synthetic DOM events. Dispatch a `KeyboardEvent` on the Ruffle canvas with `key: "d"`, `code: "KeyD"`. Ruffle would pick it up and pass it to the ActionScript `Keyboard.isDown()`.

It didn't work. `isTrusted: false`. The WASM module ignored synthetic events entirely.

Second attempt: modify the SWF itself. We downloaded JPEXS Free Flash Decompiler, exported 220 ActionScript files from the Forest Temple SWF, found the `keyPressed` function in `Game.as`, and tried to add an `ExternalInterface.call("getRemoteInput")` bridge. FFDec's experimental AS3 recompilation failed with a cryptic parser error. Dead end.

Third attempt: build our own Ruffle. Clone the Ruffle source, add `simulate_key_down` and `simulate_key_up` methods to `RufflePlayer` in Rust, compile to WASM, and load it in the browser. This required installing the Rust toolchain, `wasm-pack`, and the WASM target. The build took 15 minutes and produced a 14 MB WASM file.

It worked. `rufflePlayer.simulate_key_down("KeyD")` — and Watergirl moved right. No DOM events. No `isTrusted` checks. Direct injection into the player's input manager.

---

### Chapter 6: The Sound and the Fury

With keyboard injection working, the next problem was audio. The WASM module called `copyToAudioBufferInterleaved` to output mixed audio, but the implementation was a stub. First attempt: create a new `AudioBuffer` on every call. Result: glitchy, stuttering audio — hundreds of tiny buffer allocations per second.

Second attempt: accumulate samples into a ring buffer, flush in chunks. Better, but `.shift()` on arrays was slow and timing gaps caused clicks.

Third attempt: `ScriptProcessorNode` reading from a 65536-sample ring buffer. 2048 samples at a time, ~46ms latency, gapless playback. Underruns handled gracefully. The menu music played smooth and clean.

Then came the canvas scaling. Ruffle's WASM set its own canvas dimensions, overriding CSS. Solution: a `ResizeObserver` with `setProperty(..., "important")` and `setAttribute` on a 500ms interval. The canvas filled the screen, centered, maintaining 5:4 aspect ratio.

---

### Chapter 7: The Backend

While the frontend fought with Ruffle, we built the backend: Express + Socket.IO + gRPC + Prisma + Zod + Helmet. Magic link authentication (no passwords — email → token → JWT). Room management (create, join, leave, 4-character codes, max 2 players). Leaderboard persistence in SQLite. Security audits (21 OWASP checks, all passed). Performance benchmarks.

The `server/` directory grew from nothing to a complete backend in about four hours.

---

### Chapter 8: The Desync Problem

Here was the fundamental question: how do two players play a single-player game together online?

The original game runs in a single Flash instance. Both characters exist in one Box2D world. Two players on different computers need to share that world.

Six approaches evaluated:

1. **WebRTC Stream**: Host runs the game, streams video to guest. Guest sends keyboard input back. Single source of truth. Zero desync. Battle-tested (Parsec, GeForce Now).
2. **State Stream**: Host reads game positions, sends to guest who renders a simplified overlay.
3. **Input Mirroring**: Both run the SWF, mirror all inputs. Fragile — Box2D determinism breaks on different machines.
4. **Checkpoint Sync**: Serialize entire WASM state periodically. 100+ Mbps bandwidth. Impractical.
5. **Ruffle State Injection**: Custom API for state capture. For v2.
6. **Hybrid Phaser**: Host runs SWF, guest uses Phaser renderer.

**Decision:** Approach 1 — WebRTC Stream for MVP. Approach 5 for v2.

We ran this through the `gemini` CLI in an autonomous review loop. Round 1: rejected — the code implemented input mirroring but the report recommended WebRTC. Five directives issued. Round 2: all directives implemented, WebRTC peer connection added, guest shows `<video>` element instead of loading Ruffle. **ONAYLANDI**.

---

### Chapter 9: The Auth That Wasn't

A bug: the Login button on the header did nothing. The `auth:open` custom event was dispatched by `game.js` but `ui-auth.js` never listened for it. The auth modal only auto-opened if `multiplayer.isAuthenticated` was false at page load. If you clicked Login later? Nothing.

Fix: one line — `document.addEventListener("auth:open", () => showAuth())`.

Another bug: the Leaderboard modal wouldn't close. The close button existed in HTML but was invisible against the dark theme. Added a backdrop, a styled × button, and a click-to-close handler.

Another: emails needed to be unique. Added `P2002` error handling in the user creation flow. Added a `UserProgress` table for per-user level tracking. Synced progress between localStorage and server.

---

### Chapter 10: The Gemini Loop

We wired up an autonomous development loop: Claude writes code → Gemini reviews → Claude fixes → repeat until approved. Four loops completed:

1. **Multiplayer architecture**: rejected (code/plan mismatch) → fixed → approved
2. **WebRTC implementation**: approved with syntax fix
3. **Multi-tenant design**: approved with 5 directives for next phase
4. **Security & performance audit**: approved, Gemini independently implemented compression, unified serving, and ICE server config

Each loop produced a `claude_review_report.md`, a `gemini_feedback.txt`, and concrete code changes. The `report.md` grew to 550+ lines documenting every decision.

---

### Chapter 11: Containers and Production

The final lap: production infrastructure.

Rootless Podman containers on Alpine images. PostgreSQL 17 on port 54322, Valkey 8 on port 54323. Both bound to `127.0.0.1` only. Named volumes. Health checks. Password auth.

An Nginx config for `fireboy-coop.alpeerkaraca.me`: HTTP→HTTPS redirect, TLS 1.2/1.3, WebSocket upgrade, gRPC passthrough, rate limiting, 1-year cache for immutable assets, security headers.

Critical production fixes: JWT_SECRET crashes if missing instead of silently generating a random key. CORS crashes if CORS_ORIGIN isn't set in production. No more insecure fallbacks.

The Express server now serves everything — API, WebSocket, static files, with gzip compression and immutable caching headers. Open `http://localhost:3000` and the entire app is there.

---

### Chapter 12: What Was Built

Looking back from the end, here's what exists:

**The game**: All four original Fireboy & Watergirl titles, running natively in the browser via a custom Ruffle build. Arrow keys control Fireboy. WASD controls Watergirl. Two players on different computers can play together — one hosts, the other watches a WebRTC video stream and sends keyboard input via WebSocket. The game doesn't desync because there's only one instance.

**The backend**: Express + Socket.IO + gRPC + Prisma. Magic link auth (Gmail SMTP). Room management (4-char codes, max 2 players). Leaderboard persistence. User progress tracking. Armor Games API interceptor.

**The infrastructure**: Rootless Podman containers (PostgreSQL + Valkey). Nginx reverse proxy with SSL termination. Single-port serving with compression and caching.

**The tools**: Level data extractor from decompiled ActionScript. Asset pipeline from SWF symbol tables. Custom Ruffle with keyboard injection API. Autonomous Gemini review loop.

**The documentation**: 550-line `report.md` with every decision and phase. This `story.md` with the narrative. A `CLAUDE.md` for future developers. Security and performance audit reports.

---

### Chapter 13: The Signaling War

The video stream wouldn't render on the guest. We had the WebRTC signaling flowing, ICE candidates exchanged, `ontrack` firing on the guest — but the video element stayed black. `readyState: 0`. HAVE_NOTHING.

We tried everything. `canvas.captureStream(30)` from Ruffle's WebGL canvas — black frames. `getDisplayMedia` screen sharing — worked but forced the host to select a window every time. User rejected this. Synthetic keyboard events to control Watergirl — failed because of `isTrusted`. The FFDec AS3 modification — failed because the decompiled code wouldn't recompile.

The answer was a proxy canvas. A hidden 2D canvas captures each frame from the WebGL canvas using `drawImage()`, and `captureStream(30)` captures from the proxy. 2D canvases don't have the `preserveDrawingBuffer` problem. It worked.

But the stream still died. ICE state: `checking` → `disconnected`. Hours of debugging. Then we found it: the server had **two identical sets** of WebRTC signaling event handlers. Every `call:offer`, `call:answer`, `call:ice-candidate` was being emitted to the room **twice**. The first call set the `RTCPeerConnection` state to `stable`. The second call tried to set it again and threw `InvalidStateError`. The connection died.

One deleted code block. Four lines of duplicate `socket.on(...)`. The entire video pipeline started working.

### Chapter 14: The Cloud

With video streaming working, we deployed the full stack to a VDS in Turkey. Podman containers for PostgreSQL, Valkey, and Coturn. Nginx with TLS 1.3, Cloudflare with WebSocket support enabled. Gmail SMTP with PTR records for magic link emails.

The game runs at `https://fireboy-coop.alpeerkaraca.me`. Two players login, create a room, click Forest Temple, and play. The host runs the original Flash game through our custom Ruffle build. The guest watches a WebRTC video stream and controls Watergirl with W, A, D keys. The keyboard input travels through WebSocket, gets injected into Ruffle's input manager via our Rust patch, and Watergirl moves as if the guest were sitting at the host's keyboard.

Zero desync. One game instance. Two players. The dream works.

### Epilogue: What Remains

The game works. Two players on different machines can open the same temple, one hosts and the other watches and plays, and Watergirl jumps when the guest presses W. The music plays without glitching. The canvas scales to fill the screen. The leaderboard accepts scores. Progress saves between sessions.

But there's always more:

- A TURN server for players behind restrictive NAT
- The AGI proxy decoding actual AMF protocol instead of just acknowledging requests
- Crystal Temple level extraction (it uses a different JSON format)
- Multi-tenant team support (the schema is ready, just needs the invite flow)
- Mobile touch controls for the guest viewer
- A proper CDN for the 14 MB WASM file

The foundation is solid. The game is playable. The architecture is documented. The review loop is established.

From a Phaser.js demo with three levels to a production-ready online multiplayer version of the original Flash game — in about 48 hours of focused engineering.

---

*Written on May 17, 2026, in the afterglow of seeing Watergirl move in response to a keystroke from another browser window.*
