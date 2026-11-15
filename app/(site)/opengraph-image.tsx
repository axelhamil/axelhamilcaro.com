import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Axel Hamilcaro, développeur fullstack et builder";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Axel Hamilcaro",
    title: "Développeur fullstack",
    accent: "& builder.",
    subtitle:
      "Je construis mes propres produits et outils : clean-stack, weathertop, afterlive, des outils open source.",
    stamp: { top: "Build log", bottom: "N° 001" },
    withPhoto: true,
  });
}
