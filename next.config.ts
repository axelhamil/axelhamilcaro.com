import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { EXTERNAL_LINKS, SOCIAL_LINKS } from "./app/_config/site.constants";

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
    value: "origin-when-cross-origin",
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
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https:",
      "font-src 'self'",
      "connect-src 'self' https://api.github.com https://*.vercel-insights.com https://va.vercel-analytics.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["tsx", "ts", "mdx"],
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
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "axelhamilcaro.com" }],
      destination: "https://www.axelhamilcaro.com/:path*",
      permanent: true,
    },
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
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
