export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { desc, sql } from "drizzle-orm";
import { DashboardClient } from "./_components/dashboard-client";

async function getStats() {
  const [formCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(forms);

  const [leadCount] = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads);

  const recentLeads = await db
    .select({
      id: leads.id,
      firstName: leads.firstName,
      email: leads.email,
      createdAt: leads.createdAt,
      formTitle: forms.title,
    })
    .from(leads)
    .innerJoin(forms, sql`${leads.formId} = ${forms.id}`)
    .orderBy(desc(leads.createdAt))
    .limit(8);

  return {
    formCount: formCount?.count || 0,
    leadCount: leadCount?.count || 0,
    recentLeads,
  };
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return "-";
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins} min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

export default async function AdminDashboard() {
  const { formCount, leadCount, recentLeads } = await getStats();
  const conversionRate =
    formCount > 0
      ? Math.round((Number(leadCount) / Number(formCount)) * 10) / 10
      : 0;

  const stats = [
    {
      label: "Formulaires",
      value: formCount,
      iconName: "file-text" as const,
      href: "/admin/forms",
      color: "accent",
    },
    {
      label: "Leads",
      value: leadCount,
      iconName: "mail" as const,
      href: "/admin/leads",
      color: "success",
    },
    {
      label: "Leads / Form",
      value: conversionRate,
      iconName: "trending-up" as const,
      href: "/admin/leads",
      color: "warning",
    },
  ];

  const formattedLeads = recentLeads.map((lead) => ({
    ...lead,
    relativeTime: formatRelativeTime(lead.createdAt),
  }));

  return <DashboardClient stats={stats} recentLeads={formattedLeads} />;
}
