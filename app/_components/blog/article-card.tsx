import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Heading2 } from "@/components/typography/heading2";
import { Paragraph } from "@/components/typography/paragraph";
import TransitionLink from "@/components/shared/navigation/transition-link";
import type { BlogPost } from "@/app/_lib/blog";

interface ArticleCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function ArticleCard({ post, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <TransitionLink
      href={`/blog/${post.slug}`}
      className="block group"
      variant="soft"
    >
      <article
        className={`card-accent relative rounded-xl border border-border transition-all overflow-hidden ${
          featured ? "border-l-4 border-l-accent p-5 sm:p-8" : "p-4 sm:p-6"
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
          <span className="text-sm font-medium text-accent uppercase tracking-widest">
            {post.category}
          </span>
          <span className="text-border">|</span>
          <time dateTime={post.date} className="text-sm text-muted">
            {formattedDate}
          </time>
          <span className="text-border">|</span>
          <span className="text-sm text-muted">{post.readingTime}</span>
        </div>

        <Heading2
          size={featured ? "xl" : "lg"}
          className="group-hover:text-accent transition-colors mb-2"
        >
          {post.title}
        </Heading2>

        <Paragraph variant="secondary" className="mb-4">
          {post.excerpt}
        </Paragraph>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <ArrowRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </article>
    </TransitionLink>
  );
}
