import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getLeaderboard } from "../src/services/leaderboard.js";

describe("Leaderboard Service", () => {
  describe("getLeaderboard", () => {
    it("returns entries and total count", async () => {
      const result = await getLeaderboard(10, 0);
      assert.ok(Array.isArray(result.entries));
      assert.ok(typeof result.total === "number");
    });

    it("respects limit parameter", async () => {
      const result = await getLeaderboard(5, 0);
      assert.ok(result.entries.length <= 5);
    });

    it("respects offset parameter", async () => {
      const page1 = await getLeaderboard(5, 0);
      const page2 = await getLeaderboard(5, 5);
      // Entries should differ if there are more than 5 total
      if (page1.entries.length >= 5 && page2.entries.length > 0) {
        assert.notEqual(page1.entries[0]?.username, page2.entries[0]?.username);
      }
    });
  });
});
