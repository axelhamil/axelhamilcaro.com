import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, test } from "node:test";
import { z } from "zod";
import "../../src/backend/mcp/mcp.test-env";
import { POST } from "../mcp/route";
import {
  MCP_CLIENTS,
  MCP_PROMPT,
  MCP_STARTER_PROMPT,
  MCP_TOOLS,
} from "./mcp-clients";
import { MCP } from "./site.constants";

const listResponseSchema = z.object({
  result: z.record(z.string(), z.array(z.object({ name: z.string() }))),
});

function firstJsonPayload(contentType: string, body: string): unknown {
  if (!contentType.includes("text/event-stream")) return JSON.parse(body);

  const dataLine = body.split("\n").find((line) => line.startsWith("data:"));
  return JSON.parse(dataLine?.slice("data:".length) ?? "null");
}

async function listNames(method: string, key: string): Promise<string[]> {
  const response = await POST(
    new Request("http://localhost:3000/mcp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/event-stream",
      },
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method }),
    }),
  );
  const payload = firstJsonPayload(
    response.headers.get("Content-Type") ?? "",
    await response.text(),
  );
  const items = listResponseSchema.parse(payload).result[key] ?? [];
  return items.map((item) => item.name);
}

describe("MCP connection copy", () => {
  test("every address, command and snippet uses the one public MCP URL", () => {
    for (const client of MCP_CLIENTS) {
      const text = [...client.steps, client.code ?? ""].join("\n");
      assert.ok(client.code === undefined || client.code.includes(MCP.url));
      assert.doesNotMatch(text, /localhost|http:\/\//);
    }
    assert.equal(MCP.url, "https://axelhamilcaro.com/mcp");
  });

  test("the starter prompt names the discuss_project prompt and the estimate_project tool", () => {
    assert.match(MCP_STARTER_PROMPT, /discuss_project/);
    assert.match(MCP_STARTER_PROMPT, /estimate_project/);
  });

  test("the server really exposes the prompt and tools the copy names", async () => {
    const prompts = await listNames("prompts/list", "prompts");
    const tools = await listNames("tools/list", "tools");
    assert.ok(prompts.includes(MCP_PROMPT));
    for (const tool of MCP_TOOLS) assert.ok(tools.includes(tool));
  });

  test("llms.txt tells the same thing as the visible copy", () => {
    const llms = readFileSync(
      join(process.cwd(), "public", "llms.txt"),
      "utf8",
    );
    for (const name of [MCP_PROMPT, ...MCP_TOOLS])
      assert.match(llms, new RegExp(name));
  });

  test("no connection text mentions the two names that must stay apart", () => {
    const text = JSON.stringify([MCP_CLIENTS, MCP_STARTER_PROMPT]);
    assert.doesNotMatch(text, /eskimoz|weathertop/i);
  });
});
