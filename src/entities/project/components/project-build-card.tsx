import { getProjectMeta, type Project } from "@/app/_config/projects";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import { ProjectCard } from "@/src/shared/ui/motifs/project-card";
import { ProjectPoster } from "@/src/shared/ui/motifs/project-poster";

export interface ProjectBuildCardProps {
  project: Project;
  titleAs: "h3" | "h4";
  showUpdate?: boolean;
}

export function ProjectBuildCard({
  project,
  titleAs,
  showUpdate = false,
}: ProjectBuildCardProps) {
  const baseMeta = getProjectMeta(project);
  const meta = showUpdate
    ? `${baseMeta} / Mis à jour le ${formatLongDate(project.dateModified)}`
    : baseMeta;

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
      meta={meta}
      name={project.name}
      tagline={project.tagline}
      tags={project.visibility === "public" ? project.tech.slice(0, 3) : []}
      linkLabel="Voir le projet"
      titleAs={titleAs}
    />
  );
}
