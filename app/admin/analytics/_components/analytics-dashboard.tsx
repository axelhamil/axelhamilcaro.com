"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Clock,
  ExternalLink,
  Eye,
  Globe,
  Laptop,
  Lightbulb,
  Link2,
  Loader2,
  LogIn,
  Monitor,
  MousePointerClick,
  Percent,
  RefreshCw,
  Smartphone,
  Tablet,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { AdminStatCard } from "@/app/admin/_components/shared";
import {
  type AnalyticsData,
  type DateRange,
  type RefreshInterval,
  useAnalytics,
} from "@/app/_hooks/swr/use-analytics";

const deviceIcons: Record<string, typeof Smartphone> = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
  unknown: Laptop,
};

const presetRanges = [
  { label: "7j", days: 7 },
  { label: "30j", days: 30 },
  { label: "90j", days: 90 },
  { label: "180j", days: 180 },
  { label: "1an", days: 365 },
];

const refreshOptions: { label: string; value: RefreshInterval }[] = [
  { label: "Off", value: 0 },
  { label: "5s", value: 5000 },
  { label: "10s", value: 10000 },
  { label: "15s", value: 15000 },
  { label: "30s", value: 30000 },
];

interface Insight {
  type: "positive" | "negative" | "neutral";
  message: string;
}

function generateInsights(data: AnalyticsData): Insight[] {
  const insights: Insight[] = [];

  if (data.comparison.viewsChange > 10) {
    insights.push({
      type: "positive",
      message: `+${data.comparison.viewsChange}% de vues vs période précédente`,
    });
  } else if (data.comparison.viewsChange < -10) {
    insights.push({
      type: "negative",
      message: `${data.comparison.viewsChange}% de vues vs période précédente`,
    });
  }

  if (data.comparison.leadsChange > 0) {
    insights.push({
      type: "positive",
      message: `+${data.comparison.leadsChange}% de leads capturés`,
    });
  }

  if (data.overview.conversionRate > 0) {
    insights.push({
      type: "neutral",
      message: `Taux de conversion: ${data.overview.conversionRate}%`,
    });
  }

  if (data.peakTimes.hourLabel) {
    insights.push({
      type: "neutral",
      message: `Pic d'activité: ${data.peakTimes.hourLabel} le ${data.peakTimes.dayLabel}`,
    });
  }

  const mobileViews = data.viewsByDevice.find((d) => d.device === "mobile");
  const totalDevices = data.viewsByDevice.reduce((acc, d) => acc + d.count, 0);
  if (mobileViews && totalDevices > 0) {
    const mobilePercent = Math.round((mobileViews.count / totalDevices) * 100);
    if (mobilePercent > 50) {
      insights.push({
        type: "neutral",
        message: `${mobilePercent}% du trafic est mobile`,
      });
    }
  }

  if (data.topLinks.length > 0 && data.topLinks[0].clicks > 5) {
    insights.push({
      type: "positive",
      message: `"${data.topLinks[0].title}" est le plus cliqué`,
    });
  }

  return insights.slice(0, 4);
}

