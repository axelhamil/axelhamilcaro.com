import { ArrowRight } from "lucide-react";
import {
  type CaseStudy,
  getCaseMeta,
  MISSION_CASES,
  OPENUP_CASE,
} from "@/app/_config/case-studies";
import { BUILDS_COUNT, PROJECTS, type Project } from "@/app/_config/projects";
import { ProjectBuildCard } from "@/src/entities/project/components/project-build-card";
import { ProjectCard } from "@/src/shared/ui/motifs/project-card";
import { ProjectPoster } from "@/src/shared/ui/motifs/project-poster";
import { Button } from "@/src/shared/ui/portfolio/button";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const builds = PROJECTS.filter((project) => project.featured);

const buildItem = (project: Project) => (
  <li key={project.slug}>
    <ProjectBuildCard project={project} titleAs="h3" />
  </li>
);

const caseItem = (study: CaseStudy) => (
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
);

const CaseStudies = () => {
  return (
    <section
      id="portfolio"
      className="pleine-largeur"
      aria-labelledby="portfolio-title"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home">
        <header className="section-tete">
          <p className="surtitre">Mes projets</p>
          <Heading2 id="portfolio-title" size="xl">
            Ce que <br /> <span className="marqueur">je fabrique.</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            D'abord trois missions que j'ai expédiées pour des clients et un
            employeur. Ensuite mes builds : des API, des briques et des outils
            de fondation, que je construis pour que d'autres bâtissent leurs
            produits dessus. OpenUp, que je mène en parallèle, en fait partie.
          </Paragraph>
        </header>

        <ul className="grille-cartes atelier-grille">
          {MISSION_CASES.map(caseItem)}
          {builds.slice(0, 3).map(buildItem)}
          {caseItem(OPENUP_CASE)}
          {builds.slice(3).map(buildItem)}
        </ul>

        <Button href="/portfolio" variant="secondary" className="atelier-tous">
          Voir les {BUILDS_COUNT} builds
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default CaseStudies;
