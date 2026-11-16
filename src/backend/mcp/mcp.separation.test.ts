import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";
import "./mcp.test-env";
import { renderBriefNotes } from "./mcp.brief";
import { CATALOG_SECTION_IDS } from "./mcp.catalog";
import {
  getAiCatalog,
  getMcpCatalog,
  getServerCard,
  getServerManifest,
} from "./mcp.discovery";
import { estimateProject } from "./mcp.estimation";
import { MCP_SERVER_INSTRUCTIONS } from "./mcp.instructions";
import {
  buildCompareStackPrompt,
  buildDiscussProjectPrompt,
} from "./mcp.prompts";
import { REFERENCE_PROJECTS } from "./mcp.references";
import { buildResourceBody } from "./mcp.resources";
import { markdownSections } from "./mcp.test-sections";
import { estimateToolResult } from "./mcp.tools";
import { sendProjectBriefSchema } from "./mcp.tools.schema";

const ESKIMOZ = /eskimoz/i;
const WEATHERTOP = /weathertop/i;

const associates = (unit: string) =>
  ESKIMOZ.test(unit) && WEATHERTOP.test(unit);

const stringValues = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringValues);
  if (value !== null && typeof value === "object")
    return Object.values(value).flatMap(stringValues);

  return [];
};

const lines = (value: unknown) =>
  stringValues(value).flatMap((text) => text.split("\n"));

const readPublic = (name: string) =>
  readFileSync(join(process.cwd(), "public", name), "utf8");

const resourceUnits = (id: (typeof CATALOG_SECTION_IDS)[number]) => [
  ...stringValues(JSON.parse(buildResourceBody(id, "json").text)),
  ...markdownSections(buildResourceBody(id, "md").text),
];

const toolText = (result: ReturnType<typeof estimateToolResult>) =>
  result.content.map((item) => item.text).join("\n");

const briefNotes = (input: (typeof REFERENCE_PROJECTS)[number]["input"]) => {
  const brief = sendProjectBriefSchema.parse({
    ...input,
    consent: true,
    email: "jean@example.com",
    company: "Acme",
    need: "A booking platform",
    answers: "Web only",
  });

  return renderBriefNotes(brief, estimateProject(input));
};

const estimateOutputs = REFERENCE_PROJECTS.flatMap((reference) => [
  toolText(estimateToolResult({ ...reference.input, format: "markdown" })),
  toolText(estimateToolResult({ ...reference.input, format: "json" })),
]);

describe("Eskimoz and Weathertop stay apart", () => {
  test("no unit of any MCP output or llms file associates Eskimoz and Weathertop", () => {
    const units = [
      ...CATALOG_SECTION_IDS.flatMap(resourceUnits),
      ...[
        getServerManifest(),
        getServerCard(),
        getAiCatalog(),
        getMcpCatalog(),
      ].flatMap(stringValues),
      ...markdownSections(readPublic("llms.txt")),
      ...markdownSections(readPublic("llms-full.txt")),
      ...lines(MCP_SERVER_INSTRUCTIONS),
      ...lines(buildDiscussProjectPrompt()),
      ...lines(buildCompareStackPrompt({ need: "A booking platform" })),
      ...estimateOutputs.flatMap((output) => output.split("\n")),
      ...REFERENCE_PROJECTS.flatMap((reference) =>
        briefNotes(reference.input).split("\n"),
      ),
    ];

    assert.deepEqual(units.filter(associates), []);
  });

  test("new MCP surfaces name neither Eskimoz nor Weathertop", () => {
    const surfaces = [
      ...(["method", "estimation-grid", "references"] as const).flatMap(
        (id) => [
          buildResourceBody(id, "json").text,
          buildResourceBody(id, "md").text,
        ],
      ),
      MCP_SERVER_INSTRUCTIONS,
      ...stringValues(buildDiscussProjectPrompt()),
      ...estimateOutputs,
      ...REFERENCE_PROJECTS.map((reference) => briefNotes(reference.input)),
    ];

    assert.equal(estimateOutputs.length, 8);
    assert.deepEqual(
      surfaces.filter((text) => ESKIMOZ.test(text) || WEATHERTOP.test(text)),
      [],
    );
  });
});
