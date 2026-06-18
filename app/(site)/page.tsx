import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { siteConfig } from "@/app/_config/site";
import Hero from "@/src/features/home/components/hero/hero";
import { HomeFaq } from "@/src/features/home/components/home-faq";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "Axel Hamilcaro, Développeur Web Fullstack | Next.js | React | Node",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Axel Hamilcaro, Développeur Web Fullstack | Next.js | React | Node",
    description: siteConfig.description,
    creator: "@axelhamilcaro",
  },
};

const ExperienceTimeline = dynamic(
  () => import("@/src/features/home/components/experience-timeline"),
);

const WhatIDo = dynamic(
  () => import("@/src/features/home/components/what-i-do"),
);

const Approach = dynamic(
  () => import("@/src/features/home/components/approach"),
);

const CaseStudies = dynamic(
  () => import("@/src/features/home/components/case-studies"),
);

const TrustedBy = dynamic(
  () => import("@/src/features/home/components/trusted-by"),
);

const TechStack = dynamic(
  () => import("@/src/features/home/components/tech-stack"),
);

export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <WhatIDo />
      <Approach />
      <CaseStudies />
      <TrustedBy />
      <TechStack />
      <HomeFaq />
    </main>
  );
}
