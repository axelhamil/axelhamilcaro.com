import { Clock, MessageCircle, MessagesSquare, Video } from "lucide-react";
import { TMA_PRO_WORKFLOW } from "../lib/tma-data";

const ICONS = [MessagesSquare, Clock, MessageCircle, Video] as const;

export function TmaProWorkflow() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-secondary-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 bg-primary text-primary-background text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
            PRO
          </span>
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {"// communication_et_suivi_pro()"}
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Comment ça se passe au quotidien.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            Pas de portail, pas de boîte noire. Le suivi se fait là où tu
            communiques déjà, avec une transparence totale sur les heures
            consommées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {TMA_PRO_WORKFLOW.map((item, index) => {
            const Icon = ICONS[index] ?? MessagesSquare;
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
