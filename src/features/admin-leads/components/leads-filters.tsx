"use client";

import { motion } from "framer-motion";
import { Filter, X } from "lucide-react";
import { AdminSearchInput } from "@/src/features/admin/components/shared/admin-search-input";
import { useLeadsContext } from "@/src/features/admin-leads/components/leads-provider";

export function LeadsFilters() {
  const {
    search,
    setSearch,
    forms,
    currentFormId,
    currentForm,
    handleFilterChange,
    clearFilter,
  } = useLeadsContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <AdminSearchInput
        value={search}
        onChange={setSearch}
        placeholder="Rechercher par nom ou email..."
        className="flex-1"
      />

      <div className="flex items-center gap-2">
        <Filter
          className="h-4 w-4 text-[var(--admin-text-subtle)]"
          aria-hidden="true"
        />
        <label htmlFor="form-filter" className="sr-only">
          Filtrer par formulaire
        </label>
        <select
          id="form-filter"
          value={currentFormId || "all"}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] px-3 py-2.5 text-sm text-[var(--admin-text)] transition-colors focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent-muted)]"
        >
          <option value="all">Tous les formulaires</option>
          {forms.map((form) => (
            <option key={form.id} value={form.id}>
              {form.title}
            </option>
          ))}
        </select>
      </div>

      {currentFormId && (
        <button
          type="button"
          onClick={clearFilter}
          className="flex items-center gap-1 rounded-lg bg-[var(--admin-accent-muted)] px-2 py-1 text-xs font-medium text-[var(--admin-accent)] transition-colors hover:bg-[var(--admin-accent)] hover:text-white"
        >
          {currentForm?.title}
          <X className="h-3 w-3" />
        </button>
      )}
    </motion.div>
  );
}
