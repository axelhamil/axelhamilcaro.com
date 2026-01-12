import type { Form, FormTemplate } from "@/app/_lib/db/schema";

export type BackgroundType = "color" | "gradient" | "image";
export type GradientMode = "visual" | "css";

export interface FormData {
  slug: string;
  backgroundType: BackgroundType;
  backgroundColor: string;
  backgroundGradient: string;
  backgroundImage: string;
  cardImage: string;
  badgeText: string;
  badgeColor: string;
  title: string;
  description: string;
  buttonText: string;
  isActive: boolean;
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
  title: "",
  description: "",
  buttonText: "Envoyer",
  isActive: true,
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
