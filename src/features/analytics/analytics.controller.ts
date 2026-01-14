import { ZodError } from "zod";
import { authService } from "@/src/features/auth/auth.service";
import { error, json, rateLimited } from "@/src/lib/http";
import { RATE_LIMITS, rateLimit } from "@/src/lib/rate-limit";
import { analyticsService } from "./analytics.service";

export async function track(body: unknown, headers: Headers, clientIp: string) {
  const rateLimitResult = rateLimit(`track:${clientIp}`, RATE_LIMITS.track);
  if (!rateLimitResult.success) {
    return rateLimited(rateLimitResult.retryAfter);
  }

  try {
    const userAgent = headers.get("user-agent");
    await analyticsService.trackEvent(body, userAgent);
    return json({ success: true });
  } catch (err) {
    if (err instanceof ZodError) {
      return error(err.issues[0].message, 400);
    }
    return json({ success: false }, 500);
  }
}

export async function getDashboardStats(headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const stats = await analyticsService.getDashboardStats();
    return json(stats);
  } catch {
    return error("Failed to fetch dashboard stats");
  }
}

export async function getDetailedStats(
  headers: Headers,
  params: { from?: string; to?: string; days?: number },
) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const stats = await analyticsService.getDetailedStats(params);
    return json(stats);
  } catch {
    return error("Failed to fetch analytics");
  }
}
