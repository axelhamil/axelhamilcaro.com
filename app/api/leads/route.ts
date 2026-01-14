import { headers } from "next/headers";
import * as leadController from "@/src/features/leads/lead.controller";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const formId = searchParams.get("formId") ?? undefined;
  return leadController.list(formId, await headers());
}

export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  return leadController.update(id, await request.json(), await headers());
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  return leadController.remove(id, await headers());
}
