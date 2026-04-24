"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useTemplates } from "@/src/features/admin-templates/components/templates-provider";

export function TemplatesHeader() {
  const { templates } = useTemplates();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-[var(--admin-text)]">
            Templates
          </h1>
          <span className="admin-badge">{templates.length}</span>
        </div>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Tes templates de formulaires réutilisables
        </p>
      </div>
      <Link
        href="/admin/forms/new"
        className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" />
        Nouveau formulaire
      </Link>
    </motion.div>
  );
}
