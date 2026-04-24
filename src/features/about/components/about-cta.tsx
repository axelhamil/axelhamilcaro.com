import { CONTACT, EXTERNAL_LINKS } from "@/app/_config/site.constants";
import { Button } from "@/src/shared/ui/portfolio/button";

export function AboutCta() {
  return (
    <section className="py-20 sm:py-32 px-6 bg-primary text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Ton projet a besoin d'un développeur qui pense produit ?
        </h2>
        <p className="text-lg leading-relaxed mb-10 opacity-80">
          Décris-moi ta situation en 3 lignes. Je te réponds dans l'heure avec
          une première analyse.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg" href={CONTACT.mailto}>
            Lancer mon projet sous 24h
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={EXTERNAL_LINKS.calendly}
            external
          >
            Réserver mon audit
          </Button>
        </div>
      </div>
    </section>
  );
}
