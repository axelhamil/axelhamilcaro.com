"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, FileText, LogIn, Zap } from "lucide-react";
import Link from "next/link";
import { AdminStatCard } from "@/src/features/admin/components/shared/admin-stat-card";
import { useDashboard } from "@/src/features/admin/hooks/use-dashboard";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function SecondaryStats() {
  const { dashboard } = useDashboard();
  if (!dashboard) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-3 grid-cols-2 sm:grid-cols-4"
    >
      <AdminStatCard
        title="Click rate"
        value={dashboard.overview.clickRate}
        icon={Zap}
        color="amber"
        suffix="%"
        tooltip="Clics / Vues × 100. Mesure l'engagement avec tes liens."
        variants={item}
      />
      <AdminStatCard
        title="Formulaires"
        value={dashboard.overview.activeForms}
        icon={FileText}
        color="green"
        href="/admin/forms"
        tooltip={`${dashboard.overview.activeForms} actifs sur ${dashboard.overview.totalForms} total.`}
        variants={item}
      />
      <AdminStatCard
        title="Logins"
        value={dashboard.overview.loginAttempts}
        icon={LogIn}
        color="red"
        tooltip="Tentatives de connexion à l'admin cette semaine."
        variants={item}
      />
      <Link
        href="/admin/analytics"
        className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4 text-sm text-[var(--admin-text-muted)] hover:border-[var(--admin-accent)] hover:text-[var(--admin-accent)] transition-colors"
      >
        <BarChart3 className="h-4 w-4" />
        Analytics complets
        <ArrowUpRight className="h-3 w-3" />
      </Link>
    </motion.div>
  );
}
