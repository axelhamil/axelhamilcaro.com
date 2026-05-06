"use client";

import { ContactModal } from "@/src/features/contact/components/contact-modal";
import { Button } from "@/src/shared/ui/portfolio/button";

interface ServicePrimaryCtaProps {
  label: string;
}

export function ServicePrimaryCta({ label }: ServicePrimaryCtaProps) {
  return (
    <ContactModal>
      <Button variant="primary" size="lg">
        {label}
      </Button>
    </ContactModal>
  );
}
