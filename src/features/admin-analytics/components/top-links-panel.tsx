"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function TopLinksPanel() {
  const { data } = useAnalyticsContext();
  if (!data) return null;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[var(--admin-text)]">
            Top liens
          </h3>
          <Link2 className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.topLinks.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune donnée
          </p>
        ) : (
          <div className="space-y-2">
            {data.topLinks.slice(0, 5).map((link, i) => (
              <div key={link.id} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)] text-[10px] font-medium text-[var(--admin-text-muted)]">
                  {i + 1}
                </span>
                <span className="flex-1 text-xs text-[var(--admin-text)] truncate">
                  {link.title}
                </span>
                <span className="text-xs font-medium text-green-500">
                  {link.clicks}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
