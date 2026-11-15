export interface ParcoursRepere {
  label: string;
  iso: string;
}

export interface ParcoursEtape {
  organisation: string;
  role: string;
  contrat?: string;
  debut: ParcoursRepere;
  fin?: ParcoursRepere;
  periode: string;
  enCours: boolean;
}

export const PARCOURS = {
  formation: {
    organisation: "Wild Code School",
    role: "Concepteur Développeur d'applications Web & Mobile",
    debut: { label: "2020", iso: "2020" },
    periode: "2020",
    enCours: false,
  },
  civitime: {
    organisation: "Civitime",
    role: "De développeur à lead technique",
    contrat: "CDI",
    debut: { label: "janvier 2021", iso: "2021-01" },
    fin: { label: "décembre 2024", iso: "2024-12" },
    periode: "Janv. 2021 à déc. 2024",
    enCours: false,
  },
  compte: {
    organisation: "À mon compte",
    role: "Développeur fullstack",
    contrat: "Freelance",
    debut: { label: "fin 2024", iso: "2024" },
    periode: "Fin 2024 à auj.",
    enCours: true,
  },
  builds: {
    organisation: "Mes builds",
    role: "Builder, en open source et en produit",
    debut: { label: "février 2025", iso: "2025-02" },
    periode: "Févr. 2025 à auj.",
    enCours: true,
  },
  openup: {
    organisation: "OpenUp",
    role: "Fondateur technique",
    debut: { label: "2026", iso: "2026" },
    periode: "2026 à auj.",
    enCours: true,
  },
  eskimoz: {
    organisation: "Eskimoz",
    role: "Développeur fullstack",
    contrat: "CDI",
    debut: { label: "septembre 2026", iso: "2026-09" },
    periode: "Sept. 2026 à auj.",
    enCours: true,
  },
} as const satisfies Record<string, ParcoursEtape>;
