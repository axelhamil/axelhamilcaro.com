import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { TMA_PERSONAS } from "../lib/tma-data";

export function TmaWhoFor() {
  return (
    <section className="svc-section container">
      <div className="svc-entete">
        <h2 className="svc-h2 heading-display">
          <AccentTitle text="Pour qui ?" />
        </h2>
        <p className="svc-intro">
          La TMA est faite pour ces {TMA_PERSONAS.length} situations.
        </p>
      </div>
      <ul className="grille-cartes svc-grille-2">
        {TMA_PERSONAS.map((persona) => (
          <li
            key={persona.title}
            className="svc-carte etiquette etiquette-carte etiquette-gris"
          >
            <span className="tma-numero-persona" aria-hidden="true">
              {persona.eyebrow}
            </span>
            <h3 className="svc-carte-titre">{persona.title}</h3>
            <p className="svc-texte">
              <BrandText text={persona.body} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
