import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("API Routes", () => {
  const BASE = `http://localhost:${process.env.PORT || 3000}`;

  describe("GET /api/health", () => {
    it("returns ok status", async () => {
      const res = await fetch(`${BASE}/api/health`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, "ok");
      assert.ok(typeof data.timestamp === "number");
    });
  });

  describe("POST /api/auth/magic", () => {
    it("accepts valid email", async () => {
      const res = await fetch(`${BASE}/api/auth/magic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
      });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
    });

    it("rejects invalid email", async () => {
      const res = await fetch(`${BASE}/api/auth/magic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "not-an-email" }),
      });
      assert.equal(res.status, 400);
    });

    it("rejects empty body", async () => {
      const res = await fetch(`${BASE}/api/auth/magic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      assert.equal(res.status, 400);
    });

    it("does not leak whether email exists (always returns success)", async () => {
      const res = await fetch(`${BASE}/api/auth/magic`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "nonexistent@no-such-domain-12345.com" }),
      });
      const data = await res.json();
      assert.equal(data.success, true);
    });
  });

  describe("GET /api/leaderboard", () => {
    it("returns leaderboard data", async () => {
      const res = await fetch(`${BASE}/api/leaderboard`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.ok(Array.isArray(data.entries));
      assert.ok(typeof data.total === "number");
    });
  });

  describe("Protected endpoints require auth", () => {
    it("GET /api/auth/me returns 401 without token", async () => {
      const res = await fetch(`${BASE}/api/auth/me`);
      assert.equal(res.status, 401);
    });

    it("POST /api/stages/complete returns 401 without token", async () => {
      const res = await fetch(`${BASE}/api/stages/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stageId: 1, score: 100, timeMs: 5000 }),
      });
      assert.equal(res.status, 401);
    });
  });
});
