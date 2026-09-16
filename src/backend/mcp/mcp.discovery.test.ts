import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { MCP } from "../../../app/_config/site.constants";
import {
  getMcpCatalog,
  getMcpGetDiscoveryBody,
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
    assert.deepEqual(getMcpCatalog().servers, [{ url: MCP.serverCardUrl }]);
    assert.equal(getServerCard().remotes[0]?.url, MCP.url);
  });

  test("manifest does not advertise inquiry tools", () => {
    assert.doesNotMatch(getServerManifest().description, /inquiry/);
  });

  test("GET discovery body keeps 405 semantics without looking like a page", () => {
    const body = getMcpGetDiscoveryBody();
    assert.equal(body.remotes[0]?.url, MCP.url);
    assert.deepEqual(body.protocolVersions, ["2026-07-28", "2025-03-26"]);
    assert.match(body.message, /POST Streamable HTTP/);
    assert.match(body.message, /pas une page/);
  });
});
