import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Création d'application web de A à Z par Axel Hamilcaro, développeur web freelance";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service · Développeur web freelance",
    title: "Ton application",
    accent: "de A à Z.",
    subtitle:
      "Cadrage, développement avec démo chaque semaine, mise en ligne. Devis sous 24h.",
    stamp: { top: "Devis", bottom: "Sous 24h" },
    ribbon: ["Application web", "Mobile", "Cadrage", "Mise en ligne"],
  });
}
