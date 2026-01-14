export type TrafficCategory =
  | "direct"
  | "organic_search"
  | "social"
  | "email"
  | "paid"
  | "referral";

interface TrafficSource {
  name: string;
  category: TrafficCategory;
  domain?: string;
}

const SEARCH_ENGINES: Record<string, string> = {
  "google.com": "Google",
  "google.fr": "Google",
  "bing.com": "Bing",
  "duckduckgo.com": "DuckDuckGo",
  "yahoo.com": "Yahoo",
  "baidu.com": "Baidu",
  "yandex.com": "Yandex",
  "ecosia.org": "Ecosia",
  "qwant.com": "Qwant",
};

const SOCIAL_NETWORKS: Record<string, string> = {
  "linkedin.com": "LinkedIn",
  "twitter.com": "Twitter",
  "x.com": "X (Twitter)",
  "facebook.com": "Facebook",
  "instagram.com": "Instagram",
  "youtube.com": "YouTube",
  "tiktok.com": "TikTok",
  "reddit.com": "Reddit",
  "pinterest.com": "Pinterest",
  "github.com": "GitHub",
  "medium.com": "Medium",
  "discord.com": "Discord",
  "slack.com": "Slack",
  "threads.net": "Threads",
  "mastodon.social": "Mastodon",
  "bsky.app": "Bluesky",
};

const EMAIL_PROVIDERS: Record<string, string> = {
  "mail.google.com": "Gmail",
  "outlook.live.com": "Outlook",
  "outlook.office.com": "Outlook",
  "mail.yahoo.com": "Yahoo Mail",
};

export function extractDomain(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function categorizeReferrer(referrer: string | null): TrafficSource {
  if (!referrer) {
    return { name: "Direct", category: "direct" };
  }

  const domain = extractDomain(referrer);
  if (!domain) {
    return { name: "Direct", category: "direct" };
  }

  const baseDomain = domain.split(".").slice(-2).join(".");

  if (SEARCH_ENGINES[domain] || SEARCH_ENGINES[baseDomain]) {
    return {
      name: SEARCH_ENGINES[domain] || SEARCH_ENGINES[baseDomain],
      category: "organic_search",
      domain,
    };
  }

  if (SOCIAL_NETWORKS[domain] || SOCIAL_NETWORKS[baseDomain]) {
    return {
      name: SOCIAL_NETWORKS[domain] || SOCIAL_NETWORKS[baseDomain],
      category: "social",
      domain,
    };
  }

  if (EMAIL_PROVIDERS[domain]) {
    return {
      name: EMAIL_PROVIDERS[domain],
      category: "email",
      domain,
    };
  }

  return {
    name: capitalizeFirstLetter(baseDomain.split(".")[0]),
    category: "referral",
    domain,
  };
}

export function categorizeFromUtm(
  utmSource: string | null,
  utmMedium: string | null,
): TrafficSource | null {
  if (!utmSource && !utmMedium) return null;

  const source = utmSource?.toLowerCase() || "";
  const medium = utmMedium?.toLowerCase() || "";

  if (medium === "cpc" || medium === "ppc" || medium === "paid") {
    return {
      name: capitalizeFirstLetter(source) || "Paid",
      category: "paid",
    };
  }

  if (medium === "email" || medium === "newsletter") {
    return {
      name: capitalizeFirstLetter(source) || "Email",
      category: "email",
    };
  }

  if (medium === "social" || medium === "organic_social") {
    return {
      name: capitalizeFirstLetter(source) || "Social",
      category: "social",
    };
  }

  if (medium === "organic" || medium === "search") {
    return {
      name: capitalizeFirstLetter(source) || "Organic",
      category: "organic_search",
    };
  }

  if (source) {
    return {
      name: capitalizeFirstLetter(source),
      category: "referral",
    };
  }

  return null;
}

export function getTrafficSource(
  referrer: string | null,
  utmSource: string | null,
  utmMedium: string | null,
): TrafficSource {
  const utmBased = categorizeFromUtm(utmSource, utmMedium);
  if (utmBased) return utmBased;

  return categorizeReferrer(referrer);
}

function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const CATEGORY_LABELS: Record<TrafficCategory, string> = {
  direct: "Direct",
  organic_search: "Recherche organique",
  social: "Réseaux sociaux",
  email: "Email",
  paid: "Payant",
  referral: "Référent",
};

export const CATEGORY_COLORS: Record<TrafficCategory, string> = {
  direct: "#6b7280",
  organic_search: "#22c55e",
  social: "#3b82f6",
  email: "#f59e0b",
  paid: "#ef4444",
  referral: "#8b5cf6",
};
