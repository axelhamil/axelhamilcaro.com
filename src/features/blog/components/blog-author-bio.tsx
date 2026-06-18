import { Briefcase, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { AUTHOR, EXTERNAL_LINKS } from "@/app/_config/site.constants";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const LINK_CLASS =
  "inline-flex items-center gap-1.5 text-sm font-medium leading-none text-secondary hover:text-accent transition-colors";

export function BlogAuthorBio({
  label = "À propos de l'auteur",
}: {
  label?: string;
}) {
  return (
    <aside className="mt-12 sm:mt-16 mx-auto max-w-3xl" aria-label={label}>
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 rounded-2xl border border-border bg-secondary-background/40 p-6 sm:p-8">
        <TransitionLink
          href="/about"
          aria-label={`À propos d'${AUTHOR.name}`}
          className="shrink-0 self-start"
        >
          <Image
            src={AUTHOR.imagePath}
            alt={AUTHOR.name}
            width={88}
            height={88}
            className="h-20 w-20 sm:h-22 sm:w-22 rounded-full object-cover border border-border"
          />
        </TransitionLink>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {label}
          </p>
          <TransitionLink href="/about" rel="author" className="w-fit">
            <span
              className="text-lg font-bold text-primary hover:text-accent transition-colors"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {AUTHOR.name}
            </span>
          </TransitionLink>
          <p className="text-sm text-secondary leading-relaxed">
            Développeur web fullstack freelance spécialisé Next.js, React et
            Node, basé en Touraine et 100% remote sur la France. Je conçois des
            SaaS B2B sur mesure et j'assure la maintenance d'applications en
            production. Lead technique 4 ans, plus de 10 projets livrés en
            autonomie depuis 2021.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2">
            <a
              href={EXTERNAL_LINKS.malt}
              target="_blank"
              rel="me noopener noreferrer"
              className={LINK_CLASS}
            >
              <Briefcase className="w-4 h-4" />
              Malt
            </a>
            <a
              href={EXTERNAL_LINKS.linkedin}
              target="_blank"
              rel="me noopener noreferrer"
              className={LINK_CLASS}
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={EXTERNAL_LINKS.github}
              target="_blank"
              rel="me noopener noreferrer"
              className={LINK_CLASS}
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
