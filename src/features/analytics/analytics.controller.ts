import { authService } from "@/src/features/auth/auth.service";
import { error, json } from "@/src/lib/http";
import { analyticsService } from "./analytics.service";

export async function getDashboardStats(headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  try {
    const stats = await analyticsService.getDashboardStats();
    return json(stats);
  } catch (_err) {
    return error("Failed to fetch dashboard stats");
  }
}
