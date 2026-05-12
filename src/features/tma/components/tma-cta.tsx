import { Button } from "@/src/shared/ui/portfolio/button";
import { TMA_LAST_UPDATED } from "../lib/tma-data";
import { TmaContactButton } from "./tma-contact-button";

export function TmaCta() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-accent">
      <div className="max-w-4xl mx-auto text-center">
        <p
          className="text-white/80 font-medium tracking-wider text-sm mb-4"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {"// prêt_à_démarrer()"}
        </p>
        <h2
          className="text-3xl sm:text-5xl font-bold mb-6 text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Tu hésites entre deux forfaits ?
        </h2>
        <p className="text-lg sm:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
          On en parle. Je te dis lequel colle à ta situation. Si aucun ne
          convient (volume trop bas, stack hors scope, besoin différent), je te
          le dis aussi et on cherche autre chose ensemble.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <TmaContactButton label="Discuter de ton besoin" />
          <Button href="/services" variant="secondary" size="lg">
            Découvrir mes autres services
          </Button>
        </div>
        <div className="pt-8 border-t border-white/20 space-y-2 text-white/70 text-xs">
          <p>
            Tarifs et conditions en vigueur au{" "}
            <time dateTime={TMA_LAST_UPDATED.iso}>
              {TMA_LAST_UPDATED.display}
            </time>
            . Les clients ayant souscrit conservent leurs conditions pour toute
            la durée de leur abonnement actif.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <a href="/cgv" className="underline hover:text-white">
              Conditions Générales de Vente
            </a>
            <span aria-hidden="true">·</span>
            <a href="/mentions-legales" className="underline hover:text-white">
              Mentions légales
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
