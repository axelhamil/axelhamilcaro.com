import { RATES } from "@/app/_config/site.constants";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = `TMA d'Axel Hamilcaro : maintenance applicative web et mobile au forfait mensuel, PRO ${RATES.tma.proMonthlyEur} € ou PREMIUM ${RATES.tma.premiumMonthlyEur} €`;
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default function Image() {
  return renderOgImage({
    eyebrow: "Tierce maintenance applicative",
    title: "TMA web et mobile",
    accent: `dès ${RATES.tma.proMonthlyEur} € par mois.`,
    subtitle: `Next.js, React, Node, mobile. PRO ${RATES.tma.proMonthlyEur} € (5 h) ou PREMIUM ${RATES.tma.premiumMonthlyEur} € (10 h, monitoring). Sans engagement.`,
    stamp: { top: "Forfait", bottom: "Mensuel" },
    ribbon: ["TMA", "Bugs", "Sécurité", "Monitoring", "Sans engagement"],
  });
}
