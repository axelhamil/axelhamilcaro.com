import { X } from "lucide-react";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";
import type { ServiceData } from "../lib/services-data";

interface ServiceProblemProps {
  data: ServiceData["problem"];
}

export function ServiceProblem({ data }: ServiceProblemProps) {
  return (
    <section className="svc-section container grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <h2 className="svc-h2 heading-display">
        <AccentTitle text={data.title} />
      </h2>
      <ul className="svc-situations">
        {data.bullets.map((bullet) => (
          <li key={bullet} className="svc-situation">
            <span className="svc-croix" aria-hidden="true">
              <X className="w-4 h-4" strokeWidth={3} />
            </span>
            {bullet}
          </li>
        ))}
      </ul>
    </section>
  );
}
