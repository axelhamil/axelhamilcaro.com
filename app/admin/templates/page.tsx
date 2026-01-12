export const dynamic = "force-dynamic";

import { db } from "@/app/_lib/db";
import { formTemplates } from "@/app/_lib/db/schema";
import { desc } from "drizzle-orm";
import { TemplatesListClient } from "./_components/templates-list-client";

async function getTemplates() {
  return db.select().from(formTemplates).orderBy(desc(formTemplates.createdAt));
}

export default async function TemplatesPage() {
  const templates = await getTemplates();

  const formattedTemplates = templates.map((template) => {
    const config = template.config as Record<string, unknown> | null;
    return {
      id: template.id,
      name: template.name,
      title: config?.title ? String(config.title) : null,
      badgeText: config?.badgeText ? String(config.badgeText) : null,
      buttonText: config?.buttonText ? String(config.buttonText) : null,
      createdAtFormatted: template.createdAt
        ? new Date(template.createdAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "-",
    };
  });

  return <TemplatesListClient templates={formattedTemplates} />;
}
