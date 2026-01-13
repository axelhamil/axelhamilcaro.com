import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/_lib/auth";

const ALLOWED_GITHUB_IDS = process.env.ADMIN_GITHUB_ID
  ? [process.env.ADMIN_GITHUB_ID]
  : [];

const isDev = process.env.NODE_ENV === "development";

export async function proxy(request: NextRequest) {
  if (isDev) {
    console.log("[DEV] Auth bypass enabled for admin routes");
    return NextResponse.next();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return redirectToLogin(request);
  }

  const userAccounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const githubAccount = userAccounts?.find(
    (account) => account.providerId === "github",
  );

  if (!githubAccount || !ALLOWED_GITHUB_IDS.includes(githubAccount.accountId)) {
    console.warn(
      `[SECURITY] Blocked admin access: user=${session.user.id}, github=${githubAccount?.accountId || "none"}`,
    );

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("better-auth.session_token");
    return response;
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "callbackURL",
    request.nextUrl.pathname + request.nextUrl.search,
  );
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
