"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function TrafficSources() {
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
            Sources par catégorie
          </h3>
          <Globe className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.trafficSources.byCategory.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune donnée
          </p>
        ) : (
          <div className="space-y-3">
            {data.trafficSources.byCategory.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-[var(--admin-text)]">
                    {cat.label}
                  </span>
                  <span className="text-xs text-[var(--admin-text-muted)]">
                    {cat.count}{" "}
                    <span className="text-[10px]">({cat.percentage}%)</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[var(--admin-bg-elevated)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[var(--admin-text)]">
            Top sources
          </h3>
          <ExternalLink className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.trafficSources.bySource.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune donnée
          </p>
        ) : (
          <div className="space-y-2">
            {data.trafficSources.bySource.slice(0, 6).map((source, i) => (
              <div
                key={`${source.category}-${source.name}`}
                className="flex items-center gap-2"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)] text-[10px] font-medium text-[var(--admin-text-muted)]">
                  {i + 1}
                </span>
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ backgroundColor: source.color }}
                />
                <span className="flex-1 text-xs text-[var(--admin-text)] truncate">
                  {source.name}
                </span>
                <span className="text-xs font-medium text-[var(--admin-accent)]">
                  {source.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
