import { cn } from "@/lib/utils";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";

export interface ProjectPosterProps {
  name: string;
  lines: readonly [string, string];
  highlights: readonly string[];
  ribbon: readonly string[];
  status: string;
  year: string;
  className?: string;
}

const HIGHLIGHT_SHADOWS = ["", "etiquette-gris", "etiquette-jaune"] as const;

export function ProjectPoster({
  name,
  lines,
  highlights,
  ribbon,
  status,
  year,
  className,
}: ProjectPosterProps) {
  return (
    <div aria-hidden="true" className={cn("affiche trame", className)}>
      <p className="affiche-surtitre">Axel Hamilcaro / {name}</p>
      <p className="affiche-titre">
        <span>{lines[0]}</span>{" "}
        <span className="affiche-titre-accent">{lines[1]}</span>
      </p>
      {highlights.length > 0 && (
        <ul className="affiche-etiquettes">
          {highlights.map((highlight, index) => (
            <li
              key={highlight}
              className={cn("etiquette", HIGHLIGHT_SHADOWS[index % 3])}
            >
              {highlight}
            </li>
          ))}
        </ul>
      )}
      <p className="tampon tampon-droite affiche-tampon">
        <span className="tampon-haut">{status}</span>{" "}
        <span className="tampon-bas">{year}</span>
      </p>
      <Ribbon items={ribbon} hachures className="affiche-ruban" />
    </div>
  );
}
