import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      const signInUrl = new URL("/api/auth/sign-in/social", request.url);
      signInUrl.searchParams.set("provider", "github");
      signInUrl.searchParams.set(
        "callbackURL",
        request.nextUrl.pathname + request.nextUrl.search
      );
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
