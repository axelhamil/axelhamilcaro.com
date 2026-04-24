"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function CopySlugButton({ slug }: { slug: string }) {
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
