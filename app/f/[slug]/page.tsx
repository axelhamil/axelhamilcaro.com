export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { forms } from "@/app/_lib/db/schema";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FormCard } from "./_components/form-card";
import { FormPageBackground } from "./_components/form-background";

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
