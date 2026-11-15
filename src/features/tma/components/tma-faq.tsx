import { FaqAccordion } from "@/src/shared/ui/motifs/faq-accordion";
import { TMA_FAQ } from "../lib/tma-data";
import { TmaSectionEntete } from "./tma-section-entete";

export function TmaFaq() {
  return (
    <section className="svc-section container">
      <TmaSectionEntete
        eyebrow="// questions_fréquentes()"
        title="Tes questions, mes réponses"
        intro="Tout ce qui détermine si la TMA est faite pour toi : dépassement d'heures, résiliation, support, stack, vacances, sous-traitance."
      />
      <FaqAccordion items={TMA_FAQ} variant="svc" />
    </section>
  );
}
