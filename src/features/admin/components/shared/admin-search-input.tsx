"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useId } from "react";

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "Rechercher...",
  className,
  id,
}: AdminSearchInputProps) {
  const generatedId = useId();
  const inputId = id || `search-${generatedId}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className={`relative ${className || ""}`}
    >
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-subtle)]" />
      <input
        id={inputId}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-bg-subtle)] py-2.5 pl-10 pr-4 text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)] transition-colors focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-accent-muted)]"
      />
    </motion.div>
  );
}
