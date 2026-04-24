import { headers } from "next/headers";
import * as templateController from "@/src/backend/templates/template.controller";

export async function GET() {
  return templateController.list(await headers());
}

export async function POST(request: Request) {
  return templateController.create(await request.json(), await headers());
}
