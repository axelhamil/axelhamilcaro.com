import { Check } from "lucide-react";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { TMA_PREREQUISITES } from "../lib/tma-data";
import { TmaSectionEntete } from "./tma-section-entete";

export function TmaPrerequisites() {
  return (
    <section className="svc-section container">
      <TmaSectionEntete
        eyebrow="// pré_requis()"
        title="Pré-requis pour démarrer."
        intro="On évite les démarrages bancals : voici ce dont j'ai besoin avant de prendre la main sur ton app. Si l'un des points coince, on en discute pour cadrer ensemble."
      />
      <ul className="grille-cartes svc-grille-2">
        {TMA_PREREQUISITES.map((item) => (
          <li
            key={item.title}
            className="svc-carte etiquette etiquette-carte etiquette-gris"
          >
            <span className="svc-picto" aria-hidden="true">
              <Check className="w-5 h-5" strokeWidth={3} />
            </span>
            <h3 className="svc-carte-titre">{item.title}</h3>
            <p className="svc-texte">
              <BrandText text={item.body} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
