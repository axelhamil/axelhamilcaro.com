import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import {
  ScormpilotFaq,
  scormpilotFaqItems,
} from "@/src/features/portfolio-scormpilot/components/scormpilot-faq";
import {
  ScormpilotArchitecture,
  ScormpilotBottomCta,
  ScormpilotContext,
  ScormpilotFeatures,
  ScormpilotHero,
  ScormpilotScreenshots,
  ScormpilotStats,
  ScormpilotTechStack,
} from "@/src/features/portfolio-scormpilot/components/scormpilot-showcase";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "ScormPilot : SaaS e-learning multi-tenant",
  description:
    "SaaS e-learning multi-tenant développé en solo : 5 applications (API, dashboard, lecteur, runtime SCORM, app Microsoft Teams). Multi-tenancy schema-per-tenant PostgreSQL, milliers de sessions quotidiennes.",
  url: `${SITE_URL}/portfolio/scormpilot`,
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

export const metadata: Metadata = buildPageMetadata({
  title: "ScormPilot : SaaS e-learning SCORM",
  description:
    "J'ai construit ScormPilot en solo : un SaaS de diffusion SCORM pour organismes de formation, 5 apps, multi-tenant PostgreSQL, analytics en temps réel.",
  path: "/portfolio/scormpilot",
  type: "article",
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
});

export default function ScormpilotPage() {
  return (
    <>
      <JsonLdScript data={creativeWorkSchema} />
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <main className="cas cas-scormpilot">
        <ScormpilotHero />
        <ScormpilotStats />
        <ScormpilotContext />
        <ScormpilotScreenshots />
        <ScormpilotFeatures />
        <ScormpilotArchitecture />
        <ScormpilotTechStack />
        <ScormpilotFaq />
        <ScormpilotBottomCta />
      </main>
    </>
  );
}
