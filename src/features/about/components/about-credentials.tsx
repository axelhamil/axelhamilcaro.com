const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "Fastify",
  "PostgreSQL",
  "React Native",
  "Expo",
  "Turborepo",
  "Docker",
  "GCP",
  "Cloudflare R2",
  "Vercel AI SDK",
  "Tailwind CSS",
  "Drizzle ORM",
] as const;

const architectures = [
  "Clean Architecture",
  "DDD",
  "CQRS",
  "Event Sourcing",
  "Multi-tenancy SaaS",
  "RAG",
  "TDD/BDD",
  "CI/CD",
  "Agile",
] as const;

export function AboutCredentials() {
  return (
    <section id="stack" className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="surtitre">Outillage</p>
          <h2 className="heading-display title-xl">
            Formation <br />{" "}
            <span className="marqueur">et stack technique.</span>
          </h2>
        </header>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="flex flex-col gap-4">
            <h3 className="heading-display title-sm">Formation</h3>
            <p className="para ink-secondary">
              Wild Code School, Concepteur Développeur d'applications Web &
              Mobile (Bac+3/4), 2020
            </p>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h3 className="heading-display title-sm">Stack maîtrisée</h3>
              <ul className="flex flex-wrap gap-3 pr-1 pb-1">
                {stack.map((tech) => (
                  <li key={tech} className="etiquette etiquette-sm label-mono">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="heading-display title-sm">
                Architectures et méthodes
              </h3>
              <ul className="flex flex-wrap gap-3 pr-1 pb-1">
                {architectures.map((item) => (
                  <li
                    key={item}
                    className="etiquette etiquette-sm etiquette-gris label-mono"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
