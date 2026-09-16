import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { ResourceNotFoundError } from "@modelcontextprotocol/server";
import { AVAILABILITY, JOB_TITLE } from "../../../app/_config/site.constants";
import {
  buildResourceBody,
  parseSiteResourceUri,
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

  test("returns null for unknown section or format", () => {
    assert.equal(parseSiteResourceUri("site://unknown.json"), null);
    assert.equal(parseSiteResourceUri("site://whoami.txt"), null);
    assert.equal(
      parseSiteResourceUri("https://axelhamilcaro.com/whoami"),
      null,
    );
  });
});

describe("buildResourceBody", () => {
  test("whoami JSON contains the exact Malt job title", () => {
    const body = buildResourceBody("whoami", "json");
    const parsed = JSON.parse(body.text) as { jobTitle: string };

    assert.equal(body.mimeType, "application/json");
    assert.equal(parsed.jobTitle, JOB_TITLE);
  });

  test("whoami markdown contains the Malt job title", () => {
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

describe("readSiteResource", () => {
  test("unknown URI raises ResourceNotFoundError", () => {
    assert.throws(
      () => readSiteResource("site://nope.json"),
      ResourceNotFoundError,
    );
  });
});
