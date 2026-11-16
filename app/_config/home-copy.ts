export const HERO_COPY = {
  accroche:
    "Je construis des API et des outils sur lesquels d'autres bâtissent, et je le fais en public.",
  intro:
    "Je suis Axel Hamilcaro, développeur fullstack et builder, basé à Tours.",
  context:
    "Je suis aussi développeur chez Eskimoz et je mène OpenUp en parallèle.",
  primaryCta: "Voir ce que je construis",
  secondaryCta: "Suivre mes builds",
  selective: "J'accepte quelques projets choisis par trimestre.",
  selectiveLink: "Voir comment travailler avec moi",
} as const;

export const FACT_LABELS = {
  publicBuilds: "builds publics sur GitHub",
  privateBuilds: "builds privés en cours",
  developerSince: "développeur depuis",
} as const;

export const NOW_COPY = {
  surtitre: "En ce moment",
  titleTop: "Mon journal",
  titleAccent: "de chantier.",
  intro:
    "Où en sont mes builds, point daté par point daté. Rien n'est annoncé avant d'être vrai.",
  nextLabel: "Prochaine étape",
} as const;

export const WORK_COPY = {
  surtitre: "Missions choisies",
  titleTop: "Travailler",
  titleAccent: "avec moi.",
  intro:
    "Je construis d'abord mes produits. Je prends quelques projets choisis, quand ils ressemblent à ce que je construis.",
  takeTitle: "Ce que je prends",
  take: [
    "API et données",
    "Briques pour agents IA",
    "Produits partis de zéro",
    "Lead tech à temps partiel",
  ],
  refuseTitle: "Ce que je refuse",
  refuse: ["Sites vitrines", "Régie", "Maintenance de legacy sans refonte"],
  doubt: "Un doute sur le fit ? Écris-moi, je réponds sous 24 h.",
  cta: "Voir les 5 offres",
  detailTitle: "Le détail des offres",
} as const;

export const HOME_RIBBONS = {
  work: [
    "Travailler avec moi",
    "API",
    "Données",
    "Briques pour agents IA",
    "Produits partis de zéro",
    "Lead tech à temps partiel",
    "Démo chaque semaine",
    "Un seul interlocuteur",
  ],
} as const;

export const PARCOURS_INTRO =
  "De développeur à lead technique chez Civitime, puis à mon compte. Aujourd'hui développeur chez Eskimoz, avec OpenUp en parallèle.";

export const HOME_DESCRIPTION =
  "Je suis Axel Hamilcaro, développeur fullstack et builder à Tours. Je construis des API et des outils en public, dont clean-stack, et j'accepte peu de projets.";

export const HOME_FAQ_ANSWERS = {
  freelance:
    "Oui, quelques projets choisis, à côté de mes builds, de mon poste et d'OpenUp. Je prends des API, des données, des briques pour agents IA, des produits partis de zéro et du lead tech à temps partiel. Le détail est sur la page Services, à l'adresse axelhamilcaro.com/services.",
  projectTypes:
    "Des API et des produits de données, des briques pour agents IA, des produits qui partent de zéro, du lead tech à temps partiel. Je ne prends ni sites vitrines, ni régie, ni maintenance de legacy sans refonte. Stack principal : Next.js, React, Node.js, TypeScript, PostgreSQL.",
} as const;

const collectTexts = (value: unknown): string[] => {
  if (typeof value === "string") return [value];

  if (Array.isArray(value)) return value.flatMap(collectTexts);

  if (typeof value === "object" && value !== null) {
    return Object.values(value).flatMap(collectTexts);
  }

  return [];
};

export const ALL_HOME_TEXTS: readonly string[] = [
  HERO_COPY,
  FACT_LABELS,
  NOW_COPY,
  WORK_COPY,
  HOME_RIBBONS,
  PARCOURS_INTRO,
  HOME_DESCRIPTION,
  HOME_FAQ_ANSWERS,
].flatMap(collectTexts);
