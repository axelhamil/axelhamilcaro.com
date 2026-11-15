import {
  getCatalogSection,
  isCatalogSectionId,
} from "@/src/backend/mcp/mcp.catalog";
import { error, json, rateLimited } from "@/src/lib/http";
import {
  getClientIdentifier,
  RATE_LIMITS,
  rateLimit,
} from "@/src/lib/rate-limit";

export function GET(request: Request) {
  const limited = rateLimit(
    `agent-catalog:${getClientIdentifier(request)}`,
    RATE_LIMITS.api,
  );
  if (!limited.success) return rateLimited(limited.retryAfter);

  const section = new URL(request.url).searchParams.get("section") ?? "whoami";
  if (!isCatalogSectionId(section)) return error("Unknown section", 400);

  return json(getCatalogSection(section));
}
