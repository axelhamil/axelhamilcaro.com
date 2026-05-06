import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "TMA Next.js — Tierce Maintenance Applicative | Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Forfait mensuel",
    title: "TMA Next.js",
    subtitle:
      "PRO 350€/mois (5h) · PREMIUM 600€/mois (10h, monitoring) · Sans engagement",
  });
}
