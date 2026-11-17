import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { HTML_LIMITED_BOT_UA_RE } from "next/dist/shared/lib/router/utils/html-bots";
import {
  EXTERNAL_LINKS,
  MCP,
  SOCIAL_LINKS,
} from "./app/_config/site.constants";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self'${isDev ? " 'unsafe-eval'" : ""} 'unsafe-inline' https://va.vercel-scripts.com https://challenges.cloudflare.com`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.github.com https://*.vercel-insights.com https://va.vercel-analytics.com https://challenges.cloudflare.com",
      "frame-src https://challenges.cloudflare.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const blockingMetadataBots = [
  "Googlebot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "MistralAI-User",
  "MistralAI-Index",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
  "Bytespider",
];

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
  htmlLimitedBots: new RegExp(
    [HTML_LIMITED_BOT_UA_RE.source, ...blockingMetadataBots].join("|"),
    "i",
  ),
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    viewTransition: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  turbopack: {
    root: process.cwd(),
  },
  redirects: async () => [
    {
      source: "/linkedin",
      destination: EXTERNAL_LINKS.linkedin,
      permanent: true,
    },
    {
      source: "/github",
      destination: EXTERNAL_LINKS.github,
      permanent: true,
    },
    {
      source: "/malt",
      destination: EXTERNAL_LINKS.malt,
      permanent: true,
    },
    {
      source: "/projects/:slug",
      destination: "/portfolio/:slug",
      permanent: true,
    },
    {
      source: "/rdv",
      destination: EXTERNAL_LINKS.calendly,
      permanent: true,
    },
    {
      source: "/x",
      destination: SOCIAL_LINKS.x,
      permanent: true,
    },
    {
      source: "/reddit",
      destination: SOCIAL_LINKS.reddit,
      permanent: true,
    },
    {
      source: "/instagram",
      destination: SOCIAL_LINKS.instagram,
      permanent: true,
    },
    {
      source: "/tiktok",
      destination: SOCIAL_LINKS.tiktok,
      permanent: true,
    },
    {
      source: "/therac-25",
      destination: "/blog/therac-25",
      permanent: true,
    },
    {
      source: "/blog/:slug/:image(opengraph-image[^/]*)",
      destination: "/blog/:slug/og",
      permanent: true,
    },
  ],
  headers: async () => {
    const originTrials = [
      process.env.ORIGIN_TRIAL_CHROME,
      process.env.ORIGIN_TRIAL_EDGE,
    ].filter((token): token is string => Boolean(token));

    return [
      {
        source: "/(.*)",
        headers: [
          ...securityHeaders,
          {
            key: "Link",
            value: [
              `<${MCP.aiCatalogUrl}>; rel="alternate"; type="application/ai-catalog+json"`,
              `<${MCP.serverCardUrl}>; rel="alternate"; type="application/mcp-server-card+json"`,
              `<${MCP.manifestUrl}>; rel="alternate"; type="application/json"`,
              `<${MCP.llmsUrl}>; rel="alternate"; type="text/plain"`,
            ].join(", "),
          },
          ...originTrials.map((value) => ({
            key: "Origin-Trial",
            value,
          })),
        ],
      },
      ...["/admin", "/admin/:path*", "/login", "/nice-try", "/f/:path*"].map(
        (source) => ({
          source,
          headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
        }),
      ),
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
