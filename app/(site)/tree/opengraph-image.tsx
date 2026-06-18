import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Liens et réseaux — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Liens & réseaux",
    title: "Retrouvez Axel Hamilcaro",
    subtitle: "LinkedIn · GitHub · Malt · Instagram · TikTok",
  });
}
