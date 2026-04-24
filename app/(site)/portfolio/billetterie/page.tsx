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
        <BilletterieBottomCta />
      </div>
    </main>
  );
}
