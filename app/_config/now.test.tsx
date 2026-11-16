import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { Now } from "@/src/features/home/components/now";
import {
  NOW_ENTRIES,
  type NowEntry,
  nowEntrySchema,
  sortNowEntries,
} from "./now";
import { getProjectBySlug } from "./projects";

const entry: NowEntry = {
  date: "2026-11-14",
  slug: "weathertop",
  summary: "Un point daté.",
  next: "La suite.",
};

describe("now entries", () => {
  test("an entry with a malformed date is rejected", () => {
    assert.equal(
      nowEntrySchema.safeParse({ ...entry, date: "14/11/2026" }).success,
      false,
    );
  });

  test("every entry points to an existing project", () => {
    assert.ok(NOW_ENTRIES.length > 0);

    for (const { slug } of NOW_ENTRIES) {
      assert.ok(getProjectBySlug(slug), slug);
    }
  });

  test("entries are sorted newest first and ties keep their order", () => {
    const sorted = sortNowEntries([
      { ...entry, date: "2026-10-01", summary: "old" },
      { ...entry, date: "2026-11-14", summary: "first tie" },
      { ...entry, date: "2026-11-14", summary: "second tie" },
    ]);

    assert.deepEqual(
      sorted.map(({ summary }) => summary),
      ["first tie", "second tie", "old"],
    );
  });

  test("no entry names Eskimoz, nor search vocabulary next to Weathertop", () => {
    for (const { slug, summary, next } of NOW_ENTRIES) {
      for (const text of [summary, next]) {
        assert.doesNotMatch(text, /eskimoz/i);
        assert.doesNotMatch(text, /[–—]/);

        if (slug === "weathertop") {
          assert.doesNotMatch(text, /\b(seo|geo|ranking|classement|marque)\b/i);
        }
      }
    }
  });
});

describe("now section", () => {
  test("the section renders nothing without entries", () => {
    assert.equal(renderToStaticMarkup(<Now entries={[]} />), "");
  });

  test("the section shows the long French date and links to the project page", () => {
    const html = renderToStaticMarkup(<Now entries={[entry]} />);

    assert.match(html, /14 novembre 2026/);
    assert.match(html, /datetime="2026-11-14"/i);
    assert.match(html, /href="\/portfolio\/weathertop"/);
  });
});
