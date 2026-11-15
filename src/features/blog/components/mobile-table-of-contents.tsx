import { ChevronDown } from "lucide-react";
import type { Heading } from "@/src/features/blog/lib/blog";

interface MobileTableOfContentsProps {
  headings: Heading[];
}

export function MobileTableOfContents({
  headings,
}: MobileTableOfContentsProps) {
  if (headings.length === 0) return null;

  return (
    <details className="sommaire-mobile lg:hidden">
      <summary className="sommaire-mobile-bouton flex items-center justify-between gap-4">
        Table des matières
        <ChevronDown
          className="sommaire-mobile-chevron w-4 h-4"
          aria-hidden="true"
        />
      </summary>
      <nav aria-label="Table des matières mobile">
        <ol className="sommaire-liste">
          {headings.map((heading) => (
            <li key={heading.id} data-niveau={heading.level}>
              <a href={`#${heading.id}`} className="sommaire-lien">
                {heading.text}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}
