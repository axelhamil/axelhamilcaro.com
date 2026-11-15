import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import { Button } from "@/src/shared/ui/portfolio/button";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import type { ServiceData } from "../lib/services-data";
import { ServicePrimaryCta } from "./service-primary-cta";

interface ServiceCtaProps {
  data: ServiceData["hero"];
  ribbon: readonly string[];
}

export function ServiceCta({ data, ribbon }: ServiceCtaProps) {
  return (
    <section className="svc-cta bloc-inverse pleine-largeur">
      <Ribbon items={ribbon} hachures />
      <div className="svc-cta-corps container flex flex-col items-start gap-8">
        <h2 className="svc-h2 heading-display">
          <AccentTitle text="Prêt à lancer ton projet ?" />
        </h2>
        <p className="svc-intro">
          Décris-moi ta situation en 3 lignes. Réponse sous 1h en journée.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
          <ServicePrimaryCta label={data.primaryCtaLabel} />
          <Button href={data.secondaryCtaHref} variant="secondary" size="lg">
            {data.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
