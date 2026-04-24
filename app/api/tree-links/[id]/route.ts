import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import * as treeLinkController from "@/src/backend/tree-links/tree-link.controller";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await treeLinkController.update(
    id,
    await request.json(),
    await headers(),
  );
  if (res.ok) revalidatePath("/tree");
  return res;
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const res = await treeLinkController.remove(id, await headers());
  if (res.ok) revalidatePath("/tree");
  return res;
}
