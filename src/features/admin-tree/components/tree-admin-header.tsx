"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTreeLinksContext } from "@/src/features/admin-tree/components/tree-links-provider";

export function TreeAdminHeader() {
  const { startCreate } = useTreeLinksContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold text-[var(--admin-text)]">
          Liens Tree
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
          Gère les liens de ta page /tree
        </p>
      </div>
      <button
        type="button"
        onClick={startCreate}
        className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)]"
      >
        <Plus className="h-4 w-4" />
        Nouveau lien
      </button>
    </motion.div>
  );
}
