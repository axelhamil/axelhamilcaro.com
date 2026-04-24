"use client";

import { motion } from "framer-motion";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function CustomDateRange() {
  const {
    showCustomRange,
    customFrom,
    setCustomFrom,
    customTo,
    setCustomTo,
    handleCustomRangeApply,
  } = useAnalyticsContext();

  if (!showCustomRange) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)]"
    >
      <input
        type="date"
        value={customFrom}
        onChange={(e) => setCustomFrom(e.target.value)}
        className="px-2 py-1.5 text-sm rounded border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] text-[var(--admin-text)]"
      />
      <span className="text-[var(--admin-text-muted)]">→</span>
      <input
        type="date"
        value={customTo}
        onChange={(e) => setCustomTo(e.target.value)}
        className="px-2 py-1.5 text-sm rounded border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] text-[var(--admin-text)]"
      />
      <button
        type="button"
        onClick={handleCustomRangeApply}
        disabled={!customFrom || !customTo}
        className="px-3 py-1.5 text-sm font-medium rounded bg-[var(--admin-accent)] text-white disabled:opacity-50"
      >
        Appliquer
      </button>
    </motion.div>
  );
}
