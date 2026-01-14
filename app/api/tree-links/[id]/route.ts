import { headers } from "next/headers";
import * as treeLinkController from "@/src/features/tree-links/tree-link.controller";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return treeLinkController.update(id, await request.json(), await headers());
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return treeLinkController.remove(id, await headers());
}
