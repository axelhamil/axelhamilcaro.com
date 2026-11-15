import type { Project } from "@/app/_config/projects";
import { SITE_URL } from "@/app/_config/site.constants";
import { authorPerson } from "@/src/shared/seo/schemas/author";

const PROGRAMMING_LANGUAGES = new Set([
  "TypeScript",
  "JavaScript",
  "Rust",
  "Nix",
  "Shell",
  "Python",
]);

export function buildSoftwareProjectSchema(project: Project) {
  const base = {
    "@context": "https://schema.org",
    name: project.name,
    description: project.tagline,
    url: `${SITE_URL}/portfolio/${project.slug}`,
    dateModified: project.dateModified,
    author: authorPerson(),
    inLanguage: "fr-FR",
  };

  if (project.visibility === "private") {
    return { ...base, "@type": "CreativeWork" };
  }

  const repository = project.links.find((link) =>
    link.href.startsWith("https://github.com/"),
  );

  return {
    ...base,
    "@type": "SoftwareSourceCode",
    ...(repository && { codeRepository: repository.href }),
    programmingLanguage: project.tech.filter((tech) =>
      PROGRAMMING_LANGUAGES.has(tech),
    ),
    keywords: project.tech.join(", "),
  };
}
