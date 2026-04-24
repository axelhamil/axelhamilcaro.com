"use client";

import { motion } from "framer-motion";
import { Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useDashboard } from "@/src/features/admin/hooks/use-dashboard";

export function DashboardHeader() {
  const { dashboard, isRefreshing, refresh } = useDashboard();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">
            Dashboard
          </h1>
          <p className="text-sm text-[var(--admin-text-muted)]">
            {dashboard?.period ?? "Chargement..."}
          </p>
        </div>
        {isRefreshing && (
          <RefreshCw className="h-4 w-4 animate-spin text-[var(--admin-accent)]" />
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => refresh()}
          className="p-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <Link
          href="/admin/forms/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Nouveau formulaire
        </Link>
      </div>
    </motion.div>
  );
}
