import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Axel Hamilcaro, lead tech fractional freelance pour startups et PME";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service · Lead tech à temps partiel",
    title: "Lead tech",
    accent: "fractional.",
    subtitle:
      "Architecture, mentorat, 1 à 3 jours par semaine sur 3 à 18 mois. 4 ans chez Civitime, de dev à lead tech.",
    stamp: { top: "1 à 3 j", bottom: "Par semaine" },
    ribbon: ["Lead tech", "Architecture", "Mentorat", "Startups et PME"],
  });
}
