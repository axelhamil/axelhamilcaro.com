import {
  Activity,
  CalendarClock,
  FileText,
  MessagesSquare,
  Sparkles,
} from "lucide-react";
import { TMA_PREMIUM_DELIVERABLES } from "../lib/tma-data";

const ICONS = [Activity, FileText, CalendarClock, MessagesSquare] as const;

export function TmaDeliverables() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 bg-accent text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            Premium uniquement
          </span>
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            // livrables_premium()
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            4 livrables récurrents en plus, sur PREMIUM.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            Au-delà des 10h d'intervention, le forfait PREMIUM embarque des
            livrables tangibles que tu peux exploiter directement (audit,
            CHANGELOG, status page) ou que tu utilises au quotidien pour
            collaborer (canal dédié partagé).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TMA_PREMIUM_DELIVERABLES.map((item, index) => {
            const Icon = ICONS[index] ?? Sparkles;
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
