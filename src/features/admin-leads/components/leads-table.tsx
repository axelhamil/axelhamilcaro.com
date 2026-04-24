"use client";

import { motion } from "framer-motion";
import { Loader2, Mail, User } from "lucide-react";
import { AdminEmptyState } from "@/src/features/admin/components/shared/admin-empty-state";
import { DeleteLeadButton } from "@/src/features/admin-leads/components/delete-lead-button";
import { useLeadsContext } from "@/src/features/admin-leads/components/leads-provider";
import { NotesEditor } from "@/src/features/admin-leads/components/notes-editor";
import { StatusSelect } from "@/src/features/admin-leads/components/status-select";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.02 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function LeadsTable() {
  const {
    leads,
    filteredLeads,
    isLoading,
    search,
    currentFormId,
    updateLead,
    deleteLead,
  } = useLeadsContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <AdminEmptyState
        icon={Mail}
        title="Aucun lead"
        description={
          currentFormId
            ? "Aucun lead pour ce formulaire"
            : "Les leads apparaitront ici quand quelqu'un remplira un formulaire"
        }
      />
    );
  }

  if (filteredLeads.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-12 text-center">
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
      className="overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-bg)]">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Contact
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Statut
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Notes
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Formulaire
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Date
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--admin-border)]">
            {filteredLeads.map((lead) => (
              <motion.tr
                key={lead.id}
                variants={item}
                className="group transition-colors hover:bg-[var(--admin-bg-elevated)]"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)]">
                      <User className="h-4 w-4 text-[var(--admin-text-muted)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--admin-text)]">
                        {lead.firstName || "Anonyme"}
                      </p>
                      <p className="text-sm text-[var(--admin-text-muted)]">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusSelect
                    leadId={lead.id}
                    currentStatus={lead.status}
                    onUpdate={updateLead}
                  />
                </td>
                <td className="px-4 py-3">
                  <NotesEditor
                    leadId={lead.id}
                    currentNotes={lead.notes}
                    onUpdate={updateLead}
                  />
                </td>
                <td className="px-4 py-3">
                  <span className="admin-badge">{lead.formTitle}</span>
                </td>
                <td className="px-4 py-3 text-sm text-[var(--admin-text-muted)]">
                  {lead.createdAtFormatted}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                    <DeleteLeadButton leadId={lead.id} onDelete={deleteLead} />
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
