import * as leadController from "@/src/features/leads/lead.controller";
import { getClientIdentifier } from "@/src/lib/rate-limit";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const clientIp = getClientIdentifier(request);
  return leadController.submit(slug, await request.json(), clientIp);
}
