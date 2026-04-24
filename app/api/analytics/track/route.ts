import * as analyticsController from "@/src/backend/analytics/analytics.controller";
import { getClientIdentifier } from "@/src/lib/rate-limit";

export async function POST(request: Request) {
  const clientIp = getClientIdentifier(request);
  return analyticsController.track(
    await request.json(),
    request.headers,
    clientIp,
  );
}
