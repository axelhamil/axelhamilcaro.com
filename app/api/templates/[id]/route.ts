import { headers } from "next/headers";
import * as templateController from "@/src/backend/templates/template.controller";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return templateController.remove(id, await headers());
}
