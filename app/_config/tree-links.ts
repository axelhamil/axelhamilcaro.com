import {
  Briefcase,
  Calendar,
  Github,
  Globe,
  Linkedin,
  type LucideIcon,
  Mail,
} from "lucide-react";

export interface ILink {
  title: string;
  url: string;
  icon: LucideIcon;
  description?: string;
  featured?: boolean;
}

export const treeLinks: ILink[] = [
  {
    title: "Prendre rendez-vous",
    url: "https://calendly.com/axel-hamilcaro-pro/appel-decouverte",
    icon: Calendar,
    description: "30 min pour discuter de votre projet",
    featured: true,
  },
  {
    title: "GitHub",
    url: "https://github.com/axelhamil",
    icon: Github,
    description: "Mes projets open source",
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/axelhamilcaro/",
    icon: Linkedin,
    description: "Mon profil professionnel",
  },
  {
    title: "Malt",
    url: "https://www.malt.fr/profile/axelhamilcaro",
    icon: Briefcase,
    description: "Mon profil freelance",
  },
  {
    title: "Portfolio",
    url: "/",
    icon: Globe,
    description: "Mon site personnel",
  },
  {
    title: "Email",
    url: "mailto:contact@axelhamilcaro.com",
    icon: Mail,
    description: "contact@axelhamilcaro.com",
  },
];
