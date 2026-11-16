import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { copyText } from "./copy-button";

describe("copyText", () => {
  test("a missing clipboard never reports a copy", async () => {
    assert.equal(
      await copyText(undefined, "https://axelhamilcaro.com/mcp"),
      "failed",
    );
  });

  test("a refused clipboard write never reports a copy", async () => {
    const refused = {
      writeText: () =>
        Promise.reject(new DOMException("denied", "NotAllowedError")),
    };

    assert.equal(await copyText(refused, "texte"), "failed");
  });

  test("an accepted write reports the copy of the exact text", async () => {
    const written: string[] = [];
    const accepted = {
      writeText: async (text: string) => {
        written.push(text);
      },
    };

    assert.equal(await copyText(accepted, "texte"), "copied");
    assert.deepEqual(written, ["texte"]);
  });
});
