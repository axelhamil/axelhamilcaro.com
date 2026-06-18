import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Blog d'Axel Hamilcaro, développeur freelance Next.js, React & Node.js";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Blog",
    title: "Le blog d'Axel Hamilcaro",
    subtitle:
      "Articles techniques : architecture, sécurité logicielle, Next.js, retours d'expérience",
  });
}
