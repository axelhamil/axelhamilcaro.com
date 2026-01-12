export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { forms, formTemplates } from "@/app/_lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { FormEditor } from "../_components/form-editor";

async function getForm(id: string) {
  const [form] = await db.select().from(forms).where(eq(forms.id, id));
  return form;
}

async function getTemplates() {
  return db.select().from(formTemplates).orderBy(desc(formTemplates.createdAt));
}

export default async function EditFormPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [form, templates] = await Promise.all([getForm(id), getTemplates()]);

  if (!form) {
    notFound();
  }

  return <FormEditor form={form} templates={templates} />;
}
