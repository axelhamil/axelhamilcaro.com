import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Développement SaaS B2B en freelance par Axel Hamilcaro : multi-tenant, Clean Architecture et DDD";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service · SaaS B2B",
    title: "Développement SaaS",
    accent: "multi-tenant.",
    subtitle:
      "Clean Architecture et DDD, mise en prod complète. Référence : ScormPilot, 5 apps en solo.",
    stamp: { top: "Devis", bottom: "Sous 24h" },
    ribbon: ["SaaS B2B", "Multi-tenant", "Clean Architecture", "DDD"],
  });
}
