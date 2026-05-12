import { Bug, Search, ShieldCheck, Sparkles } from "lucide-react";
import { TMA_PRO_DELIVERABLES } from "../lib/tma-data";

const ICONS = [Bug, ShieldCheck, Sparkles, Search] as const;

export function TmaProDetails() {
  return (
    <section
      id="pro-details"
      className="py-20 sm:py-28 px-6 scroll-mt-24 bg-secondary-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 bg-primary text-primary-background text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            PRO
          </span>
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {"// concrètement_sur_le_pro()"}
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce que tu obtiens en 5h / mois.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            Quatre types d'intervention couverts dans ton forfait. Tickets
            prioritaires (correctifs, sécurité) d'abord, évolutions ensuite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TMA_PRO_DELIVERABLES.map((item, index) => {
            const Icon = ICONS[index] ?? Search;
            return (
              <article
                key={item.title}
                className="card p-6 sm:p-8 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <span
                    className="text-xs uppercase tracking-wider text-secondary"
                    style={{ fontFamily: "var(--font-geist-mono)" }}
                  >
                    {item.cadence}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-1">
                  {item.title}
                </h3>
                <p
                  className="text-xs uppercase tracking-wider text-accent mb-3"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {item.tagline}
                </p>
                <p className="text-secondary leading-relaxed">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
