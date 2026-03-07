import { EXTERNAL_LINKS } from "./site.constants";

export const NAV_LINKS = [
  { href: "/#parcours", label: "Parcours" },
  { href: "/#services", label: "Services" },
  { href: "/#projets", label: "Portfolio" },
  { href: "/#stack", label: "Stack" },
  { href: "/tree", label: "Liens" },
] as const;

export const DESKTOP_SECTIONS = [
  "parcours",
  "services",
  "projets",
  "stack",
] as const;

export const CALENDLY_URL = EXTERNAL_LINKS.calendly;
