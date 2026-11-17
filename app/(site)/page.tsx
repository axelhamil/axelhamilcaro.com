import type { Metadata } from "next";
import { HOME_RIBBONS } from "@/app/_config/home-copy";
import { siteConfig } from "@/app/_config/site";
import { X_HANDLE } from "@/app/_config/site.constants";
import Approach from "@/src/features/home/components/approach";
import CaseStudies from "@/src/features/home/components/case-studies";
import { ClientReviews } from "@/src/features/home/components/client-reviews";
import ExperienceTimeline from "@/src/features/home/components/experience-timeline";
import Hero from "@/src/features/home/components/hero/hero";
import { HomeFaq } from "@/src/features/home/components/home-faq";
import { HomeMcp } from "@/src/features/home/components/home-mcp";
import { Now } from "@/src/features/home/components/now";
import WhatIDo from "@/src/features/home/components/what-i-do";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildProfessionalServiceSchema } from "@/src/shared/seo/schemas/professional-service";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";

const HOME_TITLE = "Axel Hamilcaro, développeur fullstack et builder";

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
    site: X_HANDLE,
    creator: X_HANDLE,
  },
};

export default function Home() {
  return (
    <main className="accueil">
      <JsonLdScript data={buildProfessionalServiceSchema()} />
      <Hero />
      <CaseStudies />
      <Now />
      <Approach />
      <HomeMcp />
      <ExperienceTimeline />
      <Ribbon items={HOME_RIBBONS.work} hachures className="pleine-largeur" />
      <WhatIDo />
      <ClientReviews />
      <HomeFaq />
    </main>
  );
}
