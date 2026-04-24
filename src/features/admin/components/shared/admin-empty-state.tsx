"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface AdminEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
    icon?: LucideIcon;
  };
}

export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
}: AdminEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-16"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)]">
        <Icon className="h-7 w-7 text-[var(--admin-text-subtle)]" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-[var(--admin-text)]">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-center text-sm text-[var(--admin-text-muted)]">
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-6 flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5"
        >
          {action.icon && <action.icon className="h-4 w-4" />}
          {action.label}
        </Link>
      )}
    </motion.div>
  );
}
