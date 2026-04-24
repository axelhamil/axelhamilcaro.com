import { headers } from "next/headers";
import * as analyticsController from "@/src/backend/analytics/analytics.controller";

export async function GET() {
  return analyticsController.getDashboardStats(await headers());
}
