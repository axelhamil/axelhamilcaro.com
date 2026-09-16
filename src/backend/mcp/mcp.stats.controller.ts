import { authService } from "@/src/backend/auth/auth.service";
import { error, json } from "@/src/lib/http";
import { mcpRepository } from "./mcp.repository";

export async function getStats(headers: Headers, days = 7) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  const windowDays = Number.isFinite(days)
    ? Math.min(90, Math.max(1, Math.trunc(days)))
    : 7;
  const from = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000);

  try {
    const stats = await mcpRepository.stats(from);
    return json({ days: windowDays, ...stats });
  } catch {
    return error("MCP telemetry is unavailable. Check migrations.", 503);
  }
}
