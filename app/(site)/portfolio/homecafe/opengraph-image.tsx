import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Case study HomeCafé — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "HomeCafé — App bien-être",
    subtitle:
      "Web + mobile native · 70+ parcours · 545+ tests BDD · 12 domaines DDD",
  });
}
