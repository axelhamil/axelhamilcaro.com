import { Bug, Search, ShieldCheck, Sparkles } from "lucide-react";
import { TMA_PRO_DELIVERABLES } from "../lib/tma-data";
import { TmaLivrables } from "./tma-livrables";
import { TmaSectionEntete } from "./tma-section-entete";

const ICONS = [Bug, ShieldCheck, Sparkles, Search] as const;

export function TmaProDetails() {
  return (
    <section id="pro-details" className="svc-section container scroll-mt-24">
      <TmaSectionEntete
        badge={{ label: "PRO", tone: "pro" }}
        eyebrow="// concrètement_sur_le_pro()"
        title="Ce que tu obtiens en 5h / mois."
        intro="Quatre types d'intervention couverts dans ton forfait. Tickets prioritaires (correctifs, sécurité) d'abord, évolutions ensuite."
      />
      <TmaLivrables items={TMA_PRO_DELIVERABLES} icons={ICONS} ombre="gris" />
    </section>
  );
}
