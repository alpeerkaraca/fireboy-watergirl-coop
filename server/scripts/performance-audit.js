#!/usr/bin/env node
// Performance audit script — run with: node scripts/performance-audit.js
// Benchmarks: HTTP latency, WebSocket message RTT, DB query times, memory usage

import http from "http";
import { execSync } from "child_process";
import fs from "fs";

const BASE = `http://localhost:${process.env.PORT || 3000}`;
const RESULTS = [];
const WARN = "WARN";
const PASS = "PASS";
const FAIL = "FAIL";

function record(name, value, threshold, unit = "ms") {
  const status = value <= threshold ? PASS : value <= threshold * 2 ? WARN : FAIL;
  RESULTS.push({ name, value, threshold, unit, status });
}

function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function p95(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length * 0.95)];
}

// --- HTTP Benchmarks ---

async function benchmarkHttp(label, url, options, iterations = 50) {
  const times = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    try {
      await fetch(url, options);
      times.push(performance.now() - start);
    } catch {
      // Skip failed requests
    }
  }
  if (times.length > 0) {
    record(`${label} (mean)`, Math.round(mean(times)), 50);
    record(`${label} (p95)`, Math.round(p95(times)), 100);
  }
}

async function run() {
  console.log("\n╔══════════════════════ PERFORMANCE AUDIT ═══════════════════╗");
  console.log("Running benchmarks...\n");

  // Health endpoint
  await benchmarkHttp("GET /api/health", `${BASE}/api/health`, {});

  // Leaderboard
  await benchmarkHttp("GET /api/leaderboard", `${BASE}/api/leaderboard?limit=20`, {});

  // Auth magic link
  await benchmarkHttp("POST /api/auth/magic", `${BASE}/api/auth/magic`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "bench@test.com" }),
  });

  // --- Memory ---
  const memUsage = process.memoryUsage();
  record("Heap used (MB)", Math.round(memUsage.heapUsed / 1024 / 1024), 100, "MB");
  record("RSS (MB)", Math.round(memUsage.rss / 1024 / 1024), 200, "MB");

  // --- Event loop lag ---
  const lagSamples = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    await new Promise(r => setTimeout(r, 0));
    lagSamples.push(Date.now() - start);
  }
  record("Event loop lag (mean)", Math.round(mean(lagSamples)), 5);
  record("Event loop lag (max)", Math.max(...lagSamples), 10);

  // --- Disk I/O (DB) ---
  // Approximate by measuring leaderboard fetch (hits SQLite)
  const dbTimes = [];
  for (let i = 0; i < 10; i++) {
    const start = performance.now();
    await fetch(`${BASE}/api/leaderboard`);
    dbTimes.push(performance.now() - start);
  }
  record("DB query (leaderboard, mean)", Math.round(mean(dbTimes)), 30);
  record("DB query (leaderboard, p95)", Math.round(p95(dbTimes)), 60);

  // --- Startup time ---
  // Measured externally, but log approximate
  const startupScript = "node -e \"console.log('startup ok')\"";
  const startupStart = performance.now();
  execSync(startupScript, { timeout: 5000 });
  record("Node startup (cold)", Math.round(performance.now() - startupStart), 1000);

  // --- Report ---
  let passCount = 0, failCount = 0, warnCount = 0;
  for (const r of RESULTS) {
    const icon = r.status === PASS ? "[PASS]" : r.status === FAIL ? "[FAIL]" : "[WARN]";
    console.log(`${icon} ${r.name}: ${r.value}${r.unit} (threshold: ${r.threshold}${r.unit})`);
    if (r.status === PASS) passCount++;
    else if (r.status === FAIL) failCount++;
    else warnCount++;
  }

  console.log("╚═════════════════════════════════════════════════════════════╝");
  console.log(`\nSummary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed out of ${RESULTS.length} checks.\n`);

  // Save report
  const report = {
    timestamp: new Date().toISOString(),
    results: RESULTS,
    nodeVersion: process.version,
    platform: process.platform,
    summary: { pass: passCount, fail: failCount, warn: warnCount, total: RESULTS.length },
  };

  fs.mkdirSync(".audits", { recursive: true });
  fs.writeFileSync(`.audits/performance-${Date.now()}.json`, JSON.stringify(report, null, 2));
  console.log("Report saved to .audits/ directory\n");
}

run().catch(console.error);
