import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { MCP } from "../../../app/_config/site.constants";
import { GET as getServerCardRoute } from "../../../app/mcp/server-card/route";
import {
  getAiCatalog,
  getMcpCatalog,
  getMcpGetDiscoveryBody,
  getMcpGetDiscoveryHeaders,
  getServerCard,
  getServerManifest,
} from "./mcp.discovery";

describe("mcp.discovery", () => {
  test("remote URL ends with /mcp", () => {
    const remote = getServerManifest().remotes[0];
    assert.ok(remote);
    assert.equal(remote.url, MCP.url);
    assert.match(remote.url, /\/mcp$/);
  });

  test("catalog lists the server-card URL", () => {
    const catalog = getMcpCatalog();

    assert.equal(catalog.specVersion, "draft");
    assert.deepEqual(catalog.servers, [{ url: MCP.serverCardUrl }]);
    assert.equal(catalog.entries[0]?.url, MCP.serverCardUrl);
    assert.equal(
      catalog.entries[0]?.mediaType,
      "application/mcp-server-card+json",
    );
    assert.equal(getServerCard().remotes[0]?.url, MCP.url);
  });

  test("server card matches the experimental schema", () => {
    const card = getServerCard();

    assert.equal(
      card.$schema,
      "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json",
    );
    assert.ok(card.description.length <= 100);
    assert.deepEqual(card.remotes[0]?.supportedProtocolVersions, [
      "2026-07-28",
      "2025-03-26",
    ]);
  });

  test("AI catalog is the domain discovery entry", () => {
    const catalog = getAiCatalog();

    assert.equal(catalog.specVersion, "1.0");
    assert.equal(catalog.entries.length, 1);
    assert.equal(catalog.entries[0]?.url, MCP.serverCardUrl);
    assert.equal(catalog.entries[0]?.type, "application/mcp-server-card+json");
    assert.equal(
      catalog.entries[0]?.identifier,
      "urn:air:axelhamilcaro.com:mcp:site",
    );
  });

  test("manifest does not advertise inquiry tools", () => {
    assert.doesNotMatch(getServerManifest().description, /inquiry/);
  });

  test("GET discovery Link points to the AI catalog first", () => {
    const link = getMcpGetDiscoveryHeaders().Link;

    assert.match(link, /well-known\/ai-catalog\.json/);
    assert.ok(link.indexOf("ai-catalog.json") < link.indexOf("mcp.json"));
  });

  test("GET discovery body keeps 405 semantics without looking like a page", () => {
    const body = getMcpGetDiscoveryBody();
    assert.equal(body.remotes[0]?.url, MCP.url);
    assert.deepEqual(body.protocolVersions, ["2026-07-28", "2025-03-26"]);
    assert.match(body.message, /POST Streamable HTTP/);
    assert.match(body.message, /pas une page/);
  });

  test("server card honours If-None-Match", async () => {
    const first = await getServerCardRoute(
      new Request("http://localhost/mcp/server-card"),
    );
    const etag = first.headers.get("ETag");
    assert.ok(etag);

    const second = await getServerCardRoute(
      new Request("http://localhost/mcp/server-card", {
        headers: { "If-None-Match": etag },
      }),
    );
    assert.equal(second.status, 304);
  });
});
