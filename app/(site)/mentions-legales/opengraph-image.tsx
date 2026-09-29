import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Mentions légales d'axelhamilcaro.com";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Informations légales",
    title: "Mentions légales",
    subtitle:
      "Axel Hamilcaro EI · SIRET 939 291 415 00015 · hébergé par Vercel",
  });
}
