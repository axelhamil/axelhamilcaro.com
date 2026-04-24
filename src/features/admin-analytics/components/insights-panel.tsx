"use client";

import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";
import { generateInsights } from "@/src/features/admin-analytics/components/generate-insights";

export function InsightsPanel() {
  const { data } = useAnalyticsContext();
  if (!data) return null;

  const insights = generateInsights(data);
  if (insights.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl border border-[var(--admin-border)] bg-gradient-to-r from-amber-500/5 to-orange-500/5 p-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-4 w-4 text-amber-500" />
        <h3 className="font-semibold text-sm text-[var(--admin-text)]">
          Insights
        </h3>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight) => (
          <div
            key={insight.message}
            className="flex items-start gap-2 rounded-lg bg-[var(--admin-bg)] p-2.5"
          >
            <span
              className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                insight.type === "positive"
                  ? "bg-green-500"
                  : insight.type === "negative"
                    ? "bg-red-500"
                    : "bg-blue-500"
              }`}
            />
            <p className="text-xs text-[var(--admin-text)]">
              {insight.message}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
