import { Loader2 } from "lucide-react";
import { Button } from "@/src/shared/ui/portfolio/button";

export function LoginLoading() {
  return (
    <Button type="button" size="lg" className="w-full" disabled aria-busy>
      <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
      Chargement…
    </Button>
  );
}
