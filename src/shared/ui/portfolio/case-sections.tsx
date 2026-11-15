import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import type { FaqItem } from "@/src/shared/seo/schemas/faq-page";
import { AnimatedCounter } from "@/src/shared/ui/effects/animated-counter";
import { FaqAccordion } from "@/src/shared/ui/motifs/faq-accordion";
import { Button } from "@/src/shared/ui/portfolio/button";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

export type CaseStatTone = "" | "etiquette-jaune" | "etiquette-gris";

export interface CaseStat {
  value: string;
  label: string;
  sublabel?: string;
  tone: CaseStatTone;
}

export interface CaseStatsProps {
  stats: readonly CaseStat[];
  facts: readonly string[];
  columns: string;
  lastItemSpan?: string;
}

export function CaseStats({
  stats,
  facts,
  columns,
  lastItemSpan,
}: CaseStatsProps) {
  return (
    <section className="cas-section container mx-auto flex flex-col gap-8">
      <ul className={`grille-cartes ${columns}`}>
        {stats.map((stat) => (
          <li
            key={stat.label}
            className={[
              "etiquette etiquette-carte aimant cas-chiffre",
              lastItemSpan,
              stat.tone,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <AnimatedCounter
              value={stat.value}
              className="cas-chiffre-valeur"
            />
            <span className="label-mono">{stat.label}</span>
            {stat.sublabel && (
              <span className="cas-chiffre-note">
                <BrandText text={stat.sublabel} />
              </span>
            )}
          </li>
        ))}
      </ul>

      <ul className="cas-faits">
        {facts.map((fact) => (
          <li key={fact}>{fact}</li>
        ))}
      </ul>
    </section>
  );
}

export interface CaseContextCard {
  title: string;
  text: string;
}

export interface CaseContextProps {
  title: string;
  cards: readonly CaseContextCard[];
}

export function CaseContext({ title, cards }: CaseContextProps) {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <p className="surtitre">Contexte</p>
        <Heading2 size="xl">{title}</Heading2>
      </header>

      <ul className="grille-cartes md:grid-cols-2">
        {cards.map((card) => (
          <li key={card.title} className="etiquette etiquette-carte cas-carte">
            <h3 className="heading-display title-sm">{card.title}</h3>
            <p className="cas-carte-texte">
              <BrandText text={card.text} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export interface CaseTechStackProps {
  tech: readonly string[];
  aside?: ReactNode;
}

export function CaseTechStack({ tech, aside }: CaseTechStackProps) {
  const content = (
    <>
      <header className="cas-entete">
        <p className="surtitre">Stack technique</p>
        <Heading2 size="xl">Technologies utilisées</Heading2>
      </header>

      <ul className="cas-tags">
        {tech.map((name) => (
          <li key={name} className="etiquette etiquette-sm label-mono">
            {name}
          </li>
        ))}
      </ul>
    </>
  );

  if (!aside) {
    return (
      <section className="cas-section container mx-auto">{content}</section>
    );
  }

  return (
    <section className="cas-section container mx-auto grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start">
      <div>{content}</div>
      {aside}
    </section>
  );
}

export interface CaseFaqProps {
  items: readonly FaqItem[];
  intro: string;
}

export function CaseFaq({ items, intro }: CaseFaqProps) {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <Heading2 size="xl">Questions fréquentes sur ce projet</Heading2>
        <Paragraph variant="secondary">{intro}</Paragraph>
      </header>

      <FaqAccordion items={items} variant="cas" />
    </section>
  );
}

export function CaseBottomCta() {
  return (
    <section className="cas-fin container mx-auto flex justify-center">
      <Button href="/#portfolio" size="lg">
        <ArrowLeft className="w-5 h-5" />
        Voir tous les projets
      </Button>
    </section>
  );
}
