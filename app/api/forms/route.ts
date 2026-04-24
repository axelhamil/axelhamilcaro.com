import { headers } from "next/headers";
import * as formController from "@/src/backend/forms/form.controller";

export async function GET() {
  return formController.list(await headers());
}

export async function POST(request: Request) {
  return formController.create(await request.json(), await headers());
}
