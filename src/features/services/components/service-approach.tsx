import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import type { ServiceData } from "../lib/services-data";

interface ServiceApproachProps {
  data: ServiceData["approach"];
}

export function ServiceApproach({ data }: ServiceApproachProps) {
  return (
    <section className="svc-section container">
      <h2 className="svc-h2 svc-h2-seul heading-display">
        <AccentTitle text={data.title} />
      </h2>
      <ol className="grille-cartes svc-grille-etapes">
        {data.steps.map((step, index) => (
          <li
            key={step.title}
            className="svc-etape etiquette etiquette-carte etiquette-gris"
          >
            <span className="svc-etape-numero" aria-hidden="true">
              {index + 1}
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
