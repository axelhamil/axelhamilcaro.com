import type { Metadata } from "next";
import { siteConfig } from "./site";
import { IDENTITY_TITLE, X_HANDLE } from "./site.constants";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: IDENTITY_TITLE,
    template: "%s · Axel Hamilcaro",
  },
  description: siteConfig.description,
  keywords: [
    "Axel Hamilcaro",
    "développeur fullstack",
    "builder",
    "clean-stack",
    "open source",
    "développeur fullstack freelance",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "serveur MCP",
    "Tours",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: IDENTITY_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: IDENTITY_TITLE,
    description: siteConfig.description,
    site: X_HANDLE,
    creator: X_HANDLE,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/manifest.json",
  category: "technology",
};
