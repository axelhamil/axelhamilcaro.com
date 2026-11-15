import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const characters = [...value];

  return (
    <span className={cn("compteur", className)}>
      <span className="compteur-texte">{value}</span>
      <span className="compteur-defile" aria-hidden="true">
        {characters.map((character, index) =>
          /\d/.test(character) ? (
            <span
              key={`${index.toString()}-${character}`}
              className={`chiffre chiffre-${character}`}
            >
              <span />
            </span>
          ) : (
            <span key={`${index.toString()}-${character}`}>{character}</span>
          ),
        )}
      </span>
    </span>
  );
}
