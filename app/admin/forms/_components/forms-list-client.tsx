"use client";

import { motion } from "framer-motion";
import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteFormButton } from "./delete-form-button";

interface Form {
  id: string;
  slug: string;
  title: string;
  isActive: boolean | null;
  leadsCount: number;
  createdAtFormatted: string;
}

interface FormsListClientProps {
  forms: Form[];
}

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

function CopySlugButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`/f/${slug}`);
    setCopied(true);
    toast.success("Slug copié !");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group/copy flex items-center gap-1.5 rounded bg-[var(--admin-bg-elevated)] px-2 py-1 font-mono text-xs text-[var(--admin-text-muted)] transition-colors hover:text-[var(--admin-text)]"
    >
      /f/{slug}
      {copied ? (
        <Check className="h-3 w-3 text-[var(--admin-success)]" />
      ) : (
        <Copy className="h-3 w-3 opacity-0 transition-opacity group-hover/copy:opacity-100" />
      )}
    </button>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-bg)] py-16"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--admin-bg-elevated)]">
        <FileText className="h-7 w-7 text-[var(--admin-text-subtle)]" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-[var(--admin-text)]">
        Aucun formulaire
      </h3>
      <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
        Crée ton premier formulaire pour commencer à capturer des leads
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

export function FormsListClient({ forms }: FormsListClientProps) {
  const [search, setSearch] = useState("");

  const filteredForms = forms.filter(
    (form) =>
      form.title.toLowerCase().includes(search.toLowerCase()) ||
      form.slug.toLowerCase().includes(search.toLowerCase()),
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
              Formulaires
            </h1>
            <span className="admin-badge">{forms.length}</span>
          </div>
          <p className="mt-1 text-sm text-[var(--admin-text-muted)]">
            Gère tes formulaires de capture de leads
          </p>
        </div>
        <Link
          href="/admin/forms/new"
          className="flex items-center gap-2 rounded-lg bg-[var(--admin-accent)] px-3 py-2 text-sm font-medium text-white transition-all hover:bg-[var(--admin-accent-hover)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Nouveau
        </Link>
      </motion.div>

      {forms.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-subtle)]" />
          <input
            type="text"
            placeholder="Rechercher un formulaire..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg)] py-2.5 pl-10 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] transition-colors focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent-muted)]"
          />
        </motion.div>
      )}

      {forms.length === 0 ? (
        <EmptyState />
      ) : filteredForms.length === 0 ? (
        <div className="rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)] py-12 text-center">
          <p className="text-sm text-[var(--admin-text-muted)]">
            Aucun résultat pour "{search}"
          </p>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-bg)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--admin-border)] bg-[var(--admin-bg-subtle)]">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                    Formulaire
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                    Slug
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                    Leads
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                    Créé le
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[var(--admin-text-muted)]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--admin-border)]">
                {filteredForms.map((form) => (
                  <motion.tr
                    key={form.id}
                    variants={item}
                    className="group transition-colors hover:bg-[var(--admin-bg-elevated)]"
                  >
                    <td className="px-4 py-3">
                      <span className="font-medium text-[var(--admin-text)]">
                        {form.title}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <CopySlugButton slug={form.slug} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="admin-badge admin-badge-accent">
                        {form.leadsCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={`admin-status-dot ${
                            form.isActive
                              ? "admin-status-active"
                              : "admin-status-inactive"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            form.isActive
                              ? "text-[var(--admin-success)]"
                              : "text-[var(--admin-text-subtle)]"
                          }`}
                        >
                          {form.isActive ? "Actif" : "Inactif"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-[var(--admin-text-muted)]">
                      {form.createdAtFormatted}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Link
                          href={`/f/${form.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg p-2 text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-text)]"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/forms/${form.id}`}
                          className="rounded-lg p-2 text-[var(--admin-text-muted)] transition-colors hover:bg-[var(--admin-bg-elevated)] hover:text-[var(--admin-accent)]"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <DeleteFormButton formId={form.id} />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
