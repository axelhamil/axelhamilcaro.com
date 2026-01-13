"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BarChart3,
  Clock,
  Eye,
  FileText,
  HelpCircle,
  Link2,
  Loader2,
  LogIn,
  Mail,
  MousePointerClick,
  Percent,
  Plus,
  RefreshCw,
  Target,
  User,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useDashboard } from "../_hooks";

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

function StatCard({
  title,
  value,
  icon: Icon,
  change,
  suffix,
  tooltip,
  href,
  color = "blue",
}: {
  title: string;
  value: number | string;
  icon: typeof Eye;
  change?: number;
  suffix?: string;
  tooltip?: string;
  href?: string;
  color?: "blue" | "green" | "purple" | "amber" | "red" | "cyan" | "pink";
}) {
  const colorMap = {
    blue: { text: "text-blue-500", bg: "bg-blue-500/10" },
    green: { text: "text-green-500", bg: "bg-green-500/10" },
    purple: { text: "text-purple-500", bg: "bg-purple-500/10" },
    amber: { text: "text-amber-500", bg: "bg-amber-500/10" },
    red: { text: "text-red-500", bg: "bg-red-500/10" },
    cyan: { text: "text-cyan-500", bg: "bg-cyan-500/10" },
    pink: { text: "text-pink-500", bg: "bg-pink-500/10" },
  };

  const colors = colorMap[color];

  const content = (
    <div className="flex items-center justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <p className="text-xs text-[var(--admin-text-muted)] truncate">
            {title}
          </p>
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3 w-3 text-[var(--admin-text-subtle)] cursor-help" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[200px]">
                {tooltip}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <p className={"text-2xl font-bold " + colors.text}>
            {value}
            {suffix && (
              <span className="text-sm font-normal ml-0.5">{suffix}</span>
            )}
          </p>
          {change !== undefined && change !== 0 && (
            <span
              className={`flex items-center gap-0.5 text-xs font-medium ${
                change > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {change > 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              {Math.abs(change)}%
            </span>
          )}
        </div>
      </div>
      <div className={"rounded-lg p-2.5 " + colors.bg}>
        <Icon className={"h-5 w-5 " + colors.text} />
      </div>
    </div>
  );

  const cardClass =
    "rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4 transition-all hover:border-[var(--admin-border-hover)] hover:shadow-sm";

  if (href) {
    return (
      <motion.div variants={item}>
        <Link href={href} className={cardClass + " block"}>
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={item} className={cardClass}>
      {content}
    </motion.div>
  );
}

function WeekChart({
  data,
  color = "accent",
}: {
  data: Array<{ date: string; count: number }>;
  color?: "accent" | "purple";
}) {
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  const total = data.reduce((acc, d) => acc + d.count, 0);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayOfWeek = date.getDay();
    const found = data.find((d) => d.date === dateStr);
    return {
      date: dateStr,
      dayLabel: dayNames[dayOfWeek],
      count: found?.count || 0,
      isToday: i === 6,
    };
  });

  const colorClasses = {
    accent: {
      bar: "bg-[var(--admin-accent)]",
      text: "text-[var(--admin-accent)]",
    },
    purple: {
      bar: "bg-purple-500",
      text: "text-purple-500",
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-1.5 h-20">
        {last7Days.map((d, i) => {
          const height =
            d.count > 0 ? Math.max((d.count / maxCount) * 100, 12) : 6;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span
                className={`text-[10px] font-medium ${d.count > 0 ? colors.text : "text-[var(--admin-text-subtle)]"}`}
              >
                {d.count > 0 ? d.count : ""}
              </span>
              <div
                className={`w-full ${colors.bar} rounded-t transition-all hover:opacity-80 ${d.isToday ? "opacity-100" : "opacity-60"}`}
                style={{ height: `${height}%` }}
              />
              <span
                className={`text-[10px] ${d.isToday ? "font-semibold text-[var(--admin-text)]" : "text-[var(--admin-text-muted)]"}`}
              >
                {d.dayLabel}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between text-[10px] text-[var(--admin-text-muted)] pt-1 border-t border-[var(--admin-border)]">
        <span>Total: <span className={`font-semibold ${colors.text}`}>{total}</span></span>
        <span>Moy: <span className={`font-semibold ${colors.text}`}>{Math.round(total / 7)}</span>/jour</span>
      </div>
    </div>
  );
}

export function DashboardClient() {
  const { dashboard, isLoading, isRefreshing, refresh } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--admin-accent)]" />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="text-center py-20 text-[var(--admin-text-muted)]">
        Erreur de chargement des données
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-bold text-[var(--admin-text)]">
              Dashboard
            </h1>
            <p className="text-sm text-[var(--admin-text-muted)]">
              {dashboard.period}
            </p>
          </div>
          {isRefreshing && (
            <RefreshCw className="h-4 w-4 animate-spin text-[var(--admin-accent)]" />
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refresh()}
            className="p-2 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] text-[var(--admin-text-muted)] hover:text-[var(--admin-text)] transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          <Link
            href="/admin/forms/new"
            className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Nouveau formulaire
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-2 gap-3 rounded-xl border border-[var(--admin-border)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4"
      >
        <div className="text-center">
          <p className="text-xs text-[var(--admin-text-muted)]">
            Vues aujourd'hui
          </p>
          <p className="text-2xl font-bold text-blue-500">
            {dashboard.today.views}
          </p>
        </div>
        <div className="text-center border-l border-[var(--admin-border)]">
          <p className="text-xs text-[var(--admin-text-muted)]">
            Leads aujourd'hui
          </p>
          <p className="text-2xl font-bold text-purple-500">
            {dashboard.today.leads}
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        <StatCard
          title="Vues"
          value={dashboard.overview.totalViews}
          icon={Eye}
          color="blue"
          change={dashboard.comparison.viewsChange}
          tooltip="Nombre total de pages vues sur les 7 derniers jours."
        />
        <StatCard
          title="Sessions"
          value={dashboard.overview.uniqueSessions}
          icon={Users}
          color="cyan"
          tooltip="Visiteurs uniques identifiés par leur session."
        />
        <StatCard
          title="Clics"
          value={dashboard.overview.totalClicks}
          icon={MousePointerClick}
          color="green"
          change={dashboard.comparison.clicksChange}
          tooltip="Clics sur les liens de la page Tree."
        />
        <StatCard
          title="Leads"
          value={dashboard.overview.totalLeads}
          icon={Target}
          color="purple"
          change={dashboard.comparison.leadsChange}
          href="/admin/leads"
          tooltip="Formulaires soumis avec succès."
        />
        <StatCard
          title="Conversion"
          value={dashboard.overview.conversionRate}
          icon={Percent}
          color="pink"
          suffix="%"
          tooltip="Taux de conversion = Leads / Vues × 100."
        />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-3 grid-cols-2 sm:grid-cols-4"
      >
        <StatCard
          title="Click rate"
          value={dashboard.overview.clickRate}
          icon={Zap}
          color="amber"
          suffix="%"
          tooltip="Clics / Vues × 100. Mesure l'engagement avec tes liens."
        />
        <StatCard
          title="Formulaires"
          value={dashboard.overview.activeForms}
          icon={FileText}
          color="green"
          href="/admin/forms"
          tooltip={`${dashboard.overview.activeForms} actifs sur ${dashboard.overview.totalForms} total.`}
        />
        <StatCard
          title="Logins"
          value={dashboard.overview.loginAttempts}
          icon={LogIn}
          color="red"
          tooltip="Tentatives de connexion à l'admin cette semaine."
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

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[var(--admin-text)]">
              Vues (7 jours)
            </h3>
            <Eye className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          <WeekChart data={dashboard.charts.viewsLast7Days} color="accent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[var(--admin-text)]">
              Leads (7 jours)
            </h3>
            <Target className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          <WeekChart data={dashboard.charts.leadsLast7Days} color="purple" />
        </motion.div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]"
        >
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] p-4">
            <h3 className="font-semibold text-sm text-[var(--admin-text)]">
              Top liens
            </h3>
            <Link2 className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          <div className="p-4">
            {dashboard.topLinks.length === 0 ? (
              <p className="text-xs text-[var(--admin-text-muted)] text-center py-4">
                Aucun clic
              </p>
            ) : (
              <div className="space-y-2">
                {dashboard.topLinks.map((link, i) => (
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
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]"
        >
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] p-4">
            <h3 className="font-semibold text-sm text-[var(--admin-text)]">
              Derniers leads
            </h3>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 text-xs text-[var(--admin-text-muted)] hover:text-[var(--admin-accent)]"
            >
              Voir tout
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="p-4">
            {dashboard.recentActivity.leads.length === 0 ? (
              <div className="flex flex-col items-center py-6">
                <Mail className="h-8 w-8 text-[var(--admin-text-subtle)]" />
                <p className="mt-2 text-xs text-[var(--admin-text-muted)]">
                  Aucun lead
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {dashboard.recentActivity.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center gap-2 rounded-lg bg-[var(--admin-bg-subtle)] p-2"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--admin-accent-muted)]">
                      <User className="h-4 w-4 text-[var(--admin-accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--admin-text)] truncate">
                        {lead.firstName || "Anonyme"}
                      </p>
                      <p className="text-[10px] text-[var(--admin-text-muted)] truncate">
                        {lead.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--admin-text-subtle)]">
                      <Clock className="h-2.5 w-2.5" />
                      {lead.relativeTime}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]"
        >
          <div className="flex items-center justify-between border-b border-[var(--admin-border)] p-4">
            <h3 className="font-semibold text-sm text-[var(--admin-text)]">
              Tentatives login
            </h3>
            <LogIn className="h-4 w-4 text-[var(--admin-text-muted)]" />
          </div>
          <div className="p-4">
            {dashboard.recentActivity.logins.length === 0 ? (
              <div className="flex flex-col items-center py-6">
                <LogIn className="h-8 w-8 text-[var(--admin-text-subtle)]" />
                <p className="mt-2 text-xs text-[var(--admin-text-muted)]">
                  Aucune tentative
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {dashboard.recentActivity.logins.map((login) => (
                  <div
                    key={login.id}
                    className="flex items-center gap-2 rounded-lg bg-[var(--admin-bg-subtle)] p-2"
                  >
                    {login.githubAvatar ? (
                      <img
                        src={login.githubAvatar}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10">
                        <User className="h-4 w-4 text-red-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[var(--admin-text)] truncate">
                        {login.githubUsername || "Anonyme"}
                      </p>
                      <p className="text-[10px] text-[var(--admin-text-muted)] truncate">
                        {login.ipAddress || "IP inconnue"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[var(--admin-text-subtle)]">
                      <Clock className="h-2.5 w-2.5" />
                      {login.relativeTime}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
