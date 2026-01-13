import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./auth";

const ALLOWED_GITHUB_IDS = process.env.ADMIN_GITHUB_ID
  ? [process.env.ADMIN_GITHUB_ID]
  : [];

const isDev = process.env.NODE_ENV === "development";

export type AuthResult =
  | { success: true; userId: string }
  | { success: false; response: NextResponse };

export async function requireAdminAuth(): Promise<AuthResult> {
  if (isDev) {
    return { success: true, userId: "dev-user" };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      ),
    };
  }

  const userAccounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const githubAccount = userAccounts?.find(
    (account) => account.providerId === "github"
  );

  if (!githubAccount || !ALLOWED_GITHUB_IDS.includes(githubAccount.accountId)) {
    console.warn(
      `[SECURITY] API unauthorized: user=${session.user.id}, github=${githubAccount?.accountId || "none"}`
    );
    return {
      success: false,
      response: NextResponse.json(
        { error: "Accès non autorisé" },
        { status: 403 }
      ),
    };
  }

  return { success: true, userId: session.user.id };
}
