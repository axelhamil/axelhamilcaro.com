import type { ServiceData } from "../lib/services-data";

export function ServiceFaq({ items }: { items: ServiceData["faq"] }) {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-4xl sm:text-5xl font-bold text-primary mb-4"
        >
          Tes questions, mes réponses
        </h2>
        <p className="text-secondary text-lg mb-12">
          Questions fréquentes sur ce type de mission.
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
      </div>
    </section>
  );
}
