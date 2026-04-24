"use client";

import { motion } from "framer-motion";
import { LogIn, Target, Users } from "lucide-react";
import Image from "next/image";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function RecentActivityPanels() {
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
            Derniers leads
          </h3>
          <Target className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.recentLeads.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucun lead
          </p>
        ) : (
          <div className="space-y-2">
            {data.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[var(--admin-text)]">
                    {lead.firstName}
                  </p>
                  <p className="text-[10px] text-[var(--admin-text-muted)]">
                    {lead.email}
                  </p>
                </div>
                <span className="text-[10px] text-[var(--admin-text-subtle)]">
                  {lead.formTitle}
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
            Tentatives login
          </h3>
          <LogIn className="h-4 w-4 text-[var(--admin-text-muted)]" />
        </div>
        {data.recentLoginAttempts.length === 0 ? (
          <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
            Aucune tentative
          </p>
        ) : (
          <div className="space-y-2">
            {data.recentLoginAttempts.slice(0, 5).map((attempt) => (
              <div key={attempt.id} className="flex items-center gap-2">
                {attempt.githubAvatar ? (
                  <Image
                    src={attempt.githubAvatar}
                    alt=""
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full"
                    unoptimized
                  />
                ) : (
                  <div className="h-6 w-6 rounded-full bg-[var(--admin-bg-elevated)] flex items-center justify-center">
                    <Users className="h-3 w-3 text-[var(--admin-text-muted)]" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-[var(--admin-text)] truncate">
                    {attempt.githubUsername || "Anonyme"}
                  </p>
                  <p className="text-[10px] text-[var(--admin-text-muted)] truncate">
                    {attempt.githubEmail || attempt.ipAddress || "—"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
