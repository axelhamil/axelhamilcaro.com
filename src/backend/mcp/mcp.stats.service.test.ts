import assert from "node:assert/strict";
import { afterEach, describe, mock, test } from "node:test";
import "./mcp.test-env";
import { mcpRepository } from "./mcp.repository";
import { mcpStatsService } from "./mcp.stats.service";

function givenCategories(rows: { category: string; count: number }[]) {
  mock.method(mcpRepository, "totals", async () => undefined);
  mock.method(mcpRepository, "callsByDay", async () => []);
  mock.method(mcpRepository, "topNames", async () => []);
  mock.method(mcpRepository, "origins", async () => []);
  mock.method(mcpRepository, "methods", async () => []);
  mock.method(mcpRepository, "leadCounts", async () => ({
    mcp: 0,
    webForms: 0,
  }));
  mock.method(mcpRepository, "categories", async () => rows);
}

afterEach(() => mock.restoreAll());

describe("mcpStatsService.overview hidden traffic", () => {
  const noise = [
    { category: "outil", count: 77 },
    { category: "scanner", count: 2 },
    { category: "inconnu", count: 3 },
  ];

  test("agents only hides tools, scanners and browsers", async () => {
    givenCategories(noise);

    const { hidden } = await mcpStatsService.overview(30, "agents");

    assert.deepEqual(hidden, {
      total: 79,
      byCategory: [
        { category: "outil", count: 77 },
        { category: "scanner", count: 2 },
      ],
    });
  });

  test("without scanners hides only scanners", async () => {
    givenCategories(noise);

    const { hidden } = await mcpStatsService.overview(30, "sans-scanners");

    assert.deepEqual(hidden, {
      total: 2,
      byCategory: [{ category: "scanner", count: 2 }],
    });
  });

  test("everything hides nothing", async () => {
    givenCategories(noise);

    const { hidden } = await mcpStatsService.overview(30, "tout");

    assert.equal(hidden.total, 0);
  });
});
