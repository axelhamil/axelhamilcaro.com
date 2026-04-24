export const dynamic = "force-dynamic";

import { templateService } from "@/src/backend/templates/template.service";
import { TemplatesGrid } from "@/src/features/admin-templates/components/templates-grid";
import { TemplatesHeader } from "@/src/features/admin-templates/components/templates-header";
import { TemplatesProvider } from "@/src/features/admin-templates/components/templates-provider";
import { TemplatesSearch } from "@/src/features/admin-templates/components/templates-search";

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

  return (
    <TemplatesProvider templates={formattedTemplates}>
      <div className="space-y-6">
        <TemplatesHeader />
        <TemplatesSearch />
        <TemplatesGrid />
      </div>
    </TemplatesProvider>
  );
}
