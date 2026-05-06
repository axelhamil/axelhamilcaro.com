"use client";

import { Mail } from "lucide-react";
import { ContactModal } from "@/src/features/contact/components/contact-modal";

type Variant = "button" | "inline";

interface LegalContactLinkProps {
  label: string;
  variant?: Variant;
}

const STYLES: Record<Variant, string> = {
  button:
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-all duration-300 cursor-pointer",
  inline:
    "text-accent font-medium hover:underline cursor-pointer underline underline-offset-2",
};

export function LegalContactLink({
  label,
  variant = "button",
}: LegalContactLinkProps) {
  return (
    <ContactModal>
      <button type="button" className={STYLES[variant]}>
        {variant === "button" ? <Mail className="w-4 h-4" /> : null}
        {label}
      </button>
    </ContactModal>
  );
}
