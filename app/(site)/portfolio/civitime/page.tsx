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
  alternates: {
    canonical: "/portfolio/civitime",
  },
  openGraph: {
    title: "Civitime - Serious Games & Plateforme SaaS RSE",
    description:
      "4 ans chez Civitime : serious games RSE gamifiés, éditeur interne, lead technique sur plateforme SaaS SCORM multi-tenant.",
    url: "/portfolio/civitime",
  },
};

export default function CivitimePage() {
  return (
    <main className="pb-8">
      <CivitimeShowcase />
    </main>
  );
}
