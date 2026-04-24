import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";

const items = [
  {
    question: "Quels types de projets prends-tu ?",
    answer:
      "Applications web sur mesure, SaaS B2B multi-tenant, refonte d'architecture, lead tech temps partiel sur engagement long. Stack principal : Next.js, React, Node.js, TypeScript, PostgreSQL.",
  },
  {
    question: "Quels sont tes délais ?",
    answer:
      "Mission ferme : démarrage sous 1 à 3 semaines selon ma charge. MVP : 4 à 8 semaines pour une v1 production-ready. Audit ou consulting court : sous 5 jours ouvrés. Je suis transparent sur ma dispo dès le premier échange.",
  },
  {
    question: "Quel est ton TJM et mode de facturation ?",
    answer:
      "TJM 450€ HT (référence Malt). Facturation au temps passé en régie, ou au forfait pour scope fermé. Devis détaillé sous 24h après notre échange découverte.",
  },
  {
    question: "Travailles-tu en remote ou sur site ?",
    answer:
      "100% remote, basé en Touraine. Je suis disponible pour des points sur site ponctuels en France selon le projet (kickoff, atelier produit, restitution).",
  },
  {
    question: "Comment se passe le premier contact ?",
    answer:
      "Tu m'écris en 3 lignes (objectif business, contexte, deadline) ou tu réserves un appel découverte 30 min sur Calendly. Je reviens avec une analyse honnête et un plan d'action concret. Si je ne suis pas le bon profil, je te le dis.",
  },
];

export function HomeFaq() {
  return (
    <section id="faq" className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-4xl sm:text-5xl font-bold text-primary mb-4"
        >
          Tes questions, mes réponses
        </h2>
        <p className="text-secondary text-lg mb-12">
          Cinq questions que les clients me posent en premier.
        </p>
        <dl>
          {items.map((item) => (
            <details
              key={item.question}
              className="group border-b border-neutral-200 py-6"
            >
              <summary className="cursor-pointer flex justify-between items-center text-lg font-semibold text-primary group-open:text-accent">
                {item.question}
                <span className="ml-4 text-2xl font-light group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <dd className="mt-4 text-secondary leading-relaxed">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildFaqPageSchema(items)),
          }}
        />
      </div>
    </section>
  );
}
