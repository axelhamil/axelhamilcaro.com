import {
  Briefcase,
  Calendar,
  Github,
  Globe,
  Linkedin,
  type LucideIcon,
  Mail,
} from "lucide-react";
import { CONTACT, EXTERNAL_LINKS } from "./site.constants";

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
    url: EXTERNAL_LINKS.calendly,
    icon: Calendar,
    description: "30 min pour discuter de votre projet",
    featured: true,
  },
  {
    title: "GitHub",
    url: EXTERNAL_LINKS.github,
    icon: Github,
    description: "Mes projets open source",
  },
  {
    title: "LinkedIn",
    url: EXTERNAL_LINKS.linkedin,
    icon: Linkedin,
    description: "Mon profil professionnel",
  },
  {
    title: "Malt",
    url: EXTERNAL_LINKS.malt,
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
    url: CONTACT.mailto,
    icon: Mail,
    description: CONTACT.email,
  },
];
