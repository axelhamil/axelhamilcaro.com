import * as leadController from "@/src/features/leads/lead.controller";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return leadController.submit(slug, await request.json());
}
