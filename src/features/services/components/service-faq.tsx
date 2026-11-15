import { FaqAccordion } from "@/src/shared/ui/motifs/faq-accordion";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import type { ServiceData } from "../lib/services-data";

interface ServiceFaqProps {
  items: ServiceData["faq"];
  guide?: ServiceData["guide"];
}

export function ServiceFaq({ items, guide }: ServiceFaqProps) {
  return (
    <section className="svc-section container">
      <div className="svc-entete">
        <h2 className="svc-h2 heading-display">
          <AccentTitle text="Tes questions, mes réponses" />
        </h2>
        <p className="svc-intro">
          Questions fréquentes sur ce type de mission.
          {guide && (
            <>
              {" "}
              Mon article de fond :{" "}
              <TransitionLink href={guide.href} className="souligne-trace">
                {guide.title}
              </TransitionLink>
              .
            </>
          )}
        </p>
      </div>
      <FaqAccordion items={items} variant="svc" />
    </section>
  );
}
