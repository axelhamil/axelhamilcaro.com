import { PARCOURS } from "@/app/_config/parcours";
import { PRIVATE_BUILD_TEXTS } from "@/app/_config/projects";
import { BrandText } from "@/src/shared/ui/typography/brand-text";

const { formation, civitime, compte, eskimoz, builds, openup } = PARCOURS;

const etapes = [
  {
    statut: "Formation",
    quand: formation.periode,
    titre: formation.organisation,
    texte: `J'apprends le développement en formation ${formation.role} (Bac+3/4).`,
  },
  {
    statut: "Expédié",
    quand: civitime.periode,
    titre: civitime.organisation,
    texte: `J'entre en ${civitime.debut.label} comme développeur et je deviens lead technique en quatre ans, jusqu'en ${civitime.fin.label}. Civitime est une startup EdTech B Corp dont la plateforme RSE a touché plus de 250 000 collaborateurs. J'y pilote la refonte en Clean Architecture, DDD et event sourcing, je conçois un éditeur de contenu interne qui divise par deux les délais de l'équipe pédagogique, j'anime le tech radar et les revues de code.`,
  },
  {
    statut: "En cours",
    quand: compte.periode,
    titre: compte.organisation,
    texte: `Freelance depuis ${compte.debut.label}, j'accompagne une dizaine de fondateurs. Parmi ce que je livre : ScormPilot, un SaaS e-learning multi-tenant conçu en solo, une billetterie 2D/3D mise en production en un mois, des missions de lead tech à temps partiel. Je prends encore des projets clients.`,
  },
  {
    statut: "En cours",
    quand: eskimoz.periode,
    titre: eskimoz.organisation,
    texte: `Le jour, je suis ${eskimoz.role.toLowerCase()} chez Eskimoz, en ${eskimoz.contrat} depuis ${eskimoz.debut.label}.`,
  },
  {
    statut: "En cours",
    quand: builds.periode,
    titre: builds.organisation,
    texte: `Le reste du temps, je fabrique mes propres produits. Depuis ${builds.debut.label}, je publie clean-stack, un boilerplate SaaS open source. Weathertop, une API de données qui renvoie ce que les assistants IA répondent réellement à des prompts envoyés en volume, est en chantier depuis ${PRIVATE_BUILD_TEXTS.weathertop.duration} et pas encore sortie. Afterlive transforme l'enregistrement d'un direct en une quinzaine de clips montés, et davantage si besoin, 2 heures de vidéo traitées en 5 minutes environ ; il sera bientôt en production. Je publie aussi mes outils sur GitHub.`,
  },
  {
    statut: "En parallèle",
    quand: openup.periode,
    titre: openup.organisation,
    texte: `En parallèle de mes builds, je suis le ${openup.role.toLowerCase()} d'OpenUp depuis ${openup.debut.label}.`,
  },
] as const;

export function AboutStory() {
  return (
    <section id="parcours" className="py-12 sm:py-16">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <header className="flex flex-col gap-5">
          <p className="surtitre">Parcours</p>
          <h2 className="heading-display title-xl">
            Mon parcours, <br />
            <span className="marqueur">de Civitime à mes builds.</span>
          </h2>
        </header>

        <ol className="parcours flex flex-col">
          {etapes.map(({ statut, quand, titre, texte }, index) => (
            <li
              key={titre}
              className="parcours-etape grid gap-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-8"
            >
              <p
                className={`tampon ${index % 2 === 1 ? "tampon-droite" : ""} self-start justify-self-start`}
              >
                <span className="tampon-haut">{statut}</span>{" "}
                <span className="tampon-bas">{quand}</span>
              </p>
              <div className="mesure flex flex-col gap-2">
                <h3 className="heading-display title-md">{titre}</h3>
                <p className="para ink-secondary">
                  <BrandText text={texte} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
