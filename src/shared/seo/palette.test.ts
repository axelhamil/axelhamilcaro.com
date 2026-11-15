import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { PALETTE } from "@/app/_config/site.constants";

test("the hex palette used outside CSS matches the global.css tokens", () => {
  const css = readFileSync(join(process.cwd(), "app", "global.css"), "utf8");

  for (const [token, hex] of Object.entries(PALETTE)) {
    assert.ok(css.includes(`--${token}: ${hex};`), `--${token}`);
  }
});
