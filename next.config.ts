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
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    viewTransition: true,
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
  ],
  headers: async () => [
    {
      source: "/(.*)",
      headers: securityHeaders,
    },
  ],
};

export default nextConfig;
