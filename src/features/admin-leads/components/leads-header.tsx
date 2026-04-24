"use client";

import { motion } from "framer-motion";
import { ExportButton } from "@/src/features/admin-leads/components/export-button";
import { useLeadsContext } from "@/src/features/admin-leads/components/leads-provider";

export function LeadsHeader() {
  const { leads } = useLeadsContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">Leads</h1>
          <span className="admin-badge admin-badge-success">
            {leads.length}
          </span>
        </div>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Tous les contacts capturés via tes formulaires
        </p>
      </div>
      <ExportButton />
    </motion.div>
  );
}
