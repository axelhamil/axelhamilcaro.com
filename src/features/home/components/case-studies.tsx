import { ArrowRight } from "lucide-react";
import {
  type CaseStudy,
  getCaseMeta,
  HOME_CLIENT_CASES,
  OPENUP_CASE,
} from "@/app/_config/case-studies";
import { BUILDS_COPY } from "@/app/_config/home-copy";
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
    <ProjectBuildCard project={project} titleAs="h3" showUpdate />
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
          <p className="surtitre">{BUILDS_COPY.surtitre}</p>
          <Heading2 id="portfolio-title" size="xl">
            {BUILDS_COPY.titleTop} <br />{" "}
            <span className="marqueur">{BUILDS_COPY.titleAccent}</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            {BUILDS_COPY.intro}
          </Paragraph>
        </header>

        <ul className="grille-cartes atelier-grille">
          {builds.slice(0, 2).map(buildItem)}
          {caseItem(OPENUP_CASE)}
          {builds.slice(2).map(buildItem)}
        </ul>

        <Button href="/portfolio" variant="secondary" className="atelier-tous">
          Voir les {BUILDS_COUNT} builds
          <ArrowRight className="w-4 h-4" />
        </Button>

        <div className="mt-16 flex flex-col gap-6">
          <h3 className="heading-display title-md">
            {BUILDS_COPY.clientsTitle}
          </h3>
          <ul className="grille-cartes atelier-grille">
            {HOME_CLIENT_CASES.map(caseItem)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
