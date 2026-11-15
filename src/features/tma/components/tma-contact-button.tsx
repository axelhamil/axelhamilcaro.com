import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { Button } from "@/src/shared/ui/portfolio/button";

interface TmaContactButtonProps {
  label: string;
  variant?: "primary" | "secondary";
}

export function TmaContactButton({
  label,
  variant = "secondary",
}: TmaContactButtonProps) {
  return (
    <ContactModal>
      <Button type="button" variant={variant} size="lg">
        {label}
      </Button>
    </ContactModal>
  );
}
