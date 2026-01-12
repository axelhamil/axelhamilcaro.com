export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { FormsListClient } from "./_components/forms-list-client";

async function getForms() {
  return db
    .select({
      id: forms.id,
      slug: forms.slug,
      title: forms.title,
      isActive: forms.isActive,
      createdAt: forms.createdAt,
      leadsCount: sql<number>`(SELECT COUNT(*) FROM ${leads} WHERE ${leads.formId} = ${forms.id})`,
    })
    .from(forms)
    .orderBy(desc(forms.createdAt));
}

export default async function FormsPage() {
  const formsList = await getForms();

  const formattedForms = formsList.map((form) => ({
    ...form,
    createdAtFormatted: form.createdAt
      ? new Date(form.createdAt).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "-",
  }));

  return <FormsListClient forms={formattedForms} />;
}
