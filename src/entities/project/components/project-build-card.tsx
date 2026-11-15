import { getProjectMeta, type Project } from "@/app/_config/projects";
import { ProjectCard } from "@/src/shared/ui/motifs/project-card";
import { ProjectPoster } from "@/src/shared/ui/motifs/project-poster";

export interface ProjectBuildCardProps {
  project: Project;
  titleAs: "h3" | "h4";
}

export function ProjectBuildCard({ project, titleAs }: ProjectBuildCardProps) {
  return (
    <ProjectCard
      href={`/portfolio/${project.slug}`}
      brand={project.slug}
      visual={
        <ProjectPoster
          name={project.name}
          lines={project.posterLines}
          highlights={project.highlights}
          ribbon={project.ribbon}
          status={project.status}
          year={project.year}
        />
      }
      meta={getProjectMeta(project)}
      name={project.name}
      tagline={project.tagline}
      tags={project.visibility === "public" ? project.tech.slice(0, 3) : []}
      linkLabel="Voir le projet"
      titleAs={titleAs}
    />
  );
}
