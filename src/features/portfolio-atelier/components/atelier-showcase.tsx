import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  getCaseMeta,
  MISSION_CASES,
  OPENUP_CASE,
} from "@/app/_config/case-studies";
import {
  BUILDS_COUNT,
  PROJECT_CATEGORY_LABELS,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/app/_config/projects";
import { ProjectBuildCard } from "@/src/entities/project/components/project-build-card";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import { AnimatedCounter } from "@/src/shared/ui/effects/animated-counter";
import { ProjectCard } from "@/src/shared/ui/motifs/project-card";
import { ProjectPoster } from "@/src/shared/ui/motifs/project-poster";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import {
  projectTransitionName,
  SharedElement,
} from "@/src/shared/ui/navigation/shared-element";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const CATEGORY_ORDER: readonly ProjectCategory[] = [
  "produit",
  "brique",
  "outil-agent",
  "extension",
  "chantier",
];

const CATEGORY_INTROS: Record<ProjectCategory, string> = {
  produit: "Les produits que je construis de bout en bout.",
  brique: "Des briques TypeScript que je publie et que je réutilise.",
  "outil-agent": "Des outils pour travailler avec Claude Code au quotidien.",
  extension: "Une extension de navigateur publiée en open source.",
  chantier: "Un chantier en cours, sur un langage que j'apprends.",
};

const getNeighbours = (project: Project) => {
  const index = PROJECTS.findIndex((entry) => entry.slug === project.slug);
  const count = PROJECTS.length;

  return {
    previous: PROJECTS[(index - 1 + count) % count],
    next: PROJECTS[(index + 1) % count],
  };
};

interface AtelierProjectProps {
  project: Project;
}

export function AtelierHero({ project }: AtelierProjectProps) {
  const [primaryLink, ...otherLinks] = project.links;

  return (
    <section className="cas-hero trame pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <nav aria-label="Fil d'Ariane">
            <ol className="atelier-ariane label-mono">
              <li>
                <TransitionLink href="/">Accueil</TransitionLink>
              </li>
              <li>
                <TransitionLink href="/portfolio">Projets</TransitionLink>
              </li>
              <li aria-current="page">{project.name}</li>
            </ol>
          </nav>
          <p aria-hidden="true" className="tampon tampon-droite mr-2 mt-2">
            <span className="tampon-haut">{project.status}</span>{" "}
            <span className="tampon-bas">{project.year}</span>
          </p>
        </div>

        <div className="cas-hero-texte flex flex-col gap-6">
          <p className="surtitre">
            {PROJECT_CATEGORY_LABELS[project.category]}
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <span aria-hidden="true" className="cas-logo atelier-monogramme">
              {project.name.charAt(0)}
            </span>
            <SharedElement name={projectTransitionName(project.slug)}>
              <h1 className="cas-h1 heading-display">{project.name}</h1>
            </SharedElement>
          </div>

          <p className="cas-accroche heading-display">
            <span className="marqueur">{project.posterLines.join(" ")}</span>
          </p>

          <Paragraph size="lg" className="cas-lede">
            <strong>
              <BrandText text={project.tagline} />
            </strong>
          </Paragraph>
          <Paragraph variant="secondary" className="cas-lede">
            <BrandText text={project.summary} />
          </Paragraph>

          <ul className="cas-faits">
            <li>
              {project.visibility === "private"
                ? "Dépôt privé"
                : "Dépôt public"}
            </li>
            <li>
              Mis à jour le{" "}
              <time dateTime={project.dateModified}>
                {formatLongDate(project.dateModified)}
              </time>
            </li>
          </ul>

          {project.highlights.length > 0 && (
            <ul className="cas-tags">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="etiquette etiquette-sm label-mono"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          {primaryLink && (
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
              <Button href={primaryLink.href} size="lg">
                {primaryLink.label}
                <ArrowRight className="w-5 h-5" />
              </Button>
              {otherLinks.map((link) => (
                <Button
                  key={link.href}
                  href={link.href}
                  variant="secondary"
                  size="lg"
                >
                  {link.label}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Ribbon items={project.ribbon} hachures />
    </section>
  );
}

const STAT_TONES = ["", "etiquette-jaune", "etiquette-gris"] as const;

export function AtelierStats({ project }: AtelierProjectProps) {
  if (!project.stats) return null;

  return (
    <section
      className="cas-section container mx-auto"
      aria-label={`${project.name} en chiffres`}
    >
      <ul className="grille-cartes atelier-chiffres">
        {project.stats.map((stat, index) => (
          <li
            key={stat.label}
            className={`etiquette etiquette-carte cas-chiffre ${STAT_TONES[index % STAT_TONES.length]}`}
          >
            <AnimatedCounter
              value={stat.value}
              className="cas-chiffre-valeur"
            />
            <span className="label-mono">{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AtelierSections({ project }: AtelierProjectProps) {
  return (
    <section
      className="cas-section container mx-auto"
      aria-label={`Le build ${project.name}`}
    >
      <div className="atelier-recit">
        {project.sections.map((section) => (
          <article key={section.title}>
            <h2 className="heading-display title-sm">{section.title}</h2>
            <div className="flex flex-col gap-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  <BrandText text={paragraph} />
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AtelierStack({ project }: AtelierProjectProps) {
  if (project.visibility === "private") return null;

  return (
    <section
      className="cas-section container mx-auto"
      aria-labelledby="atelier-stack-titre"
    >
      <header className="cas-entete">
        <p className="surtitre">Stack</p>
        <h2 id="atelier-stack-titre" className="heading-display title-md">
          Avec quoi je le construis
        </h2>
      </header>
      <ul className="cas-tags">
        {project.tech.map((tech) => (
          <li key={tech} className="etiquette label-mono">
            {tech}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function AtelierNeighbours({ project }: AtelierProjectProps) {
  const { previous, next } = getNeighbours(project);
  const neighbours = [
    { label: "Build précédent", project: previous },
    { label: "Build suivant", project: next },
  ];

  return (
    <section
      className="cas-section container mx-auto"
      aria-labelledby="atelier-voisins-titre"
    >
      <header className="cas-entete">
        <p className="surtitre">Continuer</p>
        <h2 id="atelier-voisins-titre" className="heading-display title-md">
          Mes autres builds
        </h2>
      </header>
      <ul className="grille-cartes">
        {neighbours.map(
          ({ label, project: neighbour }) =>
            neighbour && (
              <li key={label}>
                <TransitionLink
                  href={`/portfolio/${neighbour.slug}`}
                  className="atelier-voisin etiquette etiquette-carte etiquette-appui"
                >
                  <span className="label-mono ink-muted">{label}</span>
                  <span className="atelier-voisin-nom heading-display title-sm">
                    {neighbour.name}
                  </span>
                  <span className="para para-sm ink-secondary">
                    {PROJECT_CATEGORY_LABELS[neighbour.category]} /{" "}
                    {neighbour.status} {neighbour.year}
                  </span>
                </TransitionLink>
              </li>
            ),
        )}
      </ul>
    </section>
  );
}

export function AtelierWorkCta() {
  return (
    <section className="cas-fin container mx-auto flex flex-wrap justify-center gap-4">
      <Button href="/portfolio" size="lg">
        <ArrowLeft className="w-5 h-5" />
        Voir tous les builds
      </Button>
      <Button href="/services" variant="ghost" size="lg">
        Travailler avec moi
      </Button>
    </section>
  );
}

export function AtelierIndexHero() {
  return (
    <section className="cas-hero pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 pb-8 flex flex-col gap-6">
        <nav aria-label="Fil d'Ariane">
          <ol className="atelier-ariane label-mono">
            <li>
              <TransitionLink href="/">Accueil</TransitionLink>
            </li>
            <li aria-current="page">Projets</li>
          </ol>
        </nav>
        <div className="atelier-hero-texte flex flex-col gap-6">
          <p className="surtitre">Mes builds</p>
          <h1 className="atelier-h1 heading-display">Projets</h1>
          <p className="atelier-tagline ink-primary">
            <strong>
              Je suis Axel Hamilcaro, développeur fullstack et builder : depuis
              février 2025, je construis les API et les outils de fondation sur
              lesquels d'autres bâtissent leurs produits, plutôt que des SaaS
              qui consomment ces API. Mon pari pour 2026 et 2027 : fournir
              l'outil et la donnée, pas l'application finale. Voici les{" "}
              {BUILDS_COUNT} builds que je mène, puis trois missions expédiées
              pour d'autres.
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export function AtelierIndexGroups() {
  return (
    <>
      {CATEGORY_ORDER.map((category) => {
        const projects = PROJECTS.filter(
          (project) => project.category === category,
        );
        const titleId = `projets-${category}`;

        return (
          <section
            key={category}
            className="cas-section container mx-auto"
            aria-labelledby={titleId}
          >
            <header className="cas-entete">
              <h2 id={titleId} className="heading-display title-md">
                {PROJECT_CATEGORY_LABELS[category]}
              </h2>
              <Paragraph variant="secondary">
                <BrandText text={CATEGORY_INTROS[category]} />
              </Paragraph>
            </header>
            <ul className="grille-cartes atelier-grille">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectBuildCard project={project} titleAs="h3" />
                </li>
              ))}
              {category === "produit" && (
                <li>
                  <ProjectCard
                    href={OPENUP_CASE.href}
                    brand={OPENUP_CASE.slug}
                    visual={<ProjectPoster {...OPENUP_CASE.poster} />}
                    meta={getCaseMeta(OPENUP_CASE)}
                    name={OPENUP_CASE.title}
                    tagline={OPENUP_CASE.description}
                    tags={OPENUP_CASE.tech}
                    linkLabel="Voir le cas"
                    titleAs="h3"
                  />
                </li>
              )}
            </ul>
          </section>
        );
      })}

      <section
        className="cas-section container mx-auto"
        aria-labelledby="projets-missions"
      >
        <header className="cas-entete">
          <h2 id="projets-missions" className="heading-display title-md">
            Missions
          </h2>
          <Paragraph variant="secondary">
            Ce que j'ai expédié pour des clients et un employeur.
          </Paragraph>
        </header>
        <ul className="grille-cartes atelier-grille">
          {MISSION_CASES.map((study) => (
            <li key={study.slug}>
              <ProjectCard
                href={study.href}
                brand={study.slug}
                visual={<ProjectPoster {...study.poster} />}
                meta={getCaseMeta(study)}
                name={study.title}
                tagline={study.description}
                tags={study.tech}
                linkLabel="Voir le cas"
                titleAs="h3"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
