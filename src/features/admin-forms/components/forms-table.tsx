"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, Loader2, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { AdminEmptyState } from "@/src/features/admin/components/shared/admin-empty-state";
import { CopySlugButton } from "@/src/features/admin-forms/components/copy-slug-button";
import { DeleteFormButton } from "@/src/features/admin-forms/components/delete-form-button";
import { useFormsContext } from "@/src/features/admin-forms/components/forms-provider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function FormsTable() {
  const { forms, filteredForms, isLoading, search, deleteForm } =
    useFormsContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (forms.length === 0) {
    return (
      <AdminEmptyState
        icon={FileText}
        title="Aucun formulaire"
        description="Cree ton premier formulaire pour commencer a capturer des leads"
        action={{
          label: "Creer un formulaire",
          href: "/admin/forms/new",
          icon: Plus,
        }}
      />
    );
  }

  if (filteredForms.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)] py-12 text-center">
        <p className="text-sm text-[var(--admin-text-muted)]">
          Aucun résultat pour "{search}"
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Formulaire
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Slug
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Leads
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Statut
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Créé le
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {filteredForms.map((form) => (
              <motion.tr
                key={form.id}
                variants={item}
                className="group transition-colors hover:bg-[var(--admin-bg-elevated)]"
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-[var(--admin-text)]">
                    {form.title}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <CopySlugButton slug={form.slug} />
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="admin-badge admin-badge-accent">
                    {form.leadsCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`admin-status-dot ${
                        form.isActive
                          ? "admin-status-active"
                          : "admin-status-inactive"
                      }`}
                    />
                    <span
                      className={`text-xs ${
                        form.isActive
                          ? "text-[var(--admin-success)]"
                          : "text-[var(--admin-text-subtle)]"
                      }`}
                    >
                      {form.isActive ? "Actif" : "Inactif"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--admin-text-muted)]">
                  {form.createdAtFormatted}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      href={`/f/${form.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-text)]"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/forms/${form.id}`}
                      className="rounded-lg p-2 text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-accent)]"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <DeleteFormButton formId={form.id} onDelete={deleteForm} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
