import {
  Briefcase,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Music2,
} from "lucide-react";
import { EXTERNAL_LINKS, SOCIAL_LINKS } from "@/app/_config/site.constants";
import { ContactModal } from "@/src/shared/ui/contact/contact-modal";
import { RedditLogo } from "@/src/shared/ui/icons/reddit-logo";
import { XLogo } from "@/src/shared/ui/icons/x-logo";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const socialLinks = [
  {
    name: "GitHub",
    href: EXTERNAL_LINKS.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: EXTERNAL_LINKS.linkedin,
    icon: Linkedin,
  },
  {
    name: "X",
    href: SOCIAL_LINKS.x,
    icon: XLogo,
  },
  {
    name: "Reddit",
    href: SOCIAL_LINKS.reddit,
    icon: RedditLogo,
  },
  {
    name: "Malt",
    href: EXTERNAL_LINKS.malt,
    icon: Briefcase,
  },
  {
    name: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: SOCIAL_LINKS.tiktok,
    icon: Music2,
  },
] as const;

const FOOTER_TAGS = [
  "axelhamilcaro.com",
  "Fait à Tours",
  "Next.js 16",
  "React 19",
  "Tailwind CSS v4",
  "Server Components",
  "Animations en CSS",
  "Serveur MCP public",
  "llms.txt",
  "IndexNow",
  "Vercel",
  "Neon PostgreSQL",
  "Thème clair et sombre",
] as const;

const SITE_LINKS = [
  { href: "/about", label: "À propos" },
  { href: "/#portfolio", label: "Produits" },
  { href: "/blog", label: "Blog" },
  { href: "/tree", label: "Liens" },
] as const;

const SERVICE_LINKS = [
  {
    href: "/services/developpeur-nextjs-freelance",
    label: "Développement web sur mesure",
  },
  { href: "/services/developpement-saas", label: "Développement SaaS" },
  { href: "/services/lead-tech-fractional", label: "Lead tech fractional" },
  {
    href: "/services/creation-application-web",
    label: "Création d'application web de A à Z",
  },
  { href: "/tma", label: "TMA au mois" },
  { href: "/services", label: "Travailler avec moi" },
] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer relative z-10 mt-16 sm:mt-20 md:mt-24">
      <Ribbon items={FOOTER_TAGS} hachures />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-12 md:py-16 flex flex-col gap-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div className="flex flex-col gap-4">
            <p className="brand">axel_hamilcaro()</p>

            <Paragraph variant="secondary" size="sm" className="max-w-sm">
              Je développe mes propres produits et des applications web pour des
              clients, de l'API à l'interface, et je les maintiens en
              production.
            </Paragraph>

            <ul className="flex flex-wrap gap-3 pt-1">
              {FOOTER_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="etiquette etiquette-sm etiquette-gris label-mono"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="surtitre">Par ici</span>
            <nav className="flex flex-col" aria-label="Plan du site">
              {SITE_LINKS.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </TransitionLink>
              ))}
              <a href="/sitemap.xml" className="footer-link footer-meta">
                Sitemap
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="surtitre">Services</span>
            <nav className="flex flex-col" aria-label="Services">
              {SERVICE_LINKS.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="footer-link"
                >
                  {link.label}
                </TransitionLink>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-4">
            <span className="surtitre">Contact direct</span>

            <ContactModal>
              <Button
                type="button"
                className="w-full flex-col items-start text-left"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Me contacter
                </span>
                <span className="btn-note">Réponse sous 1h en journée</span>
              </Button>
            </ContactModal>

            <div className="grid grid-cols-4 w-fit gap-1.5 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="icon-link"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-separateur pt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <p className="footer-meta">
            &copy; {currentYear}
            {" Axel Hamilcaro · "}
            <TransitionLink href="/mentions-legales" className="footer-link">
              Mentions légales
            </TransitionLink>
          </p>

          <p className="footer-meta">
            Je code ce site moi-même, en{" "}
            <span className="stat-valeur marqueur">TypeScript</span>
          </p>

          <p className="footer-meta">
            Tours, Centre-Val de Loire, remote France
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
