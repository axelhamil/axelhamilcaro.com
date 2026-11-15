import {
  getProjectBySlug,
  PROJECT_CATEGORY_LABELS,
  PROJECTS,
} from "@/app/_config/projects";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  renderOgImage,
} from "@/src/shared/seo/og-image-template";

export const alt = "Projet d'Axel Hamilcaro, développeur fullstack et builder";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return renderOgImage({
      eyebrow: "Projets",
      title: "Axel Hamilcaro",
      accent: "builder.",
    });
  }

  const category = PROJECT_CATEGORY_LABELS[project.category];

  return renderOgImage({
    eyebrow: `Projet · ${category}`,
    title: project.name,
    accent: project.posterLines.join(" "),
    stamp: { top: project.status, bottom: project.year },
    ribbon: [category, project.name, "axelhamilcaro.com"],
  });
}
