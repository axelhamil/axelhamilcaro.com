import { toNextJsHandler } from "better-auth/next-js";
import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/app/_lib/auth";

const { GET: originalGET, POST: originalPOST } = toNextJsHandler(auth);

function shouldRedirectToNiceTry(response: Response): boolean {
  if (response.status === 403 || response.status === 401) {
    return true;
  }

  const location = response.headers.get("location");
  if (location?.includes("error=")) {
    return true;
  }

  return false;
}

export async function GET(request: NextRequest) {
  try {
    const response = await originalGET(request);

    if (shouldRedirectToNiceTry(response)) {
      return NextResponse.redirect(new URL("/nice-try", request.url));
    }

    return response;
  } catch {
    return NextResponse.redirect(new URL("/nice-try", request.url));
  }
}

export async function POST(request: NextRequest) {
  try {
    const response = await originalPOST(request);

    if (shouldRedirectToNiceTry(response)) {
      return NextResponse.redirect(new URL("/nice-try", request.url));
    }

    return response;
  } catch {
    return NextResponse.redirect(new URL("/nice-try", request.url));
  }
}
