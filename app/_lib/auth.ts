import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";

export const auth = betterAuth({
  appName: "Axel Hamilcaro Admin",
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },

  account: {
    accountLinking: {
      enabled: false,
    },
  },

  callbacks: {
    async onBeforeSignIn({ user }) {
      const allowedGitHubId = process.env.ADMIN_GITHUB_ID;

      if (!allowedGitHubId) {
        console.error("ADMIN_GITHUB_ID is not configured");
        return { allow: false };
      }

      return { allow: true };
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return user;
        },
      },
    },
    account: {
      create: {
        before: async (account) => {
          const allowedGitHubId = process.env.ADMIN_GITHUB_ID;

          if (account.providerId === "github") {
            if (account.accountId !== allowedGitHubId) {
              throw new Error("Unauthorized: Only the admin can sign in");
            }
          }

          return account;
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
