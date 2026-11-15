import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";

type TmaBadgeTone = "pro" | "premium";

interface TmaSectionEnteteProps {
  eyebrow?: string;
  title: string;
  intro: ReactNode;
  badge?: { label: string; tone: TmaBadgeTone };
}

export function TmaSectionEntete({
  eyebrow,
  title,
  intro,
  badge,
}: TmaSectionEnteteProps) {
  return (
    <div className="svc-entete">
      {badge ? (
        <span
          className={cn(
            "tma-badge etiquette etiquette-sm",
            badge.tone === "premium" && "etiquette-fond-jaune",
          )}
        >
          {badge.label}
        </span>
      ) : null}
      {eyebrow ? <p className="surtitre">{eyebrow}</p> : null}
      <h2 className="svc-h2 heading-display">
        <AccentTitle text={title} />
      </h2>
      <p className="svc-intro">{intro}</p>
    </div>
  );
}
