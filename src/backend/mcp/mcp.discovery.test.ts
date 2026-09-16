import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { SITE_URL } from "../../../app/_config/site.constants";
import {
  getMcpCatalog,
  getServerCard,
  getServerManifest,
} from "./mcp.discovery";

describe("mcp.discovery", () => {
  test("remote URL ends with /mcp", () => {
    const remote = getServerManifest().remotes[0];
    assert.ok(remote);
    assert.equal(remote.url, `${SITE_URL}/mcp`);
    assert.match(remote.url, /\/mcp$/);
  });

  test("catalog lists the server-card URL", () => {
    assert.deepEqual(getMcpCatalog().servers, [
      { url: `${SITE_URL}/mcp/server-card` },
    ]);
    assert.equal(getServerCard().remotes[0]?.url, `${SITE_URL}/mcp`);
  });

  test("manifest does not advertise inquiry tools", () => {
    assert.doesNotMatch(getServerManifest().description, /inquiry/);
  });
});
