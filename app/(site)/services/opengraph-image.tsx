import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Services freelance d'Axel Hamilcaro, développeur fullstack";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Services freelance",
    title: "5 façons de travailler ensemble",
    subtitle: "Application de A à Z · Dev sur mesure · SaaS · Lead tech · TMA",
  });
}
