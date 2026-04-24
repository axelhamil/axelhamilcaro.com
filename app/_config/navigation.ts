import { EXTERNAL_LINKS } from "./site.constants";

export const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "À propos" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#stack", label: "Stack" },
  { href: "/tree", label: "Liens" },
] as const;

export const DESKTOP_SECTIONS = [
  "parcours",
  "services",
  "portfolio",
  "stack",
] as const;

export const CALENDLY_URL = EXTERNAL_LINKS.calendly;
