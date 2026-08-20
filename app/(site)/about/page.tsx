import type { Metadata } from "next";
import { AboutCredentials } from "@/src/features/about/components/about-credentials";
import { AboutHero } from "@/src/features/about/components/about-hero";
import { AboutProof } from "@/src/features/about/components/about-proof";
import { AboutStory } from "@/src/features/about/components/about-story";
import { AboutValues } from "@/src/features/about/components/about-values";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildProfilePageSchema } from "@/src/shared/seo/schemas/profile-page";

const ABOUT_URL = "https://axelhamilcaro.com/about";

export const metadata: Metadata = {
  title: "À propos : dev fullstack freelance",
  description:
    "Développeur web fullstack freelance à Tours, remote France. 4 ans chez Civitime, de dev à lead technique. 10+ projets livrés depuis 2024 en Next.js et React.",
  alternates: { canonical: ABOUT_URL },
  openGraph: {
    title: "À propos : dev fullstack freelance",
    description:
      "Dev fullstack à Tours, Centre-Val de Loire, remote France. 4 ans chez Civitime, de dev à lead technique. 10+ projets livrés depuis 2024. Next.js, React, DDD.",
    url: ABOUT_URL,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos : dev fullstack freelance",
    description:
      "Dev fullstack à Tours, Centre-Val de Loire, remote France. 4 ans chez Civitime, de dev à lead technique. 10+ projets livrés en Next.js, React et Clean Archi.",
  },
};

const profileSchema = buildProfilePageSchema({
  url: ABOUT_URL,
  name: "À propos d'Axel Hamilcaro",
  description:
    "Page de présentation d'Axel Hamilcaro, développeur web fullstack freelance basé à Tours, en Centre-Val de Loire.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
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
