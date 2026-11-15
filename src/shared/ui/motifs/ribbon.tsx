import { cn } from "@/lib/utils";

const MIN_SEQUENCE_CHARS = 220;
const MAX_REPEAT = 6;

interface RibbonProps {
  items: readonly string[];
  hachures?: boolean;
  className?: string;
}

export function Ribbon({ items, hachures = false, className }: RibbonProps) {
  const unit = `${items.join(" ■ ")} ■ `;
  const repeat = Math.min(
    Math.ceil(MIN_SEQUENCE_CHARS / unit.length),
    MAX_REPEAT,
  );

  return (
    <div
      aria-hidden="true"
      className={cn("ruban", hachures && "ruban-hachures", className)}
    >
      <div className="ruban-piste" data-texte={unit} data-repete={repeat} />
    </div>
  );
}
