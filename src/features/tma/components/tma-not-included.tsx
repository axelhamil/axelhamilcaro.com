import { X } from "lucide-react";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { TMA_EXCLUSIONS } from "../lib/tma-data";
import { TmaSectionEntete } from "./tma-section-entete";

export function TmaNotIncluded() {
  return (
    <section className="svc-section container">
      <TmaSectionEntete
        eyebrow="// hors_périmètre()"
        title="Ce qui n'est pas inclus."
        intro="La transparence évite les frictions. Voici ce qui sort explicitement du forfait pour qu'on ne se retrouve pas en désaccord en cours de route."
      />
      <ul className="tma-exclusions">
        {TMA_EXCLUSIONS.map((item) => (
          <li key={item.title} className="tma-exclusion">
            <span className="svc-croix" aria-hidden="true">
              <X className="w-4 h-4" strokeWidth={3} />
            </span>
            <h3 className="tma-exclusion-titre">{item.title}</h3>
            <p className="tma-exclusion-corps svc-texte">
              <BrandText text={item.body} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
