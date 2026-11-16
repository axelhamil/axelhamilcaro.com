import { PARCOURS, type ParcoursRepere } from "@/app/_config/parcours";
import { EXTERNAL_LINKS } from "@/app/_config/site.constants";

type ChapitreId = "aujourdhui" | "openup" | "compte" | "civitime";

interface Lien {
  href: string;
  label: string;
}

export interface Poste {
  id: string;
  entreprise: string;
  moment?: string;
  debut: ParcoursRepere;
  fin?: ParcoursRepere;
  contrat?: string;
  role: string;
  contexte: string;
  faitsTitre: string;
  faits: readonly string[];
  resultats: readonly string[];
  stack: readonly string[];
  liens: readonly Lien[];
  affiche?: { src: string; alt: string };
  etabli?: {
    surtitre: string;
    titre: string;
    accent: string;
    tags: readonly string[];
  };
}

export interface Mission {
  nom: string;
  periode: string;
  texte: string;
}

export interface Chapitre {
  id: ChapitreId;
  postes: readonly Poste[];
  missions?: readonly Mission[];
}

export interface Piste {
  id: string;
  chapitre: ChapitreId;
  entreprise: string;
  repere: string;
  periode: string;
  enCours: boolean;
}

export const ANNEES = ["2021", "2022", "2023", "2024", "2025", "2026"] as const;

export const PISTES: readonly Piste[] = [
  {
    id: "eskimoz",
    chapitre: "aujourdhui",
    entreprise: PARCOURS.eskimoz.organisation,
    repere: "Le jour",
    periode: PARCOURS.eskimoz.periode,
    enCours: PARCOURS.eskimoz.enCours,
  },
  {
    id: "builds",
    chapitre: "aujourdhui",
    entreprise: PARCOURS.builds.organisation,
    repere: "Le reste du temps",
    periode: PARCOURS.builds.periode,
    enCours: PARCOURS.builds.enCours,
  },
  {
    id: "openup",
    chapitre: "openup",
    entreprise: PARCOURS.openup.organisation,
    repere: "En parallèle",
    periode: PARCOURS.openup.periode,
    enCours: PARCOURS.openup.enCours,
  },
  {
    id: "compte",
    chapitre: "compte",
    entreprise: PARCOURS.compte.organisation,
    repere: "Freelance",
    periode: PARCOURS.compte.periode,
    enCours: PARCOURS.compte.enCours,
  },
  {
    id: "civitime",
    chapitre: "civitime",
    entreprise: PARCOURS.civitime.organisation,
    repere: "CDI",
    periode: PARCOURS.civitime.periode,
    enCours: PARCOURS.civitime.enCours,
  },
];

