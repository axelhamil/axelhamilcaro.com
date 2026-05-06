import { TMA_PROCESS } from "../lib/tma-data";

export function TmaProcess() {
  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p
            className="text-accent font-medium tracking-wider text-sm mb-4"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            // comment_ça_marche()
          </p>
          <h2
            className="text-3xl sm:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            De l'abonnement au premier ticket en 48h.
          </h2>
          <p className="text-secondary text-lg max-w-2xl">
            Aucune phase d'audit payante, aucun engagement annuel. Tu
            t'abonnes, on cadre, on commence à bosser.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TMA_PROCESS.map((step) => (
            <li key={step.step} className="card p-6 sm:p-8 flex flex-col">
              <span
                className="text-5xl font-bold text-accent block mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                aria-hidden="true"
              >
                {step.step}
              </span>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-secondary leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
