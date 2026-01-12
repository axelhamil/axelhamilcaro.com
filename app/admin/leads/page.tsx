export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { LeadsListClient } from "./_components/leads-list-client";

interface LeadsPageProps {
  searchParams: Promise<{ formId?: string }>;
}

async function getLeads(formId?: string) {
  let query = db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      email: leads.email,
      createdAt: leads.createdAt,
      formId: leads.formId,
      formTitle: forms.title,
      formSlug: forms.slug,
    })
    .from(leads)
    .innerJoin(forms, eq(leads.formId, forms.id))
    .orderBy(desc(leads.createdAt));

  if (formId) {
    query = query.where(eq(leads.formId, formId)) as typeof query;
  }

  return query;
}

async function getForms() {
  return db
    .select({ id: forms.id, title: forms.title })
    .from(forms)
    .orderBy(forms.title);
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const params = await searchParams;
  const [leadsList, formsList] = await Promise.all([
    getLeads(params.formId),
    getForms(),
  ]);

  const formattedLeads = leadsList.map((lead) => ({
    ...lead,
    createdAtFormatted: lead.createdAt
      ? new Date(lead.createdAt).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "-",
  }));

  return (
    <LeadsListClient
      leads={formattedLeads}
      forms={formsList}
      currentFormId={params.formId}
    />
  );
}
