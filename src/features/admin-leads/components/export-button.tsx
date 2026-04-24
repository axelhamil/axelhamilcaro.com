"use client";

import { Download } from "lucide-react";
import { toast } from "sonner";
import { useLeadsContext } from "@/src/features/admin-leads/components/leads-provider";

export function ExportButton() {
  const { filteredLeads } = useLeadsContext();

  const handleExport = () => {
    if (filteredLeads.length === 0) {
      toast.error("Aucun lead à exporter");
      return;
    }

    const headers = [
      "Prénom",
      "Email",
      "Formulaire",
      "Statut",
      "Notes",
      "Date",
    ];
    const rows = filteredLeads.map((lead) => [
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

    toast.success(`${filteredLeads.length} leads exportés`);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={filteredLeads.length === 0}
      className="flex items-center gap-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] px-3 py-2 text-sm font-medium text-[var(--admin-text-muted)] transition-colors hover:border-[var(--admin-border-hover)] hover:text-[var(--admin-text)] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      Exporter CSV
    </button>
  );
}
