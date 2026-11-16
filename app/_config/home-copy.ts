import { MCP_CLAUDE_CODE_COMMAND } from "./mcp-clients";
import { MCP } from "./site.constants";

export const HERO_COPY = {
  accroche:
    "Je construis des API et des outils sur lesquels d'autres bâtissent, et je le fais en public.",
  intro:
    "Je suis Axel Hamilcaro, développeur fullstack et builder, basé à Tours.",
  lede: "Mon pari pour 2026 et 2027 : fournir l'outil et la donnée, pas l'application finale.",
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

export const BUILDS_COPY = {
  surtitre: "Mes builds",
  titleTop: "Ce que",
  titleAccent: "je construis.",
  intro:
    "Des API, des briques et des outils de fondation, construits en public, avec leur statut et leur dernière mise à jour. OpenUp, dont je suis le fondateur technique, en fait partie.",
  clientsTitle: "Construit pour d'autres",
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
  cta: (count: number) => `Voir les ${count} offres`,
  detailTitle: "Le détail des offres",
  mcpLead: "Avant de m'écrire, tu peux",
  mcpLink: "estimer ton projet avec mon serveur MCP",
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
  "De développeur à lead technique chez Civitime, puis à mon compte. Aujourd'hui développeur chez Eskimoz et fondateur technique d'OpenUp.";

export const HOME_DESCRIPTION =
  "Je suis Axel Hamilcaro, développeur fullstack et builder à Tours. Je construis des API et des outils en public, dont clean-stack, et j'accepte peu de projets.";

export const HOME_FAQ_ANSWERS = {
  whoIs:
    "Je suis Axel Hamilcaro, builder basé à Tours. Je construis en public des API, des outils de fondation et des outils pour agents IA. Je suis aussi le fondateur technique d'OpenUp.",
  fromScratch:
    "Oui, quand le projet ressemble à ce que je construis : une API, des données, des briques pour agents IA, un produit qui part de zéro. Pas de site vitrine. Le détail est sur axelhamilcaro.com/services.",
  freelance:
    "Oui, quelques projets choisis, à côté de mes builds, de mon poste et d'OpenUp. Je prends des API, des données, des briques pour agents IA, des produits partis de zéro et du lead tech à temps partiel. Le détail est sur la page Services, à l'adresse axelhamilcaro.com/services.",
  projectTypes:
    "Des API et des produits de données, des briques pour agents IA, des produits qui partent de zéro, du lead tech à temps partiel. Je ne prends ni sites vitrines, ni régie, ni maintenance de legacy sans refonte. Stack principal : Next.js, React, Node.js, TypeScript, PostgreSQL.",
  estimateWithoutCall: `Oui. Tu branches mon serveur MCP (${MCP.url}) dans Claude, ChatGPT (offres Business et Enterprise), Cursor ou Claude Code, tu racontes ton projet, et ton assistant te rend une fourchette en jours et en euros HT calculée avec ma grille. Rien ne m'est envoyé sans ton accord.`,
  connectMcp: `Dans Claude : Customize, Connectors, Add custom connector, puis colle ${MCP.url}. Dans ChatGPT : Plugins, Add custom MCP server. Dans Cursor : ajoute l'adresse dans mcp.json. Dans Claude Code : ${MCP_CLAUDE_CODE_COMMAND}. Les étapes détaillées et la phrase à copier sont sur axelhamilcaro.com/#mcp.`,
  estimateIsQuote:
    "Non. C'est une fourchette non contractuelle, avec ses hypothèses et ses exclusions, pour savoir si ton projet tient dans ton budget avant d'en parler. Le chiffre ferme vient après un échange avec moi.",
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
  BUILDS_COPY,
  WORK_COPY,
  HOME_RIBBONS,
  PARCOURS_INTRO,
  HOME_DESCRIPTION,
  HOME_FAQ_ANSWERS,
].flatMap(collectTexts);
