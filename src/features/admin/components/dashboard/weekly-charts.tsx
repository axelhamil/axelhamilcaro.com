"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { WeekChart } from "@/src/features/admin/components/dashboard/week-chart";
import { useDashboard } from "@/src/features/admin/hooks/use-dashboard";

export function WeeklyCharts() {
  const { dashboard } = useDashboard();
  if (!dashboard) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[var(--admin-text)]">
            Vues (7 jours)
          </h3>
          <Eye className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        <WeekChart data={dashboard.charts.viewsLast7Days} color="accent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[var(--admin-text)]">
            Leads (7 jours)
          </h3>
          <Target className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        <WeekChart data={dashboard.charts.leadsLast7Days} color="purple" />
      </motion.div>
    </div>
  );
}
