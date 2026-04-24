const stats = [
  { value: "4 ans", label: "lead tech Civitime" },
  { value: "5 apps", label: "livrées en solo ScormPilot" },
  { value: "545+", label: "tests BDD HomeCafé en 6 mois" },
  { value: "1 mois", label: "Billetterie 2D/3D solo" },
] as const;

export function AboutProof() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h2
            className="text-3xl sm:text-4xl font-bold text-primary mb-3"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce que j'ai livré, en chiffres
          </h2>
          <p className="text-secondary text-lg">
            Chaque ligne renvoie à un case study détaillé.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center px-6 py-8 rounded-xl card border border-neutral-200"
            >
              <span
                className="text-4xl font-bold text-accent mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {value}
              </span>
              <span className="text-sm text-secondary leading-snug">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
