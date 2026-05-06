import { TMA_PERSONAS } from "../lib/tma-data";

export function TmaWhoFor() {
  return (
    <section className="py-20 px-6 bg-secondary-background">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Pour qui ?
        </h2>
        <p className="text-secondary text-lg mb-12">
          La TMA est faite pour ces 4 situations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TMA_PERSONAS.map((persona) => (
            <div key={persona.title} className="card p-6 sm:p-8">
              <span
                className="text-5xl font-bold text-accent block mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                aria-hidden="true"
              >
                {persona.eyebrow}
              </span>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {persona.title}
              </h3>
              <p className="text-secondary leading-relaxed">{persona.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
