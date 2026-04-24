"use client";

import {
  BarChart3,
  Eye,
  LogIn,
  MousePointerClick,
  Percent,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { AdminStatCard } from "@/src/features/admin/components/shared/admin-stat-card";
import { useAnalyticsContext } from "@/src/features/admin-analytics/components/analytics-provider";

export function AnalyticsOverviewStats() {
  const { data } = useAnalyticsContext();
  if (!data) return null;

  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
      <AdminStatCard
        title="Vues"
        value={data.overview.totalViews}
        icon={Eye}
        color="blue"
        change={data.comparison.viewsChange}
        tooltip="Nombre total de pages vues sur la période. Inclut toutes les pages du site (accueil, tree, formulaires...)."
      />
      <AdminStatCard
        title="Sessions"
        value={data.overview.uniqueSessions}
        icon={Users}
        color="cyan"
        tooltip="Nombre de visiteurs uniques identifiés par leur session. Un visiteur qui revient le lendemain compte comme une nouvelle session."
      />
      <AdminStatCard
        title="Clics"
        value={data.overview.totalClicks}
        icon={MousePointerClick}
        color="green"
        change={data.comparison.clicksChange}
        tooltip="Total des clics sur les liens de la page Tree (LinkedIn, GitHub, etc.). Mesure l'engagement avec tes liens."
      />
      <AdminStatCard
        title="Leads"
        value={data.overview.totalLeads}
        icon={Target}
        color="purple"
        change={data.comparison.leadsChange}
        tooltip="Nombre de formulaires soumis avec succès. Chaque lead représente un contact potentiel capturé."
      />
      <AdminStatCard
        title="Conversion"
        value={data.overview.conversionRate}
        icon={Percent}
        color="pink"
        suffix="%"
        tooltip="Taux de conversion = (Leads / Vues) × 100. Indique le pourcentage de visiteurs qui deviennent des leads."
      />
      <AdminStatCard
        title="Click rate"
        value={data.overview.clickRate}
        icon={Zap}
        color="amber"
        suffix="%"
        tooltip="Taux de clic = (Clics / Vues) × 100. Mesure l'efficacité de tes liens sur la page Tree."
      />
      <AdminStatCard
        title="Vues/Session"
        value={data.overview.avgViewsPerSession}
        icon={BarChart3}
        color="blue"
        tooltip="Nombre moyen de pages consultées par visiteur. Un chiffre élevé indique un bon engagement."
      />
      <AdminStatCard
        title="Logins"
        value={data.overview.totalLoginAttempts}
        icon={LogIn}
        color="red"
        tooltip="Tentatives de connexion à l'admin. Utile pour détecter des tentatives d'accès non autorisées."
      />
      <AdminStatCard
        title="Formulaires"
        value={data.overview.activeForms}
        icon={TrendingUp}
        color="green"
        tooltip="Nombre de formulaires actuellement actifs et accessibles aux visiteurs."
      />
    </div>
  );
}
