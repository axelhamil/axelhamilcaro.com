import { ArrowUp } from "lucide-react";
import { Button } from "@/src/shared/ui/portfolio/button";

export function ScrollToTop() {
  return (
    <Button
      href="#main-content"
      size="icon"
      className="retour-haut fixed right-6 bottom-6 z-40"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">Retour en haut</span>
    </Button>
  );
}
