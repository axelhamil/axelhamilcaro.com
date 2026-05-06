"use client";

import { Mail } from "lucide-react";
import { ContactModal } from "@/src/features/contact/components/contact-modal";

interface LegalContactLinkProps {
  label: string;
}

export function LegalContactLink({ label }: LegalContactLinkProps) {
  return (
    <ContactModal>
      <button
        type="button"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white font-semibold hover:bg-accent-hover transition-all duration-300 cursor-pointer"
      >
        <Mail className="w-4 h-4" />
        {label}
      </button>
    </ContactModal>
  );
}
