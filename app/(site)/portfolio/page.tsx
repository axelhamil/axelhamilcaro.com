import type { Metadata } from "next";
import {
  AtelierIndexGroups,
  AtelierIndexHero,
  AtelierWorkCta,
} from "@/src/features/portfolio-atelier/components/atelier-showcase";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Projets", url: "/portfolio" },
]);

export const metadata: Metadata = buildPageMetadata({
  title: "Projets : mes builds et missions",
  description:
    "Mes builds : des produits, des briques TypeScript open source et des outils pour Claude Code, plus trois missions expédiées pour des clients et un employeur.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLdScript data={breadcrumbSchema} />
      <main>
        <AtelierIndexHero />
        <AtelierIndexGroups />
        <AtelierWorkCta />
      </main>
    </>
  );
}
