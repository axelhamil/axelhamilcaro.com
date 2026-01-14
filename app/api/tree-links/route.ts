import { headers } from "next/headers";
import * as treeLinkController from "@/src/features/tree-links/tree-link.controller";

export async function GET() {
  return treeLinkController.list();
}

export async function POST(request: Request) {
  return treeLinkController.create(await request.json(), await headers());
}
