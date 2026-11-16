export type ProjectCategory =
  | "brique"
  | "outil-agent"
  | "extension"
  | "produit"
  | "chantier";

export type ProjectStatus = "En cours" | "Expédié" | "En chantier";

interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectSection {
  title: string;
  paragraphs: readonly string[];
}

interface ProjectStat {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  visibility: "public" | "private";
  tagline: string;
  summary: string;
  posterLines: readonly [string, string];
  highlights: readonly string[];
  stats?: readonly ProjectStat[];
  ribbon: readonly string[];
  tech: readonly string[];
  links: readonly ProjectLink[];
  sections: readonly ProjectSection[];
  dateModified: string;
  seoTitle: string;
  metaDescription: string;
  featured: boolean;
}

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  produit: "Produit",
  brique: "Brique",
  "outil-agent": "Outil pour agents",
  extension: "Extension",
  chantier: "Chantier",
};

const github = (repo: string): ProjectLink => ({
  label: "Code sur GitHub",
  href: `https://github.com/axelhamil/${repo}`,
});

const npm = (name: string): ProjectLink => ({
  label: "Paquet npm",
  href: `https://www.npmjs.com/package/${name}`,
});

export const PRIVATE_BUILD_TEXTS = {
  weathertop: {
    duration: "6 mois",
    pitch:
      "une API de données : on lui envoie des prompts en volume et elle renvoie ce que les assistants IA répondent réellement, sous une forme exploitable par du code",
    shortPitch:
      "une API de données qui renvoie ce que les assistants IA répondent réellement à des milliers de prompts",
    promise: {
      firstPerson:
        "Je fournis la donnée, à chacun de construire son produit dessus.",
      thirdPerson:
        "Axel Hamilcaro fournit la donnée, à chacun de construire son produit dessus.",
    },
  },
  afterlive: {
    pitch:
      "transforme l'enregistrement d'un direct, ou n'importe quelle vidéo longue, en clips courts, montés et prêts à publier : 2 heures de vidéo traitées en 5 minutes environ, une quinzaine de clips entièrement montés, et davantage si besoin",
    shortPitch:
      "transforme l'enregistrement d'un direct en clips courts montés et prêts à publier",
  },
} as const;

const { weathertop, afterlive } = PRIVATE_BUILD_TEXTS;

export const BUILDS_SUMMARY = `Ses builds : clean-stack, un boilerplate SaaS open source, weathertop, ${weathertop.shortPitch}, afterlive, qui ${afterlive.shortPitch}, et une série d'outils publiés sur GitHub.`;

