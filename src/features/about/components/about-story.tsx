export function AboutStory() {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Mon parcours
        </h2>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          J'ai démarré le développement à la Wild Code School en 2021 en
          formation alternance Bac+3/4. À la sortie, j'ai rejoint Civitime en
          CDI comme lead technique : c'est là que j'ai appris à penser produit
          autant qu'à coder.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          J'y ai passé 4 ans sur la plateforme RSE B Corp. Refonte complète de
          l'architecture en Clean Architecture, DDD et event sourcing.
          Conception d'un éditeur de contenu interne qui a divisé par 2 les
          délais de livraison de l'équipe pédagogique. 4 ans à porter la
          technique d'un produit que je connaissais par cœur.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          Depuis 2 ans, je suis passé en freelance — pas par défaut, mais par
          conviction : garder la liberté de choisir mes projets, mes clients, et
          de progresser sur les sujets qui me passionnent. Aujourd'hui je
          travaille en parallèle sur OpenUp (SaaS de gestion de liens live sur
          openup.to — courts, QR, link-in-bio, analytics, iOS/Android/PWA),
          ScormPilot (SaaS e-learning multi-tenant, 5 apps en solo) et des
          missions de lead tech temps partiel. Je teste et intègre l'IA dans mes
          workflows quotidiens (Claude Code, Vercel AI SDK) pour gagner en
          vélocité de livraison sans sacrifier la qualité.
        </p>
      </div>
    </section>
  );
}
