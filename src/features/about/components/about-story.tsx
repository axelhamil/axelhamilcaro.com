export function AboutStory() {
  return (
    <section className="py-12 sm:py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-10"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Mon parcours
        </h2>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          <strong className="text-primary">
            J'ai appris le développement à la Wild Code School en 2020
          </strong>
          , en formation Concepteur Développeur d'applications (Bac+3/4). À la
          sortie, j'ai rejoint Civitime en CDI comme développeur. En quatre ans,
          je suis monté en responsabilité jusqu'à devenir lead technique de la
          plateforme.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          Civitime est une startup EdTech B Corp dont la plateforme RSE a touché
          plus de 250 000 collaborateurs. J'y ai piloté la refonte complète de
          l'architecture en Clean Architecture, DDD et event sourcing. J'ai
          aussi conçu un éditeur de contenu interne qui a divisé par deux les
          délais de livraison de l'équipe pédagogique. J'ai animé le tech radar,
          mentoré les développeurs et tenu les revues de code, en portant la
          technique d'un produit que je connaissais par cœur.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          Depuis 2024, je travaille en freelance. Aujourd'hui, j'avance en
          parallèle sur OpenUp, un SaaS de gestion de liens dont je suis
          fondateur (openup.to : liens courts, QR, link-in-bio, analytics,
          iOS/Android/PWA), sur ScormPilot, un SaaS e-learning multi-tenant (5
          apps livrées en solo), et sur des missions de lead tech à temps
          partiel. J'intègre l'IA dans mes workflows quotidiens (Claude Code,
          Vercel AI SDK) pour gagner en vélocité sans sacrifier la qualité. Le
          freelance me va bien aujourd'hui, et je reste ouvert à un engagement
          long, mission au long cours ou poste en CDI, quand le produit et
          l'équipe en valent la peine.
        </p>
      </div>
    </section>
  );
}
