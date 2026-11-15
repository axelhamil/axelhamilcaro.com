import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { z } from "zod";
import { PROJECTS, type Project } from "../../../app/_config/projects";
import {
  AFTERLIVE_AMBITION,
  getProjects,
  NO_PROJECT_MATCHING,
  NO_PROJECT_PUBLISHED,
  PRIVATE_PROJECT_FALLBACK,
  renderProjectsMarkdown,
  WEATHERTOP_AMBITION,
} from "./mcp.projects";
import { buildResourceBody } from "./mcp.resources";

function project(overrides: Partial<Project>): Project {
  return {
    slug: "brique",
    name: "Brique",
    category: "brique",
    status: "Expédié",
    year: "2026",
    visibility: "public",
    tagline: "Une brique testée",
    summary: "Résumé de la brique.",
    posterLines: ["BRIQUE", "TESTÉE"],
    highlights: ["Point fort"],
    ribbon: [],
    tech: ["TypeScript"],
    links: [{ label: "GitHub", href: "https://github.com/axelhamil/brique" }],
    sections: [],
    dateModified: "2026-11-14",
    seoTitle: "Brique",
    metaDescription: "Une brique testée.",
    featured: false,
    ...overrides,
  };
}

describe("projects resource", () => {
  test("no project renders a clean empty state", () => {
    const markdown = renderProjectsMarkdown({}, []);

    assert.equal(markdown, `# Projects\n\n${NO_PROJECT_PUBLISHED}`);
    assert.deepEqual(getProjects({}, []), []);
  });

  test("markdown lists each project with its links", () => {
    const markdown = renderProjectsMarkdown({}, [
      project({}),
      project({ slug: "agent", name: "Agent", category: "outil-agent" }),
    ]);

    assert.match(markdown, /## Brique/);
    assert.match(markdown, /## Agent/);
    assert.match(markdown, /- \[GitHub\]\(https:\/\/github\.com/);
    assert.match(markdown, /Stack: TypeScript/);
  });

  test("each project points to its page on the site", () => {
    const [entry] = getProjects({}, [project({ slug: "brique" })]);

    assert.equal(entry?.url, "https://axelhamilcaro.com/portfolio/brique");
    assert.match(
      renderProjectsMarkdown({}, [project({ slug: "brique" })]),
      /- Page: https:\/\/axelhamilcaro\.com\/portfolio\/brique/,
    );
  });

  test("filters by category and status, with a distinct empty message", () => {
    const projects = [
      project({}),
      project({ slug: "wip", category: "chantier", status: "En chantier" }),
    ];

    const wip = getProjects({ status: "En chantier" }, projects);
    assert.deepEqual(
      wip.map((entry) => entry.slug),
      ["wip"],
    );
    assert.equal(
      renderProjectsMarkdown({ category: "extension" }, projects),
      `# Projects\n\n${NO_PROJECT_MATCHING}`,
    );
  });

  test("a private project exposes only its name, domain, status and duration", () => {
    const secret = project({
      slug: "secret",
      name: "Secret",
      visibility: "private",
      tagline: "Tagline avec le mécanisme",
      summary: "Mécanisme interne",
      posterLines: ["AFFICHE", "INTERNE"],
      highlights: ["Modèle de prix"],
      ribbon: ["Ruban interne"],
      tech: ["Service tiers"],
      sections: [{ title: "Comment", paragraphs: ["Détail interne"] }],
      links: [{ label: "Repo", href: "https://example.com/secret" }],
    });

    const [entry] = getProjects({}, [secret]);
    assert.deepEqual(entry, {
      slug: "secret",
      name: "Secret",
      url: "https://axelhamilcaro.com/portfolio/secret",
      category: "brique",
      status: "Expédié",
      year: "2026",
      visibility: "private",
      ambition: PRIVATE_PROJECT_FALLBACK,
    });

    const markdown = renderProjectsMarkdown({}, [secret]);
    for (const leak of [
      "mécanisme",
      "Mécanisme interne",
      "AFFICHE",
      "Modèle de prix",
      "Ruban interne",
      "Service tiers",
      "Détail interne",
      "example.com",
    ])
      assert.ok(!markdown.includes(leak), leak);
  });

  test("known private projects get their public ambition only", () => {
    const [weathertop, afterlive] = getProjects({}, [
      project({ slug: "weathertop", visibility: "private" }),
      project({ slug: "afterlive", visibility: "private" }),
    ]);

    assert.ok(weathertop && "ambition" in weathertop);
    assert.equal(weathertop.ambition, WEATHERTOP_AMBITION);
    assert.ok(afterlive && "ambition" in afterlive);
    assert.equal(afterlive.ambition, AFTERLIVE_AMBITION);
  });

  test("site://projects.json reflects PROJECTS", () => {
    const parsed = z
      .array(z.object({ slug: z.string() }))
      .parse(JSON.parse(buildResourceBody("projects", "json").text));

    assert.deepEqual(
      parsed.map((entry) => entry.slug),
      PROJECTS.map((entry) => entry.slug),
    );
  });
});
