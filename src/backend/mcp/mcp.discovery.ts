import { MCP, SITE_URL } from "@/app/_config/site.constants";
import { MCP_SERVER_NAME, MCP_SERVER_VERSION } from "./mcp.constants";

export const MCP_PROTOCOL_VERSIONS = ["2026-07-28", "2025-03-26"] as const;

export function getServerManifest() {
  return {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: MCP_SERVER_NAME,
    description:
      "Public MCP server for Axel Hamilcaro: identity, stack, and case studies.",
    version: MCP_SERVER_VERSION,
    websiteUrl: SITE_URL,
    remotes: [
      {
        type: "streamable-http",
        url: MCP.url,
      },
    ],
  };
}

export function getMcpCatalog() {
  return {
    servers: [{ url: MCP.serverCardUrl }],
  };
}

export function getServerCard() {
  return {
    name: MCP_SERVER_NAME,
    version: MCP_SERVER_VERSION,
    description:
      "Axel Hamilcaro, développeur web fullstack Next.js, React, Node.",
    websiteUrl: SITE_URL,
    remotes: [
      {
        type: "streamable-http",
        url: MCP.url,
        protocolVersions: [...MCP_PROTOCOL_VERSIONS],
      },
    ],
  };
}

export function getMcpGetDiscoveryBody() {
  return {
    ...getServerManifest(),
    protocolVersions: [...MCP_PROTOCOL_VERSIONS],
    message: "POST Streamable HTTP, ce n'est pas une page.",
  };
}

export function getMcpGetDiscoveryHeaders() {
  return {
    Allow: "POST",
    "Cache-Control": "public, max-age=3600",
    "X-Robots-Tag": "noindex, nofollow",
    "Access-Control-Allow-Origin": "*",
    Link: `<${MCP.manifestUrl}>; rel="alternate"; type="application/json", <${MCP.llmsUrl}>; rel="alternate"; type="text/plain"`,
  };
}
