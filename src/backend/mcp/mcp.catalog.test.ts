import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  AVAILABILITY,
  JOB_TITLE,
  RATES,
} from "../../../app/_config/site.constants";
import { getCaseStudies, getWhoami, renderMarkdown } from "./mcp.catalog";

describe("mcp.catalog whoami", () => {
  test("job title equals the Malt string exactly", () => {
    assert.equal(
      JOB_TITLE,
      "Développeur Web Fullstack | Next.js | React | Node",
    );
    assert.equal(getWhoami().jobTitle, JOB_TITLE);
  });

  test("daily rate is 500 from RATES", () => {
    assert.equal(RATES.dailyHtEur, 500);
    assert.equal(getWhoami().dailyRateHtEur, RATES.dailyHtEur);
  });

  test("whoami markdown contains the Malt job title", () => {
    assert.ok(renderMarkdown("whoami").includes(JOB_TITLE));
  });
});

describe("mcp.catalog case studies", () => {
  test("exposes the four portfolio slugs", () => {
    const slugs = getCaseStudies().map((study) => study.slug);

    assert.equal(slugs.length, 4);
    assert.deepEqual([...slugs].sort(), [
      "billetterie",
      "civitime",
      "openup",
      "scormpilot",
    ]);
  });
});

describe("mcp.catalog availability", () => {
  test("status is available", () => {
    assert.equal(AVAILABILITY.status, "available");
    assert.equal(getWhoami().availability.status, "available");
  });
});
