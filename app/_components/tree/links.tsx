import type { ILink } from "../../_config/tree-links";
import { LinkCard } from "../ui/link-card";

interface TreeLinksProps {
  links: ILink[];
}

export default function TreeLinks({ links }: TreeLinksProps) {
  return (
    <nav
      className="w-full flex flex-col gap-2.5 sm:gap-3"
      aria-label="Liens sociaux"
    >
      {links.map((link, index) => (
        <div
          key={link.url}
          className="animate-fade-in-up"
          style={{
            animationDelay: `${(index + 2) * 80}ms`,
            animationFillMode: "both",
          }}
        >
          <LinkCard
            href={link.url}
            icon={<link.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
            title={link.title}
            description={link.description}
            variant={link.featured ? "featured" : "default"}
          />
        </div>
      ))}
    </nav>
  );
}
