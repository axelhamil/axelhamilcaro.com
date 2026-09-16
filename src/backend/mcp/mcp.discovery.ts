import { SITE_URL } from "@/app/_config/site.constants";
import { MCP_SERVER_NAME, MCP_SERVER_VERSION } from "./mcp.constants";

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
        url: `${SITE_URL}/mcp`,
      },
    ],
  };
}

export function getMcpCatalog() {
  return {
    servers: [{ url: `${SITE_URL}/mcp/server-card` }],
  };
}

export function getServerCard() {
  return {
    name: MCP_SERVER_NAME,
    version: MCP_SERVER_VERSION,
    description:
      "Axel Hamilcaro — développeur web fullstack Next.js, React, Node.",
    websiteUrl: SITE_URL,
    remotes: [
      {
        type: "streamable-http",
        url: `${SITE_URL}/mcp`,
        protocolVersions: ["2026-07-28", "2025-03-26"],
      },
    ],
  };
}
