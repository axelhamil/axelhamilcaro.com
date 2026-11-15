import { RATES } from "@/app/_config/site.constants";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import { Button } from "@/src/shared/ui/portfolio/button";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import { TMA_FORFAITS, TMA_LAST_UPDATED } from "../lib/tma-data";
import { TmaContactButton } from "./tma-contact-button";

const CTA_RIBBON = [
  ...TMA_FORFAITS.map(
    (forfait) => `${forfait.name} ${forfait.price} € HT par mois`,
  ),
  "5 h incluses",
  "10 h incluses",
  `Hors forfait ${RATES.tma.overflowHourlyEur} € HT par heure`,
  "Monitoring proactif",
  "Sentry",
  "UptimeRobot",
  "Better Stack",
  "Reporting mensuel",
  "CHANGELOG annoté",
  "Audit trimestriel",
  "Status page publique",
  "Paiement Stripe",
];

export function TmaCta() {
  return (
    <section className="svc-cta bloc-inverse pleine-largeur">
      <Ribbon items={CTA_RIBBON} hachures />
      <div className="svc-cta-corps container flex flex-col items-start gap-8">
        <div className="flex w-full flex-wrap items-start justify-between gap-6">
          <p className="surtitre">{"// prêt_à_démarrer()"}</p>
          <p aria-hidden="true" className="tampon">
            <span className="tampon-haut">En vigueur</span>{" "}
            <span className="tampon-bas">{TMA_LAST_UPDATED.display}</span>
          </p>
        </div>
        <h2 className="svc-h2 heading-display">
          <AccentTitle text="Tu hésites entre deux forfaits ?" />
        </h2>
        <p className="svc-intro">
          On en parle. Je te dis lequel colle à ta situation. Si aucun ne
          convient (volume trop bas, stack hors scope, besoin différent), je te
          le dis aussi et on cherche autre chose ensemble.
        </p>
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
          <TmaContactButton label="Discuter de ton besoin" variant="primary" />
          <Button href="/services" variant="secondary" size="lg">
            Travailler avec moi
          </Button>
        </div>
        <div className="svc-cta-mentions flex w-full flex-col gap-2">
          <p>
            Tarifs et conditions en vigueur au{" "}
            <time dateTime={TMA_LAST_UPDATED.iso}>
              {TMA_LAST_UPDATED.display}
            </time>
            . Les clients ayant souscrit conservent leurs conditions pour toute
            la durée de leur abonnement actif.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/cgv" className="cible-tactile">
              Conditions Générales de Vente
            </a>
            <span aria-hidden="true">·</span>
            <a href="/mentions-legales" className="cible-tactile">
              Mentions légales
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
