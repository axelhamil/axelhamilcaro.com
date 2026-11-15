import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAdjacentPosts } from "@/src/features/blog/lib/blog";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

interface ArticleNavigationProps {
  currentSlug: string;
}

export function ArticleNavigation({ currentSlug }: ArticleNavigationProps) {
  const { prev, next } = getAdjacentPosts(currentSlug);

  if (!prev && !next) return null;

  return (
    <nav
      className="grille-cartes navigation-articles sm:grid-cols-2"
      aria-label="Navigation entre articles"
    >
      {prev && (
        <TransitionLink
          href={`/blog/${prev.slug}`}
          className="etiquette etiquette-carte etiquette-gris etiquette-appui gap-3"
        >
          <span className="label-mono inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Précédent
          </span>
          <span className="navigation-articles-titre">{prev.title}</span>
        </TransitionLink>
      )}
      {next && (
        <TransitionLink
          href={`/blog/${next.slug}`}
          className={cn(
            "etiquette etiquette-carte etiquette-jaune etiquette-appui gap-3 items-end text-right",
            !prev && "sm:col-start-2",
          )}
        >
          <span className="label-mono inline-flex items-center gap-2">
            Suivant
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </span>
          <span className="navigation-articles-titre">{next.title}</span>
        </TransitionLink>
      )}
    </nav>
  );
}
