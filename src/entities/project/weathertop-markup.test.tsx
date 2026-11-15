import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import ProjectIdentityJsonLd from "@/app/@identity/portfolio/[slug]/page";
import { getProjectBySlug } from "@/app/_config/projects";
import { EMPLOYER } from "@/app/_config/site.constants";
import { orphanIds } from "@/src/shared/seo/schemas/orphan-ids";
import { buildSoftwareProjectSchema } from "./software-project-schema";

const EMPLOYER_NAME = new RegExp(EMPLOYER.name, "i");

async function renderIdentity(slug: string) {
  const params = Promise.resolve({ slug });

  return renderToStaticMarkup(await ProjectIdentityJsonLd({ params }));
}

function parseJsonLd(html: string) {
  return JSON.parse(
    html.replace(/^<script[^>]*>/, "").replace(/<\/script>$/, ""),
  );
}

describe("Weathertop page markup", () => {
  test("neither the identity graph nor the project content names the employer", async () => {
    const project = getProjectBySlug("weathertop");
    assert.ok(project);

    const identity = await renderIdentity("weathertop");
    const content = JSON.stringify([
      project,
      buildSoftwareProjectSchema(project),
    ]);

    assert.doesNotMatch(identity, EMPLOYER_NAME);
    assert.doesNotMatch(content, EMPLOYER_NAME);
  });

  test("every @id referenced on the page is defined on the page", async () => {
    const project = getProjectBySlug("weathertop");
    assert.ok(project);

    const identity = parseJsonLd(await renderIdentity("weathertop"));

    assert.deepEqual(
      orphanIds(identity, buildSoftwareProjectSchema(project)),
      [],
    );
  });

  test("the other builds keep the full identity", async () => {
    assert.match(await renderIdentity("afterlive"), EMPLOYER_NAME);
  });
});
