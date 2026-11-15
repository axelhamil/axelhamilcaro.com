import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, test } from "node:test";
import { z } from "zod";
import {
  AVAILABILITY,
  EMPLOYER,
  JOB_TITLE,
  OPENUP,
  RATES,
} from "../../../app/_config/site.constants";
import {
  getCaseStudies,
  getManifesto,
  getServices,
  getWhoami,
  renderMarkdown,
} from "./mcp.catalog";
import { MCP_SERVER_VERSION } from "./mcp.constants";

const MANIFESTO_KEYS_BY_VERSION: Record<string, readonly string[]> = {
  "1.0.0": ["architecture", "typescript", "values"],
  "1.1.0": ["architecture", "principles", "typescript"],
};

describe("mcp server version", () => {
  test("the architecture manifesto shape matches the published version", () => {
    assert.deepEqual(
      Object.keys(getManifesto()).sort(),
      MANIFESTO_KEYS_BY_VERSION[MCP_SERVER_VERSION],
    );
  });

  test("server.json publishes the version the server announces", () => {
    const serverJson = z
      .object({ version: z.string() })
      .parse(
        JSON.parse(
          readFileSync(
            new URL("../../../server.json", import.meta.url),
            "utf8",
          ),
        ),
      );

    assert.equal(serverJson.version, MCP_SERVER_VERSION);
  });
});

describe("mcp.catalog whoami", () => {
  test("job title is the builder identity", () => {
    assert.equal(JOB_TITLE, "Développeur fullstack et builder");
    assert.equal(getWhoami().jobTitle, JOB_TITLE);
  });

  test("identity is the thesis and the builds, OpenUp stays a side project", () => {
    const whoami = getWhoami();
    const [identity = ""] = whoami.summary.split(EMPLOYER.role);

    assert.match(identity, /outils de fondation/);

    assert.doesNotMatch(identity, /OpenUp/);
    assert.match(identity, /clean-stack/);
    assert.match(identity, /weathertop/);
    assert.match(identity, /afterlive/);
    assert.deepEqual(
      whoami.builds.map((build) => build.name),
      ["clean-stack", "weathertop", "afterlive", "Outils publiés sur GitHub"],
    );
    assert.deepEqual(
      whoami.currentRoles.map((role) => role.organization),
      [EMPLOYER.name, OPENUP.name, "Freelance"],
    );
  });

  test("daily rate is 500 from RATES", () => {
    assert.equal(RATES.dailyHtEur, 500);
    assert.equal(getWhoami().dailyRateHtEur, RATES.dailyHtEur);
  });

  test("whoami markdown contains the job title", () => {
    assert.ok(renderMarkdown("whoami").includes(JOB_TITLE));
  });
});

describe("mcp.catalog case studies", () => {
  test("exposes the four portfolio slugs, OpenUp never first", () => {
    const slugs = getCaseStudies().map((study) => study.slug);

    assert.deepEqual(slugs, [
      "scormpilot",
      "civitime",
      "openup",
      "billetterie",
    ]);
  });

  test("OpenUp is told as a product, not a links SaaS", () => {
    const markdown = renderMarkdown("case-studies");

    assert.match(markdown, /fondateur technique/);
    assert.match(markdown, /deep links/);
    assert.doesNotMatch(markdown, /gestion de liens tout-en-un/);
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
  test("exposes four service pages plus TMA", () => {
    const slugs = getServices().map((service) => service.slug);

    assert.deepEqual(slugs, [
      "developpeur-nextjs-freelance",
      "developpement-saas",
      "lead-tech-fractional",
      "creation-application-web",
      "tma",
    ]);
  });
});
