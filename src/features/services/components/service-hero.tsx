import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import { Button } from "@/src/shared/ui/portfolio/button";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import type { ServiceData } from "../lib/services-data";
import { ServicePrimaryCta } from "./service-primary-cta";

interface ServiceHeroProps {
  data: ServiceData["hero"];
  ribbon: readonly string[];
}

export function ServiceHero({ data, ribbon }: ServiceHeroProps) {
  return (
    <section className="trame pleine-largeur">
      <div className="svc-hero-corps container flex flex-col items-start gap-8">
        <div className="flex w-full flex-wrap items-start justify-between gap-6">
          <p className="surtitre">{data.eyebrow}</p>
          <p aria-hidden="true" className="tampon tampon-droite">
            <span className="tampon-haut">Devis</span>{" "}
            <span className="tampon-bas">sous 24h</span>
          </p>
        </div>

        <h1 className="svc-h1 heading-display">
          <AccentTitle text={data.title} />
        </h1>

        <p className="svc-lede">{data.subtitle}</p>

        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
          <ServicePrimaryCta label={data.primaryCtaLabel} />
          <Button href={data.secondaryCtaHref} variant="secondary" size="lg">
            {data.secondaryCtaLabel}
          </Button>
        </div>
      </div>

      <Ribbon items={ribbon} hachures />
    </section>
  );
}
