type Highlight = { value: string; label: string };

type Project = {
  name: string;
  tagline: string;
  highlights: readonly Highlight[];
};

const projects: readonly Project[] = [
  {
    name: "OpenUp",
    tagline: "SaaS de gestion de liens live sur openup.to",
    highlights: [
      { value: "5 piliers", label: "Liens · QR · Bio · Analytics · Domaines" },
      { value: "3 plateformes", label: "iOS · Android · PWA en solo" },
      { value: "4 plans Stripe", label: "EUR + USD selon géolocalisation" },
      { value: "<50ms", label: "redirections edge via Cloudflare Worker" },
    ],
  },
  {
    name: "Civitime",
    tagline: "4 ans lead tech sur la plateforme RSE B Corp",
    highlights: [
      { value: "Refonte complète", label: "Clean Architecture · DDD · event sourcing" },
      { value: "Éditeur de contenu interne", label: "délais de livraison pédagogique ÷ 2" },
      { value: "Lead tech", label: "tech radar, mentoring, code reviews" },
    ],
  },
  {
    name: "ScormPilot",
    tagline: "SaaS e-learning multi-tenant",
    highlights: [
      { value: "5 apps", label: "livrées en solo" },
      { value: "Multi-tenant", label: "isolation données + facturation par tenant" },
      { value: "SCORM", label: "moteur de lecture + tracking conforme" },
    ],
  },
  {
    name: "Billetterie 2D/3D",
    tagline: "Mission solo accélérée",
    highlights: [
      { value: "1 mois", label: "de la maquette à la prod, en solo" },
      { value: "Plan 2D/3D", label: "sélection de sièges interactive" },
      { value: "Stripe", label: "paiement + génération de billets PDF" },
    ],
  },
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(({ name, tagline, highlights }) => (
            <article
              key={name}
              className="flex flex-col gap-5 p-6 rounded-xl card border border-border"
            >
              <header>
                <h3
                  className="text-2xl font-bold text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {name}
                </h3>
                <p className="text-secondary text-sm mt-1">{tagline}</p>
              </header>

              <ul className="flex flex-col gap-3">
                {highlights.map(({ value, label }) => (
                  <li
                    key={label}
                    className="flex items-baseline gap-3"
                  >
                    <span
                      className="text-accent font-bold whitespace-nowrap shrink-0"
                      style={{ fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {value}
                    </span>
                    <span className="text-secondary text-sm leading-snug">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
