import { ArrowLeft, ArrowRight } from "lucide-react";
import TransitionLink from "@/components/shared/navigation/transition-link";
import { getAdjacentPosts } from "@/app/_lib/blog";

interface ArticleNavigationProps {
  currentSlug: string;
}

export function ArticleNavigation({ currentSlug }: ArticleNavigationProps) {
  const { prev, next } = getAdjacentPosts(currentSlug);

  if (!prev && !next) return null;

  return (
    <nav
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 sm:mt-16"
      aria-label="Navigation entre articles"
    >
      {prev ? (
        <TransitionLink
          href={`/blog/${prev.slug}`}
          className="group card-accent rounded-xl border border-border p-5 transition-all"
          variant="soft"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Précédent
          </span>
          <div className="flex items-center gap-2 mt-2">
            <ArrowLeft className="w-4 h-4 text-muted group-hover:text-accent group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
            <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors line-clamp-2">
              {prev.title}
            </span>
          </div>
        </TransitionLink>
      ) : (
        <div />
      )}
      {next ? (
        <TransitionLink
          href={`/blog/${next.slug}`}
          className="group card-accent rounded-xl border border-border p-5 transition-all text-right"
          variant="soft"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Suivant
          </span>
          <div className="flex items-center justify-end gap-2 mt-2">
            <span className="text-sm font-medium text-primary group-hover:text-accent transition-colors line-clamp-2">
              {next.title}
            </span>
            <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0" />
          </div>
        </TransitionLink>
      ) : (
        <div />
      )}
    </nav>
  );
}
