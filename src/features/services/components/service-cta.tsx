import { Button } from "@/src/shared/ui/portfolio/button";
import type { ServiceData } from "../lib/services-data";

export function ServiceCta({ data }: { data: ServiceData["hero"] }) {
  return (
    <section className="py-20 px-6 bg-primary text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Prêt à lancer ton projet ?
        </h2>
        <p className="text-lg mb-10 opacity-80">
          Décris-moi ta situation en 3 lignes. Réponse sous 1h en journée.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={data.primaryCtaHref} variant="primary" size="lg">
            {data.primaryCtaLabel}
          </Button>
          <Button href={data.secondaryCtaHref} variant="secondary" size="lg">
            {data.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
