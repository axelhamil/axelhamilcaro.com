import { db } from "@/app/_lib/db";
import { forms, leads } from "@/app/_lib/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { desc, sql } from "drizzle-orm";
import { ExternalLink, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteFormButton } from "./_components/delete-form-button";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Formulaires</h1>
          <p className="text-muted-foreground">
            Gère tes formulaires de capture
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/forms/new">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau formulaire
          </Link>
        </Button>
      </div>

      {formsList.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">Aucun formulaire créé</p>
          <Button asChild className="mt-4">
            <Link href="/admin/forms/new">
              <Plus className="mr-2 h-4 w-4" />
              Créer ton premier formulaire
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Leads</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Créé le</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formsList.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-2 py-1 text-sm">
                      /f/{form.slug}
                    </code>
                  </TableCell>
                  <TableCell>{form.leadsCount}</TableCell>
                  <TableCell>
                    <Badge variant={form.isActive ? "default" : "secondary"}>
                      {form.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {form.createdAt
                      ? new Date(form.createdAt).toLocaleDateString("fr-FR")
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/f/${form.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/forms/${form.id}`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteFormButton formId={form.id} />
                    </div>
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
