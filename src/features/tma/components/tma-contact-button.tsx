"use client";

import { Button } from "@/components/ui/button";
import { ContactModal } from "@/src/features/contact/components/contact-modal";

export function TmaContactButton({ label }: { label: string }) {
  return (
    <ContactModal>
      <Button
        variant="outline"
        className="h-auto px-7 py-3 text-lg rounded-lg border-2 cursor-pointer"
      >
        {label}
      </Button>
    </ContactModal>
  );
}
