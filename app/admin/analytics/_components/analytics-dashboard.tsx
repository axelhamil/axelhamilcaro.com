"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Clock,
  Eye,
  Laptop,
  Link2,
  Loader2,
  Monitor,
  MousePointerClick,
  Smartphone,
  Tablet,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AnalyticsData {
  overview: {
    totalViews: number;
    totalClicks: number;
    totalLeads: number;
    activeForms: number;
  };
  viewsByPage: Array<{ path: string; count: number }>;
  viewsByDevice: Array<{ device: string; count: number }>;
  viewsByBrowser: Array<{ browser: string; count: number }>;
  topLinks: Array<{ id: string; title: string; url: string; clicks: number }>;
  viewsOverTime: Array<{ date: string; count: number }>;
  leadsOverTime: Array<{ date: string; count: number }>;
  recentLeads: Array<{
    id: string;
    firstName: string;
    email: string;
    formTitle: string;
    createdAt: string;
  }>;
}

const colorMap: Record<string, { text: string; bg: string }> = {
  blue: { text: "text-blue-500", bg: "bg-blue-500/10" },
  green: { text: "text-green-500", bg: "bg-green-500/10" },
  purple: { text: "text-purple-500", bg: "bg-purple-500/10" },
  amber: { text: "text-amber-500", bg: "bg-amber-500/10" },
};

const deviceIcons: Record<string, typeof Smartphone> = {
  mobile: Smartphone,
  tablet: Tablet,
  desktop: Monitor,
  unknown: Laptop,
};

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number | string;
  icon: typeof Eye;
  color: keyof typeof colorMap;
}) {
  const colors = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--admin-text-muted)]">{title}</p>
          <p className={"mt-1 text-3xl font-bold " + colors.text}>{value}</p>
        </div>
        <div className={"rounded-xl p-3 " + colors.bg}>
          <Icon className={"h-6 w-6 " + colors.text} />
        </div>
      </div>
    </motion.div>
  );
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch("/api/analytics/stats?days=" + days)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  if (loading) {
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

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            Vue ensemble des performances de ton site
          </p>
        </div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] px-3 py-2 text-sm text-[var(--admin-text)]"
        >
          <option value={7}>7 derniers jours</option>
          <option value={30}>30 derniers jours</option>
          <option value={90}>90 derniers jours</option>
        </select>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Vues de pages"
          value={data.overview.totalViews}
          icon={Eye}
          color="blue"
        />
        <StatCard
          title="Clics sur liens"
          value={data.overview.totalClicks}
          icon={MousePointerClick}
          color="green"
        />
        <StatCard
          title="Leads capturés"
          value={data.overview.totalLeads}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Formulaires actifs"
          value={data.overview.activeForms}
          icon={TrendingUp}
          color="amber"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--admin-text)]">
              Vues par page
            </h3>
            <BarChart3 className="h-5 w-5 text-[var(--admin-text-muted)]" />
          </div>
          {data.viewsByPage.length === 0 ? (
            <p className="text-sm text-[var(--admin-text-muted)] py-8 text-center">
              Aucune donnée
            </p>
          ) : (
            <div className="space-y-3">
              {data.viewsByPage.slice(0, 5).map((page) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-[var(--admin-text)] truncate max-w-[200px]">
                    {page.path}
                  </span>
                  <span className="text-sm font-medium text-[var(--admin-accent)]">
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
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--admin-text)]">
              Appareils
            </h3>
            <Laptop className="h-5 w-5 text-[var(--admin-text-muted)]" />
          </div>
          {totalDevices === 0 ? (
            <p className="text-sm text-[var(--admin-text-muted)] py-8 text-center">
              Aucune donnée
            </p>
          ) : (
            <div className="space-y-3">
              {data.viewsByDevice.map((d) => {
                const Icon = deviceIcons[d.device] || Laptop;
                const percent = Math.round((d.count / totalDevices) * 100);
                return (
                  <div key={d.device} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[var(--admin-text-muted)]" />
                        <span className="text-sm text-[var(--admin-text)] capitalize">
                          {d.device}
                        </span>
                      </div>
                      <span className="text-sm text-[var(--admin-text-muted)]">
                        {percent}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--admin-bg-elevated)]">
                      <div
                        className="h-full rounded-full bg-[var(--admin-accent)]"
                        style={{ width: percent + "%" }}
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
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--admin-text)]">
              Top liens cliqués
            </h3>
            <Link2 className="h-5 w-5 text-[var(--admin-text-muted)]" />
          </div>
          {data.topLinks.length === 0 ? (
            <p className="text-sm text-[var(--admin-text-muted)] py-8 text-center">
              Aucune donnée
            </p>
          ) : (
            <div className="space-y-3">
              {data.topLinks.slice(0, 5).map((link, i) => (
                <div key={link.id} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)] text-xs font-medium text-[var(--admin-text-muted)]">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-[var(--admin-text)] truncate">
                    {link.title}
                  </span>
                  <span className="text-sm font-medium text-green-500">
                    {link.clicks} clics
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--admin-text)]">
              Derniers leads
            </h3>
            <Clock className="h-5 w-5 text-[var(--admin-text-muted)]" />
          </div>
          {data.recentLeads.length === 0 ? (
            <p className="text-sm text-[var(--admin-text-muted)] py-8 text-center">
              Aucun lead
            </p>
          ) : (
            <div className="space-y-3">
              {data.recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-[var(--admin-text)]">
                      {lead.firstName}
                    </p>
                    <p className="text-xs text-[var(--admin-text-muted)]">
                      {lead.email}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--admin-text-subtle)]">
                    {lead.formTitle}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
