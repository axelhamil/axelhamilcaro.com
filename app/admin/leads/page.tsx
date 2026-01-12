import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { desc, eq } from "drizzle-orm";
import { Mail } from "lucide-react";
import { DeleteLeadButton } from "./_components/delete-lead-button";
import { ExportButton } from "./_components/export-button";
import { FormFilter } from "./_components/form-filter";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads</h1>
          <p className="text-muted-foreground">
            Tous les contacts capturés via tes formulaires
          </p>
        </div>
        <ExportButton leads={leadsList} />
      </div>

      <FormFilter forms={formsList} currentFormId={params.formId} />

      {leadsList.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 font-semibold">Aucun lead</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {params.formId
              ? "Aucun lead pour ce formulaire"
              : "Les leads apparaîtront ici quand quelqu'un remplira un formulaire"}
          </p>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Formulaire</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsList.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.firstName}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.formTitle}</Badge>
                  </TableCell>
                  <TableCell>
                    {lead.createdAt
                      ? new Date(lead.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteLeadButton leadId={lead.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
