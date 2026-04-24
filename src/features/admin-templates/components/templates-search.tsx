"use client";

import { AdminSearchInput } from "@/src/features/admin/components/shared/admin-search-input";
import { useTemplates } from "@/src/features/admin-templates/components/templates-provider";

export function TemplatesSearch() {
  const { templates, search, setSearch } = useTemplates();

  if (templates.length === 0) return null;

  return (
    <AdminSearchInput
      value={search}
      onChange={setSearch}
      placeholder="Rechercher un template..."
    />
  );
}
