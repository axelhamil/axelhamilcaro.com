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
    eyebrow: "Légal · Prestations B2B",
    title: "Conditions générales",
    accent: "de vente.",
    subtitle:
      "Forfaits TMA et missions freelance, article L.441-1 du Code de commerce.",
    ribbon: ["CGV", "B2B", "TMA", "Missions freelance"],
  });
}
