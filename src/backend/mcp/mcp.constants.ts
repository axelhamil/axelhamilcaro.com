export const MCP_INQUIRY_SLUG = "mcp-inquiry";
export const MCP_SERVER_NAME = "com.axelhamilcaro/site";
export const MCP_SERVER_VERSION = "1.0.0";
export const NOT_BINDING_QUOTE =
  "This is not a binding quote. Scope and timeline are estimates until a written proposal is signed.";

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
