import { PARCOURS } from "@/app/_config/parcours";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";
import { CHAPITRES } from "./parcours/parcours-data";
import { ParcoursPistes } from "./parcours/parcours-pistes";
import { ParcoursPoste } from "./parcours/parcours-poste";

const ExperienceTimeline = () => {
  return (
    <section
      id="parcours"
      className="pleine-largeur"
      aria-labelledby="parcours-title"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home">
        <header className="section-tete">
          <p className="surtitre">Parcours</p>
          <Heading2 id="parcours-title" size="xl">
            Le parcours <br /> <span className="marqueur">jusqu'ici.</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            De développeur à lead technique chez Civitime, puis à mon compte.
            Aujourd'hui, le jour chez Eskimoz, le reste du temps sur mes builds
            : clean-stack, weathertop, afterlive, et OpenUp en parallèle.
          </Paragraph>
        </header>

        <div className="parcours-bordereau">
          <div className="hachures" aria-hidden="true" />
          <div className="parcours-bordereau-tete">
            <p className="label-mono">Bordereau de parcours</p>
            <p className="tampon tampon-droite" aria-hidden="true">
              <span className="tampon-haut">En cours</span>{" "}
              <span className="tampon-bas">2026</span>
            </p>
          </div>

          <ParcoursPistes />

          {CHAPITRES.map((chapitre) => (
            <div
              key={chapitre.id}
              className="fiche"
              data-chapitre={chapitre.id}
            >
              <div
                className={
                  chapitre.postes.length > 1
                    ? "fiche-corps fiche-duo"
                    : "fiche-corps fiche-solo"
                }
              >
                {chapitre.postes.map((poste) => (
                  <ParcoursPoste
                    key={poste.id}
                    poste={poste}
                    missions={chapitre.missions}
                  />
                ))}
              </div>
            </div>
          ))}

          <p className="parcours-bordereau-pied label-mono">
            Point de départ : {PARCOURS.formation.organisation},{" "}
            {PARCOURS.formation.periode}, titre {PARCOURS.formation.role}.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
