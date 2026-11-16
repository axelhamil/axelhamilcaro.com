import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { ResourceNotFoundError } from "@modelcontextprotocol/server";
import { AVAILABILITY, JOB_TITLE } from "../../../app/_config/site.constants";
import { CATALOG_SECTION_IDS } from "./mcp.catalog";
import {
  FEATURE_GRID,
  FEATURE_IDS,
  GRID_STATUS,
  SIZES,
} from "./mcp.estimation.grid";
import {
  buildResourceBody,
  parseSiteResourceUri,
  RESOURCE_DESCRIPTIONS,
  readSiteResource,
} from "./mcp.resources";

describe("parseSiteResourceUri", () => {
  test("parses json and markdown site URIs", () => {
    assert.deepEqual(parseSiteResourceUri("site://whoami.json"), {
      id: "whoami",
      format: "json",
    });
    assert.deepEqual(parseSiteResourceUri("site://architecture-manifesto.md"), {
      id: "architecture-manifesto",
      format: "md",
    });
  });

  test("parses method, estimation-grid and references", () => {
    assert.deepEqual(parseSiteResourceUri("site://method.md"), {
      id: "method",
      format: "md",
    });
    assert.deepEqual(parseSiteResourceUri("site://estimation-grid.json"), {
      id: "estimation-grid",
      format: "json",
    });
    assert.deepEqual(parseSiteResourceUri("site://references.json"), {
      id: "references",
      format: "json",
    });
  });

  test("returns null for unknown section or format", () => {
    assert.deepEqual(parseSiteResourceUri("site://projects.md"), {
      id: "projects",
      format: "md",
    });
    assert.equal(parseSiteResourceUri("site://unknown.json"), null);
    assert.equal(parseSiteResourceUri("site://whoami.txt"), null);
    assert.equal(
      parseSiteResourceUri("https://axelhamilcaro.com/whoami"),
      null,
    );
  });
});

describe("buildResourceBody", () => {
  test("whoami JSON contains the exact job title", () => {
    const body = buildResourceBody("whoami", "json");
    const parsed = JSON.parse(body.text) as { jobTitle: string };

    assert.equal(body.mimeType, "application/json");
    assert.equal(parsed.jobTitle, JOB_TITLE);
  });

  test("whoami markdown contains the job title", () => {
    const body = buildResourceBody("whoami", "md");

    assert.equal(body.mimeType, "text/markdown");
    assert.ok(body.text.includes(JOB_TITLE));
  });

  test("live-status JSON reads AVAILABILITY at request time", () => {
    const parsed = JSON.parse(
      buildResourceBody("live-status", "json").text,
    ) as {
      status: string;
      freelanceYears: number;
    };

    assert.equal(parsed.status, AVAILABILITY.status);
    assert.equal(typeof parsed.freelanceYears, "number");
  });
});

describe("estimation resources", () => {
  test("estimation-grid JSON lists every feature of FEATURE_GRID with its three sizes and the draft status", () => {
    const grid = JSON.parse(buildResourceBody("estimation-grid", "json").text);

    assert.equal(grid.status, GRID_STATUS);
    assert.equal(grid.unit, "working days");
    assert.deepEqual(
      grid.features.map((feature: { id: string }) => feature.id),
      [...FEATURE_IDS],
    );
    assert.deepEqual(
      grid.features.map((feature: { label: string }) => feature.label),
      FEATURE_IDS.map((id) => FEATURE_GRID[id].label),
    );
    for (const feature of grid.features)
      assert.deepEqual(Object.keys(feature.sizes), [...SIZES]);
  });

  test("references markdown names Billetterie, ScormPilot, HomeCafé and MentorTroc with their real durations", () => {
    const markdown = buildResourceBody("references", "md").text;

    for (const name of ["Billetterie", "ScormPilot", "HomeCafé", "MentorTroc"])
      assert.ok(markdown.includes(name), name);
    assert.ok(markdown.includes("1 month, solo"));
    assert.ok(markdown.includes("between 1 and 3 months"));
  });

  test("method JSON names what Axel does not take", () => {
    const method = JSON.parse(buildResourceBody("method", "json").text);

    assert.ok(method.outOfScope.some((item: string) => /showcase/i.test(item)));
    assert.ok(
      method.outOfScope.some((item: string) =>
        /staff augmentation/i.test(item),
      ),
    );
    assert.ok(method.outOfScope.some((item: string) => /legacy/i.test(item)));
  });

  test("new resources never mention Eskimoz or Weathertop", () => {
    for (const id of ["method", "estimation-grid", "references"] as const)
      for (const format of ["json", "md"] as const)
        assert.doesNotMatch(
          buildResourceBody(id, format).text,
          /eskimoz|weathertop/i,
        );
  });
});

describe("RESOURCE_DESCRIPTIONS", () => {
  test("every resource has a non-empty description of at least 40 characters", () => {
    assert.equal(CATALOG_SECTION_IDS.length, 11);
    for (const id of CATALOG_SECTION_IDS)
      assert.ok(RESOURCE_DESCRIPTIONS[id].length >= 40, id);
  });
});

describe("readSiteResource", () => {
  test("unknown URI raises ResourceNotFoundError", () => {
    assert.throws(
      () => readSiteResource("site://nope.json"),
      ResourceNotFoundError,
    );
  });
});
