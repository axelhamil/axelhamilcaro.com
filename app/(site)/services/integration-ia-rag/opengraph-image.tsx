import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Service Intégration IA / RAG Freelance — Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Service freelance",
    title: "Intégration IA / RAG",
    subtitle:
      "Vercel AI SDK · OpenAI · Claude · RAG · Agents · Pragmatique, pas du hype",
  });
}
