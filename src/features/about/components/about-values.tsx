const principes = [
  {
    titre: "Comprendre le problème avant d'ouvrir l'éditeur.",
    texte:
      "Je pose les questions sur le métier avant d'écrire une ligne. Le code sert un objectif clair, sinon il ne sert à rien.",
    ombre: "",
  },
  {
    titre: "Écrire le test avant le code.",
    texte:
      "Les règles métier sont testées d'abord. C'est ce qui me permet de changer vite sans casser ce qui marche déjà.",
    ombre: "etiquette-gris",
  },
  {
    titre:
      "Garder une architecture qu'un autre dev, ou un agent, peut reprendre sans moi.",
    texte:
      "Clean Architecture et DDD quand le produit le mérite, simple quand il faut juste livrer. Pas de sur-ingénierie pour le plaisir.",
    ombre: "etiquette-gris",
  },
  {
    titre: "Mettre en prod tôt, mesurer, corriger.",
    texte:
      "Je livre par petites étapes, je regarde ce qui se passe en vrai, je corrige. Pas de surprise sur les délais, pas de dette cachée.",
    ombre: "etiquette-jaune",
  },
] as const;

export function AboutValues() {
  return (
    <section id="facon-de-faire" className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="surtitre">Méthode</p>
          <h2 className="heading-display title-xl">
            Ma façon <br /> <span className="marqueur">de faire.</span>
          </h2>
        </header>

        <ul className="grille-cartes principes">
          {principes.map(({ titre, texte, ombre }) => (
            <li
              key={titre}
              className={`etiquette etiquette-carte ${ombre} gap-3`}
            >
              <h3 className="heading-display title-sm">{titre}</h3>
              <p className="para ink-secondary">{texte}</p>
            </li>
          ))}
        </ul>

        <p className="mesure para para-lg">
          Je travaille avec des agents IA tous les jours. Ils écrivent vite, je
          décide de ce qui part en prod. Le métier n'a pas changé, le rythme si.
          Ce qui prenait une semaine tient dans une journée, à condition que les
          fondations soient propres. Sinon l'agent produit de la dette aussi
          vite que du code.
        </p>
      </div>
    </section>
  );
}
