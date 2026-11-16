import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";
import { BUILDS_SUMMARY } from "../../../app/_config/projects";
import {
  CONTACT,
  LEGAL_ENTITY,
  MCP,
  RATES,
  THESIS,
} from "../../../app/_config/site.constants";
import { CATALOG_SECTION_IDS } from "./mcp.catalog";
import { AFTERLIVE_AMBITION, WEATHERTOP_AMBITION } from "./mcp.projects";
import { markdownSections } from "./mcp.test-sections";

function readPublic(name: "llms.txt" | "llms-full.txt") {
  return readFileSync(join(process.cwd(), "public", name), "utf8");
}

describe("llms MCP discovery", () => {
  for (const name of ["llms.txt", "llms-full.txt"] as const) {
    test(`${name} points agents to the public MCP endpoint`, () => {
      const text = readPublic(name);

      assert.match(text, new RegExp(MCP.url.replace(/\./g, "\\.")));
      assert.match(text, new RegExp(MCP.aiCatalogUrl.replace(/\./g, "\\.")));
      assert.match(text, new RegExp(MCP.manifestUrl.replace(/\./g, "\\.")));
      assert.match(text, /about#mcp/);
      assert.match(text, new RegExp(CONTACT.email.replace(/\./g, "\\.")));
      assert.match(text, /initialize/);
      assert.match(text, /2025-03-26/);
      assert.match(text, /MCP-Protocol-Version/);
      assert.match(text, /n[ée]gocie/);
      assert.doesNotMatch(text, /initialize \+ ce header = 400/);
      assert.doesNotMatch(text, / = 400/);
      assert.doesNotMatch(text, /submit_inquiry/);
      assert.equal(text.includes("\u2014"), false);
      assert.match(text, /Dernière mise à jour: 2026-11-16/);
    });
  }
});

const FINAL_TOOLS = [
  "list_projects",
  "audit_architecture_brief",
  "estimate_project",
  "send_project_brief",
] as const;

const FINAL_PROMPTS = ["discuss_project", "compare_stack"] as const;

describe("llms files describe the estimation server", () => {
  for (const name of ["llms.txt", "llms-full.txt"] as const) {
    test(`${name} lists the final tools, prompts and resources`, () => {
      const text = readPublic(name);

      for (const id of CATALOG_SECTION_IDS) {
        assert.ok(text.includes(id), id);
      }

      for (const tool of [...FINAL_TOOLS, ...FINAL_PROMPTS]) {
        assert.ok(text.includes(tool), tool);
      }
    });

    test(`${name} no longer states that no lead can be sent`, () => {
      const text = readPublic(name);

      assert.doesNotMatch(
        text,
        /Pas d'outil d'envoi de lead|n'existe pas d'outil d'envoi/,
      );
    });

    test(`${name} does not name removed tools`, () => {
      const text = readPublic(name);

      assert.doesNotMatch(
        text,
        /generate_custom_proposal|formalize_need|draft_outreach/,
      );
    });

    test(`${name} never names Eskimoz and weathertop in the same section`, () => {
      const sections = markdownSections(readPublic(name));

      assert.deepEqual(
        sections.filter(
          (section) => /eskimoz/i.test(section) && /weathertop/i.test(section),
        ),
        [],
      );
    });
  }
});

const lowerFirst = (text: string) =>
  text.charAt(0).toLowerCase() + text.slice(1);

const PRICE = /(?<!\d\s?)\b(\d{2,3})\s?€/g;

describe("llms files stay aligned with the site", () => {
  for (const name of ["llms.txt", "llms-full.txt"] as const) {
    test(`${name} only quotes the rates of RATES`, () => {
      const text = readPublic(name);
      const quoted = new Set([...text.matchAll(PRICE)].map(([, eur]) => eur));
      const rates = [
        RATES.dailyHtEur,
        RATES.tma.proMonthlyEur,
        RATES.tma.premiumMonthlyEur,
        RATES.tma.overflowHourlyEur,
      ].map(String);

      assert.ok(quoted.has(String(RATES.dailyHtEur)));
      assert.ok(quoted.has(String(RATES.tma.proMonthlyEur)));
      assert.deepEqual(
        [...quoted].filter((eur) => !rates.includes(eur)),
        [],
      );
    });

    test(`${name} repeats the thesis and the private builds word for word`, () => {
      const text = readPublic(name);

      assert.ok(text.includes(THESIS.thirdPerson));
      assert.ok(text.includes(BUILDS_SUMMARY));
      assert.ok(text.includes(lowerFirst(WEATHERTOP_AMBITION)));
      assert.ok(text.includes(lowerFirst(AFTERLIVE_AMBITION)));
    });
  }

  test("llms-full.txt quotes every TMA rate", () => {
    const text = readPublic("llms-full.txt");

    assert.match(text, new RegExp(`PRO : ${RATES.tma.proMonthlyEur} € HT`));
    assert.match(
      text,
      new RegExp(`PREMIUM : ${RATES.tma.premiumMonthlyEur} € HT`),
    );
    assert.match(
      text,
      new RegExp(`Hors forfait : ${RATES.tma.overflowHourlyEur} € HT`),
    );
  });

  for (const name of ["llms.txt", "llms-full.txt"] as const) {
    test(`${name} leaves the SIRET to the legal pages`, () => {
      const text = readPublic(name);

      assert.equal(text.includes(LEGAL_ENTITY.siret), false);
      assert.equal(
        text.includes(LEGAL_ENTITY.siret.replaceAll(" ", "")),
        false,
      );
    });

    test(`${name} keeps every URL out of bold markup`, () => {
      const text = readPublic(name);

      assert.doesNotMatch(text, /https?:\/\/[^\s)>]*\*\*/);
    });
  }
});
