import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Case study OpenUp — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "OpenUp — SaaS gestion de liens",
    subtitle:
      "Solo + founder en quelques semaines · Hono + Capacitor + Cloudflare",
  });
}
