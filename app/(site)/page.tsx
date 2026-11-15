import type { Metadata } from "next";
import { siteConfig } from "@/app/_config/site";
import Approach from "@/src/features/home/components/approach";
import CaseStudies from "@/src/features/home/components/case-studies";
import { ClientReviews } from "@/src/features/home/components/client-reviews";
import ExperienceTimeline from "@/src/features/home/components/experience-timeline";
import Hero from "@/src/features/home/components/hero/hero";
import { HomeFaq } from "@/src/features/home/components/home-faq";
import { HomeMcp } from "@/src/features/home/components/home-mcp";
import TechStack from "@/src/features/home/components/tech-stack";
import WhatIDo from "@/src/features/home/components/what-i-do";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildProfessionalServiceSchema } from "@/src/shared/seo/schemas/professional-service";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";

const HOME_TITLE = "Axel Hamilcaro, développeur fullstack et builder";

const WORK_RIBBON = [
  "Travailler avec moi",
  "Application web",
  "SaaS multi-tenant",
  "Lead tech fractional",
  "TMA au mois",
  "MVP",
  "Refonte",
  "Reprise de projet",
  "iOS et Android",
  "Démo chaque semaine",
  "Mise en ligne",
  "Maintenance",
  "Un seul interlocuteur",
] as const;

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: HOME_TITLE,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: siteConfig.description,
    creator: "@axelhamilcaro",
  },
};

export default function Home() {
  return (
    <main className="accueil">
      <JsonLdScript data={buildProfessionalServiceSchema()} />
      <Hero />
      <CaseStudies />
      <Approach />
      <ExperienceTimeline />
      <HomeMcp />
      <Ribbon items={WORK_RIBBON} hachures className="pleine-largeur" />
      <WhatIDo />
      <ClientReviews />
      <TechStack />
      <HomeFaq />
    </main>
  );
}
