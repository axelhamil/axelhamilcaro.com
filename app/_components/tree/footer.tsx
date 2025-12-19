import { Coffee } from "lucide-react";
import { Paragraphe } from "../ui/paragraphe";

export default function TreeFooter() {
  return (
    <footer
      className="mt-2 sm:mt-4 text-center animate-fade-in flex flex-col gap-2"
      style={{ animationDelay: "800ms" }}
    >
      <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
        Made with{" "}
        <span className="inline-block animate-pulse text-accent-peach">
          &hearts;
        </span>{" "}
        & lots of{" "}
        <Coffee className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-peach" />
      </Paragraphe>
      <Paragraphe
        variant="muted"
        size="sm"
        className="opacity-60 text-xs sm:text-sm"
      >
        &copy; {new Date().getFullYear()} Axel Hamilcaro
      </Paragraphe>
    </footer>
  );
}
