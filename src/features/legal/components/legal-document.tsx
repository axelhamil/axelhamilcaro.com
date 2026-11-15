import type { ReactNode } from "react";
import { generateSlug } from "@/src/lib/utils/slug.utils";

export interface LegalSection {
  title: string;
  body: ReactNode;
}

export interface LegalHeaderProps {
  surtitre: string;
  title: string;
  children: ReactNode;
}

export function LegalHeader({ surtitre, title, children }: LegalHeaderProps) {
  return (
    <header className="trame pleine-largeur">
      <div className="page-entete container mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 flex flex-col gap-6">
        <p className="surtitre">{surtitre}</p>
        <h1 className="page-h1 heading-display legal-h1">{title}</h1>
        <p className="para para-lg ink-secondary mesure">{children}</p>
      </div>
    </header>
  );
}

export interface LegalDocumentProps {
  sections: LegalSection[];
  children: ReactNode;
}

export function LegalDocument({ sections, children }: LegalDocumentProps) {
  const entries = sections.map((section) => ({
    ...section,
    id: generateSlug(section.title),
  }));

  return (
    <div className="py-12 sm:py-16 grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
      <nav aria-labelledby="legal-sommaire" className="legal-sommaire">
        <h2 id="legal-sommaire" className="surtitre">
          Sommaire
        </h2>
        <ol className="flex flex-col">
          {entries.map(({ id, title }) => (
            <li key={id}>
              <a href={`#${id}`}>{title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="legal-texte flex flex-col gap-12 min-w-0">
        {entries.map(({ id, title, body }) => (
          <section key={id} id={id} aria-labelledby={`${id}-titre`}>
            <h2 id={`${id}-titre`} className="title-md">
              {title}
            </h2>
            {body}
          </section>
        ))}
        {children}
      </div>
    </div>
  );
}
