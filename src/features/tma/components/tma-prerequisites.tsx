import { CheckCircle2 } from "lucide-react";
import { TMA_PREREQUISITES } from "../lib/tma-data";

export function TmaPrerequisites() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            // pré_requis()
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Pré-requis pour démarrer.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            On évite les démarrages bancals : voici ce dont j'ai besoin avant de
            prendre la main sur ton app. Si l'un des points coince, on en
            discute pour cadrer ensemble.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TMA_PREREQUISITES.map((item) => (
            <li
              key={item.title}
              className="card p-6 sm:p-8 flex items-start gap-4"
            >
              <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-secondary leading-relaxed">{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
