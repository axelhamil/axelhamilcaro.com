import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { TMA_PROCESS } from "../lib/tma-data";
import { TmaSectionEntete } from "./tma-section-entete";

export function TmaProcess() {
  return (
    <section className="svc-section container">
      <TmaSectionEntete
        eyebrow="// comment_ça_marche()"
        title="De l'abonnement au premier ticket en 48h."
        intro="Aucune phase d'audit payante, aucun engagement annuel. Tu t'abonnes, on cadre, on commence à bosser."
      />
      <ol className="grille-cartes svc-grille-2">
        {TMA_PROCESS.map((step) => (
          <li
            key={step.step}
            className="svc-etape etiquette etiquette-carte etiquette-gris"
          >
            <span className="svc-etape-numero" aria-hidden="true">
              {step.step}
            </span>
            <h3 className="svc-carte-titre">{step.title}</h3>
            <p className="svc-texte">
              <BrandText text={step.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
