"use client";

import { motion } from "framer-motion";
import { FileCode, Package, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteTemplateButton } from "./delete-template-button";

interface Template {
  id: string;
  name: string;
  title: string | null;
  badgeText: string | null;
  buttonText: string | null;
  createdAtFormatted: string;
}

interface TemplatesListClientProps {
  templates: Template[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 15, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-16"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)]">
        <Package className="h-7 w-7 text-[var(--admin-text-subtle)]" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-[var(--admin-text)]">
        Aucun template
      </h3>
      <p className="mt-1 max-w-sm text-center text-sm text-[var(--admin-text-muted)]">
        Crée un formulaire et sauvegarde-le comme template pour le réutiliser
        plus tard
      </p>
      <Link
        href="/admin/forms/new"
        className="mt-6 flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-4 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5"
      >
        <Plus className="h-4 w-4" />
        Créer un formulaire
      </Link>
    </motion.div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <motion.div
      variants={item}
      className="group relative overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] p-5 transition-all hover:border-[var(--admin-border-hover)] hover:shadow-lg hover:shadow-black/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--admin-accent)]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--admin-bg-elevated)]">
              <FileCode className="h-5 w-5 text-[var(--admin-accent)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--admin-text)]">
                {template.name}
              </h3>
              <p className="text-xs text-[var(--admin-text-muted)]">
                {template.createdAtFormatted}
              </p>
            </div>
          </div>
          <div className="opacity-0 transition-opacity group-hover:opacity-100">
            <DeleteTemplateButton templateId={template.id} />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {template.title && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--admin-text-subtle)]">Titre:</span>
              <span className="text-[var(--admin-text)]">{template.title}</span>
            </div>
          )}
          {template.badgeText && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--admin-text-subtle)]">Badge:</span>
              <span className="admin-badge admin-badge-accent">
                {template.badgeText}
              </span>
            </div>
          )}
          {template.buttonText && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[var(--admin-text-subtle)]">Bouton:</span>
              <span className="rounded bg-[var(--admin-bg-elevated)] px-2 py-0.5 text-xs text-[var(--admin-text)]">
                {template.buttonText}
              </span>
            </div>
          )}
          {!template.title && !template.badgeText && !template.buttonText && (
            <p className="text-sm text-[var(--admin-text-subtle)]">
              Configuration vide
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TemplatesListClient({ templates }: TemplatesListClientProps) {
  const [search, setSearch] = useState("");

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
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

      {templates.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-subtle)]" />
          <input
            type="text"
            placeholder="Rechercher un template..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-2.5 pl-10 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] transition-colors focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent-muted)]"
          />
        </motion.div>
      )}

      {templates.length === 0 ? (
        <EmptyState />
      ) : filteredTemplates.length === 0 ? (
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-12 text-center">
          <p className="text-sm text-[var(--admin-text-muted)]">
            Aucun résultat pour "{search}"
          </p>
        </div>
      ) : (
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
      )}
    </div>
  );
}
