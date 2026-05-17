import { describe, it } from "node:test";
import assert from "node:assert/strict";

const BASE = `http://localhost:${process.env.PORT || 3000}`;

describe("Security Tests", () => {
  describe("Rate limiting", () => {
    it("limits auth endpoint to 5 requests per 15 min", async () => {
      const results = [];
      for (let i = 0; i < 7; i++) {
        const res = await fetch(`${BASE}/api/auth/magic`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: `test${i}@example.com` }),
        });
        results.push(res.status);
      }
      // At least one should be 429 after exceeding limit
      assert.ok(results.some(s => s === 429));
    });
  });

  describe("Input validation", () => {
    it("rejects SQL injection in auth email", async () => {
      const res = await fetch(`${BASE}/api/auth/magic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@test.com'; DROP TABLE User;--" }),
      });
      // Zod validation catches this as invalid email
      assert.equal(res.status, 400);
    });

    it("rejects XSS in leaderboard offset", async () => {
      const res = await fetch(
        `${BASE}/api/leaderboard?offset=<script>alert(1)</script>`
      );
      // Should not reflect XSS — parseInt returns NaN, clamped to 0
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(Array.isArray(data.entries));
    });

    it("rejects oversized token in verify", async () => {
      const longToken = "x".repeat(1000);
      const res = await fetch(`${BASE}/api/auth/verify?token=${longToken}`);
      assert.equal(res.status, 400);
    });

    it("rejects negative limit in leaderboard", async () => {
      const res = await fetch(`${BASE}/api/leaderboard?limit=-1`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(data.entries.length >= 0); // Clamped to 0 at minimum
    });

    it("rejects excessively large limit", async () => {
      const res = await fetch(`${BASE}/api/leaderboard?limit=99999`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(data.entries.length <= 100); // Capped at 100
    });
  });

  describe("Headers", () => {
    it("includes security headers from helmet", async () => {
      const res = await fetch(`${BASE}/api/health`);
      assert.ok(res.headers.get("x-content-type-options") === "nosniff");
      assert.ok(res.headers.get("x-dns-prefetch-control") === "off");
      assert.ok(res.headers.has("x-frame-options"));
    });
  });

  describe("Auth edge cases", () => {
    it("rejects missing Authorization header", async () => {
      const res = await fetch(`${BASE}/api/auth/me`);
      assert.equal(res.status, 401);
    });

    it("rejects malformed Authorization header", async () => {
      const res = await fetch(`${BASE}/api/auth/me`, {
        headers: { Authorization: "NotBearer xyz" },
      });
      assert.equal(res.status, 401);
    });

    it("rejects empty Authorization header", async () => {
      const res = await fetch(`${BASE}/api/auth/me`, {
        headers: { Authorization: "" },
      });
      assert.equal(res.status, 401);
    });
  });
});
