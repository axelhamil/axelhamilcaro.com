import type { FaqItem } from "@/src/shared/seo/schemas/faq-page";
import { BrandText } from "@/src/shared/ui/typography/brand-text";

export type FaqAccordionVariant = "svc" | "cas";

export interface FaqAccordionProps {
  items: readonly FaqItem[];
  variant: FaqAccordionVariant;
}

export function FaqAccordion({ items, variant }: FaqAccordionProps) {
  return (
    <div className={`${variant}-faq`}>
      {items.map((item) => (
        <details key={item.question} className="faq-item">
          <summary className="faq-question">
            {item.question}
            <span className="faq-signe" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="faq-reponse">
            <BrandText text={item.answer} />
          </p>
        </details>
      ))}
    </div>
  );
}
