import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogByline } from "@/src/features/blog/components/blog-byline";
import type { BlogPost } from "@/src/features/blog/lib/blog";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import {
  articleTransitionName,
  SharedElement,
} from "@/src/shared/ui/navigation/shared-element";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
  stamp?: string;
}

export function ArticleCard({
  post,
  featured = false,
  stamp,
}: ArticleCardProps) {
  return (
    <TransitionLink
      href={`/blog/${post.slug}`}
      className={cn(
        "fiche etiquette etiquette-carte etiquette-appui gap-5",
        featured ? "fiche-une etiquette-jaune" : "etiquette-gris",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="etiquette etiquette-sm etiquette-fond-jaune label-mono">
          {post.category}
        </span>
        <span className="meta-mono">
          <time dateTime={post.date}>{formatLongDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </span>
        {stamp && (
          <span className="tampon tampon-droite ml-auto" aria-hidden="true">
            <span className="tampon-haut">Dernier article</span>{" "}
            <span className="tampon-bas">{stamp}</span>
          </span>
        )}
      </div>

      <SharedElement name={articleTransitionName(post.slug)}>
        <h2 className="fiche-titre heading-display">{post.title}</h2>
      </SharedElement>

      <p className="fiche-extrait">{post.excerpt}</p>

      <ul className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li key={tag} className="tag-mono">
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4">
        <BlogByline variant="card" originalAuthor={post.originalAuthor} />
        <ArrowRight className="fiche-fleche w-5 h-5" aria-hidden="true" />
      </div>
    </TransitionLink>
  );
}
