import type { Form, FormTemplate } from "@/drizzle/schema";

export type BackgroundType = "color" | "gradient" | "image";
export type GradientMode = "visual" | "css";
export type BadgeStyle = "filled" | "outline";

export interface FormData {
  slug: string;
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage: string;
  cardImage: string;
  badgeText: string;
  badgeColor: string;
  badgeStyle: BadgeStyle;
  title: string;
  description: string;
  buttonText: string;
  buttonSubtext: string;
  isActive: boolean;
  emailSubject: string;
  emailBody: string;
}

export interface GradientConfig {
  color1: string;
  color2: string;
  direction: string;
}

export interface FormEditorProps {
  form?: Form;
  templates?: FormTemplate[];
}

export const defaultFormData: FormData = {
  slug: "",
  backgroundType: "color",
  backgroundColor: "#fafafa",
  backgroundGradient: "linear-gradient(135deg, #ff4d00 0%, #ff6b35 100%)",
  backgroundImage: "",
  cardImage: "",
  badgeText: "",
  badgeColor: "#ff4d00",
  badgeStyle: "filled",
  title: "",
  description: "",
  buttonText: "Envoyer",
  buttonSubtext: "",
  isActive: true,
  emailSubject: "Voici ta ressource !",
  emailBody:
    "Merci pour ton inscription !\n\nTu peux maintenant accéder à ta ressource via ce lien :\nhttps://...",
};

export const gradientDirections = [
  { value: "to right", label: "→ Droite" },
  { value: "to left", label: "← Gauche" },
  { value: "to bottom", label: "↓ Bas" },
  { value: "to top", label: "↑ Haut" },
  { value: "135deg", label: "↘ Diagonal" },
  { value: "45deg", label: "↗ Diagonal inverse" },
  { value: "to bottom right", label: "↘ Coin" },
  { value: "to bottom left", label: "↙ Coin inverse" },
];
