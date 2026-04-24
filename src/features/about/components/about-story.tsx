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
          formation alternance Bac+3/4. J'ai choisi le freelance dès la sortie,
          pas par défaut, mais par conviction : garder la liberté de choisir mes
          projets, mes clients, et de progresser sur les sujets qui me
          passionnent vraiment.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          J'ai passé 4 ans comme lead technique chez Civitime, plateforme RSE B
          Corp. Refonte complète de l'architecture en Clean Architecture, DDD et
          event sourcing. Conception d'un éditeur de contenu IA RAG qui a divisé
          par 2 les délais de livraison de l'équipe pédagogique. C'est là que
          j'ai compris la vraie valeur d'un dev qui pense produit autant qu'il
          code.
        </p>
        <p className="text-secondary text-lg leading-relaxed mb-6">
          Aujourd'hui je travaille en parallèle sur ScormPilot (SaaS e-learning
          multi-tenant, 5 apps en solo), HomeCafé (app web Next.js + mobile
          native Expo, 70+ parcours métier, 545+ tests BDD) et des missions de
          lead tech temps partiel. En parallèle, je teste et intègre l'IA dans
          mes workflows quotidiens (Claude Code, Vercel AI SDK) pour gagner en
          vélocité de livraison sans sacrifier la qualité.
        </p>
      </div>
    </section>
  );
}
