import { headers } from "next/headers";
import * as analyticsController from "@/src/features/analytics/analytics.controller";

export async function GET() {
  return analyticsController.getDashboardStats(await headers());
}
