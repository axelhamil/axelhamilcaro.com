"use client";

import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { AdminEmptyState } from "@/src/features/admin/components/shared/admin-empty-state";
import { TemplateCard } from "@/src/features/admin-templates/components/template-card";
import { useTemplates } from "@/src/features/admin-templates/components/templates-provider";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

export function TemplatesGrid() {
  const { templates, filteredTemplates, search } = useTemplates();

  if (templates.length === 0) {
    return (
      <AdminEmptyState
        icon={Package}
        title="Aucun template"
        description="Cree un formulaire et sauvegarde-le comme template pour le reutiliser plus tard"
        action={{
          label: "Creer un formulaire",
          href: "/admin/forms/new",
          icon: Plus,
        }}
      />
    );
  }

  if (filteredTemplates.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-12 text-center">
        <p className="text-sm text-[var(--admin-text-muted)]">
          Aucun résultat pour "{search}"
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {filteredTemplates.map((template) => (
        <TemplateCard key={template.id} template={template} />
      ))}
    </motion.div>
  );
}
