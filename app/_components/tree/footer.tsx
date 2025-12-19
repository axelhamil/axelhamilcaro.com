import { Coffee } from "lucide-react";
import { Paragraphe } from "../ui/paragraphe";

export default function TreeFooter() {
  return (
    <footer className="mt-2 sm:mt-4 text-center flex flex-col gap-2">
      <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
        Disponible pour des missions orientées produit, refonte, ou scale.
      </Paragraphe>

      <Paragraphe
        variant="muted"
        size="sm"
        className="opacity-60 text-xs sm:text-sm flex items-center justify-center gap-1.5"
      >
        &copy; {new Date().getFullYear()} Axel Hamilcaro •{" "}
        <Coffee className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-peach" />{" "}
        TypeScript
      </Paragraphe>
    </footer>
  );
}
