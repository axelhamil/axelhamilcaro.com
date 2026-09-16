import type { CatalogSectionId } from "@/src/backend/mcp/mcp.catalog";
import { getCatalogSection } from "@/src/backend/mcp/mcp.catalog";
import { error, json, rateLimited } from "@/src/lib/http";
import {
  getClientIdentifier,
  RATE_LIMITS,
  rateLimit,
} from "@/src/lib/rate-limit";

const SECTIONS = [
  "whoami",
  "architecture-manifesto",
  "live-status",
  "stack-matrix",
  "case-studies",
  "services",
  "contact",
] as const satisfies readonly CatalogSectionId[];

function isSection(value: string): value is CatalogSectionId {
  return (SECTIONS as readonly string[]).includes(value);
}

export function GET(request: Request) {
  const limited = rateLimit(
    `agent-catalog:${getClientIdentifier(request)}`,
    RATE_LIMITS.api,
  );
  if (!limited.success) return rateLimited(limited.retryAfter);

  const section = new URL(request.url).searchParams.get("section") ?? "whoami";
  if (!isSection(section)) return error("Unknown section", 400);

  return json(getCatalogSection(section));
}
