import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import { AboutCredentials } from "@/src/features/about/components/about-credentials";
import { AboutHero } from "@/src/features/about/components/about-hero";
import { AboutMcp } from "@/src/features/about/components/about-mcp";
import { AboutProof } from "@/src/features/about/components/about-proof";
import { AboutStory } from "@/src/features/about/components/about-story";
import { AboutValues } from "@/src/features/about/components/about-values";
import { AboutWorkWithMe } from "@/src/features/about/components/about-work-with-me";
import { PERSON_DESCRIPTION } from "@/src/shared/seo/json-ld";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildProfilePageSchema } from "@/src/shared/seo/schemas/profile-page";

const ABOUT_URL = `${SITE_URL}/about`;

const ABOUT_DESCRIPTION =
  "Je suis Axel Hamilcaro, développeur fullstack et builder à Tours. Chez Eskimoz depuis septembre 2026, 4 ans chez Civitime, freelance depuis fin 2024.";

export const metadata: Metadata = buildPageMetadata({
  title: "À propos : développeur fullstack et builder",
  description: ABOUT_DESCRIPTION,
  path: "/about",
  type: "profile",
});

const profileSchema = buildProfilePageSchema({
  url: ABOUT_URL,
  name: "À propos d'Axel Hamilcaro, développeur fullstack et builder",
  description: PERSON_DESCRIPTION,
});

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "À propos", url: "/about" },
]);

export default function AboutPage() {
  return (
    <main>
      <JsonLdScript data={profileSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <AboutHero />
      <AboutStory />
      <AboutMcp />
      <AboutValues />
      <AboutProof />
      <AboutCredentials />
      <AboutWorkWithMe />
    </main>
  );
}
