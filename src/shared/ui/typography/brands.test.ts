import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { splitBrands } from "./brands";

const marked = (text: string) =>
  splitBrands(text)
    .filter((segment) => segment.brand)
    .map((segment) => segment.text);

describe("splitBrands", () => {
  test("keeps the text identical once the segments are joined", () => {
    const text = "OpenUp ouvre Spotify, Amazon ou YouTube en natif.";

    assert.equal(
      splitBrands(text)
        .map((segment) => segment.text)
        .join(""),
      text,
    );
    assert.deepEqual(marked(text), ["Spotify", "Amazon", "YouTube"]);
  });

  test("marks only the first occurrence of each brand", () => {
    assert.deepEqual(marked("Spotify, puis Spotify et TikTok."), [
      "Spotify",
      "TikTok",
    ]);
  });

  test("matches whole words only", () => {
    assert.deepEqual(
      marked("claude-window, Spotifyy, github.com et @tiktok restent nus."),
      [],
    );
  });

  test("marks both brands of a slash pair", () => {
    assert.deepEqual(marked("hébergement Vercel/Railway"), [
      "Vercel",
      "Railway",
    ]);
    assert.deepEqual(marked("Spotify/YouTube"), ["Spotify", "YouTube"]);
  });

  test("leaves a brand inside a url or a path untouched", () => {
    assert.deepEqual(
      marked("voir github.com/vercel, https://x.dev/railway et /youtube"),
      [],
    );
  });

  test("leaves a brand inside one of my project names untouched", () => {
    assert.deepEqual(
      marked("Vinted AI Assistant analyse une annonce sur Vinted."),
      ["Vinted"],
    );
    assert.equal(splitBrands("Vinted AI Assistant")[0]?.brand, null);
  });

  test("keeps the case of the text", () => {
    assert.deepEqual(marked("UN LIEN YOUTUBE"), ["YOUTUBE"]);
  });

  test("prefers the longest variant", () => {
    assert.deepEqual(marked("un plugin Claude Code, pour Claude"), [
      "Claude Code",
    ]);
  });
});
