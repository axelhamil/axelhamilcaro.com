import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/shared/ui/portfolio/button";

export function NiceTryReturnLink() {
  return (
    <Button href="/" variant="secondary" className="self-start">
      <ArrowLeft className="w-4 h-4" aria-hidden="true" />
      Retour au site
    </Button>
  );
}
