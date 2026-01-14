import { headers } from "next/headers";
import * as analyticsController from "@/src/features/analytics/analytics.controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = {
    from: searchParams.get("from") || undefined,
    to: searchParams.get("to") || undefined,
    days: searchParams.get("days")
      ? Number.parseInt(searchParams.get("days")!, 10)
      : undefined,
  };

  return analyticsController.getDetailedStats(await headers(), params);
}
