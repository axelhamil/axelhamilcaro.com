import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as treeLinkController from "@/src/features/tree-links/tree-link.controller";

export async function POST(request: Request) {
  const res = await treeLinkController.reorder(
    await request.json(),
    await headers(),
  );
  if (res.ok) revalidatePath("/tree");
  return res;
}
