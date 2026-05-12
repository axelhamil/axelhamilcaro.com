import { XCircle } from "lucide-react";
import { TMA_EXCLUSIONS } from "../lib/tma-data";

export function TmaNotIncluded() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            {"// hors_périmètre()"}
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce qui n'est pas inclus.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            La transparence évite les frictions. Voici ce qui sort explicitement
            du forfait pour qu'on ne se retrouve pas en désaccord en cours de
            route.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TMA_EXCLUSIONS.map((item) => (
            <li
              key={item.title}
              className="card p-6 sm:p-8 flex items-start gap-4 border-l-4 border-l-destructive/50"
            >
              <div className="p-2 rounded-lg bg-destructive/10 text-destructive shrink-0">
                <XCircle className="w-5 h-5" aria-hidden="true" />
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
