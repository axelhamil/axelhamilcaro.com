import { ArrowLeft } from "lucide-react";
import { Button } from "@/src/shared/ui/portfolio/button";

export function LoginFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4">
      <Button href="/" variant="ghost" size="sm">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Retour au site
      </Button>
      <p className="label-mono ink-muted">
        axel_hamilcaro() • {new Date().getFullYear()}
      </p>
    </footer>
  );
}