export const CHAPITRES: readonly Chapitre[] = [
  {
    id: "aujourdhui",
    postes: [
      {
        id: "eskimoz",
        entreprise: PARCOURS.eskimoz.organisation,
        moment: "Le jour",
        debut: PARCOURS.eskimoz.debut,
        contrat: PARCOURS.eskimoz.contrat,
        role: PARCOURS.eskimoz.role,
        contexte:
          "Eskimoz est une agence d'acquisition digitale, connue pour le SEO.",
        faitsTitre: "Ce que je fais",
        faits: [
          "Je travaille sur toute la chaîne : l'interface, l'API, les jobs et l'infra qui les fait tourner.",
          "Ce que je construis là-bas appartient à l'équipe : je n'en dis pas plus ici.",
        ],
        resultats: ["CDI", "Depuis septembre 2026", "Toute la chaîne"],
        stack: [],
        liens: [{ href: "/about", label: "Mon parcours complet" }],
        affiche: {
          src: "/parcours/eskimoz-affiche.webp",
          alt: "Affiche Eskimoz",
        },
      },
      {
        id: "builds",
        entreprise: PARCOURS.builds.organisation,
        moment: "Le reste du temps",
        debut: PARCOURS.builds.debut,
        role: PARCOURS.builds.role,
        contexte:
          "Le reste du temps, je fabrique des outils de fondation : je fournis l'outil et la donnée, pas l'application finale.",
        faitsTitre: "Sur l'établi",
        faits: [
          `clean-stack, depuis ${PARCOURS.builds.debut.label} : mon boilerplate SaaS open source en TypeScript.`,
          "afterlive : l'enregistrement d'un direct devient une quinzaine de clips montés, et davantage si besoin, 2 heures de vidéo traitées en 5 minutes environ. Bientôt en production.",
          "Des bibliothèques TypeScript et des outils pour agents IA, publiés sur GitHub.",
        ],
        resultats: ["Open source", "2 produits en chantier"],
        stack: [],
        liens: [
          { href: EXTERNAL_LINKS.github, label: "Mes outils sur GitHub" },
        ],
        etabli: {
          surtitre: "Axel Hamilcaro / Mes builds",
          titre: "Le reste ",
          accent: "du temps.",
          tags: ["clean-stack", "afterlive"],
        },
      },
    ],
  },
  {
    id: "openup",
    postes: [
      {
        id: "openup",
        entreprise: PARCOURS.openup.organisation,
        moment: "Projet en parallèle",
        debut: PARCOURS.openup.debut,
        role: PARCOURS.openup.role,
        contexte:
          "Un lien partagé sur Instagram ou TikTok s'ouvre dans leur navigateur interne, où personne n'est connecté à rien. OpenUp l'ouvre directement dans l'app native.",
        faitsTitre: "Ce que je fais",
        faits: [
          "Je tiens la technique de l'API aux applications mobiles, choix produit compris.",
          "Sortir du navigateur d'Instagram, de TikTok ou de WeChat, chacun avec sa parade.",
          "QR codes, link-in-bio et analytics autour, sur web, iOS et Android depuis une seule codebase.",
        ],
        resultats: [
          "50+ apps ouvertes",
          "< 50 ms par redirection",
          "Abonnés en euros et en dollars",
        ],
        stack: [
          "TypeScript",
          "Hono",
          "PostgreSQL",
          "Capacitor",
          "Cloudflare Workers",
        ],
        liens: [{ href: "/portfolio/openup", label: "Étude de cas OpenUp" }],
        affiche: {
          src: "/parcours/openup.webp",
          alt: "Affiche OpenUp, fondateur technique : le lien qui ouvre la vraie app. 50+ apps, moins de 50 ms, web, iOS et Android.",
        },
      },
    ],
  },
  {
    id: "compte",
    postes: [
      {
        id: "compte",
        entreprise: PARCOURS.compte.organisation,
        debut: PARCOURS.compte.debut,
        contrat: PARCOURS.compte.contrat,
        role: PARCOURS.compte.role,
        contexte:
          "Une dizaine de fondateurs accompagnés, avec leurs produits construits de la page blanche à la production. Souvent seul sur le produit, parfois lead technique à temps partiel.",
        faitsTitre: "Ce que j'ai fait",
        faits: [
          "Quatre produits partis d'une page blanche et arrivés en production.",
          "Du code repris en production sans l'arrêter : fonctionnalités, audit, chiffrage.",
          "Un même code métier servi sur web, iOS et Android.",
        ],
        resultats: [
          "4 produits de zéro à la prod",
          "545 tests BDD",
          "< 200 ms entre les caisses",
        ],
        stack: ["TypeScript", "React", "React Native", "Node.js", "PostgreSQL"],
        liens: [
          { href: "/portfolio/scormpilot", label: "Étude de cas ScormPilot" },
          { href: "/portfolio/billetterie", label: "Étude de cas Billetterie" },
          { href: "/services", label: "Travailler avec moi" },
        ],
        affiche: {
          src: "/parcours/a-mon-compte.webp",
          alt: "Affiche À mon compte : une dizaine de produits. De zéro à la prod, web, iOS, Android, avec les fondateurs.",
        },
      },
    ],
    missions: [
      {
        nom: "Sites vitrines pour artisans",
        periode: "2025",
        texte:
          "En ligne en 48 heures, page 1 de Google sur les requêtes locales visées.",
      },
      {
        nom: "HomeCafé",
        periode: "2025 à 2026",
        texte:
          "Une app de bien-être sur web et mobile : un seul code métier, 545 tests BDD.",
      },
      {
        nom: "ScormPilot",
        periode: "2025 à 2026",
        texte:
          "Des modules e-learning diffusés sans LMS, plusieurs milliers de sessions de lecture par jour.",
      },
      {
        nom: "MentorTroc",
        periode: "2025",
        texte:
          "Communautés et messagerie temps réel greffées sur une plateforme en production, puis l'audit de la V2.",
      },
      {
        nom: "Billetterie en ligne",
        periode: "Début 2025",
        texte:
          "Livrée en un mois, plan de salle synchronisé en moins de 200 ms entre les caisses.",
      },
      {
        nom: "Superprof",
        periode: "2024 à 2025",
        texte:
          "Une dizaine de développeurs web accompagnés un par un, du débutant au junior en poste.",
      },
    ],
  },
  {
    id: "civitime",
    postes: [
      {
        id: "civitime",
        entreprise: PARCOURS.civitime.organisation,
        debut: PARCOURS.civitime.debut,
        fin: PARCOURS.civitime.fin,
        contrat: PARCOURS.civitime.contrat,
        role: PARCOURS.civitime.role,
        contexte:
          "Des serious games qui sensibilisent à la RSE les collaborateurs de grands comptes, dans une startup B Corp.",
        faitsTitre: "Ce que j'ai fait",
        faits: [
          "Arrivé développeur, devenu référent technique d'une équipe de 4 à 5 personnes.",
          "Un legacy refondu en Clean Architecture et DDD sans casser l'existant.",
          "Des parcours suivis jusqu'au bout, là où l'e-learning classique plafonne à 10 % de complétion.",
        ],
        resultats: [
          "250 000 collaborateurs formés",
          "100+ entreprises",
          "65 à 73 % de complétion",
        ],
        stack: ["TypeScript", "React", "Next.js", "NestJS", "PostgreSQL"],
        liens: [
          { href: "/portfolio/civitime", label: "Étude de cas Civitime" },
        ],
        affiche: {
          src: "/parcours/civitime.webp",
          alt: "Affiche Civitime : 250 000 collaborateurs. 100+ entreprises, 65 à 73 % de complétion, lead technique.",
        },
      },
    ],
  },
];
