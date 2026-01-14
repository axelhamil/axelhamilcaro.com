export const dynamic = "force-dynamic";

import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/drizzle";
import { forms } from "@/drizzle/schema";
import { FormPageBackground } from "./_components/form-background";
import { FormCard } from "./_components/form-card";

interface FormPageProps {
  params: Promise<{ slug: string }>;
}

async function getForm(slug: string) {
  const [form] = await db.select().from(forms).where(eq(forms.slug, slug));
  return form;
}

export async function generateMetadata({
  params,
}: FormPageProps): Promise<Metadata> {
  const { slug } = await params;
  const form = await getForm(slug);

  if (!form) {
    return { title: "Formulaire introuvable" };
  }

  return {
    title: form.title,
    description: form.description || undefined,
  };
}

export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;
  const form = await getForm(slug);

  if (!form || !form.isActive) {
    notFound();
  }

  return (
    <FormPageBackground form={form}>
      <FormCard form={form} />
    </FormPageBackground>
  );
}
