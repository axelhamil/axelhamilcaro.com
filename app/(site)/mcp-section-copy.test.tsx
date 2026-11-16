import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { z } from "zod";
import { MCP_PROMPT } from "@/app/_config/mcp-clients";
import { MCP } from "@/app/_config/site.constants";
import { AboutMcp } from "@/src/features/about/components/about-mcp";
import { HomeFaq } from "@/src/features/home/components/home-faq";
import { HomeMcp } from "@/src/features/home/components/home-mcp";
import { buildMcpApiNode } from "@/src/shared/seo/schemas/mcp-api";

const RETIRED_LEAD = /envoi(e)? (pas )?de lead|aucun envoi de lead/i;

const faqPageSchema = z.object({
  "@type": z.literal("FAQPage"),
  mainEntity: z.array(
    z.object({
      name: z.string(),
      acceptedAnswer: z.object({ text: z.string() }),
    }),
  ),
});

const HTML_ENTITIES: Record<string, string> = {
  "&#x27;": "'",
  "&quot;": '"',
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
};

function decodeHtml(text: string) {
  return text.replace(
    /&#x27;|&quot;|&lt;|&gt;|&amp;/g,
    (entity) => HTML_ENTITIES[entity] ?? entity,
  );
}

function parseFaqJsonLd(html: string) {
  const script = html.match(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
  );
  assert.ok(script?.[1]);

  return faqPageSchema.parse(JSON.parse(script[1]));
}

function visibleAnswers(html: string) {
  return [...html.matchAll(/<p class="faq-reponse[^"]*">([\s\S]*?)<\/p>/g)].map(
    (match) => decodeHtml(match[1] ?? ""),
  );
}

describe("MCP section copy", () => {
  for (const [name, element] of [
    ["HomeMcp", <HomeMcp key="home-mcp" />],
    ["AboutMcp", <AboutMcp key="about-mcp" />],
    ["HomeFaq", <HomeFaq key="home-faq" />],
  ] as const) {
    test(`${name} never carries the retired lead sentence, a long dash or the two names that stay apart`, () => {
      const html = renderToStaticMarkup(element);
      assert.doesNotMatch(html, RETIRED_LEAD);
      assert.doesNotMatch(html, /—|–/);
      assert.doesNotMatch(html, /eskimoz|weathertop/i);
    });
  }

  test("the site-wide MCP WebAPI JSON-LD never carries the retired lead sentence", () => {
    assert.doesNotMatch(JSON.stringify(buildMcpApiNode()), RETIRED_LEAD);
  });

  test("both MCP sections give the address and the discuss_project starter prompt in the served HTML", () => {
    for (const element of [
      <HomeMcp key="home-mcp" />,
      <AboutMcp key="about-mcp" />,
    ]) {
      const html = renderToStaticMarkup(element);
      assert.ok(html.includes(MCP.url));
      assert.match(html, new RegExp(MCP_PROMPT));
    }
  });

  test("the home FAQ JSON-LD carries the 8 questions with each visible answer verbatim", () => {
    const html = renderToStaticMarkup(<HomeFaq />);
    const schema = parseFaqJsonLd(html);
    const answers = visibleAnswers(html);

    assert.equal(schema.mainEntity.length, 8);
    assert.equal(answers.length, 8);
    assert.deepEqual(
      schema.mainEntity.map((entity) => entity.acceptedAnswer.text),
      answers,
    );
  });
});
