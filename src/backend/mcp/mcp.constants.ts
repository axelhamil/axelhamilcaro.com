import { IDENTITY_TITLE } from "@/app/_config/site.constants";

export const MCP_INQUIRY_SLUG = "mcp-inquiry";
export const MCP_SERVER_NAME = "com.axelhamilcaro/site";
export const MCP_CATALOG_IDENTIFIER = "urn:air:axelhamilcaro.com:mcp:site";
export const MCP_SERVER_VERSION = "1.1.0";
export const MCP_SERVER_DESCRIPTION = `Public MCP server for ${IDENTITY_TITLE}: identity, projects, case studies, services.`;
export const MCP_SERVER_CARD_DESCRIPTION = `${IDENTITY_TITLE}. Briques open source, API et outils.`;
export const MCP_AI_CATALOG_TYPE = "application/ai-catalog+json";
export const MCP_SERVER_CARD_TYPE = "application/mcp-server-card+json";
export const MCP_SERVER_CARD_SCHEMA =
  "https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json";
export const NOT_BINDING_QUOTE =
  "This is not a binding quote. Scope and timeline are estimates until a written proposal is signed.";

export const MCP_STATS_TIME_ZONE = "Europe/Paris";

export const MCP_CLIP = {
  client: 128,
  userAgent: 200,
  method: 64,
  name: 256,
  notes: 5000,
} as const;

export function clip(value: string | null | undefined, max: number) {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length <= max ? trimmed : trimmed.slice(0, max);
}
