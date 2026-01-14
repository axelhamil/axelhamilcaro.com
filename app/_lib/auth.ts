import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError } from "better-auth/api";
import { count, eq, gte, and } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./db/schema";
import { loginAttempts } from "./db/schema";

const ALLOWED_GITHUB_ID = process.env.ADMIN_GITHUB_ID;

interface GitHubUser {
  login: string;
  name: string | null;
  email: string | null;
  avatar_url: string;
  company: string | null;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
}

const TROLL_MESSAGES = [
  "Initialisation du protocole de sécurité...",
  "Vérification des autorisations...",
  "Analyse biométrique en cours...",
  "Consultation de la base de données du FBI...",
  "Envoi d'un email à ta mère...",
  "Téléchargement de ton historique de recherche...",
  "Suppression de ton compte GitHub... (jk)",
  "Activation du mode paranoïa...",
];

function getRandomTrollMessage(): string {
  return TROLL_MESSAGES[Math.floor(Math.random() * TROLL_MESSAGES.length)];
}

async function fetchGitHubUser(githubId: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(`https://api.github.com/user/${githubId}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "axelhamilcaro-admin",
      },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

async function getAttemptCount(githubId: string): Promise<number> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const result = await db
    .select({ count: count() })
    .from(loginAttempts)
    .where(
      and(
        eq(loginAttempts.githubId, githubId),
        gte(loginAttempts.createdAt, oneHourAgo)
      )
    );
  return result[0]?.count ?? 0;
}

async function applyRateLimit(githubId: string): Promise<void> {
  const attempts = await getAttemptCount(githubId);

  if (attempts >= 5) {
    console.warn(
      `[SECURITY] 🚫 Rate limited intruder: GitHub ID=${githubId}, Attempts=${attempts}`
    );
    const banTime = Math.min(attempts * 10, 120);
    await new Promise((resolve) => setTimeout(resolve, banTime * 1000));
  } else if (attempts >= 2) {
    const delay = Math.pow(2, attempts) * 1000;
    console.warn(
      `[SECURITY] ⏳ Slowing down intruder: GitHub ID=${githubId}, Delay=${delay}ms`
    );
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
}

async function logUnauthorizedAttempt(githubId: string) {
  await applyRateLimit(githubId);

  const githubUser = await fetchGitHubUser(githubId);

  await db.insert(loginAttempts).values({
    githubId,
    githubUsername: githubUser?.login ?? null,
    githubEmail: githubUser?.email ?? null,
    githubAvatar: githubUser?.avatar_url ?? null,
    githubName: githubUser?.name ?? null,
    githubCompany: githubUser?.company ?? null,
    githubLocation: githubUser?.location ?? null,
    githubBlog: githubUser?.blog ?? null,
    githubTwitter: githubUser?.twitter_username ?? null,
  });

  console.warn(
    `[SECURITY] 🚨 Unauthorized login attempt: GitHub ID=${githubId}, Username=${githubUser?.login ?? "unknown"}, Location=${githubUser?.location ?? "unknown"}, Message="${getRandomTrollMessage()}"`
  );
}

export const auth = betterAuth({
  appName: "Axel Hamilcaro Admin",
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,

  onAPIError: {
    errorURL: "/nice-try",
  },

  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      mapProfileToUser: async (profile) => {
        if (!ALLOWED_GITHUB_ID) {
          throw new APIError("FORBIDDEN", {
            message: "ADMIN_GITHUB_ID is not configured",
          });
        }

        if (String(profile.id) !== ALLOWED_GITHUB_ID) {
          await logUnauthorizedAttempt(String(profile.id));
          throw new APIError("FORBIDDEN", {
            message: "NICE_TRY",
          });
        }

        return {
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
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

  databaseHooks: {
    account: {
      create: {
        before: async (account) => {
          if (account.providerId === "github" && account.accountId !== ALLOWED_GITHUB_ID) {
            throw new APIError("FORBIDDEN", { message: "NICE_TRY" });
          }
          return { data: account };
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
