"use client";

import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";
import { DayChart } from "@/src/features/admin-analytics/components/day-chart";
import { HourlyChart } from "@/src/features/admin-analytics/components/hourly-chart";

export function ActivityCharts() {
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
            Activité par heure
          </h3>
          <Clock className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        <HourlyChart data={data.viewsByHour} />
        <p className="mt-2 text-xs text-[var(--admin-text-muted)]">
          Pic: {data.peakTimes.hourLabel}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-[var(--admin-text)]">
            Activité par jour
          </h3>
          <Calendar className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        <DayChart data={data.viewsByDayOfWeek} />
      </motion.div>
    </div>
  );
}
