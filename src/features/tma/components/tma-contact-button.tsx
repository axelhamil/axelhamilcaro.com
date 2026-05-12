"use client";

import { Button } from "@/components/ui/button";
import { ContactModal } from "@/src/features/contact/components/contact-modal";

export function TmaContactButton({ label }: { label: string }) {
  return (
    <ContactModal>
      <Button className="inline-flex items-center justify-center gap-2 h-auto px-7 py-3 text-lg font-medium rounded-lg border-2 border-secondary/30 bg-secondary-background/50 text-primary hover:border-accent/40 hover:bg-secondary-background/70 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out cursor-pointer">
        {label}
      </Button>
    </ContactModal>
  );
}
