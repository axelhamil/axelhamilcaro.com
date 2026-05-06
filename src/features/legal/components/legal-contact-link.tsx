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
        className="inline-flex items-center gap-2 text-accent font-semibold hover:underline cursor-pointer"
      >
        <Mail className="w-4 h-4" />
        {label}
      </button>
    </ContactModal>
  );
}
