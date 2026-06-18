import type { Metadata } from "next";
import { AboutCredentials } from "@/src/features/about/components/about-credentials";
import { AboutHero } from "@/src/features/about/components/about-hero";
import { AboutProof } from "@/src/features/about/components/about-proof";
import { AboutStory } from "@/src/features/about/components/about-story";
import { AboutValues } from "@/src/features/about/components/about-values";
import { buildAboutPageSchema } from "@/src/shared/seo/schemas/about-page";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";

const ABOUT_URL = "https://axelhamilcaro.com/about";

export const metadata: Metadata = {
  title: "À propos : dev fullstack freelance",
  description:
    "Développeur web fullstack freelance en Touraine, remote France. 4 ans lead tech chez Civitime, freelance depuis 2024, 10+ projets livrés en Next.js et React.",
  alternates: { canonical: ABOUT_URL },
  openGraph: {
    title: "À propos : dev fullstack freelance",
    description:
      "Dev fullstack en Touraine, remote France. 4 ans lead tech chez Civitime, freelance depuis 2024, 10+ projets livrés. Next.js, React, Node.js, Clean Architecture / DDD.",
    url: ABOUT_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos : dev fullstack freelance",
    description:
      "Dev fullstack en Touraine, remote France. 4 ans lead tech chez Civitime, freelance depuis 2024. 10+ projets livrés en Next.js, React, Node.js et Clean Architecture.",
  },
};

const aboutSchema = buildAboutPageSchema({
  url: ABOUT_URL,
  name: "À propos d'Axel Hamilcaro",
  description:
    "Page de présentation d'Axel Hamilcaro, développeur web fullstack freelance basé en Touraine.",
});

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "À propos", url: "/about" },
]);

export default function AboutPage() {
  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutCredentials />
      <AboutProof />
    </main>
  );
}
