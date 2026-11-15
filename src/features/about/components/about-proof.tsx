import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { BrandText } from "@/src/shared/ui/typography/brand-text";

interface Highlight {
  value: string;
  label: string;
}

interface Project {
  name: string;
  tagline: string;
  href: string;
  statut: string;
  annee: string;
  ombre: string;
  highlights: readonly Highlight[];
}

const projects: readonly Project[] = [
  {
    name: "ScormPilot",
    tagline: "SaaS e-learning multi-tenant",
    href: "/portfolio/scormpilot",
    statut: "Expédié",
    annee: "2025",
    ombre: "etiquette-jaune",
    highlights: [
      { value: "5 apps", label: "livrées en solo" },
      {
        value: "Multi-tenant",
        label: "isolation données + facturation par tenant",
      },
      { value: "SCORM", label: "moteur de lecture + tracking conforme" },
    ],
  },
  {
    name: "Civitime",
    tagline: "De dev à lead tech en 4 ans, plateforme RSE B Corp",
    href: "/portfolio/civitime",
    statut: "Expédié",
    annee: "2024",
    ombre: "etiquette-gris",
    highlights: [
      {
        value: "Refonte complète",
        label: "Clean Architecture · DDD · event sourcing",
      },
      {
        value: "Éditeur interne",
        label: "délais de livraison pédagogique ÷ 2",
      },
      { value: "Lead tech", label: "tech radar, mentoring, code reviews" },
    ],
  },
  {
    name: "Billetterie 2D/3D",
    tagline: "Mission solo accélérée",
    href: "/portfolio/billetterie",
    statut: "Expédié",
    annee: "2025",
    ombre: "",
    highlights: [
      { value: "1 mois", label: "de la maquette à la prod, en solo" },
      { value: "Plan 2D/3D", label: "sélection de sièges interactive" },
      { value: "Stripe", label: "paiement + génération de billets PDF" },
    ],
  },
  {
    name: "OpenUp",
    tagline: "Fondateur technique, des deep links qui ouvrent l'app native",
    href: "/portfolio/openup",
    statut: "En cours",
    annee: "2026",
    ombre: "",
    highlights: [
      { value: "50+ apps", label: "ouvertes depuis Instagram ou TikTok" },
      { value: "<50ms", label: "redirections edge via Cloudflare Worker" },
      { value: "3 plateformes", label: "web, iOS et Android, une codebase" },
      { value: "EUR + USD", label: "abonnés payants, plans Stripe" },
    ],
  },
];

export function AboutProof() {
  return (
    <section id="expedie" className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="surtitre">Études de cas</p>
          <h2 className="heading-display title-xl">
            Ce que j'ai expédié, <br />
            <span className="marqueur">en chiffres.</span>
          </h2>
          <p className="mesure para para-lg ink-secondary">
            Chaque carte renvoie à son étude de cas détaillée. Mes propres
            builds, de clean-stack à weathertop, sont sur{" "}
            <TransitionLink href="/#portfolio" className="souligne-trace">
              la page d'accueil
            </TransitionLink>
            . OpenUp, que je mène en parallèle, ferme la liste.
          </p>
        </header>

        <ul className="grille-cartes preuves">
          {projects.map(
            ({ name, tagline, href, statut, annee, ombre, highlights }) => (
              <li key={name}>
                <TransitionLink
                  href={href}
                  className={`etiquette etiquette-carte etiquette-appui ${ombre} gap-5`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1 min-w-0">
                      <h3 className="heading-display title-md">{name}</h3>
                      <p className="para para-sm ink-secondary">
                        <BrandText text={tagline} />
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="tampon tampon-droite shrink-0"
                    >
                      <span className="tampon-haut">{statut}</span>{" "}
                      <span className="tampon-bas">{annee}</span>
                    </span>
                  </div>

                  <dl className="preuve-chiffres flex flex-col gap-3">
                    {highlights.map(({ value, label }) => (
                      <div
                        key={label}
                        className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-3 items-baseline"
                      >
                        <dt className="stat-valeur marqueur">{value}</dt>
                        <dd className="para para-sm ink-secondary">
                          <BrandText text={label} />
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <span className="label-mono preuve-lien mt-auto">
                    Voir le cas {name}
                  </span>
                </TransitionLink>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
