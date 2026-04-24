import type { Metadata } from "next";
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
import {
  BilletterieFaq,
  billetterieFaqItems,
} from "@/src/features/portfolio-billetterie/components/billetterie-faq";
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

export const metadata: Metadata = {
  title: "Billetterie Interne - Dashboard de gestion d'événements",
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
    title: "Billetterie Interne - Dashboard de gestion d'événements",
    description:
      "Dashboard interne : plan de salle 2D/3D, ventes en temps réel via WebSocket, gestion automatisée des tarifs et TVA.",
    url: "/portfolio/billetterie",
  },
  twitter: {
    card: "summary_large_image",
    title: "Billetterie Interne - Dashboard de gestion d'événements",
    description:
      "Dashboard interne : plan de salle 2D/3D, ventes en temps réel via WebSocket, gestion automatisée des tarifs et TVA.",
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
