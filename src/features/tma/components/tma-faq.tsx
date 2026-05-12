import { TMA_FAQ } from "../lib/tma-data";

export function TmaFaq() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-secondary-background">
      <div className="max-w-4xl mx-auto">
        <p
          className="text-accent font-medium tracking-wider text-sm mb-4"
          style={{ fontFamily: "var(--font-geist-mono)" }}
        >
          {"// questions_fréquentes()"}
        </p>
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-3xl sm:text-5xl font-bold text-primary mb-4"
        >
          Tes questions, mes réponses
        </h2>
        <p className="text-secondary text-lg mb-12">
          Tout ce qui détermine si la TMA est faite pour toi : dépassement
          d'heures, résiliation, support, stack, vacances, sous-traitance.
        </p>
        <div>
          {TMA_FAQ.map((item) => (
            <details
              key={item.question}
              className="group border-b border-border py-6"
            >
              <summary className="cursor-pointer flex justify-between items-start gap-4 text-lg font-semibold text-primary group-open:text-accent">
                <span>{item.question}</span>
                <span
                  className="text-2xl font-light group-open:rotate-45 transition-transform shrink-0"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-secondary leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
