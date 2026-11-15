import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  projectTransitionName,
  SharedElement,
} from "@/src/shared/ui/navigation/shared-element";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { BrandText } from "@/src/shared/ui/typography/brand-text";

export interface ProjectCardProps {
  href: string;
  brand: string;
  visual: ReactNode;
  meta: string;
  name: string;
  tagline: string;
  tags: readonly string[];
  linkLabel: string;
  titleAs: "h3" | "h4";
  className?: string;
}

export function ProjectCard({
  href,
  brand,
  visual,
  meta,
  name,
  tagline,
  tags,
  linkLabel,
  titleAs: Title,
  className,
}: ProjectCardProps) {
  return (
    <TransitionLink
      href={href}
      className={cn(
        "projet-carte etiquette etiquette-carte etiquette-appui etiquette-jaune cas",
        `cas-${brand}`,
        className,
      )}
    >
      {visual}
      <div className="projet-carte-corps flex flex-col gap-3 min-w-0">
        <p className="label-mono ink-muted">{meta}</p>
        <SharedElement name={projectTransitionName(brand)}>
          <Title className="heading-display title-sm">{name}</Title>
        </SharedElement>
        <p className="para para-sm ink-secondary">
          <BrandText text={tagline} />
        </p>
        {tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 pb-1">
            {tags.map((tag) => (
              <li key={tag} className="projet-tag label-mono">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <span className="projet-lien label-mono inline-flex items-center gap-2 mt-auto">
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </TransitionLink>
  );
}
