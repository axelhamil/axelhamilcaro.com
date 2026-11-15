import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, PROJECTS } from "@/app/_config/projects";
import { buildSoftwareProjectSchema } from "@/src/entities/project/software-project-schema";
import {
  AtelierHero,
  AtelierNeighbours,
  AtelierSections,
  AtelierStack,
  AtelierStats,
  AtelierWorkCta,
} from "@/src/features/portfolio-atelier/components/atelier-showcase";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return {};

  return buildPageMetadata({
    title: project.seoTitle,
    description: project.metaDescription,
    path: `/portfolio/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const breadcrumbSchema = buildBreadcrumbListSchema([
    { name: "Accueil", url: "/" },
    { name: "Projets", url: "/portfolio" },
    { name: project.name, url: `/portfolio/${project.slug}` },
  ]);

  return (
    <>
      <JsonLdScript data={buildSoftwareProjectSchema(project)} />
      <JsonLdScript data={breadcrumbSchema} />
      <main className={`cas cas-${project.slug}`}>
        <AtelierHero project={project} />
        <AtelierStats project={project} />
        <AtelierSections project={project} />
        <AtelierStack project={project} />
        <AtelierNeighbours project={project} />
        <AtelierWorkCta />
      </main>
    </>
  );
}
