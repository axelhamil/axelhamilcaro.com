import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Service Création d'application web, Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service freelance",
    title: "Création d'application web de A à Z",
    subtitle: "Cadrage, développement, mise en ligne · Devis sous 24h",
  });
}
