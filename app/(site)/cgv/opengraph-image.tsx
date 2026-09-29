import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Conditions générales de vente B2B d'Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Conditions générales de vente",
    title: "CGV B2B",
    subtitle: "Forfaits TMA et missions freelance · SIRET 939 291 415 00015",
  });
}
