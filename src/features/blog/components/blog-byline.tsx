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
    <TransitionLink href="/about" rel="author" className="link-underline">
      {AUTHOR.name}
    </TransitionLink>
  ) : (
    <span className="signature-nom">{AUTHOR.name}</span>
  );

  const original =
    isHeader && originalAuthorUrl ? (
      <a
        href={originalAuthorUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-underline"
      >
        {originalAuthor}
      </a>
    ) : (
      <span className="signature-nom">{originalAuthor}</span>
    );

  return (
    <p
      className={cn(
        "signature flex items-center gap-3",
        isHeader && "signature-entete",
        className,
      )}
    >
      <Image
        src={AUTHOR.imagePath}
        alt=""
        width={isHeader ? 40 : 28}
        height={isHeader ? 40 : 28}
        preload={isHeader}
        className="signature-photo shrink-0"
      />
      <span>
        {isTranslation ? "Traduit par " : "Par "}
        {author}
        {isTranslation ? <> · Texte original de {original}</> : null}
      </span>
    </p>
  );
}
