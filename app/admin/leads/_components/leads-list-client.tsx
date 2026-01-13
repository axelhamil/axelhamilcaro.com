"use client";

import { motion } from "framer-motion";
import {
  Check,
  ChevronDown,
  Download,
  Filter,
  Loader2,
  Mail,
  MessageSquare,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useLeads, type Lead, type LeadStatus } from "../../_hooks";

const statusConfig: Record<
  LeadStatus,
  { label: string; color: string; bg: string }
> = {
  new: { label: "Nouveau", color: "text-blue-600", bg: "bg-blue-100" },
  contacted: { label: "Contacté", color: "text-amber-600", bg: "bg-amber-100" },
  qualified: { label: "Qualifié", color: "text-purple-600", bg: "bg-purple-100" },
  converted: { label: "Converti", color: "text-green-600", bg: "bg-green-100" },
};

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

function EmptyState({ hasFilter }: { hasFilter: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-16"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)]">
        <Mail className="h-7 w-7 text-[var(--admin-text-subtle)]" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-[var(--admin-text)]">
        Aucun lead
      </h3>
      <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
        {hasFilter
          ? "Aucun lead pour ce formulaire"
          : "Les leads apparaîtront ici quand quelqu'un remplira un formulaire"}
      </p>
    </motion.div>
  );
}

function ExportButton({ leads }: { leads: Lead[] }) {
  const handleExport = () => {
    if (leads.length === 0) {
      toast.error("Aucun lead à exporter");
      return;
    }

    const headers = ["Prénom", "Email", "Formulaire", "Statut", "Notes", "Date"];
    const rows = leads.map((lead) => [
      lead.firstName || "",
      lead.email,
      lead.formTitle,
      lead.status || "new",
      lead.notes || "",
      lead.createdAtFormatted,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success(`${leads.length} leads exportés`);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={leads.length === 0}
      className="flex items-center gap-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] px-3 py-2 text-sm font-medium text-[var(--admin-text-muted)] transition-colors hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      Exporter CSV
    </button>
  );
}

function StatusSelect({
  leadId,
  currentStatus,
  onUpdate,
}: {
  leadId: string;
  currentStatus: LeadStatus | null;
  onUpdate: (id: string, updates: { status: LeadStatus }) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const status = currentStatus || "new";
  const config = statusConfig[status];

  const handleSelect = async (newStatus: LeadStatus) => {
    setIsOpen(false);
    if (newStatus !== status) {
      try {
        await onUpdate(leadId, { status: newStatus });
        toast.success("Statut mis à jour");
      } catch {
        toast.error("Erreur lors de la mise à jour");
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.bg} ${config.color}`}
      >
        {config.label}
        <ChevronDown className="h-3 w-3" />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-1 w-32 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] py-1 shadow-lg">
            {(Object.keys(statusConfig) as LeadStatus[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSelect(s)}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-xs hover:bg-[var(--admin-bg-elevated)] ${statusConfig[s].color}`}
              >
                {statusConfig[s].label}
                {s === status && <Check className="h-3 w-3" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NotesEditor({
  leadId,
  currentNotes,
  onUpdate,
}: {
  leadId: string;
  currentNotes: string | null;
  onUpdate: (id: string, updates: { notes: string }) => Promise<void>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(currentNotes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (notes === (currentNotes || "")) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      await onUpdate(leadId, { notes });
      toast.success("Notes mises à jour");
      setIsEditing(false);
    } catch {
      toast.error("Erreur lors de la sauvegarde");
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className="w-32 rounded border border-[var(--admin-border)] bg-[var(--admin-bg)] px-2 py-1 text-xs"
          placeholder="Ajouter une note..."
        />
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="rounded p-1 text-[var(--admin-accent)] hover:bg-[var(--admin-accent-muted)]"
        >
          {isSaving ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            <Check className="h-3 w-3" />
          )}
        </button>
        <button
          type="button"
          onClick={() => {
            setNotes(currentNotes || "");
            setIsEditing(false);
          }}
          className="rounded p-1 text-[var(--admin-text-muted)] hover:bg-[var(--admin-bg-elevated)]"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsEditing(true)}
      className="flex items-center gap-1 text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
    >
      <MessageSquare className="h-3 w-3" />
      {currentNotes ? (
        <span className="max-w-[100px] truncate">{currentNotes}</span>
      ) : (
        <span className="italic">Ajouter</span>
      )}
    </button>
  );
}

function DeleteLeadButton({
  leadId,
  onDelete,
}: {
  leadId: string;
  onDelete: (id: string) => Promise<void>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(leadId);
      toast.success("Lead supprimé");
    } catch {
      toast.error("Erreur lors de la suppression");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg p-2 text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-destructive-muted)] hover:text-[var(--admin-destructive)]"
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </button>
  );
}

export function LeadsListClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFormId = searchParams.get("formId") || undefined;

  const { leads, forms, isLoading, deleteLead, updateLead } = useLeads(currentFormId);
  const [search, setSearch] = useState("");

  const filteredLeads = useMemo(
    () =>
      leads.filter(
        (lead) =>
          (lead.firstName?.toLowerCase() || "").includes(
            search.toLowerCase(),
          ) || lead.email.toLowerCase().includes(search.toLowerCase()),
      ),
    [leads, search],
  );

  const handleFilterChange = (formId: string) => {
    if (formId === "all") {
      router.push("/admin/leads");
    } else {
      router.push(`/admin/leads?formId=${formId}`);
    }
  };

  const currentForm = forms.find((f) => f.id === currentFormId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[var(--admin-text)]">
              Leads
            </h1>
            <span className="admin-badge admin-badge-success">
              {leads.length}
            </span>
          </div>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            Tous les contacts capturés via tes formulaires
          </p>
        </div>
        <ExportButton leads={filteredLeads} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-subtle)]" />
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-2.5 pl-10 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] transition-colors focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent-muted)]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[var(--admin-text-subtle)]" />
          <select
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
            onClick={() => router.push("/admin/leads")}
            className="flex items-center gap-1 rounded-lg bg-[var(--admin-accent-muted)] px-2 py-1 text-xs font-medium text-[var(--admin-accent)] transition-colors hover:bg-[var(--admin-accent)] hover:text-white"
          >
            {currentForm?.title}
            <X className="h-3 w-3" />
          </button>
        )}
      </motion.div>

      {leads.length === 0 ? (
        <EmptyState hasFilter={!!currentFormId} />
      ) : filteredLeads.length === 0 ? (
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-12 text-center">
          <p className="text-sm text-[var(--admin-text-muted)]">
            Aucun résultat pour "{search}"
          </p>
        </div>
      ) : (
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
                        <DeleteLeadButton
                          leadId={lead.id}
                          onDelete={deleteLead}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
