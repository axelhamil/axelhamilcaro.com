import type { Metadata } from "next";
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
import {
  ScormpilotFaq,
  scormpilotFaqItems,
} from "@/src/features/portfolio-scormpilot/components/scormpilot-faq";
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

export const metadata: Metadata = {
  title: "ScormPilot - Plateforme SaaS e-learning SCORM",
  description:
    "Conception et développement complet d'une plateforme SaaS multi-tenant pour la gestion et diffusion de modules e-learning SCORM. Alternative simple aux LMS rigides.",
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
    title: "ScormPilot - Plateforme SaaS e-learning SCORM",
    description:
      "Plateforme SaaS multi-tenant : gestion, test et diffusion de modules SCORM. Architecture hexagonale, DDD, multi-tenant Identity Platform.",
    url: "/portfolio/scormpilot",
  },
  twitter: {
    card: "summary_large_image",
    title: "ScormPilot - Plateforme SaaS e-learning SCORM",
    description:
      "Plateforme SaaS multi-tenant : gestion, test et diffusion de modules SCORM. Architecture hexagonale, DDD, multi-tenant Identity Platform.",
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
