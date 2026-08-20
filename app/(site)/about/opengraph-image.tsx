import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "À propos d'Axel Hamilcaro, développeur web fullstack freelance";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "À propos",
    title: "4 ans de dev à lead tech · freelance depuis 2024 · 10+ projets",
    subtitle:
      "Tours, Centre-Val de Loire, remote France · Next.js · React · Node.js",
    withPhoto: true,
  });
}
