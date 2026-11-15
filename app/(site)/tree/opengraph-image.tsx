import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Liens d'Axel Hamilcaro, développeur fullstack et builder";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Liens",
    title: "Tous mes liens",
    accent: "au même endroit.",
    subtitle:
      "LinkedIn, GitHub, Malt, Instagram, TikTok et prise de rendez-vous.",
    ribbon: [
      "LinkedIn",
      "GitHub",
      "Malt",
      "Instagram",
      "TikTok",
      "Rendez-vous",
    ],
    withPhoto: true,
    stamp: { top: "Liens", bottom: "axelhamilcaro.com" },
  });
}
