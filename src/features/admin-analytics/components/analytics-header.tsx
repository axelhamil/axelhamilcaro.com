"use client";

import { motion } from "framer-motion";
import { Calendar, RefreshCw } from "lucide-react";
import {
  presetRanges,
  refreshOptions,
} from "@/src/features/admin-analytics/components/analytics-constants";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function AnalyticsHeader() {
  const {
    isRefreshing,
    refresh,
    days,
    dateRange,
    refreshInterval,
    setRefreshInterval,
    showCustomRange,
    setShowCustomRange,
    handlePresetClick,
  } = useAnalyticsContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-[var(--admin-text)]">
          Analytics
        </h1>
        {isRefreshing && (
          <RefreshCw className="h-4 w-4 animate-spin text-[var(--admin-accent)]" />
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] p-0.5">
          {presetRanges.map((preset) => (
            <button
              key={preset.days}
              type="button"
              onClick={() => handlePresetClick(preset.days)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                days === preset.days && !dateRange
                  ? "bg-[var(--admin-accent)] text-white"
                  : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              {preset.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowCustomRange(!showCustomRange)}
            className={`px-2 py-1 rounded-md transition-colors ${
              dateRange
                ? "bg-[var(--admin-accent)] text-white"
                : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] p-0.5">
          <RefreshCw className="h-3 w-3 ml-1.5 text-[var(--admin-text-muted)]" />
          {refreshOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setRefreshInterval(option.value)}
              className={`px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                refreshInterval === option.value
                  ? "bg-[var(--admin-accent)] text-white"
                  : "text-[var(--admin-text-muted)] hover:text-[var(--admin-text)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => refresh()}
          className="p-1.5 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
