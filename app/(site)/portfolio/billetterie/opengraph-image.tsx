import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Case study Billetterie — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "Billetterie événementielle",
    subtitle: "Plan 2D/3D + WebSocket temps réel · Solo en 1 mois",
  });
}
