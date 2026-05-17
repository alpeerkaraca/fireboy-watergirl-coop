# Performance Audit Skill

Benchmark the backend for latency, throughput, and resource usage.

## Trigger
- User asks for "performance audit", "latency check", "benchmark"
- Before production deployment
- After adding new endpoints or database queries

## Steps
1. Ensure the server is running: `cd server && npm run dev`
2. Run the automated benchmark: `cd server && npm run perf:audit`
3. Review generated report in `server/.audits/`
4. For any FAIL results, identify the bottleneck:
   - HTTP > 100ms p95: Check route handlers, DB queries, middleware stack
   - Event loop lag > 10ms: Check for blocking operations (sync I/O, heavy compute)
   - Memory > threshold: Check for leaks, unbounded caches
5. Suggest specific optimizations

## Targets
- Health endpoint: p95 < 50ms
- Auth magic link: p95 < 100ms
- Leaderboard fetch: p95 < 100ms
- Event loop lag: mean < 5ms, max < 10ms
- Heap used: < 100MB baseline
- DB queries: p95 < 60ms

## Optimization strategies (in order of impact)
1. Add Redis cache for leaderboard (avoids DB hits)
2. Connection pooling for PostgreSQL in production
3. gRPC streaming for leaderboard updates (replaces polling)
4. CDN for static game assets
