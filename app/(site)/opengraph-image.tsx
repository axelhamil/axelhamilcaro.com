import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Axel Hamilcaro, Développeur Fullstack Freelance France";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Portfolio",
    title: "Axel Hamilcaro",
    subtitle:
      "Développeur Fullstack Freelance · Next.js · React · TypeScript · Lead tech",
    withPhoto: true,
  });
}
