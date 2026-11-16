import { ArrowUpRight } from "lucide-react";
import { NOW_COPY } from "@/app/_config/home-copy";
import { NOW_ENTRIES, type NowEntry } from "@/app/_config/now";
import { getProjectBySlug, getProjectMeta } from "@/app/_config/projects";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

export interface NowProps {
  entries?: readonly NowEntry[];
}

export function Now({ entries = NOW_ENTRIES }: NowProps) {
  const items = entries.flatMap((entry) => {
    const project = getProjectBySlug(entry.slug);

    return project ? [{ entry, project }] : [];
  });

  if (items.length === 0) return null;

  return (
    <section
      id="maintenant"
      className="pleine-largeur"
      aria-labelledby="maintenant-title"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="section-tete lg:self-start">
          <p className="surtitre">{NOW_COPY.surtitre}</p>
          <Heading2 id="maintenant-title" size="xl">
            {NOW_COPY.titleTop} <br />{" "}
            <span className="marqueur">{NOW_COPY.titleAccent}</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            {NOW_COPY.intro}
          </Paragraph>
        </header>

        <ol className="maintenant-liste min-w-0">
          {items.map(({ entry, project }) => (
            <li
              key={`${entry.date}-${entry.slug}`}
              className="maintenant-entree reveal-up grid justify-items-start gap-4"
            >
              <time dateTime={entry.date} className="etiquette etiquette-sm">
                {formatLongDate(entry.date)}
              </time>
              <TransitionLink
                href={`/portfolio/${entry.slug}`}
                className="maintenant-projet heading-display inline-flex items-center gap-3"
              >
                {project.name}
                <ArrowUpRight
                  className="offre-fleche w-6 h-6"
                  aria-hidden="true"
                />
              </TransitionLink>
              <p className="label-mono ink-muted">{getProjectMeta(project)}</p>
              <Paragraph variant="secondary">{entry.summary}</Paragraph>
              <p className="maintenant-suite grid gap-1">
                <span className="label-mono">{NOW_COPY.nextLabel}</span>
                {entry.next}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
