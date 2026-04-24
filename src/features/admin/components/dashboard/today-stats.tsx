"use client";

import { motion } from "framer-motion";
import { useDashboard } from "@/src/features/admin/hooks/use-dashboard";

export function TodayStats() {
  const { dashboard } = useDashboard();
  if (!dashboard) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--admin-border)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4"
    >
      <div className="text-center">
        <p className="text-xs text-[var(--admin-text-muted)]">
          Vues aujourd'hui
        </p>
        <p className="text-2xl font-bold text-blue-500">
          {dashboard.today.views}
        </p>
      </div>
      <div className="text-center border-l border-[var(--admin-border)]">
        <p className="text-xs text-[var(--admin-text-muted)]">
          Leads aujourd'hui
        </p>
        <p className="text-2xl font-bold text-purple-500">
          {dashboard.today.leads}
        </p>
      </div>
    </motion.div>
  );
}
