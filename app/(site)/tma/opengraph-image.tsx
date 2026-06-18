import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "TMA (tierce maintenance applicative) pour app web et mobile | Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Tierce Maintenance Applicative",
    title: "TMA web et mobile",
    subtitle:
      "Next.js · React · Node · infra légère · PRO 350€/mois · PREMIUM 800€/mois · sans engagement",
  });
}
