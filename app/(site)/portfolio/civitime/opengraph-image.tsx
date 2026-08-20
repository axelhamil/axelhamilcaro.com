import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Case study Civitime, Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "Civitime : plateforme RSE",
    subtitle:
      "4 ans, de dev à lead technique · Clean Architecture + DDD + IA RAG",
  });
}
