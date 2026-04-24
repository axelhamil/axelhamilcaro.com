import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "À propos — Axel Hamilcaro, développeur full-stack freelance";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "À propos",
    title: "5 ans freelance · 10+ projets livrés",
    subtitle: "Touraine, remote France · Next.js · React · Node.js · Lead tech",
  });
}
