import * as analyticsController from "@/src/features/analytics/analytics.controller";

export async function POST(request: Request) {
  return analyticsController.track(await request.json(), request.headers);
}
