import { headers } from "next/headers";
import * as formController from "@/src/features/forms/form.controller";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  return formController.getById(id, await headers());
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  return formController.update(id, await request.json(), await headers());
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  return formController.remove(id, await headers());
}
