import { X } from "lucide-react";
import type { ServiceData } from "../lib/services-data";

export function ServiceProblem({ data }: { data: ServiceData["problem"] }) {
  return (
    <section className="py-20 px-6 bg-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {data.title}
        </h2>
        <ul className="space-y-4">
          {data.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-4">
              <X
                className="text-accent mt-0.5 shrink-0"
                size={20}
                aria-hidden="true"
              />
              <span className="text-primary text-lg leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
