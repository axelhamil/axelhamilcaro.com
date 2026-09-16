import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  AVAILABILITY,
  JOB_TITLE,
  RATES,
} from "../../../app/_config/site.constants";
import {
  getCaseStudies,
  getServices,
  getWhoami,
  renderMarkdown,
} from "./mcp.catalog";

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

  test("carries the site metrics an agent would otherwise miss", () => {
    const markdown = renderMarkdown("case-studies");

    assert.match(markdown, /250 000/);
    assert.match(markdown, /99\.9%/);
    assert.match(markdown, /<50ms/);
    assert.match(markdown, /<200ms/);
    assert.match(markdown, /5 apps/);
  });
});

describe("mcp.catalog availability", () => {
  test("status is available", () => {
    assert.equal(AVAILABILITY.status, "available");
    assert.equal(getWhoami().availability.status, "available");
  });
});

describe("mcp.catalog services", () => {
  test("exposes three service pages plus TMA", () => {
    const slugs = getServices().map((service) => service.slug);

    assert.deepEqual(slugs, [
      "developpeur-nextjs-freelance",
      "developpement-saas",
      "lead-tech-fractional",
      "tma",
    ]);
  });
});
