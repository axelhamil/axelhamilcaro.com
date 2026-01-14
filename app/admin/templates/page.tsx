export const dynamic = "force-dynamic";

import { templateService } from "@/src/features/templates/template.service";
import { TemplatesListClient } from "./_components/templates-list-client";

export default async function TemplatesPage() {
  const templates = await templateService.list();

  const formattedTemplates = templates.map((template) => {
    const config =
      template.config && typeof template.config === "object"
        ? (template.config as Record<string, unknown>)
        : null;
    return {
      id: template.id,
      name: template.name,
      title: config && typeof config.title === "string" ? config.title : null,
      badgeText:
        config && typeof config.badgeText === "string"
          ? config.badgeText
          : null,
      buttonText:
        config && typeof config.buttonText === "string"
          ? config.buttonText
          : null,
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
