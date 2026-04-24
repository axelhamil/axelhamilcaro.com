"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Link2, LogIn, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDashboard } from "@/src/features/admin/hooks/use-dashboard";

export function RecentActivity() {
  const { dashboard } = useDashboard();
  if (!dashboard) return null;

  return (
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
                    <Image
                      src={login.githubAvatar}
                      alt=""
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full"
                      unoptimized
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
  );
}
