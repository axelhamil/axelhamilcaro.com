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
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Formation et stack technique
        </h2>

        <div className="space-y-10">
          <div>
            <h3
              className="text-xl font-semibold text-primary mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Formation
            </h3>
            <p className="text-secondary leading-relaxed">
              Wild Code School — Concepteur Développeur d'applications Web &
              Mobile (Bac+3/4) — 2021
            </p>
          </div>

          <div>
            <h3
              className="text-xl font-semibold text-primary mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Stack maîtrisée
            </h3>
            <div className="flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-primary text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3
              className="text-xl font-semibold text-primary mb-4"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Architectures et méthodes
            </h3>
            <div className="flex flex-wrap gap-2">
              {architectures.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-primary text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
