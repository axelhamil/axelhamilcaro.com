import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "OpenUp, générateur de deep links dont Axel Hamilcaro est le fondateur technique";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Produit · Fondateur technique",
    title: "OpenUp",
    accent: "Le lien qui ouvre la vraie app.",
    subtitle:
      "Deep links depuis Instagram et TikTok. Plus de 50 apps, moins de 50 ms depuis l'edge.",
    ribbon: ["OpenUp", "Deep links", "Web, iOS, Android", "openup.to"],
    stamp: { top: "En cours", bottom: "2026" },
  });
}
