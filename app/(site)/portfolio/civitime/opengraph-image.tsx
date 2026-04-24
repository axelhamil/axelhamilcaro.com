import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Case study Civitime — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "Civitime — Plateforme RSE",
    subtitle: "Lead technique 4 ans · Clean Architecture + DDD + IA RAG",
  });
}
