import { Mail } from "lucide-react";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { Button } from "@/src/shared/ui/portfolio/button";

interface LegalContactLinkProps {
  label: string;
  variant?: "button" | "inline";
}

export function LegalContactLink({
  label,
  variant = "button",
}: LegalContactLinkProps) {
  if (variant === "inline") {
    return (
      <ContactModal>
        <Button type="button" variant="ghost" className="legal-lien-bouton">
          {label}
        </Button>
      </ContactModal>
    );
  }

  return (
    <ContactModal>
      <Button type="button">
        <Mail className="w-4 h-4" />
        {label}
      </Button>
    </ContactModal>
  );
}
