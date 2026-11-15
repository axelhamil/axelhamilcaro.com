import { Mail } from "lucide-react";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { Button } from "@/src/shared/ui/portfolio/button";

interface ServicePrimaryCtaProps {
  label: string;
}

export function ServicePrimaryCta({ label }: ServicePrimaryCtaProps) {
  return (
    <ContactModal>
      <Button type="button" variant="primary" size="lg">
        <Mail className="w-5 h-5" aria-hidden="true" />
        {label}
      </Button>
    </ContactModal>
  );
}
