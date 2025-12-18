import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";
import type { ReactNode } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./_components/navbar";
import TronGrid from "./_components/tron-grid";
import { JsonLd } from "./_components/json-ld";
import cn from "../lib/cn";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://axelhamilcaro.com";
const siteName = "Axel Hamilcaro";
const siteDescription =
  "Développeur Full-Stack freelance à Paris. Expert TypeScript, Next.js, React et Node.js. Je crée des applications web et SaaS sur mesure, robustes et scalables pour startups et entreprises françaises.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Axel Hamilcaro | Développeur Full-Stack Freelance Paris - TypeScript & React",
    template: "%s | Axel Hamilcaro - Dev Full-Stack",
  },
  description: siteDescription,
  keywords: [
    // Métier principal
    "développeur full-stack",
    "développeur freelance",
    "développeur web",
    "développeur full-stack freelance",
    "développeur freelance Paris",
    "développeur web Paris",
    // Technologies
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "JavaScript",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "GraphQL",
    "API REST",
    // Services
    "création application web",
    "développement SaaS",
    "refonte site web",
    "création site internet",
    "développement sur mesure",
    "application web sur mesure",
    // Localisation
    "Paris",
    "France",
    "Île-de-France",
    // Qualificatifs
    "clean architecture",
    "scalable",
    "performant",
    "Vercel",
  ],
  authors: [{ name: "Axel Hamilcaro", url: siteUrl }],
  creator: "Axel Hamilcaro",
  publisher: "Axel Hamilcaro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: siteName,
    title:
      "Axel Hamilcaro | Développeur Full-Stack Freelance Paris - TypeScript & React",
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Axel Hamilcaro - Développeur Full-Stack Freelance Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Axel Hamilcaro | Dev Full-Stack Freelance Paris",
    description: siteDescription,
    images: ["/og-image.png"],
    creator: "@axelhamilcaro",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eff1f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e2e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={cn(
        `${geistSans.variable} ${geistMono.variable} antialiased pt-20 sm:pt-25 px-4 sm:px-6 md:px-10 bg-grid transition-all ease-in-out duration-500`,
      )}
    >
      <Head>
        <JsonLd />
      </Head>
      <body className="overflow-x-hidden">
        {/* TRON light trails effect */}
        <TronGrid />
        <Navbar />
        <div className="relative z-10">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
