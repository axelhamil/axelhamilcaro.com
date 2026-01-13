"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Clock,
  FileText,
  Mail,
  Plus,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";

type IconName = "file-text" | "mail" | "trending-up";

const iconMap: Record<IconName, LucideIcon> = {
  "file-text": FileText,
  mail: Mail,
  "trending-up": TrendingUp,
};

interface StatItem {
  label: string;
  value: number;
  iconName: IconName;
  href: string;
  color: string;
}

interface Lead {
  id: string;
  firstName: string | null;
  email: string;
  formTitle: string;
  relativeTime: string;
}

interface DashboardClientProps {
  stats: StatItem[];
  recentLeads: Lead[];
}

const colorClasses: Record<string, { bg: string; text: string }> = {
  accent: {
    bg: "bg-[var(--admin-accent-muted)]",
    text: "text-[var(--admin-accent)]",
  },
  success: {
    bg: "bg-[var(--admin-success-muted)]",
    text: "text-[var(--admin-success)]",
  },
  warning: {
    bg: "bg-amber-100",
    text: "text-amber-600",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function DashboardClient({ stats, recentLeads }: DashboardClientProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            Vue d'ensemble de tes formulaires et leads
          </p>
        </div>
        <Link
          href="/admin/forms/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Nouveau formulaire
        </Link>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-3"
      >
        {stats.map((stat) => {
          const colors = colorClasses[stat.color] || colorClasses.accent;
          const Icon = iconMap[stat.iconName];
          return (
            <motion.div key={stat.label} variants={item}>
              <Link href={stat.href}>
                <div className="group rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)] p-5 transition-all hover:border-[var(--admin-border-hover)] hover:shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--admin-text-muted)]">
                        {stat.label}
                      </p>
                      <p className={`mt-2 text-3xl font-bold ${colors.text}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg}`}
                    >
                      <Icon className={`h-6 w-6 ${colors.text}`} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--admin-border)] p-5">
          <div>
            <h2 className="font-semibold text-[var(--admin-text)]">
              Leads récents
            </h2>
            <p className="text-sm text-[var(--admin-text-muted)]">
              Les dernières inscriptions
            </p>
          </div>
          <Link
            href="/admin/leads"
            className="flex items-center gap-1 text-sm text-[var(--admin-text-muted)] transition-colors hover:text-[var(--admin-accent)]"
          >
            Voir tout
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="p-5">
          {recentLeads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)]">
                <Mail className="h-7 w-7 text-[var(--admin-text-subtle)]" />
              </div>
              <p className="mt-4 text-sm text-[var(--admin-text-muted)]">
                Aucun lead pour le moment
              </p>
              <p className="text-xs text-[var(--admin-text-subtle)]">
                Les inscriptions apparaîtront ici
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {recentLeads.map((lead) => (
                <motion.div
                  key={lead.id}
                  variants={item}
                  className="flex items-center justify-between rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-3 transition-colors hover:border-[var(--admin-border-hover)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--admin-accent-muted)]">
                      <User className="h-5 w-5 text-[var(--admin-accent)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--admin-text)]">
                        {lead.firstName || "Anonyme"}
                      </p>
                      <p className="text-sm text-[var(--admin-text-muted)]">
                        {lead.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[var(--admin-text)]">
                      {lead.formTitle}
                    </p>
                    <p className="flex items-center justify-end gap-1 text-xs text-[var(--admin-text-subtle)]">
                      <Clock className="h-3 w-3" />
                      {lead.relativeTime}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
