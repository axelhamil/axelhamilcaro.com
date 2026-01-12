import { db } from "@/app/_lib/db";
import { formTemplates } from "@/app/_lib/db/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { desc } from "drizzle-orm";
import { Package } from "lucide-react";
import Link from "next/link";
import { DeleteTemplateButton } from "./_components/delete-template-button";

async function getTemplates() {
  return db.select().from(formTemplates).orderBy(desc(formTemplates.createdAt));
}

export default async function TemplatesPage() {
  const templates = await getTemplates();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-muted-foreground">
          Gère tes templates de formulaires réutilisables
        </p>
      </div>

      {templates.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 font-semibold">Aucun template</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Crée un formulaire et sauvegarde-le comme template pour le
            réutiliser plus tard.
          </p>
          <Button asChild className="mt-4">
            <Link href="/admin/forms/new">Créer un formulaire</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => {
            const config = template.config as Record<string, unknown>;
            return (
              <Card key={template.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <DeleteTemplateButton templateId={template.id} />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {config?.title && (
                      <p>
                        <span className="font-medium">Titre:</span>{" "}
                        {String(config.title)}
                      </p>
                    )}
                    {config?.badgeText && (
                      <p>
                        <span className="font-medium">Badge:</span>{" "}
                        {String(config.badgeText)}
                      </p>
                    )}
                    {config?.buttonText && (
                      <p>
                        <span className="font-medium">Bouton:</span>{" "}
                        {String(config.buttonText)}
                      </p>
                    )}
                  </div>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Créé le{" "}
                    {template.createdAt
                      ? new Date(template.createdAt).toLocaleDateString("fr-FR")
                      : "-"}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
