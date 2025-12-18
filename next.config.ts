import type { NextConfig } from "next";

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
      source: "/linkedin",
      destination: "https://www.linkedin.com/in/axelhamilcaro/",
      permanent: true,
    },
    {
      source: "/github",
      destination: "https://github.com/axelhamil",
      permanent: true,
    },
    {
      source: "/malt",
      destination: "https://www.malt.fr/profile/axelhamilcaro",
      permanent: true,
    },
    {
      source: "/rdv",
      destination: "https://calendly.com/axel-hamilcaro-pro/appel-decouverte",
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
