import {
  PRIVATE_BUILD_TEXTS,
  PROJECTS,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
} from "@/app/_config/projects";
import { SITE_URL } from "@/app/_config/site.constants";

export const PROJECT_CATEGORIES = [
  "brique",
  "outil-agent",
  "extension",
  "produit",
  "chantier",
] as const satisfies readonly ProjectCategory[];

export const PROJECT_STATUSES = [
  "En cours",
  "Expédié",
  "En chantier",
] as const satisfies readonly ProjectStatus[];

const { weathertop, afterlive } = PRIVATE_BUILD_TEXTS;

const upperFirst = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export const WEATHERTOP_AMBITION = `${upperFirst(weathertop.pitch)}. ${weathertop.promise.thirdPerson} Par exemple, une équipe de recherche peut comparer à grande échelle et dans le temps ce que répondent les assistants IA à un même jeu de questions. Projet personnel, en chantier depuis ${weathertop.duration}, pas encore sortie.`;

export const AFTERLIVE_AMBITION = `Un produit qui ${afterlive.pitch}. En construction depuis fin septembre 2026, bientôt en production.`;

export const PRIVATE_PROJECT_FALLBACK = "Projet privé, détails non publiés.";

const PRIVATE_PROJECT_AMBITIONS: Record<string, string> = {
  weathertop: WEATHERTOP_AMBITION,
  afterlive: AFTERLIVE_AMBITION,
};

export const NO_PROJECT_PUBLISHED = "Aucun projet publié pour l'instant.";
export const NO_PROJECT_MATCHING = "Aucun projet ne correspond à ce filtre.";

export type ProjectFilter = {
  category?: ProjectCategory;
  status?: ProjectStatus;
};

function matches(project: Project, filter: ProjectFilter) {
  if (filter.category && project.category !== filter.category) return false;
  if (filter.status && project.status !== filter.status) return false;
  return true;
}

function projectPageUrl(project: Project) {
  return `${SITE_URL}/portfolio/${project.slug}`;
}

function toPrivateProjectEntry(project: Project) {
  return {
    slug: project.slug,
    name: project.name,
    url: projectPageUrl(project),
    category: project.category,
    status: project.status,
    year: project.year,
    visibility: "private" as const,
    ambition:
      PRIVATE_PROJECT_AMBITIONS[project.slug] ?? PRIVATE_PROJECT_FALLBACK,
  };
}

function toPublicProjectEntry(project: Project) {
  return {
    slug: project.slug,
    name: project.name,
    url: projectPageUrl(project),
    category: project.category,
    status: project.status,
    year: project.year,
    visibility: "public" as const,
    tagline: project.tagline,
    summary: project.summary,
    highlights: [...project.highlights],
    tech: [...project.tech],
    links: project.links.map((link) => ({
      label: link.label,
      href: link.href,
    })),
    dateModified: project.dateModified,
  };
}

function toProjectEntry(project: Project) {
  if (project.visibility === "private") return toPrivateProjectEntry(project);
  return toPublicProjectEntry(project);
}

export function getProjects(
  filter: ProjectFilter = {},
  projects: readonly Project[] = PROJECTS,
) {
  return projects
    .filter((project) => matches(project, filter))
    .map(toProjectEntry);
}

type ProjectEntry = ReturnType<typeof toProjectEntry>;

function renderProjectHeader(project: ProjectEntry) {
  return [
    `## ${project.name}`,
    "",
    project.visibility === "private" ? project.ambition : project.tagline,
    "",
    `- Category: ${project.category}`,
    `- Status: ${project.status}`,
    `- Year: ${project.year}`,
    `- Visibility: ${project.visibility}`,
    `- Page: ${project.url}`,
  ];
}

function renderProject(project: ProjectEntry) {
  if (project.visibility === "private")
    return [...renderProjectHeader(project), ""];

  return [
    ...renderProjectHeader(project),
    `- Updated: ${project.dateModified}`,
    "",
    project.summary,
    "",
    ...(project.highlights.length > 0
      ? [...project.highlights.map((highlight) => `- ${highlight}`), ""]
      : []),
    ...(project.tech.length > 0
      ? [`Stack: ${project.tech.join(", ")}`, ""]
      : []),
    ...(project.links.length > 0
      ? [...project.links.map((link) => `- [${link.label}](${link.href})`), ""]
      : []),
  ];
}

export function renderProjectsMarkdown(
  filter: ProjectFilter = {},
  projects: readonly Project[] = PROJECTS,
) {
  const entries = getProjects(filter, projects);

  if (entries.length === 0) {
    const empty =
      projects.length === 0 ? NO_PROJECT_PUBLISHED : NO_PROJECT_MATCHING;
    return ["# Projects", "", empty].join("\n");
  }

  return ["# Projects", "", ...entries.flatMap(renderProject)].join("\n");
}
