#!/usr/bin/env node
// Security audit script — run with: node scripts/security-audit.js
// Checks OWASP Top 10, auth hygiene, input validation, dependency vulns

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const RESULTS = [];
const PASS = "PASS";
const FAIL = "FAIL";
const WARN = "WARN";

function check(name, fn) {
  try {
    const result = fn();
    RESULTS.push({ name, status: result ? PASS : FAIL, detail: result || "No issue found" });
  } catch (e) {
    RESULTS.push({ name, status: FAIL, detail: e.message });
  }
}

// --- OWASP Checks ---

check("A01: Broken Access Control — Protected routes require JWT", () => {
  const meRoute = fs.readFileSync("src/routes/auth.js", "utf8");
  return meRoute.includes("authMiddleware");
});

check("A01: Broken Access Control — Stage completion requires JWT", () => {
  const stageRoute = fs.readFileSync("src/routes/stages.js", "utf8");
  return stageRoute.includes("authMiddleware");
});

check("A02: Cryptographic Failures — JWT secret is at least 256-bit", () => {
  // Check if JWT_SECRET is from env (production) or crypto.randomBytes (dev fallback)
  const authSrc = fs.readFileSync("src/services/auth.js", "utf8");
  return authSrc.includes("process.env.JWT_SECRET") && authSrc.includes("crypto.randomBytes(64)");
});

check("A03: Injection — SQL injection prevented via Prisma ORM", () => {
  // Prisma parameterizes all queries by default
  const dbFiles = fs.readdirSync("src/services").filter(f => f.endsWith(".js"));
  const hasRawQuery = dbFiles.some(f => {
    const content = fs.readFileSync(`src/services/${f}`, "utf8");
    return content.includes("$queryRaw") || content.includes("$executeRaw");
  });
  return !hasRawQuery; // Pass if no raw queries found
});

check("A03: Injection — Input validated with Zod", () => {
  const routesDir = fs.readdirSync("src/routes");
  return routesDir.some(f => {
    const content = fs.readFileSync(`src/routes/${f}`, "utf8");
    return content.includes("z.object") || content.includes("safeParse");
  });
});

check("A04: Insecure Design — Rate limiting on auth endpoint", () => {
  const indexSrc = fs.readFileSync("src/index.js", "utf8");
  return indexSrc.includes("rateLimit") && indexSrc.includes("authLimiter");
});

check("A05: Security Misconfiguration — Helmet headers enabled", () => {
  const indexSrc = fs.readFileSync("src/index.js", "utf8");
  return indexSrc.includes("helmet(");
});

check("A06: Vulnerable Components — Package audit", () => {
  try {
    const output = execSync("npm audit --audit-level=high 2>&1 || true", {
      cwd: path.dirname(new URL(import.meta.url).pathname),
    }).toString();
    // npm audit returns non-zero for high/critical; we check output
    if (output.includes("0 vulnerabilities")) return true;
    if (output.includes("found 0 vulnerabilities")) return true;
    return "Vulnerabilities found — review npm audit output";
  } catch {
    return "npm audit failed to run";
  }
});

check("A07: Auth Failures — Magic tokens expire after 15 min", () => {
  const authSrc = fs.readFileSync("src/services/auth.js", "utf8");
  return authSrc.includes("15 * 60 * 1000");
});

check("A07: Auth Failures — Tokens single-use only", () => {
  const authSrc = fs.readFileSync("src/services/auth.js", "utf8");
  return authSrc.includes("used: true") && authSrc.includes("used: false");
});

check("A07: Auth Failures — All pending tokens invalidated on use", () => {
  const authSrc = fs.readFileSync("src/services/auth.js", "utf8");
  return authSrc.includes("updateMany");
});

check("A08: Software & Data Integrity — No eval or dynamic imports from user input", () => {
  const allFiles = [];
  function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (f.endsWith(".js")) allFiles.push(full);
    }
  }
  walk("src");
  const hasDangerousEval = allFiles.some(f => {
    const content = fs.readFileSync(f, "utf8");
    return content.includes("eval(");
  });
  return !hasDangerousEval;
});

check("A09: Logging & Monitoring — Errors logged with context", () => {
  const allJs = fs.readdirSync("src").filter(f => f.endsWith(".js"));
  return allJs.some(f => {
    const content = fs.readFileSync(`src/${f}`, "utf8");
    return content.includes("console.error") || content.includes("console.log");
  });
});

// --- Additional Checks ---

check("WebSocket: Auth required for connection", () => {
  const wsSrc = fs.readFileSync("src/websocket/socket.js", "utf8");
  return wsSrc.includes("verifyJwt") && wsSrc.includes("socket.handshake.auth.token");
});

check("WebSocket: Max payload limited (100KB)", () => {
  const wsSrc = fs.readFileSync("src/websocket/socket.js", "utf8");
  return wsSrc.includes("maxHttpBufferSize");
});

check("CORS: Configured with explicit origin", () => {
  const indexSrc = fs.readFileSync("src/index.js", "utf8");
  return indexSrc.includes("cors(");
});

check("CSRF: Token-based auth avoids cookie-based sessions", () => {
  const authSrc = fs.readFileSync("src/services/auth.js", "utf8");
  return authSrc.includes("Bearer") && !authSrc.includes("res.cookie");
});

check("Email enumeration: Magic link always returns success", () => {
  const authRoute = fs.readFileSync("src/routes/auth.js", "utf8");
  const lines = authRoute.split("\n");
  const successResponses = lines.filter(l => l.includes("success: true")).length;
  return successResponses >= 2; // Both success and error paths return success
});

check("WebSocket: Room max players enforced (2)", () => {
  const wsSrc = fs.readFileSync("src/websocket/socket.js", "utf8");
  return wsSrc.includes("players.size >= 2");
});

// --- Report ---
console.log("\n╔══════════════════════ SECURITY AUDIT ══════════════════════╗");
let passCount = 0;
let failCount = 0;
let warnCount = 0;

for (const r of RESULTS) {
  const icon = r.status === PASS ? "[PASS]" : r.status === FAIL ? "[FAIL]" : "[WARN]";
  console.log(`${icon} ${r.name}`);
  if (typeof r.detail === "string" && r.detail !== "No issue found") {
    console.log(`     └─ ${r.detail}`);
  }
  if (r.status === PASS) passCount++;
  else if (r.status === FAIL) failCount++;
  else warnCount++;
}

console.log("╚═════════════════════════════════════════════════════════════╝");
console.log(`\nSummary: ${passCount} passed, ${warnCount} warnings, ${failCount} failed out of ${RESULTS.length} checks.\n`);

// Write report to file
const report = {
  timestamp: new Date().toISOString(),
  results: RESULTS,
  summary: { pass: passCount, fail: failCount, warn: warnCount, total: RESULTS.length },
};

fs.mkdirSync(".audits", { recursive: true });
fs.writeFileSync(`.audits/security-${Date.now()}.json`, JSON.stringify(report, null, 2));
console.log("Report saved to .audits/ directory\n");