function InsightsPanel({ insights }: { insights: Insight[] }) {
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
        {insights.map((insight, i) => (
          <div
            key={i}
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

function HourlyChart({
  data,
}: {
  data: Array<{ hour: number; count: number }>;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="flex items-end gap-0.5 h-16">
      {hours.map((hour) => {
        const hourData = data.find((d) => d.hour === hour);
        const count = hourData?.count || 0;
        const height = count > 0 ? Math.max((count / maxCount) * 100, 8) : 4;
        return (
          <div
            key={hour}
            className="flex-1 bg-[var(--admin-accent)] rounded-t opacity-60 hover:opacity-100 transition-opacity"
            style={{ height: `${height}%` }}
            title={`${hour}h: ${count} vues`}
          />
        );
      })}
    </div>
  );
}

function DayChart({
  data,
}: {
  data: Array<{ day: number; dayLabel: string; count: number }>;
}) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];

  return (
    <div className="flex items-end gap-1 h-20">
      {days.map((dayLabel, day) => {
        const dayData = data.find((d) => d.day === day);
        const count = dayData?.count || 0;
        const height = count > 0 ? Math.max((count / maxCount) * 100, 10) : 5;
        return (
          <div key={day} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-[var(--admin-accent)] rounded-t opacity-60 hover:opacity-100 transition-opacity"
              style={{ height: `${height}%` }}
              title={`${dayLabel}: ${count} vues`}
            />
            <span className="text-[10px] text-[var(--admin-text-muted)]">
              {dayLabel}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function AnalyticsDashboard() {
  const [days, setDays] = useState(30);
  const [dateRange, setDateRange] = useState<DateRange>(null);
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<RefreshInterval>(0);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const {
    analytics: data,
    isLoading,
    isRefreshing,
    refresh,
  } = useAnalytics({
    days,
    dateRange,
    refreshInterval,
  });

  const handlePresetClick = (presetDays: number) => {
    setDays(presetDays);
    setDateRange(null);
    setShowCustomRange(false);
  };

  const handleCustomRangeApply = () => {
    if (customFrom && customTo) {
      setDateRange({
        from: new Date(customFrom),
        to: new Date(`${customTo}T23:59:59`),
      });
      setShowCustomRange(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-20 text-[var(--admin-text-muted)]">
        Erreur de chargement des données
      </div>
    );
  }

  const totalDevices = data.viewsByDevice.reduce((acc, d) => acc + d.count, 0);
  const insights = generateInsights(data);

  return (
    <div className="space-y-4">
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

      {showCustomRange && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-wrap items-center gap-2 p-3 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)]"
        >
          <input
            type="date"
            value={customFrom}
            onChange={(e) => setCustomFrom(e.target.value)}
            className="px-2 py-1.5 text-sm rounded border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] text-[var(--admin-text)]"
          />
          <span className="text-[var(--admin-text-muted)]">→</span>
          <input
            type="date"
            value={customTo}
            onChange={(e) => setCustomTo(e.target.value)}
            className="px-2 py-1.5 text-sm rounded border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] text-[var(--admin-text)]"
          />
          <button
            type="button"
            onClick={handleCustomRangeApply}
            disabled={!customFrom || !customTo}
            className="px-3 py-1.5 text-sm font-medium rounded bg-[var(--admin-accent)] text-white disabled:opacity-50"
          >
            Appliquer
          </button>
        </motion.div>
      )}

      <InsightsPanel insights={insights} />

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

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[var(--admin-text)]">
              Sources de trafic
            </h3>
            <ExternalLink className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          {data.viewsByReferrer.length === 0 ? (
            <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
              Aucune donnée
            </p>
          ) : (
            <div className="space-y-2">
              {data.viewsByReferrer.slice(0, 5).map((item) => (
                <div
                  key={item.referrer}
                  className="flex items-center justify-between"
                >
                  <span className="text-xs text-[var(--admin-text)] truncate max-w-[200px]">
                    {item.referrer || "Direct"}
                  </span>
                  <span className="text-xs font-medium text-[var(--admin-accent)]">
                    {item.count}
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
              Top liens
            </h3>
            <Link2 className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          {data.topLinks.length === 0 ? (
            <p className="text-xs text-[var(--admin-text-muted)] py-6 text-center">
              Aucune donnée
            </p>
          ) : (
            <div className="space-y-2">
              {data.topLinks.slice(0, 5).map((link, i) => (
                <div key={link.id} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)] text-[10px] font-medium text-[var(--admin-text-muted)]">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-xs text-[var(--admin-text)] truncate">
                    {link.title}
                  </span>
                  <span className="text-xs font-medium text-green-500">
                    {link.clicks}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

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
                <div
                  key={lead.id}
                  className="flex items-center justify-between"
                >
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
                    <img
                      src={attempt.githubAvatar}
                      alt=""
                      className="h-6 w-6 rounded-full"
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
    </div>
  );
}
