import { BUILDS_COUNT } from "@/app/_config/projects";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Projets d'Axel Hamilcaro, développeur fullstack et builder : produits, briques TypeScript et outils pour agents";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Projets · Builds et missions",
    title: "Ce que je",
    accent: "fabrique.",
    subtitle:
      "Des produits, des briques TypeScript open source et des outils pour agents IA, plus trois missions expédiées.",
    stamp: { top: "Builds", bottom: `${BUILDS_COUNT}` },
    ribbon: ["Produits", "Briques", "Outils pour agents", "Open source"],
  });
}
