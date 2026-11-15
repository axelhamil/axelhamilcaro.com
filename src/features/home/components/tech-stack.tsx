import { cn } from "@/lib/utils";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const shelves = [
  {
    label: "Front",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Capacitor"],
  },
  {
    label: "Back",
    tools: ["Node.js", "NestJS", "Fastify", "Hono", "PostgreSQL", "Drizzle"],
  },
  {
    label: "Edge",
    tools: ["Cloudflare Workers", "WebSocket", "Stripe"],
  },
  {
    label: "Archi",
    tools: ["Clean Architecture", "DDD", "Event sourcing", "Outbox"],
  },
  {
    label: "Qualité",
    tools: ["TDD", "BDD", "CI/CD", "Review"],
  },
  {
    label: "IA",
    tools: ["Agents", "Evals", "Context engineering"],
  },
] as const;

const SHADOWS = ["", "etiquette-gris", "etiquette-jaune"] as const;

const TechStack = () => {
  return (
    <section
      id="stack"
      className="pleine-largeur"
      aria-labelledby="stack-title"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home">
        <header className="section-tete">
          <p className="surtitre">Stack</p>
          <Heading2 id="stack-title" size="xl">
            Les outils <br /> <span className="marqueur">de l'atelier.</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            Ce que j'utilise en production, rangé par usage. TypeScript de bout
            en bout, une architecture choisie selon le métier, des tests avant
            le code.
          </Paragraph>
        </header>

        <dl className="mur">
          {shelves.map((shelf, shelfIndex) => (
            <div
              key={shelf.label}
              className="mur-rangee reveal-up grid gap-3 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-center sm:gap-6"
            >
              <dt className="mur-label label-mono">{shelf.label}</dt>
              <dd>
                <ul className="flex flex-wrap gap-x-4 gap-y-4 pr-2 pb-2">
                  {shelf.tools.map((tool, toolIndex) => (
                    <li
                      key={tool}
                      className={cn(
                        "mur-tag etiquette etiquette-sm etiquette-appui",
                        SHADOWS[(shelfIndex + toolIndex) % SHADOWS.length],
                      )}
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default TechStack;
