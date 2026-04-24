"use client";

import { motion } from "framer-motion";
import { BarChart3, Globe, Laptop } from "lucide-react";
import { deviceIcons } from "@/src/features/admin-analytics/components/analytics-constants";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function BreakdownPanels() {
  const { data } = useAnalyticsContext();
  if (!data) return null;

  const totalDevices = data.viewsByDevice.reduce((acc, d) => acc + d.count, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[var(--admin-text)]">
            Pages
          </h3>
          <BarChart3 className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.viewsByPage.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune donnée
          </p>
        ) : (
          <div className="space-y-2">
            {data.viewsByPage.slice(0, 5).map((page) => (
              <div
                key={page.path}
                className="flex items-center justify-between"
              >
                <span className="text-xs text-[var(--admin-text)] truncate max-w-[150px]">
                  {page.path}
                </span>
                <span className="text-xs font-medium text-[var(--admin-accent)]">
                  {page.count}
                </span>
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
            Appareils
          </h3>
          <Laptop className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {totalDevices === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune donnée
          </p>
        ) : (
          <div className="space-y-2">
            {data.viewsByDevice.map((d) => {
              const Icon = deviceIcons[d.device] || Laptop;
              const percent = Math.round((d.count / totalDevices) * 100);
              return (
                <div key={d.device} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3 text-[var(--admin-text-muted)]" />
                      <span className="text-xs text-[var(--admin-text)] capitalize">
                        {d.device}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--admin-text-muted)]">
                      {percent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--admin-bg-elevated)]">
                    <div
                      className="h-full rounded-full bg-[var(--admin-accent)]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
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
            Pays
          </h3>
          <Globe className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.viewsByCountry.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune donnée
          </p>
        ) : (
          <div className="space-y-2">
            {data.viewsByCountry.slice(0, 5).map((item) => (
              <div
                key={item.country}
                className="flex items-center justify-between"
              >
                <span className="text-xs text-[var(--admin-text)]">
                  {item.country || "Inconnu"}
                </span>
                <span className="text-xs font-medium text-[var(--admin-accent)]">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
