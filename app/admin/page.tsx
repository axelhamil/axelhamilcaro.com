export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { desc, sql } from "drizzle-orm";
import { FileText, Mail, TrendingUp } from "lucide-react";
import Link from "next/link";

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
    .limit(5);

  return {
    formCount: formCount?.count || 0,
    leadCount: leadCount?.count || 0,
    recentLeads,
  };
}

export default async function AdminDashboard() {
  const { formCount, leadCount, recentLeads } = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue dans ton espace d'administration
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Formulaires</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formCount}</div>
            <Link
              href="/admin/forms"
              className="text-xs text-muted-foreground hover:underline"
            >
              Voir tous les formulaires →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leadCount}</div>
            <Link
              href="/admin/leads"
              className="text-xs text-muted-foreground hover:underline"
            >
              Voir tous les leads →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formCount > 0
                ? Math.round((Number(leadCount) / Number(formCount)) * 10) / 10
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">leads par formulaire</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads récents</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLeads.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun lead pour le moment
            </p>
          ) : (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{lead.firstName}</p>
                    <p className="text-sm text-muted-foreground">{lead.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{lead.formTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.createdAt
                        ? new Date(lead.createdAt).toLocaleDateString("fr-FR")
                        : "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Link
          href="/admin/forms/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Créer un formulaire
        </Link>
      </div>
    </div>
  );
}
