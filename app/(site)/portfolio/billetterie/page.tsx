import type { Metadata } from "next";
import {
  BilletterieFaq,
  billetterieFaqItems,
} from "@/src/features/portfolio-billetterie/components/billetterie-faq";
import {
  BilletterieArchitecture,
  BilletterieBackdrop,
  BilletterieBottomCta,
  BilletterieContext,
  BilletterieFeatures,
  BilletterieHero,
  BilletterieScreenshots,
  BilletterieStats,
  BilletterieTechStack,
} from "@/src/features/portfolio-billetterie/components/billetterie-showcase";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "Billetterie événementielle interne",
  description:
    "Système de billetterie complet (plan 2D/3D interactif, ventes WebSocket temps réel, gestion automatisée tarifs et TVA) développé en solo en 1 mois.",
  url: "https://axelhamilcaro.com/portfolio/billetterie",
  dateCreated: "2024",
  keywords: [
    "billetterie",
    "WebSocket",
    "Three.js",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "temps réel",
    "événementiel",
  ],
  applicationCategory: "BusinessApplication",
});

const faqSchema = buildFaqPageSchema(billetterieFaqItems);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Projets", url: "/#portfolio" },
  { name: "Billetterie événementielle", url: "/portfolio/billetterie" },
]);

export const metadata: Metadata = {
  title: "Billetterie — Dashboard événements",
  description:
    "Conception et développement d'un dashboard interne de gestion d'événements et ventes en temps réel. Plan de salle 2D/3D, WebSocket, tarification multi-TVA.",
  keywords: [
    "Billetterie",
    "Dashboard",
    "Temps réel",
    "WebSocket",
    "Plan de salle",
    "3D",
    "Tarification",
    "TVA",
    "NestJS",
    "Next.js",
    "Axel Hamilcaro",
  ],
  alternates: {
    canonical: "/portfolio/billetterie",
  },
  openGraph: {
    title: "Billetterie — Dashboard événements",
    description:
      "Dashboard interne : plan de salle 2D/3D, ventes temps réel via WebSocket, gestion automatisée tarifs et TVA. Solo, 1 mois (Next.js, NestJS, PostgreSQL).",
    url: "/portfolio/billetterie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billetterie — Dashboard événements",
    description:
      "Dashboard interne : plan de salle 2D/3D, ventes temps réel via WebSocket, gestion automatisée tarifs et TVA. Livré en solo en 1 mois.",
  },
};

export default function BilletteriePage() {
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
          <BilletterieBackdrop />
          <BilletterieHero />
          <BilletterieStats />
          <BilletterieContext />
          <BilletterieScreenshots />
          <BilletterieFeatures />
          <BilletterieArchitecture />
          <BilletterieTechStack />
          <BilletterieFaq />
          <BilletterieBottomCta />
        </div>
      </main>
    </>
  );
}
