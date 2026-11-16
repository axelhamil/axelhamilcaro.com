import { PARCOURS } from "@/app/_config/parcours";

const { formation, civitime, compte, eskimoz, builds, openup } = PARCOURS;

export const ABOUT_STEPS = [
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
    texte: `Le reste du temps, je fabrique mes propres produits. Depuis ${builds.debut.label}, je publie clean-stack, un boilerplate SaaS open source. Afterlive transforme l'enregistrement d'un direct en une quinzaine de clips montés, et davantage si besoin, 2 heures de vidéo traitées en 5 minutes environ ; il sera bientôt en production. Je publie aussi mes outils sur GitHub.`,
  },
  {
    statut: "En parallèle",
    quand: openup.periode,
    titre: openup.organisation,
    texte: `En parallèle de mes builds, je suis le ${openup.role.toLowerCase()} d'OpenUp depuis ${openup.debut.label}.`,
  },
] as const;
