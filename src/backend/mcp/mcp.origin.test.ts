import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { detectMcpOrigin } from "./mcp.origin";

describe("detectMcpOrigin from the user-agent", () => {
  const cases: [string, string, string][] = [
    [
      "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0; +https://openai.com/bot",
      "ChatGPT",
      "agent",
    ],
    ["openai-mcp/1.0.0", "ChatGPT", "agent"],
    [
      "Claude-User (claude-code/2.1.3; +https://anthropic.com)",
      "Claude",
      "agent",
    ],
    ["Cursor/1.7.2 (darwin arm64)", "Cursor", "agent"],
    ["Perplexity-User/1.0", "Perplexity", "agent"],
    [
      "Mozilla/5.0 (compatible; CensysInspect/1.1; +https://about.censys.io/)",
      "Censys",
      "scanner",
    ],
    ["Mozilla/5.0 zgrab/0.x", "ZGrab", "scanner"],
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Nuclei - Open-source project (github.com/projectdiscovery/nuclei)",
      "Nuclei",
      "scanner",
    ],
    [
      "masscan/1.3 (https://github.com/robertdavidgraham/masscan)",
      "Masscan",
      "scanner",
    ],
    ["Googlebot/2.1 (+http://www.google.com/bot.html)", "Robot", "scanner"],
    ["curl/8.23.0", "curl", "outil"],
    ["Wget/1.21.4", "Wget", "outil"],
    ["HTTPie/3.2.2", "HTTPie", "outil"],
    ["PostmanRuntime/7.39.0", "Postman", "outil"],
    ["python-httpx/0.27.0", "Python", "outil"],
    ["node", "Node.js", "outil"],
    ["Go-http-client/2.0", "Go", "outil"],
    [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      "Navigateur Chrome",
      "navigateur",
    ],
    [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
      "Navigateur Edge",
      "navigateur",
    ],
    [
      "Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0",
      "Navigateur Firefox",
      "navigateur",
    ],
    ["my-homemade-agent/0.1", "Autre", "inconnu"],
  ];

  for (const [userAgent, label, category] of cases) {
    test(`labels ${userAgent.slice(0, 40)} as ${label} (${category})`, () => {
      const origin = detectMcpOrigin({ userAgent });

      assert.equal(origin.label, label);
      assert.equal(origin.category, category);
    });
  }

  test("labels a missing or blank user-agent as unknown", () => {
    assert.equal(detectMcpOrigin({ userAgent: null }).category, "inconnu");
    assert.equal(detectMcpOrigin({ userAgent: "   " }).id, "unknown");
  });
});

describe("detectMcpOrigin from the declared MCP client", () => {
  test("prefers the client name over the user-agent", () => {
    const origin = detectMcpOrigin({
      clientName: "claude-ai",
      userAgent:
        "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko); compatible; ChatGPT-User/1.0",
    });

    assert.equal(origin.label, "Claude");
    assert.equal(origin.category, "agent");
  });

  test("falls back on the user-agent when the client name is not recognised", () => {
    const origin = detectMcpOrigin({
      clientName: "task-1-test",
      userAgent: "curl/8.23.0",
    });

    assert.equal(origin.label, "curl");
    assert.equal(origin.category, "outil");
  });
});
