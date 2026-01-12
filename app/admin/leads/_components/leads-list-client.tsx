"use client";

import { motion } from "framer-motion";
import {
  Download,
  Filter,
  Mail,
  Search,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteLeadButton } from "./delete-lead-button";

interface Lead {
  id: string;
  firstName: string | null;
  email: string;
  formId: string;
  formTitle: string;
  formSlug: string;
  createdAtFormatted: string;
}

interface Form {
  id: string;
  title: string;
}

interface LeadsListClientProps {
  leads: Lead[];
  forms: Form[];
  currentFormId?: string;
}

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

    const headers = ["Prénom", "Email", "Formulaire", "Date"];
    const rows = leads.map((lead) => [
      lead.firstName || "",
      lead.email,
      lead.formTitle,
      lead.createdAtFormatted,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(",")
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

export function LeadsListClient({
  leads,
  forms,
  currentFormId,
}: LeadsListClientProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredLeads = leads.filter(
    (lead) =>
      (lead.firstName?.toLowerCase() || "").includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleFilterChange = (formId: string) => {
    if (formId === "all") {
      router.push("/admin/leads");
    } else {
      router.push(`/admin/leads?formId=${formId}`);
    }
  };

  const currentForm = forms.find((f) => f.id === currentFormId);

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
                      <span className="admin-badge">{lead.formTitle}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--admin-text-muted)]">
                      {lead.createdAtFormatted}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end opacity-0 transition-opacity group-hover:opacity-100">
                        <DeleteLeadButton leadId={lead.id} />
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
