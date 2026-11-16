import { Plus } from "lucide-react";
import { HOME_FAQ_ANSWERS } from "@/app/_config/home-copy";
import { MCP } from "@/app/_config/site.constants";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const items = [
  {
    question: "Qui est Axel Hamilcaro ?",
    answer: HOME_FAQ_ANSWERS.whoIs,
  },
  {
    question: "Prends-tu encore des projets en freelance ?",
    answer: HOME_FAQ_ANSWERS.freelance,
  },
  {
    question: "Quels types de projets prends-tu ?",
    answer: HOME_FAQ_ANSWERS.projectTypes,
  },
  {
    question: "Tu peux créer mon application de A à Z ?",
    answer: HOME_FAQ_ANSWERS.fromScratch,
  },
  {
    question: "Travailles-tu en remote ou sur site ?",
    answer:
      "100% remote, basé à Tours, en Centre-Val de Loire. Je suis disponible pour des points sur site ponctuels en France selon le projet (kickoff, atelier produit, restitution).",
  },
  {
    question: "À quoi sert le serveur MCP de ce site ?",
    answer: `J'expose un serveur MCP public à ${MCP.url}. Un agent IA s'y connecte en POST et lit mon identité, ma stack, mes études de cas et mes services. Ce n'est pas une page à ouvrir dans le navigateur.`,
  },
];

export function HomeFaq() {
  return (
    <section id="faq" className="pleine-largeur" aria-labelledby="faq-title">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="section-tete lg:self-start">
          <p className="surtitre">FAQ</p>
          <Heading2 id="faq-title" size="xl">
            Tes questions, <br />{" "}
            <span className="marqueur">mes réponses.</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            Les questions qu'on me pose le plus souvent.
          </Paragraph>
        </header>

        <div className="faq-liste min-w-0">
          {items.map((item) => (
            <details key={item.question} className="faq-item">
              <summary className="faq-question grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6">
                {item.question}
                <Plus className="faq-signe w-5 h-5" aria-hidden="true" />
              </summary>
              <p className="faq-reponse para ink-secondary">{item.answer}</p>
            </details>
          ))}
        </div>

        <JsonLdScript data={buildFaqPageSchema(items)} />
      </div>
    </section>
  );
}
