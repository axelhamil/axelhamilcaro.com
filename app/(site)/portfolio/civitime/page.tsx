import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import {
  CivitimeFaq,
  civitimeFaqItems,
} from "@/src/features/portfolio-civitime/components/civitime-faq";
import {
  CivitimeArchitecture,
  CivitimeBottomCta,
  CivitimeContext,
  CivitimeFeatures,
  CivitimeHero,
  CivitimeRoleEvolution,
  CivitimeScreenshots,
  CivitimeStats,
  CivitimeTechStack,
} from "@/src/features/portfolio-civitime/components/civitime-showcase";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "Civitime : plateforme RSE B Corp",
  description:
    "4 ans chez Civitime, de développeur à lead technique, sur la refonte complète d'une plateforme RSE B Corp en Clean Architecture + DDD + event sourcing. Conception d'un éditeur IA RAG qui a divisé par 2 les délais d'itération de l'équipe pédagogique.",
  url: `${SITE_URL}/portfolio/civitime`,
  dateCreated: "2021",
  keywords: [
    "RSE",
    "B Corp",
    "Clean Architecture",
    "DDD",
    "event sourcing",
    "RAG",
    "GPT-4",
    "Next.js",
    "NestJS",
    "lead technique",
  ],
  applicationCategory: "WebApplication",
});

const faqSchema = buildFaqPageSchema(civitimeFaqItems);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Projets", url: "/#portfolio" },
  { name: "Civitime", url: "/portfolio/civitime" },
]);

export const metadata: Metadata = buildPageMetadata({
  title: "Civitime : SaaS RSE multi-tenant, 4 ans",
  description:
    "J'ai passé 4 ans chez Civitime, B Corp RSE (250 000+ collaborateurs), de dev à lead tech : Clean Architecture et DDD, éditeur IA RAG, SaaS SCORM multi-tenant.",
  path: "/portfolio/civitime",
  type: "article",
  keywords: [
    "Civitime",
    "serious games",
    "RSE",
    "gamification",
    "e-learning",
    "SCORM",
    "engagement collaborateur",
    "développement durable",
    "plateforme SaaS",
    "Axel Hamilcaro",
  ],
});

export default function CivitimePage() {
  return (
    <>
      <JsonLdScript data={creativeWorkSchema} />
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <main className="cas cas-civitime">
        <CivitimeHero />
        <CivitimeStats />
        <CivitimeContext />
        <CivitimeScreenshots />
        <CivitimeRoleEvolution />
        <CivitimeFeatures />
        <CivitimeArchitecture />
        <CivitimeTechStack />
        <CivitimeFaq />
        <CivitimeBottomCta />
      </main>
    </>
  );
}
