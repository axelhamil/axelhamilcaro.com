import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Étude de cas Civitime, plateforme RSE où Axel Hamilcaro est passé de développeur à lead technique";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Étude de cas · 4 ans",
    title: "Civitime",
    accent: "Plateforme RSE.",
    subtitle:
      "De développeur à lead technique. Clean Architecture, DDD, éditeur IA RAG.",
    ribbon: ["Civitime", "EdTech B Corp", "Clean Architecture", "DDD"],
    stamp: { top: "Expédié", bottom: "2024" },
  });
}
