"use client";

import { AdminSearchInput } from "@/src/features/admin/components/shared/admin-search-input";
import { useFormsContext } from "@/src/features/admin-forms/components/forms-provider";

export function FormsSearch() {
  const { forms, search, setSearch } = useFormsContext();

  if (forms.length === 0) return null;

  return (
    <AdminSearchInput
      value={search}
      onChange={setSearch}
      placeholder="Rechercher un formulaire..."
    />
  );
}