export const PROJECTS: readonly Project[] = [
  {
    slug: "weathertop",
    name: "Weathertop",
    category: "produit",
    status: "En chantier",
    year: "2026",
    visibility: "private",
    tagline: `Weathertop est ${weathertop.pitch}. En chantier depuis ${weathertop.duration}, pas encore sortie.`,
    summary: `${weathertop.promise.firstPerson} Une équipe de recherche, par exemple, peut comparer à grande échelle et dans le temps ce que répondent les assistants IA à un même jeu de questions. Le dépôt est privé et le produit n'est pas sorti, donc je dis ce qu'il fait, pas comment il le fait.`,
    posterLines: ["LA DONNÉE,", "PAS L'APPLICATION."],
    highlights: ["API de données", "Prompts en volume", "En chantier"],
    ribbon: [
      "Build principal",
      "API de données",
      "Prompts en volume",
      "Réponses des assistants IA",
      "En chantier",
      `Depuis ${weathertop.duration}`,
      "Pas encore sorti",
      "Dépôt privé",
      "2026",
    ],
    tech: [],
    links: [],
    sections: [
      {
        title: "Pourquoi ce build",
        paragraphs: [
          "Au départ, c'était un outil pour moi : en freelance, je voulais mesurer ce que les assistants IA répondaient quand on leur parlait de mon activité. L'outil a grandi, et j'ai décidé d'en faire un produit, de bout en bout. Weathertop est une API de données : on lui envoie des prompts en volume, par milliers, et elle renvoie ce que les assistants IA répondent réellement, sous une forme exploitable par du code.",
          "Une équipe produit peut aussi s'en servir pour vérifier comment les assistants répondent sur son domaine avant de sortir une fonctionnalité. Je n'en dis pas plus tant qu'elle n'est pas sortie : le dépôt est privé, et l'idée compte autant que le code. Ce que je peux raconter, c'est la façon dont je la construis.",
        ],
      },
      {
        title: "Comment je travaille",
        paragraphs: [
          "Un monorepo, des tickets, des tests de comportement écrits avant le code, une relecture, puis une release automatisée. Je travaille avec des agents IA tous les jours. Ils écrivent vite, je décide de ce qui part. Cette discipline est ce qui rend ce rythme tenable.",
        ],
      },
      {
        title: "Ce que ce build m'apprend",
        paragraphs: [
          "Construire un vrai produit m'oblige à trancher ce qui était resté théorique dans CleanStack, mon boilerplate public : quelles règles d'architecture tiennent, lesquelles freinent sans rien apporter. Ce que j'apprends ici repart dans CleanStack, et chaque correction profite aux deux.",
        ],
      },
      {
        title: "Où j'en suis",
        paragraphs: [
          `C'est un projet personnel. J'y travaille depuis ${weathertop.duration}. Il avance ticket par ticket. Il n'est pas encore sorti et je ne donne pas de date : je préfère montrer quelque chose qui marche plutôt qu'une promesse. Quand il sortira, cette page racontera le produit lui-même.`,
        ],
      },
    ],
    dateModified: "2026-11-14",
    seoTitle: "Weathertop : mon build principal",
    metaDescription: `Weathertop, mon build principal : une API de données qui renvoie ce que les assistants IA répondent à des milliers de prompts. En chantier depuis ${weathertop.duration}.`,
    featured: true,
  },
  {
    slug: "afterlive",
    name: "Afterlive",
    category: "produit",
    status: "En cours",
    year: "2026",
    visibility: "private",
    tagline: `Afterlive ${afterlive.pitch}. Un gros build, bientôt en production.`,
    summary:
      "En gros, c'est une ferme à clips. Le dépôt est privé et le produit n'est pas encore ouvert au public : je dis ce qu'il fait, pas comment il le fait. Ici, je raconte surtout la démarche de build.",
    posterLines: ["2 H DE DIRECT,", "15 CLIPS MONTÉS."],
    highlights: ["2 h en 5 min", "15 clips et plus"],
    stats: [
      { value: "5 min", label: "pour 2 h de direct" },
      { value: "15", label: "clips montés, environ" },
    ],
    ribbon: [
      "Créateurs en direct",
      "Clips montés",
      "Gros build",
      "Mené seul",
      "Bientôt en production",
      "Depuis septembre 2026",
      "Pas encore ouvert",
      "Dépôt privé",
    ],
    tech: [],
    links: [],
    sections: [
      {
        title: "Pourquoi ce build",
        paragraphs: [
          "Au départ, c'était un outil pour moi : je me suis mis à streamer de temps en temps sur Twitch, et je voulais que les moments qui valent un clip soient repérés, montés et publiés sur les réseaux sans que j'y passe mes soirées. L'outil a grandi et il est devenu un produit pour les créateurs de contenu. C'est un outil qui produit, ici des clips prêts à publier, plutôt qu'une application de plus. C'est l'un de mes plus gros builds, et je le mène seul. Le dépôt est privé et l'idée compte autant que le code : je dis ce qu'il fait, pas comment il le fait. Le reste de cette page raconte la façon dont je le construis et ce qu'il m'apprend.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "À partir de l'enregistrement d'un direct, Afterlive sort des clips courts, montés et prêts à publier. Sur 2 heures de vidéo, le traitement prend 5 minutes environ et produit une quinzaine de clips entièrement montés, et davantage si besoin. Il est né pour les directs, mais il traite n'importe quelle vidéo longue : une vidéo YouTube, un podcast filmé, une conférence. J'ai poussé l'IA à chaque étape, et une partie du traitement est 100 % déterministe. C'est cette combinaison qui le distingue : à ma connaissance, aucun concurrent ne combine les deux de cette façon.",
        ],
      },
      {
        title: "Comment je travaille",
        paragraphs: [
          "Un monorepo découpé en modules métier qui ne se connaissent pas, avec des tests de comportement à chaque étage, des tickets et une release automatisée. Je travaille avec des agents IA tous les jours. Le découpage strict en modules est ce qui leur permet d'intervenir sur une partie sans casser le reste, et ce qui me permet de relire vite.",
        ],
      },
      {
        title: "Ce que j'apprends",
        paragraphs: [
          "Mener seul un build de cette taille m'oblige à poser des frontières nettes entre les modules, avec des contrats explicites, pour que chaque partie évolue sans casser les autres. C'est moins confortable au début, et beaucoup plus solide ensuite.",
        ],
      },
      {
        title: "Où j'en suis",
        paragraphs: [
          "Je le construis depuis fin septembre 2026. Il avance par versions successives et sera bientôt en production. Je ne donne pas de date. Quand il sera ouvert, cette page en dira plus.",
        ],
      },
    ],
    dateModified: "2026-11-14",
    seoTitle: "Afterlive : un direct, 15 clips montés",
    metaDescription:
      "Afterlive, bientôt en production : un direct devient une quinzaine de clips montés, et plus si besoin, 2 heures de vidéo traitées en 5 minutes environ.",
    featured: true,
  },
  {
    slug: "clean-stack",
    name: "CleanStack",
    category: "brique",
    status: "En cours",
    year: "2025",
    visibility: "public",
    tagline:
      "CleanStack est un boilerplate SaaS open source en TypeScript, avec l'authentification, le multi-tenant, les emails et le stockage déjà branchés, pour n'écrire que son métier.",
    summary:
      "Je le maintiens comme point de départ de mes propres produits. On clone, on écrit la logique métier, le reste est déjà là. Clean Architecture et DDD sont imposés par la structure du code, pas par une page de doc.",
    posterLines: ["LE BOILERPLATE", "QUI DIT NON."],
    highlights: ["Open source", "v2.2.2", "Auth + multi-tenant"],
    stats: [
      { value: "17", label: "étoiles sur GitHub" },
      { value: "3", label: "forks" },
      { value: "v2.2.2", label: "dernière version" },
    ],
    ribbon: [
      "Clean Architecture",
      "DDD",
      "Multi-tenant",
      "Hono",
      "React 19",
      "v2.2.2",
      "Auth + multi-tenant",
      "TypeScript",
      "Bun",
      "TanStack",
      "Vite",
      "Drizzle",
      "PostgreSQL",
      "BetterAuth",
      "Resend",
      "S3 / R2",
      "Turborepo",
      "Biome",
    ],
    tech: [
      "TypeScript",
      "Bun",
      "Hono",
      "React 19",
      "TanStack",
      "Vite",
      "Drizzle",
      "PostgreSQL",
      "BetterAuth",
      "Resend",
      "S3 / R2",
      "Turborepo",
      "Biome",
    ],
    links: [github("clean-stack")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Chaque nouveau SaaS recommence par la même plomberie : connexion, organisations, rôles, emails, envoi de fichiers, journal d'audit. C'est long, ce n'est pas le produit, et c'est là que les raccourcis deviennent de la dette. Je voulais une base où tout cela est déjà fait proprement, avec des règles d'architecture qui tiennent quand le projet grossit, et qu'un autre développeur ou un agent IA peut reprendre sans moi.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "L'authentification passe par BetterAuth : passkeys, double facteur TOTP, lien magique, sessions en base. Chaque table porte son organisation, et les accès passent par un repository scopé. Les droits sont partagés entre le serveur, les routes et l'interface. Une outbox transactionnelle publie les événements du domaine, un journal d'audit en garde la trace et des webhooks signés les envoient vers l'extérieur. Le RGPD, le SSO d'entreprise et SCIM font partie de la base.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Un monorepo pnpm et Turborepo. L'API tourne sur Bun et Hono, l'application sur Vite, React 19 et TanStack, avec des types de bout en bout grâce au client RPC de Hono. Drizzle et PostgreSQL pour les données. Quatorze règles d'architecture non négociables, une chaîne de contrôle sans aucun avertissement (Biome, knip, jscpd, dependency-cruiser) et un fichier CLAUDE.md par package pour travailler avec des agents.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "Le dépôt public compte 17 étoiles et 3 forks au 14 novembre 2026. La dernière version, la 2.2.2, est sortie le 6 novembre 2026. Le README l'annonce en itération active, sans support ni engagement de service. Le dernier push date du 13 novembre 2026. Le monorepo d'OpenUp est parti de cette base, et je la resynchronise avec ce que la production m'apprend.",
        ],
      },
    ],
    dateModified: "2026-11-13",
    seoTitle: "CleanStack : boilerplate SaaS TypeScript",
    metaDescription:
      "CleanStack, mon boilerplate SaaS open source en TypeScript : auth, multi-tenant, emails et stockage branchés, Clean Architecture et DDD imposés par le code.",
    featured: true,
  },
  {
    slug: "inwire",
    name: "inwire",
    category: "brique",
    status: "Expédié",
    year: "2026",
    visibility: "public",
    tagline:
      "inwire est une bibliothèque d'injection de dépendances pour TypeScript, sans décorateurs ni tokens, pour les développeurs qui veulent un conteneur typé de bout en bout.",
    summary:
      "Les conteneurs existants demandent des décorateurs, des tokens et reflect-metadata. inwire tient en un builder fluide et un Proxy, avec l'inférence de types complète. Environ 5 Ko compressé, sans dépendance.",
    posterLines: ["L'INJECTION", "SANS DÉCORATEURS."],
    highlights: ["npm v4.0.1", "~5 Ko gzip", "0 dépendance"],
    stats: [
      { value: "5 Ko", label: "compressé, environ" },
      { value: "0", label: "dépendance" },
      { value: "v4.0.1", label: "sur npm" },
    ],
    ribbon: [
      "Injection de dépendances",
      "TypeScript",
      "Proxy",
      "npm v4.0.1",
      "~5 Ko gzip",
      "0 dépendance",
      "tsdown",
      "Vitest",
      "Biome",
      "semantic-release",
    ],
    tech: ["TypeScript", "tsdown", "Vitest", "Biome", "semantic-release"],
    links: [github("inwire"), npm("inwire")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "En TypeScript, l'injection de dépendances passe souvent par des décorateurs, des tokens déclarés à la main et reflect-metadata. Le résultat est verbeux, fragile au refactoring, et le typage se perd en route. Dans une Clean Architecture, le conteneur est pourtant la pièce qui relie chaque port à son adaptateur. Je voulais qu'il soit aussi simple qu'un objet, et que l'éditeur sache exactement ce qu'il contient.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "On enregistre chaque dépendance avec .add(), et le type du conteneur se déduit de cet historique. Les modules déclarent leurs prérequis, vérifiés à la compilation. Une dépendance circulaire est signalée avec la chaîne complète et une piste de correction. preload() initialise en parallèle dans l'ordre topologique, dispose() libère dans l'ordre inverse. inspect() renvoie le graphe des dépendances en JSON, lisible par un LLM ou un tableau de bord.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Un builder fluide et un Proxy, rien d'autre. Zéro dépendance à l'exécution, environ 5 Ko compressé. Le code est testé avec Vitest, construit avec tsdown et publié sur npm par semantic-release. La bibliothèque tourne sur Node 20.4 et plus, Bun, Deno, Cloudflare Workers et dans le navigateur. Elle livre aussi un llms.txt, pour que les agents IA l'utilisent correctement du premier coup.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 4.0.1 est publiée sur npm depuis le 10 octobre 2026, après quatre versions majeures. Au 14 novembre 2026, npm compte 110 téléchargements sur la dernière semaine, du 7 au 13 novembre. Je l'utilise dans mes propres projets, dont CleanStack et OpenUp. Le dépôt contient aussi des benchmarks et des exemples, pour juger sur pièces avant de l'adopter.",
        ],
      },
    ],
    dateModified: "2026-10-10",
    seoTitle: "inwire : injection de dépendances en TS",
    metaDescription:
      "inwire, ma bibliothèque d'injection de dépendances pour TypeScript : sans décorateurs ni tokens, un builder et un Proxy, types inférés, 5 Ko sans dépendance.",
    featured: true,
  },
  {
    slug: "aggregate-kit",
    name: "aggregate-kit",
    category: "brique",
    status: "Expédié",
    year: "2026",
    visibility: "public",
    tagline:
      "aggregate-kit est un paquet npm de briques Domain-Driven Design pour TypeScript, sans dépendance, pour les bases de code en Clean Architecture.",
    summary:
      "Je copiais les mêmes briques de domaine d'un projet à l'autre. Je les ai extraites dans un seul paquet ESM, testé, que n'importe quelle base Clean Architecture peut importer.",
    posterLines: ["LE DOMAINE", "EN KIT."],
    highlights: ["npm v1.0.0", "0 dépendance", "ESM"],
    stats: [
      { value: "0", label: "dépendance" },
      { value: "v1.0.0", label: "sur npm" },
    ],
    ribbon: [
      "Result",
      "Option",
      "Aggregate",
      "ValueObject",
      "Domain events",
      "npm v1.0.0",
      "0 dépendance",
      "ESM",
      "TypeScript",
      "Node 24",
    ],
    tech: ["TypeScript", "ESM", "Node 24"],
    links: [github("aggregate-kit"), npm("aggregate-kit")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Dans chaque projet en Domain-Driven Design, je réécrivais les mêmes fondations : un type Result pour les erreurs métier, un Option pour l'absence, des entités, des agrégats, des value objects, des événements. Chaque copie dérivait un peu de la précédente, et les corrections d'un projet n'arrivaient jamais dans les autres. Il fallait une seule source, versionnée, que chaque base de code importe au lieu de recopier.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "Les erreurs deviennent des valeurs avec Result<T, E>, l'absence devient un Option<T>. Les agrégats collectent leurs événements de domaine, que pullDomainEvents() remet à une outbox. Les ports de repository et d'unit of work gardent le domaine pur. Avec ScopedRepository, une ressource qui appartient à quelqu'un d'autre se lit comme absente, jamais comme interdite. Les identifiants sont typés et générés en UUID v7.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 1.0.0 est publiée sur npm depuis le 5 juin 2026, en ESM uniquement, pour Node 24 et plus. Au 14 novembre 2026, npm compte 5 téléchargements sur la dernière semaine. Le paquet n'a pas bougé depuis sa sortie : il fait ce pour quoi je l'ai écrit. Ses idées continuent de vivre dans les kits de domaine de mes autres projets.",
        ],
      },
    ],
    dateModified: "2026-06-05",
    seoTitle: "aggregate-kit : briques DDD pour TypeScript",
    metaDescription:
      "aggregate-kit, mon paquet npm de briques DDD pour TypeScript : Result, Option, Entity, Aggregate, ValueObject et événements de domaine, sans aucune dépendance.",
    featured: false,
  },
  {
    slug: "galvorn",
    name: "galvorn",
    category: "brique",
    status: "Expédié",
    year: "2026",
    visibility: "public",
    tagline:
      "galvorn apporte les types Option et Result de Rust à TypeScript, pour remplacer null, undefined et try/catch par des valeurs typées que le compilateur vérifie.",
    summary:
      "Une petite bibliothèque sans dépendance, inspirée de Rust. Elle rend explicites l'absence et l'erreur, et oblige à les traiter avec un match exhaustif.",
    posterLines: ["OPTION ET RESULT", "EN TYPESCRIPT."],
    highlights: ["npm v1.0.5", "112 tests", "0 dépendance"],
    stats: [
      { value: "112", label: "tests" },
      { value: "0", label: "dépendance" },
      { value: "v1.0.5", label: "sur npm" },
    ],
    ribbon: [
      "Option",
      "Result",
      "match",
      "npm v1.0.5",
      "112 tests",
      "0 dépendance",
      "TypeScript",
      "npm",
    ],
    tech: ["TypeScript", "npm"],
    links: [github("galvorn"), npm("galvorn")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "En TypeScript, une valeur absente se cache derrière null ou undefined, et une erreur derrière un throw que rien n'oblige à attraper. Le type ne dit ni ce qui peut manquer, ni ce qui peut échouer. Rust fait l'inverse : Option et Result rendent ces cas visibles, et le compilateur refuse qu'on les oublie. Je voulais ce réflexe dans mon code TypeScript de tous les jours.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "Some et None pour l'absence, Ok et Fail pour l'erreur. map, flatMap et unwrapOr pour enchaîner sans tester chaque ligne. Option.fromNullable convertit une valeur qui arrive d'une API, Result.fromThrowable enveloppe une fonction qui lève une exception, Result.combine réunit plusieurs résultats. Un match autonome traite chaque cas de façon exhaustive : si un cas manque, le code ne compile pas. Le domaine reste lisible, sans null qui traîne.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 1.0.5 est publiée sur npm depuis le 19 février 2026. Le README annonce 112 tests, une couverture complète et zéro dépendance à l'exécution. Au 14 novembre 2026, npm compte 10 téléchargements sur la dernière semaine. Le paquet est volontairement petit et n'a pas besoin de bouger : il fait une seule chose, et la fait jusqu'au bout, sous licence MIT.",
        ],
      },
    ],
    dateModified: "2026-02-19",
    seoTitle: "galvorn : Option et Result en TypeScript",
    metaDescription:
      "galvorn, ma bibliothèque qui apporte Option et Result de Rust à TypeScript : fin de null, undefined et try/catch, match exhaustif, zéro dépendance, 112 tests.",
    featured: false,
  },
  {
    slug: "burnrate",
    name: "burnrate",
    category: "outil-agent",
    status: "En cours",
    year: "2026",
    visibility: "public",
    tagline:
      "burnrate est un plugin Claude Code qui dit à un abonné s'il peut pousser maintenant ou s'il doit ralentir avant la fin de sa fenêtre de quota.",
    summary:
      "Je travaille avec Claude Code tous les jours, sous abonnement. burnrate suit les fenêtres de 5 heures et de 7 jours, projette où j'atterris à la remise à zéro et me donne un budget par jour et par heure.",
    posterLines: ["POUSSER", "OU RALENTIR."],
    highlights: ["v0.5.2", "5 h + 7 jours", "Top 5 projets"],
    stats: [
      { value: "5 h", label: "fenêtre de quota courte" },
      { value: "7 j", label: "fenêtre de quota longue" },
      { value: "5", label: "projets les plus gourmands" },
      { value: "v0.5.2", label: "dernière version" },
    ],
    ribbon: [
      "Quota",
      "Projection",
      "Budget",
      "Claude Code",
      "v0.5.2",
      "5 h + 7 jours",
      "Top 5 projets",
      "TypeScript",
      "Shell",
      "Plugin Claude Code",
      "release-please",
    ],
    tech: ["TypeScript", "Shell", "Plugin Claude Code", "release-please"],
    links: [github("burnrate")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Avec un abonnement Claude Code, le quota se compte sur deux fenêtres : 5 heures et 7 jours. Rien ne dit en cours de journée si le rythme actuel tient jusqu'à la remise à zéro. On découvre la limite quand on la touche, souvent au milieu d'une tâche. Je voulais une réponse simple, visible en permanence : est-ce que je peux y aller franchement, ou est-ce que je dois lever le pied ?",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "La commande /burnrate ouvre un panneau, et une bande d'une ligne au-dessus du prompt donne un verdict, de « go wild » à « tapped out ». La projection à la remise à zéro s'appuie sur les 4 dernières semaines. burnrate affiche un budget par jour et par heure, le coût des 5 projets les plus gourmands sur 7 jours, et prévient par une notification quand une limite est prévue dans les 30 minutes.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Un plugin Claude Code installé depuis sa propre marketplace, écrit en TypeScript avec quelques scripts Shell. Les montants sont estimés en équivalent API et ne comptent que la machine locale : le README le dit clairement, pour que personne ne prenne ces chiffres pour une facture. La bande est cliquable et suggère un modèle plus léger quand le rythme devient trop élevé. Les versions sont publiées par release-please.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 0.5.2 est sortie le 6 novembre 2026, après la 0.5.0 du 19 octobre. Le projet reste en 0.x et chaque version est publiée par release-please avec son changelog. ccwatermelon, ma ligne de statut, est son compagnon : burnrate garde le quota et le coût, ccwatermelon montre le reste de la session. Les deux se complètent sans se marcher dessus.",
        ],
      },
    ],
    dateModified: "2026-11-06",
    seoTitle: "burnrate : projeter son quota Claude Code",
    metaDescription:
      "burnrate, mon plugin Claude Code qui suit les quotas de 5 heures et de 7 jours, projette la remise à zéro et me dit si je peux pousser ou si je dois ralentir.",
    featured: true,
  },
  {
    slug: "ccwatermelon",
    name: "ccwatermelon",
    category: "outil-agent",
    status: "En cours",
    year: "2026",
    visibility: "public",
    tagline:
      "ccwatermelon est une ligne de statut rapide et configurable pour Claude Code, qui montre projet, branche, modèle et remplissage du contexte sans aucun appel réseau.",
    summary:
      "Écorce verte tant qu'il reste de la place, chair rouge quand il n'y en a plus. Je l'ai écrite pour voir d'un coup d'œil où en est une session, sur 1 à 3 lignes, dans les 16 couleurs du terminal.",
    posterLines: ["VERT DEHORS,", "ROUGE DEDANS."],
    highlights: ["v0.4.0", "0 appel réseau", "36 à 100 colonnes"],
    stats: [
      { value: "0", label: "appel réseau" },
      { value: "36 à 100", label: "colonnes lisibles" },
      { value: "v0.4.0", label: "dernière version" },
    ],
    ribbon: [
      "Statusline",
      "Contexte",
      "Git",
      "Bun",
      "v0.4.0",
      "0 appel réseau",
      "36 à 100 colonnes",
      "TypeScript",
      "Zod",
      "Biome",
      "knip",
    ],
    tech: ["TypeScript", "Bun", "Zod", "Biome", "knip"],
    links: [github("ccwatermelon")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Dans une session Claude Code, les informations utiles sont dispersées : le modèle actif, la branche git, l'état de la pull request et surtout le remplissage du contexte avant la compaction. Les lignes de statut que j'essayais étaient lentes, appelaient le réseau à chaque rendu ou cassaient sur un terminal étroit. Je voulais une ligne qui s'affiche instantanément et qui reste lisible dans un panneau partagé.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "ccwatermelon affiche des segments classés par priorité, sur 1 à 3 lignes : humeur, projet, branche, modèle, contexte et session. La jauge de contexte se compare au seuil de compaction, à côté du taux de cache. Côté git : branche, état de la pull request, diff et worktree. L'affichage s'adapte de 100 à 36 colonnes. La configuration se fait en JSONC, par utilisateur ou par projet, avec un éditeur interactif.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Du TypeScript sur Bun, avec Zod pour valider la configuration. Aucun appel réseau sur le chemin du rendu, ce qui garde l'affichage immédiat. Les aperçus du README sont dessinés en SVG par le vrai moteur de rendu, donc ils montrent exactement ce que l'on obtient. Biome, knip, husky et commitlint tiennent la qualité du code à chaque commit, sous licence MIT.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 0.4.0 est sortie le 19 octobre 2026, dix jours après la 0.3.0. Elle s'installe par un clone du dépôt, pas par npm. Elle forme une paire avec burnrate : ccwatermelon montre la session en cours, burnrate s'occupe du quota et du coût. Le dépôt détaille aussi la sécurité, la robustesse et la comparaison avec les autres lignes de statut.",
        ],
      },
    ],
    dateModified: "2026-10-19",
    seoTitle: "ccwatermelon : ligne de statut Claude Code",
    metaDescription:
      "ccwatermelon, ma ligne de statut pour Claude Code : projet, branche, modèle et contexte sur 1 à 3 lignes, sans aucun appel réseau, lisible de 36 à 100 colonnes.",
    featured: false,
  },
  {
    slug: "claude-window",
    name: "claude-window",
    category: "outil-agent",
    status: "En cours",
    year: "2026",
    visibility: "public",
    tagline:
      "claude-window cale la fenêtre de quota de 5 heures de Claude Code sur une heure fixe, pour les abonnés qui veulent des remises à zéro prévisibles.",
    summary:
      "La fenêtre de 5 heures démarre au premier message, donc elle se décale avec l'heure à laquelle je commence. claude-window l'ouvre à l'heure que je choisis, puis l'enchaîne, sans cron.",
    posterLines: ["LA FENÊTRE", "À HEURE FIXE."],
    highlights: ["npm v0.6.1", "1 token", "Raspberry Pi"],
    stats: [
      { value: "5 h", label: "fenêtre calée sur une heure fixe" },
      { value: "1", label: "token par requête" },
      { value: "v0.6.1", label: "sur npm" },
    ],
    ribbon: [
      "Rate limit",
      "5 heures",
      "systemd",
      "Node 22",
      "npm v0.6.1",
      "1 token",
      "Raspberry Pi",
      "TypeScript",
      "Bun",
    ],
    tech: ["TypeScript", "Node 22", "Bun", "systemd"],
    links: [github("claude-window"), npm("claude-window")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "La fenêtre de quota de 5 heures de Claude Code démarre avec le premier message. Son heure de départ dépend donc du moment où l'on commence à travailler, et la remise à zéro tombe rarement au bon moment de la journée. Je voulais des fenêtres prévisibles, alignées sur mes horaires, sans y penser et sans laisser une machine interroger l'API en boucle.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "claude-window envoie une requête d'un seul token et lit l'heure réelle de remise à zéro dans l'en-tête de la réponse. Il dort jusqu'à cette heure, puis recommence, ce qui enchaîne les fenêtres sans cron. La commande schedule règle les jours et les heures, par exemple en semaine de 9 h à 17 h et rien le week-end. install l'enregistre comme service de fond selon le système. Quelques réveils par jour, aucun polling.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Du TypeScript publié sur npm, avec un binaire claude-window. Il faut Node 22 ou plus sur une machine toujours allumée ; le README cite un Raspberry Pi avec systemd. Il consomme environ 85 Mo de mémoire sous Node et 48 Mo sous Bun. Le README est franc sur sa limite : ces en-têtes ne sont pas une API publique documentée et peuvent changer sans prévenir.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 0.6.1 est publiée sur npm depuis le 13 octobre 2026, deux semaines après la 0.6.0. Au 14 novembre 2026, npm compte 35 téléchargements sur la dernière semaine. Il reste en 0.x : tant que ces en-têtes ne sont pas une API garantie, je préfère ne rien promettre de plus. Le code et la documentation sont publics, sous licence MIT.",
        ],
      },
    ],
    dateModified: "2026-10-13",
    seoTitle: "claude-window : la fenêtre à heure fixe",
    metaDescription:
      "claude-window, mon outil npm qui cale la fenêtre de 5 heures de Claude Code sur une heure fixe : une requête d'un token, puis des fenêtres enchaînées sans cron.",
    featured: false,
  },
  {
    slug: "cockpit",
    name: "Cockpit",
    category: "outil-agent",
    status: "Expédié",
    year: "2026",
    visibility: "public",
    tagline:
      "Cockpit est un plugin Claude Code qui permet au propriétaire non développeur d'une app hébergée sur Railway de gérer les outils autour de son produit en parlant à Claude.",
    summary:
      "Il s'adresse à quelqu'un qui a une application en ligne mais pas d'équipe technique. Cockpit installe les outils autour du produit, surveille la santé et les coûts, et demande avant chaque étape risquée.",
    posterLines: ["RAILWAY", "EN CONVERSATION."],
    highlights: ["v2.1.1", "Metabase + n8n", "Uptime Kuma"],
    ribbon: [
      "Railway",
      "Metabase",
      "n8n",
      "Uptime Kuma",
      "v2.1.1",
      "Metabase + n8n",
      "Plugin Claude Code",
      "Python",
      "JavaScript",
      "Shell",
    ],
    tech: ["Plugin Claude Code", "Python", "JavaScript", "Shell", "Railway"],
    links: [github("cockpit")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Beaucoup de fondateurs ont une application en ligne sans développeur à côté. Dès qu'il faut ajouter un tableau de bord, une automatisation ou une alerte quand le site tombe, ils sont bloqués. Les outils existent et Railway peut les héberger, mais l'installation et la surveillance demandent un savoir technique. Je voulais que la conversation avec Claude suffise, sans que la personne ait à comprendre l'infrastructure.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "Cockpit ajoute Metabase pour les tableaux de bord, n8n pour les automatisations et Uptime Kuma pour la surveillance, sur le compte Railway de la personne. Il prépare les petites modifications à l'écart de l'application en ligne. Il suit la santé, les erreurs, les coûts et les sauvegardes, et garde le contexte métier dans un dossier local. Avant une étape risquée, il demande, sauvegarde d'abord et permet d'annuler.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Un plugin Claude Code fait de skills, de hooks et de commandes : onboard, status, undo, repair, review-session et report. Il a ses propres evals et tests, joués avec claude plugin eval, pour vérifier que Claude suit les règles de prudence. Il demande un Mac, Claude Desktop avec un abonnement payant, un compte Railway et un compte GitHub. Le dépôt est public.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "La version 2.1.1 est publiée sur GitHub depuis le 9 octobre 2026. Un site de présentation en français et en anglais est prêt dans un dépôt séparé, pas encore en ligne. Le plugin s'installe en collant un message dans Claude Code, sur le Mac de la personne qui va s'en servir. Ensuite, la commande onboard lance la prise en main, et status donne l'état du produit à tout moment.",
        ],
      },
    ],
    dateModified: "2026-10-09",
    seoTitle: "Cockpit : Railway piloté depuis Claude Code",
    metaDescription:
      "Cockpit, mon plugin Claude Code pour fondateurs sans équipe technique : Metabase, n8n et Uptime Kuma sur Railway, santé, coûts et sauvegardes, en conversation.",
    featured: false,
  },
  {
    slug: "vinted-ai-assistant",
    name: "Vinted AI Assistant",
    category: "extension",
    status: "Expédié",
    year: "2026",
    visibility: "public",
    tagline:
      "Vinted AI Assistant est une extension Chrome qui analyse une annonce Vinted avec l'IA pendant qu'on la consulte, pour savoir si l'affaire est bonne avant d'acheter.",
    summary:
      "Sur une annonce, l'extension donne un score d'opportunité, estime le prix du marché et propose des messages de négociation. Elle tourne avec un backend local et une clé API Gemini gratuite.",
    posterLines: ["LA BONNE AFFAIRE", "OU PAS."],
    highlights: ["4 étoiles", "Score 1 à 10", "Backend local"],
    stats: [
      { value: "4", label: "étoiles sur GitHub" },
      { value: "1 à 10", label: "score d'opportunité" },
    ],
    ribbon: [
      "Chrome",
      "Gemini",
      "Négociation",
      "Prix du marché",
      "4 étoiles",
      "Score 1 à 10",
      "Backend local",
      "TypeScript",
      "React 19",
      "Vite",
      "Tailwind",
      "Zustand",
      "Bun",
      "Hono",
      "Drizzle",
      "SQLite",
      "OpenAI",
      "Turborepo",
    ],
    tech: [
      "TypeScript",
      "React 19",
      "Vite",
      "Tailwind",
      "Zustand",
      "Bun",
      "Hono",
      "Drizzle",
      "SQLite",
      "Gemini",
      "OpenAI",
      "Turborepo",
    ],
    links: [github("vinted-ai-assistant")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Sur Vinted, savoir si une annonce vaut le coup demande du temps : comparer les prix ailleurs, vérifier l'authenticité sur les photos, trouver le bon ton pour négocier. Les revendeurs le font des dizaines de fois par jour, onglet après onglet. Je voulais que cette analyse arrive directement sur la page de l'annonce, en quelques secondes, sans quitter Vinted ni copier le lien ailleurs.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "L'extension attribue un score d'opportunité de 1 à 10. Elle estime le prix du marché à partir de 8 à 10 sources trouvées par une recherche Google. Elle propose trois scripts de négociation, amical, direct ou pressé, des conseils de revente, une vérification d'authenticité et une analyse des photos. Tout s'affiche sur l'annonce, à côté de ce que l'on regarde déjà.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "Deux parties dans un monorepo pnpm et Turborepo. L'extension Chrome, en React 19, Vite, Tailwind et Zustand, affiche l'analyse sur la page. Un backend local en Bun, Hono, Drizzle et SQLite, organisé en Clean Architecture. L'IA passe par Google Gemini, avec l'ancrage sur la recherche Google, ou par OpenAI. Des installeurs en un clic existent pour Windows, macOS et Linux, sous licence AGPL-3.0.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "Le dépôt public compte 4 étoiles au 14 novembre 2026. La dernière version publiée date du 20 janvier 2026, et le dépôt a encore bougé le 27 octobre 2026. L'extension n'est pas sur le Chrome Web Store : elle s'installe à la main, avec une clé Gemini gratuite et le backend local lancé sur sa machine. Les données d'analyse restent dans une base SQLite locale.",
        ],
      },
    ],
    dateModified: "2026-10-27",
    seoTitle: "Vinted AI Assistant : extension Chrome",
    metaDescription:
      "Vinted AI Assistant, mon extension Chrome qui analyse une annonce Vinted avec l'IA : score d'opportunité, prix du marché, négociation et authenticité.",
    featured: false,
  },
  {
    slug: "nixos-forge",
    name: "nixos-forge",
    category: "chantier",
    status: "En chantier",
    year: "2026",
    visibility: "public",
    tagline:
      "nixos-forge est une base NixOS à forker pour fabriquer sa propre distribution : chaque machine tient dans un fichier, et la CI la construit et la démarre avant qu'elle n'arrive.",
    summary:
      "Pas une distribution, la forge où l'on fabrique la sienne, un peu comme kickstart.nvim pour tout un système. C'est aussi mon chantier d'apprentissage : la configuration est en Nix, le CLI en Rust, que j'apprends.",
    posterLines: ["PAS UNE DISTRO.", "LA FORGE."],
    highlights: ["v0.2.5", "LUKS2 + btrfs", "Hyprland"],
    ribbon: [
      "NixOS",
      "Flake",
      "Impermanence",
      "Secure boot",
      "Rust en apprentissage",
      "v0.2.5",
      "LUKS2 + btrfs",
      "Hyprland",
      "Nix",
      "flake-parts",
      "home-manager",
      "disko",
      "QEMU",
      "GitHub Actions",
    ],
    tech: [
      "Nix",
      "flake-parts",
      "home-manager",
      "disko",
      "Hyprland",
      "Rust",
      "QEMU",
      "GitHub Actions",
    ],
    links: [github("nixos-forge")],
    sections: [
      {
        title: "Le problème",
        paragraphs: [
          "Installer NixOS proprement, c'est assembler beaucoup de pièces : partitionnement chiffré, home-manager, secure boot, profils par machine. Chaque erreur se découvre au redémarrage, souvent sur la vraie machine, quand il est trop tard. Je voulais une base que l'on forke, où une machine se décrit en un fichier, et où rien n'arrive sur un disque sans avoir été construit et démarré avant.",
        ],
      },
      {
        title: "Ce que ça fait",
        paragraphs: [
          "Chaque machine a son fichier dans un registre. La CI construit chaque hôte, le démarre dans une VM et, pour ceux qui déclarent un disque, l'installe sur un disque vierge chiffré. Le système utilise disko, LUKS2 et btrfs, avec une racine effacée à chaque démarrage. Le secure boot avec TPM2 est optionnel. Des profils existent pour bureau, portable, serveur et Raspberry Pi 4 et 5, avec Hyprland et une ISO d'installation par hôte.",
        ],
      },
      {
        title: "Comment c'est construit",
        paragraphs: [
          "La configuration est en Nix avec flake-parts, selon une règle simple : un fichier, un module. Un assistant nix run .#init guide la première installation, et le flake.lock se met à jour chaque semaine. Le CLI forge, avec ses commandes doctor et update, est écrit en Rust. Rust est un langage que j'apprends : ce CLI est volontairement petit, c'est mon terrain d'entraînement.",
        ],
      },
      {
        title: "Où ça en est",
        paragraphs: [
          "C'est un chantier assumé. Le projet est en 0.x et chaque version est une pré-release ; la dernière est la 0.2.5, du 28 octobre 2026. Les options, les noms et les commandes peuvent encore changer, et le README le dit en tête de page. La feuille de route du dépôt liste les lots livrés et ceux qui restent à faire.",
        ],
      },
    ],
    dateModified: "2026-11-13",
    seoTitle: "nixos-forge : la forge NixOS à forker",
    metaDescription:
      "nixos-forge, mon chantier NixOS : une machine par fichier, construite, démarrée en VM et installée sur disque chiffré par la CI. CLI en Rust, que j'apprends.",
    featured: false,
  },
];

export const BUILDS_COUNT = PROJECTS.length + 1;

export const PUBLIC_BUILDS_COUNT = PROJECTS.filter(
  ({ visibility }) => visibility === "public",
).length;

export const PRIVATE_BUILDS_COUNT = PROJECTS.filter(
  ({ visibility }) => visibility === "private",
).length;

export const getProjectBySlug = (slug: string) =>
  PROJECTS.find((project) => project.slug === slug);

export const getProjectMeta = (project: Project) =>
  [
    PROJECT_CATEGORY_LABELS[project.category],
    `${project.status} ${project.year}`,
    project.visibility === "private" ? "Dépôt privé" : undefined,
  ]
    .filter(Boolean)
    .join(" / ");
