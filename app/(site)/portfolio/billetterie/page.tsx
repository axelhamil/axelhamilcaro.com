import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import {
  BilletterieFaq,
  billetterieFaqItems,
} from "@/src/features/portfolio-billetterie/components/billetterie-faq";
import {
  BilletterieArchitecture,
  BilletterieBottomCta,
  BilletterieContext,
  BilletterieFeatures,
  BilletterieHero,
  BilletterieScreenshots,
  BilletterieStats,
  BilletterieTechStack,
} from "@/src/features/portfolio-billetterie/components/billetterie-showcase";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildCreativeWorkSchema } from "@/src/shared/seo/schemas/creative-work";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const creativeWorkSchema = buildCreativeWorkSchema({
  name: "Billetterie événementielle interne",
  description:
    "Système de billetterie complet (plan 2D/3D interactif, ventes WebSocket temps réel, gestion automatisée tarifs et TVA) développé en solo en 1 mois.",
  url: `${SITE_URL}/portfolio/billetterie`,
  dateCreated: "2025",
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

export const metadata: Metadata = buildPageMetadata({
  title: "Billetterie : dashboard événements",
  description:
    "J'ai conçu et développé en solo, en 1 mois, un dashboard de billetterie : plan de salle 2D/3D, ventes en temps réel par WebSocket, tarification multi-TVA.",
  path: "/portfolio/billetterie",
  type: "article",
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
});

export default function BilletteriePage() {
  return (
    <>
      <JsonLdScript data={creativeWorkSchema} />
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <main className="cas cas-billetterie">
        <BilletterieHero />
        <BilletterieStats />
        <BilletterieContext />
        <BilletterieScreenshots />
        <BilletterieFeatures />
        <BilletterieArchitecture />
        <BilletterieTechStack />
        <BilletterieFaq />
        <BilletterieBottomCta />
      </main>
    </>
  );
}
