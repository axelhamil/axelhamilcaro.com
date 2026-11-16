import assert from "node:assert/strict";
import { describe, test } from "node:test";
import "./mcp.test-env";
import { NOT_BINDING_QUOTE } from "./mcp.constants";
import { estimateInputSchema } from "./mcp.estimation.schema";
import { estimateToolResult } from "./mcp.tools";

const call = (raw: unknown) =>
  estimateToolResult(estimateInputSchema.parse(raw));

const text = (result: ReturnType<typeof estimateToolResult>) =>
  result.content.map((item) => item.text).join("\n");

const core = { name: "Core", features: [{ id: "auth", size: "standard" }] };

describe("estimate_project tool", () => {
  test("an application with no lot and no unlisted item is an error, not a zero estimate", () => {
    const result = call({});

    assert.equal(result.isError, true);
    assert.match(text(result), /at least one feature/);
    assert.doesNotMatch(text(result), /€/);
  });

  test("only unlisted items is an error too", () => {
    const result = call({ unlisted: ["Custom ERP connector"] });

    assert.equal(result.isError, true);
    assert.match(text(result), /at least one feature/);
    assert.doesNotMatch(text(result), /€/);
  });

  test("a valid brief returns markdown with the disclaimer and a euro total", () => {
    const result = call({ lots: [core] });

    assert.notEqual(result.isError, true);
    assert.ok(text(result).includes(NOT_BINDING_QUOTE));
    assert.match(text(result), /## Total[\s\S]*\d+€/);
  });

  test("format json returns parseable JSON with status 'estimated'", () => {
    const result = call({ lots: [core], format: "json" });
    const parsed: unknown = JSON.parse(text(result));

    assert.ok(parsed && typeof parsed === "object");
    assert.equal(Reflect.get(parsed, "status"), "estimated");
  });

  test("showcase_site returns the out-of-scope message, no euro sign", () => {
    const result = call({ projectKind: "showcase_site" });

    assert.notEqual(result.isError, true);
    assert.match(text(result), /does not take showcase website projects/);
    assert.doesNotMatch(text(result), /€/);
  });
});
