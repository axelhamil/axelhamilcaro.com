import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CivitimeShowcase = dynamic(
  () => import("./_components/civitime-showcase"),
  { ssr: true },
);

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
    <main className="pb-8">
      <CivitimeShowcase />
    </main>
  );
}
