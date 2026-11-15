import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt =
  "Étude de cas ScormPilot, SaaS e-learning SCORM conçu par Axel Hamilcaro";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Étude de cas · SaaS",
    title: "ScormPilot",
    accent: "SaaS e-learning SCORM.",
    subtitle: "5 apps en solo, multi-tenant PostgreSQL, analytics temps réel.",
    ribbon: ["ScormPilot", "SCORM", "Multi-tenant", "Conçu en solo"],
    stamp: { top: "Expédié", bottom: "2025" },
  });
}
