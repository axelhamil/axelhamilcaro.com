import type { Metadata } from "next";
import {
  ScormpilotFaq,
  scormpilotFaqItems,
} from "@/src/features/portfolio-scormpilot/components/scormpilot-faq";
import {
  ScormpilotArchitecture,
  ScormpilotBackdrop,
  ScormpilotBottomCta,
  ScormpilotContext,
  ScormpilotFeatures,
  ScormpilotHero,
  ScormpilotScreenshots,
  ScormpilotStats,
  ScormpilotTechStack,
} from "@/src/features/portfolio-scormpilot/components/scormpilot-showcase";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "ScormPilot — SaaS e-learning multi-tenant",
  description:
    "SaaS e-learning multi-tenant développé en solo : 5 applications (API, dashboard, lecteur SCORM, runtime SCORM, app Microsoft Teams). Multi-tenancy schema-per-tenant PostgreSQL, milliers de sessions quotidiennes.",
  url: "https://axelhamilcaro.com/portfolio/scormpilot",
  dateCreated: "2025",
  keywords: [
    "SaaS",
    "e-learning",
    "SCORM",
    "multi-tenant",
    "Next.js",
    "Fastify",
    "PostgreSQL",
    "GCP",
    "Microsoft Teams",
    "Clean Architecture",
  ],
  applicationCategory: "BusinessApplication",
});

const faqSchema = buildFaqPageSchema(scormpilotFaqItems);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Projets", url: "/#portfolio" },
  { name: "ScormPilot", url: "/portfolio/scormpilot" },
]);

export const metadata: Metadata = {
  title: "ScormPilot — SaaS e-learning SCORM",
  description:
    "SaaS e-learning multi-tenant en solo : 5 apps (API, dashboard, lecteur SCORM, runtime, Teams). PostgreSQL schema-per-tenant. Alternative légère aux LMS rigides.",
  keywords: [
    "ScormPilot",
    "SCORM",
    "e-learning",
    "SaaS",
    "LMS",
    "multi-tenant",
    "formation en ligne",
    "plateforme e-learning",
    "gestion SCORM",
    "Axel Hamilcaro",
  ],
  alternates: {
    canonical: "/portfolio/scormpilot",
  },
  openGraph: {
    title: "ScormPilot — SaaS e-learning SCORM",
    description:
      "SaaS multi-tenant SCORM : 5 apps solo (API, dashboard, lecteur, runtime, Teams). Architecture hexagonale, DDD, PostgreSQL schema-per-tenant.",
    url: "/portfolio/scormpilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScormPilot — SaaS e-learning SCORM",
    description:
      "SaaS multi-tenant SCORM : 5 apps solo (API, dashboard, lecteur, runtime, Teams). Architecture hexagonale, DDD, PostgreSQL schema-per-tenant.",
  },
};

export default function ScormpilotPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pb-8">
        <div className="relative">
          <ScormpilotBackdrop />
          <ScormpilotHero />
          <ScormpilotStats />
          <ScormpilotContext />
          <ScormpilotScreenshots />
          <ScormpilotFeatures />
          <ScormpilotArchitecture />
          <ScormpilotTechStack />
          <ScormpilotFaq />
          <ScormpilotBottomCta />
        </div>
      </main>
    </>
  );
}
