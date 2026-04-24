import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Service Lead Technique Fractional — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service freelance",
    title: "Lead tech fractional",
    subtitle:
      "Architecture · Mentorat · 1-3 jours/sem · Référence Civitime 4 ans",
  });
}
