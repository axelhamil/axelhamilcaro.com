"use client";

import { motion } from "framer-motion";
import { Eye, MousePointerClick, Percent, Target, Users } from "lucide-react";
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

export function OverviewStats() {
  const { dashboard } = useDashboard();
  if (!dashboard) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    >
      <AdminStatCard
        title="Vues"
        value={dashboard.overview.totalViews}
        icon={Eye}
        color="blue"
        change={dashboard.comparison.viewsChange}
        tooltip="Nombre total de pages vues sur les 7 derniers jours."
        variants={item}
      />
      <AdminStatCard
        title="Sessions"
        value={dashboard.overview.uniqueSessions}
        icon={Users}
        color="cyan"
        tooltip="Visiteurs uniques identifiés par leur session."
        variants={item}
      />
      <AdminStatCard
        title="Clics"
        value={dashboard.overview.totalClicks}
        icon={MousePointerClick}
        color="green"
        change={dashboard.comparison.clicksChange}
        tooltip="Clics sur les liens de la page Tree."
        variants={item}
      />
      <AdminStatCard
        title="Leads"
        value={dashboard.overview.totalLeads}
        icon={Target}
        color="purple"
        change={dashboard.comparison.leadsChange}
        href="/admin/leads"
        tooltip="Formulaires soumis avec succès."
        variants={item}
      />
      <AdminStatCard
        title="Conversion"
        value={dashboard.overview.conversionRate}
        icon={Percent}
        color="pink"
        suffix="%"
        tooltip="Taux de conversion = Leads / Vues × 100."
        variants={item}
      />
    </motion.div>
  );
}
