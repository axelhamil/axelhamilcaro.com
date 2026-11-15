import { CaseFaq } from "@/src/shared/ui/portfolio/case-sections";

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
      "Hono est minuscule, runtime-agnostic (Node, Bun, Workers, Deno) et embarque un client RPC type-safe natif (hc<AppType>) qui garantit le contrat API par les types entre l'API et le frontend. C'est exactement ce qu'il faut pour une archi DDD/CQRS où je veux zéro framework dans le domaine.",
  },
  {
    question:
      "Les deep links, ça marche vraiment ou c'est juste du fallback web ?",
    answer:
      "Vraiment, et c'est le cœur du produit. Un résolveur couvre 57 applications de destination : un lien Spotify ouvre le bon titre dans l'app Spotify, un lien Amazon la bonne fiche produit. Côté iOS je passe par les Universal Links, côté Android par un intent:// avec browser_fallback_url. Il n'y a pas de scheme custom openup:// : l'app OpenUp elle-même s'ouvre via Universal Links et App Links vérifiés.",
  },
  {
    question:
      "Comment tu sors un lien du navigateur intégré d'Instagram ou de TikTok ?",
    answer:
      "11 navigateurs intégrés sont détectés côté serveur à partir du user-agent, avec une stratégie par application. Instagram et Facebook exposent un scheme d'évasion, je l'utilise pour forcer l'ouverture dans le navigateur système. TikTok, WeChat, LINE et Twitter n'en laissent aucun : la seule réponse honnête est une page d'instructions localisée qui pointe le menu au bon endroit selon l'app. Partout ailleurs, un interstitiel tente le deep link natif avec une cascade de secours sur cinq navigateurs iOS. Je sais si ça a marché en écoutant visibilitychange, blur et pagehide : si la page passe en arrière-plan avant 1,8s, l'app a pris la main et j'annule le repli web.",
  },
  {
    question:
      "Capacitor pour mobile, pas React Native, c'est pas moins natif ?",
    answer:
      "Capacitor partage 100% du code avec la PWA web. Le résultat est packagé en vraie app iOS et Android publiée sur TestFlight et le Play Store via Fastlane CI. Je garde l'accès aux APIs natives (clipboard, share, haptics, deep links iOS/Android) via des wrappers, et j'évite d'entretenir une troisième codebase. Pour un SaaS dont la valeur est dans la logique métier, pas dans des écrans 100% natifs, c'est le bon trade-off.",
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
    <CaseFaq
      items={openupFaqItems}
      intro="Les questions qu'on me pose sur OpenUp."
    />
  );
}
