import { auth } from "@/app/_lib/auth";

const ALLOWED_GITHUB_IDS = process.env.ADMIN_GITHUB_ID
  ? [process.env.ADMIN_GITHUB_ID]
  : [];

const allowDevBypass =
  process.env.NODE_ENV === "development" &&
  process.env.ALLOW_DEV_AUTH_BYPASS === "true";

export type AuthResult =
  | { success: true; userId: string }
  | { success: false; error: string; status: 401 | 403 };

export const authService = {
  async requireAdmin(headers: Headers): Promise<AuthResult> {
    if (allowDevBypass) {
      return { success: true, userId: "dev-user" };
    }

    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      return { success: false, error: "Non authentifié", status: 401 };
    }

    const userAccounts = await auth.api.listUserAccounts({ headers });

    const githubAccount = userAccounts?.find(
      (account) => account.providerId === "github",
    );

    if (
      !githubAccount ||
      !ALLOWED_GITHUB_IDS.includes(githubAccount.accountId)
    ) {
      return { success: false, error: "Accès non autorisé", status: 403 };
    }

    return { success: true, userId: session.user.id };
  },
};
