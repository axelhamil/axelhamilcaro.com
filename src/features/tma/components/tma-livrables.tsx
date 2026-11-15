import type { LucideIcon } from "lucide-react";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import type { TmaDeliverable } from "../lib/tma-data";

interface TmaLivrablesProps {
  items: TmaDeliverable[];
  icons: readonly LucideIcon[];
  ombre: "gris" | "jaune";
}

export function TmaLivrables({ items, icons, ombre }: TmaLivrablesProps) {
  return (
    <ul className="grille-cartes svc-grille-2">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length];

        return (
          <li
            key={item.title}
            className={`svc-carte etiquette etiquette-carte etiquette-${ombre}`}
          >
            <div className="flex items-start justify-between gap-4">
              {Icon ? (
                <span className="svc-picto" aria-hidden="true">
                  <Icon className="w-5 h-5" />
                </span>
              ) : null}
              <span className="svc-meta text-right">{item.cadence}</span>
            </div>
            <h3 className="svc-carte-titre">{item.title}</h3>
            <p className="svc-carte-sous-titre">
              <BrandText text={item.tagline} />
            </p>
            <p className="svc-texte">
              <BrandText text={item.body} />
            </p>
          </li>
        );
      })}
    </ul>
  );
}
