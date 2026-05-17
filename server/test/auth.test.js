import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import { generateMagicToken, generateJwt, verifyJwt } from "../src/services/auth.js";

describe("Auth Service", () => {
  describe("generateMagicToken", () => {
    it("generates a 64-character hex token", () => {
      const token = generateMagicToken();
      assert.equal(token.length, 64);
      assert.ok(/^[0-9a-f]+$/.test(token));
    });

    it("generates unique tokens", () => {
      const t1 = generateMagicToken();
      const t2 = generateMagicToken();
      assert.notEqual(t1, t2);
    });
  });

  describe("JWT", () => {
    const user = { id: "test-1", username: "fireboy", email: "fire@test.com" };

    it("generates a valid JWT", () => {
      const token = generateJwt(user);
      assert.ok(typeof token === "string");
      assert.ok(token.split(".").length === 3);
    });

    it("verifies a valid JWT", () => {
      const token = generateJwt(user);
      const payload = verifyJwt(token);
      assert.ok(payload);
      assert.equal(payload.sub, user.id);
      assert.equal(payload.username, user.username);
    });

    it("rejects an invalid JWT", () => {
      assert.equal(verifyJwt("not.a.token"), null);
      assert.equal(verifyJwt(""), null);
    });

    it("rejects a tampered JWT", () => {
      const token = generateJwt(user);
      const parts = token.split(".");
      parts[1] = "dGFtcGVyZWQ=";
      assert.equal(verifyJwt(parts.join(".")), null);
    });
  });
});
