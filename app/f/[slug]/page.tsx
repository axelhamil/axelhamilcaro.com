import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formService } from "@/src/backend/forms/form.service";
import { NotFoundError } from "@/src/core/errors/domain.error";
import { FormPageBackground } from "@/src/features/form-public/components/form-background";
import { FormCard } from "@/src/features/form-public/components/form-card";

export const revalidate = 3600;

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await formService.getActiveSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const form = await formService.getBySlug(slug);
    return {
      title: form.title,
      description: form.description || undefined,
    };
  } catch (error) {
    if (error instanceof NotFoundError) {
      return { title: "Formulaire introuvable" };
    }
    throw error;
  }
}

export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;

  try {
    const form = await formService.getBySlug(slug);

    if (!form.isActive) {
      notFound();
    }

    return (
      <FormPageBackground form={form}>
        <FormCard form={form} />
      </FormPageBackground>
    );
  } catch (error) {
    if (error instanceof NotFoundError) {
      notFound();
    }
    throw error;
  }
}
