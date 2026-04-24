import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Case study ScormPilot — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "ScormPilot — SaaS e-learning",
    subtitle:
      "5 apps en solo · Multi-tenant · Milliers de sessions quotidiennes",
  });
}
