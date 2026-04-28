import type { Metadata } from "next";
import {
  CivitimeFaq,
  civitimeFaqItems,
} from "@/src/features/portfolio-civitime/components/civitime-faq";
import {
  CivitimeArchitecture,
  CivitimeBackdrop,
  CivitimeBottomCta,
  CivitimeContext,
  CivitimeFeatures,
  CivitimeHero,
  CivitimeRoleEvolution,
  CivitimeScreenshots,
  CivitimeStats,
  CivitimeTechStack,
} from "@/src/features/portfolio-civitime/components/civitime-showcase";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "Civitime — Plateforme RSE B Corp",
  description:
    "Lead technique 4 ans sur la refonte complète d'une plateforme RSE B Corp en Clean Architecture + DDD + event sourcing. Conception d'un éditeur IA RAG qui a divisé par 2 les délais d'itération de l'équipe pédagogique.",
  url: "https://axelhamilcaro.com/portfolio/civitime",
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

export const metadata: Metadata = {
  title: "Civitime - Serious Games & Plateforme SaaS RSE",
  description:
    "4 ans chez Civitime : développement de serious games RSE, éditeur de scénarios, puis lead technique sur une plateforme SaaS SCORM multi-tenant.",
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
  alternates: {
    canonical: "/portfolio/civitime",
  },
  openGraph: {
    title: "Civitime - Serious Games & Plateforme SaaS RSE",
    description:
      "4 ans chez Civitime : serious games RSE gamifiés, éditeur interne, lead technique sur plateforme SaaS SCORM multi-tenant.",
    url: "/portfolio/civitime",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civitime - Serious Games & Plateforme SaaS RSE",
    description:
      "4 ans chez Civitime : serious games RSE gamifiés, éditeur interne, lead technique sur plateforme SaaS SCORM multi-tenant.",
  },
};

export default function CivitimePage() {
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
          <CivitimeBackdrop />
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
        </div>
      </main>
    </>
  );
}
