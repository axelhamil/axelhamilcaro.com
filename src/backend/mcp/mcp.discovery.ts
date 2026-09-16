import { MCP, SITE_URL } from "@/app/_config/site.constants";
import {
  MCP_AI_CATALOG_TYPE,
  MCP_CATALOG_IDENTIFIER,
  MCP_SERVER_CARD_SCHEMA,
  MCP_SERVER_CARD_TYPE,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
} from "./mcp.constants";

export const MCP_PROTOCOL_VERSIONS = ["2025-03-26", "2026-07-28"] as const;

export function getMcpCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Mcp-Method, Mcp-Name, Last-Event-ID, If-None-Match",
    "Access-Control-Expose-Headers":
      "ETag, Allow, Link, MCP-Protocol-Version, Mcp-Session-Id",
    "Access-Control-Max-Age": "86400",
  };
}

export function getDiscoveryHeaders(contentType = "application/json") {
  return {
    "Content-Type": `${contentType}; charset=utf-8`,
    "Cache-Control": "public, max-age=3600",
    ...getMcpCorsHeaders(),
  };
}

export function getServerManifest() {
  return {
    $schema:
      "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json",
    name: MCP_SERVER_NAME,
    title: "Axel Hamilcaro",
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
    specVersion: "draft",
    entries: [
      {
        identifier: MCP_CATALOG_IDENTIFIER,
        displayName: "Axel Hamilcaro",
        mediaType: MCP_SERVER_CARD_TYPE,
        url: MCP.serverCardUrl,
      },
    ],
    servers: [{ url: MCP.serverCardUrl }],
  };
}

export function getAiCatalog() {
  return {
    specVersion: "1.0",
    entries: [
      {
        identifier: MCP_CATALOG_IDENTIFIER,
        type: MCP_SERVER_CARD_TYPE,
        url: MCP.serverCardUrl,
      },
    ],
  };
}

export function getServerCard() {
  return {
    $schema: MCP_SERVER_CARD_SCHEMA,
    name: MCP_SERVER_NAME,
    title: "Axel Hamilcaro",
    version: MCP_SERVER_VERSION,
    description:
      "Axel Hamilcaro, développeur web fullstack Next.js, React, Node.",
    websiteUrl: SITE_URL,
    remotes: [
      {
        type: "streamable-http",
        url: MCP.url,
        supportedProtocolVersions: [...MCP_PROTOCOL_VERSIONS],
      },
    ],
  };
}

export function getMcpGetDiscoveryBody() {
  return {
    ...getServerManifest(),
    protocolVersions: [...MCP_PROTOCOL_VERSIONS],
    message:
      "POST Streamable HTTP, ce n'est pas une page. Cursor et Claude: JSON-RPC initialize avec protocolVersion 2025-03-26 (un header 2026 est ignoré, le serveur négocie 2025-03-26). Client 2026-07-28: server/discover plus le header.",
  };
}

export function getMcpGetDiscoveryHeaders() {
  return {
    ...getDiscoveryHeaders(),
    Allow: "POST",
    "X-Robots-Tag": "noindex, nofollow",
    Link: [
      `<${MCP.aiCatalogUrl}>; rel="alternate"; type="${MCP_AI_CATALOG_TYPE}"`,
      `<${MCP.serverCardUrl}>; rel="alternate"; type="${MCP_SERVER_CARD_TYPE}"`,
      `<${MCP.manifestUrl}>; rel="alternate"; type="application/json"`,
      `<${MCP.llmsUrl}>; rel="alternate"; type="text/plain"`,
    ].join(", "),
  };
}
