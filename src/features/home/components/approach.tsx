import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const principles = [
  "Comprendre le problème avant d'ouvrir l'éditeur.",
  "Écrire le test avant le code.",
  "Garder une architecture qu'un autre dev, ou un agent, peut reprendre sans moi.",
  "Mettre en prod tôt, mesurer, corriger.",
] as const;

const Approach = () => {
  return (
    <section
      id="methode"
      className="bloc-inverse pleine-largeur methode"
      aria-labelledby="methode-title"
    >
      <div className="section-home container mx-auto px-4 sm:px-6 md:px-10 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="section-tete lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:self-start">
          <p className="surtitre">Méthode</p>
          <Heading2 id="methode-title" size="xl">
            Ma façon <br /> <span className="marqueur">de faire.</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            J'aime les briques sur lesquelles d'autres construisent, celles
            qu'on ne remarque que quand elles manquent : un modèle de données
            juste, des règles métier testées, une API qu'on branche sans lire
            trois pages de doc.
          </Paragraph>
        </header>

        <div className="flex flex-col gap-10 min-w-0">
          <ol className="methode-liste">
            {principles.map((principle, index) => (
              <li
                key={principle}
                className="methode-etape reveal-up grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 sm:gap-8"
              >
                <span className="methode-numero" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="methode-texte heading-display">
                  {principle}
                </span>
              </li>
            ))}
          </ol>

          <Paragraph size="lg" className="methode-agents">
            Je travaille avec des agents IA tous les jours. Ils écrivent vite,
            je décide de ce qui part en prod. Ce qui prenait une semaine tient
            dans une journée, à condition que les fondations soient propres.
            Sinon l'agent produit de la dette aussi vite que du code.
          </Paragraph>
        </div>
      </div>
    </section>
  );
};

export default Approach;
