"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Lead {
  id: string;
  firstName: string;
  email: string;
  createdAt: Date | null;
  formTitle: string;
}

interface ExportButtonProps {
  leads: Lead[];
}

export function ExportButton({ leads }: ExportButtonProps) {
  const handleExport = () => {
    if (leads.length === 0) return;

    const headers = ["Prénom", "Email", "Formulaire", "Date"];
    const rows = leads.map((lead) => [
      lead.firstName,
      lead.email,
      lead.formTitle,
      lead.createdAt
        ? new Date(lead.createdAt).toLocaleDateString("fr-FR")
        : "-",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  return (
    <Button
      variant="outline"
      onClick={handleExport}
      disabled={leads.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      Exporter CSV
    </Button>
  );
}
