import { JsonLd, JsonLdWithoutEmployer } from "@/src/shared/seo/json-ld";

const SLUGS_WITHOUT_EMPLOYER = ["weathertop"];

interface ProjectIdentityJsonLdProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectIdentityJsonLd({
  params,
}: ProjectIdentityJsonLdProps) {
  const { slug } = await params;

  if (SLUGS_WITHOUT_EMPLOYER.includes(slug)) return <JsonLdWithoutEmployer />;

  return <JsonLd />;
}
