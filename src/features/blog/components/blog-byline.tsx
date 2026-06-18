import Image from "next/image";
import { AUTHOR } from "@/app/_config/site.constants";
import { cn } from "@/lib/utils";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

interface BlogBylineProps {
  variant: "header" | "card";
  originalAuthor?: string;
  originalAuthorUrl?: string;
  className?: string;
}

export function BlogByline({
  variant,
  originalAuthor,
  originalAuthorUrl,
  className,
}: BlogBylineProps) {
  const isHeader = variant === "header";
  const isTranslation = Boolean(originalAuthor);

  const author = isHeader ? (
    <TransitionLink
      href="/about"
      rel="author"
      className="font-medium text-primary hover:text-accent transition-colors"
    >
      {AUTHOR.name}
    </TransitionLink>
  ) : (
    <span className="font-medium text-secondary">{AUTHOR.name}</span>
  );

  const original =
    isHeader && originalAuthorUrl ? (
      <a
        href={originalAuthorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary underline-offset-2 hover:text-accent hover:underline transition-colors"
      >
        {originalAuthor}
      </a>
    ) : (
      <span className="text-secondary">{originalAuthor}</span>
    );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2.5 gap-y-1",
        isHeader ? "text-sm" : "text-xs",
        className,
      )}
    >
      <Image
        src={AUTHOR.imagePath}
        alt={AUTHOR.name}
        width={isHeader ? 36 : 24}
        height={isHeader ? 36 : 24}
        className={cn(
          "rounded-full object-cover border border-border",
          isHeader ? "h-9 w-9" : "h-6 w-6",
        )}
      />
      <span className="text-muted-foreground">
        {isTranslation ? "Traduit par " : "Par "}
        {author}
        {isTranslation ? <> · Texte original de {original}</> : null}
      </span>
    </div>
  );
}
