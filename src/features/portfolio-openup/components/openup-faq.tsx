export const openupFaqItems = [
  {
    question:
      "Pourquoi un Cloudflare Worker pour les redirections plutôt qu'une route API classique ?",
    answer:
      "Une redirection shortlink doit être instantanée partout dans le monde. Le worker tourne sur l'edge Cloudflare (latence sub-50ms en Tokyo comme à Paris), scale tout seul, coûte une fraction d'un serveur classique, et sert aussi de proxy au site marketing Framer pour garder un seul domaine.",
  },
  {
    question:
      "Hono plutôt que Next.js ou Fastify pour l'API, pourquoi ce choix ?",
    answer:
      "Hono est minuscule, runtime-agnostic (Node, Bun, Workers, Deno) et embarque un client RPC type-safe natif (hc<AppType>) qui garantit le contrat API par les types entre l'API et le frontend. C'est exactement ce qu'il faut pour une archi DDD/CQRS où on veut zéro framework dans le domaine.",
  },
  {
    question:
      "Les deep links iOS/Android, ça marche vraiment ou c'est juste du fallback web ?",
    answer:
      "Vraiment. Quand quelqu'un tape sur openup.to/xxx, le worker détecte l'user-agent et route vers une page interstitial qui tente d'ouvrir le scheme natif (openup://) si l'app est installée. Si la tentative échoue dans X ms, fallback web. On gère aussi le cas tordu des in-app browsers Instagram/TikTok via un guide pour ouvrir le lien dans Safari/Chrome.",
  },
  {
    question:
      "Capacitor pour mobile, pas React Native, c'est pas moins natif ?",
    answer:
      "Capacitor partage 100% du code avec la PWA web. Le résultat est packagé en vraie app iOS et Android publiée sur TestFlight et le Play Store via Fastlane CI. On garde l'accès aux APIs natives (clipboard, share, haptics, deep links iOS/Android) via des wrappers, et on évite d'entretenir une troisième codebase. Pour un SaaS dont la valeur est dans la logique métier, pas dans des écrans 100% natifs, c'est le bon trade-off.",
  },
  {
    question:
      "Multi-devise EUR/USD et Apple Wallet, c'était dans le scope initial ?",
    answer:
      "Non, deux ajouts incrémentaux après le MVP. Multi-devise pour ouvrir hors zone euro (détection auto via geo IP + override possible, Stripe gère un Product avec un Price par devise). Apple Wallet pour le use case retail/event : carte avec QR scannable directement depuis le wallet, ajouté en 1 tap depuis l'app. Possible parce que l'archi DDD permettait d'ajouter sans toucher au reste.",
  },
];

export function OpenupFaq() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl font-bold text-primary mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Questions fréquentes sur ce projet
        </h2>
        <p className="text-secondary text-lg mb-12">
          Les questions que mes clients m&apos;ont posées sur cette mission.
        </p>
        <dl>
          {openupFaqItems.map((item) => (
            <details
              key={item.question}
              className="group border-b border-neutral-200 py-6"
            >
              <summary className="cursor-pointer flex justify-between items-center text-lg font-semibold text-primary group-open:text-accent">
                <dt className="flex-1">{item.question}</dt>
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
