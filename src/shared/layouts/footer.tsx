import {
  Briefcase,
  Coffee,
  Github,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  Music2,
} from "lucide-react";
import { EXTERNAL_LINKS, SOCIAL_LINKS } from "@/app/_config/site.constants";
import { ContactModal } from "@/src/features/contact/components/contact-modal";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-secondary/20 mt-16 sm:mt-20 md:mt-24">
      <div className="container mx-auto py-10 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xl sm:text-2xl font-bold text-primary-foreground">
              axel_hamilcaro()
            </div>

            <Paragraph variant="secondary" size="sm" className="max-w-sm">
              Je conçois et développe des produits web premium, avec une
              architecture lisible, une UI soignée, et une prod pilotable.
            </Paragraph>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs px-2.5 py-1 rounded-full border border-secondary/20 bg-secondary-background/20 text-secondary">
                Produit
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-secondary/20 bg-secondary-background/20 text-secondary">
                Clean Architecture
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full border border-secondary/20 bg-secondary-background/20 text-secondary">
                Performance
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Par ici
            </span>
            <nav className="flex flex-col gap-2">
              <TransitionLink
                href="/about"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                À propos
              </TransitionLink>
              <TransitionLink
                href="/#portfolio"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Portfolio
              </TransitionLink>
              <TransitionLink
                href="/blog"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Blog
              </TransitionLink>
              <TransitionLink
                href="/tree"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Liens
              </TransitionLink>
              <a
                href="/sitemap.xml"
                className="text-xs text-secondary/70 hover:text-accent transition-colors mt-1"
              >
                Sitemap
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Services
            </span>
            <nav className="flex flex-col gap-2">
              <TransitionLink
                href="/services/developpeur-nextjs-freelance"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Développeur Next.js
              </TransitionLink>
              <TransitionLink
                href="/services/developpement-saas"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Développement SaaS
              </TransitionLink>
              <TransitionLink
                href="/services/lead-tech-fractional"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Lead tech fractional
              </TransitionLink>
              <TransitionLink
                href="/services"
                className="text-sm text-secondary hover:text-accent transition-colors"
              >
                Tous les services →
              </TransitionLink>
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Contact direct
            </span>

            <div className="flex flex-col gap-2">
              <ContactModal>
                <button
                  type="button"
                  className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 bg-accent text-white hover:bg-accent-hover hover:shadow-lg transition-all duration-300 text-left cursor-pointer"
                >
                  <span className="flex items-center gap-2 text-sm font-semibold">
                    <Mail className="w-4 h-4" />
                    Me contacter
                  </span>
                  <span className="text-xs text-white/80">
                    Réponse sous 1h en journée
                  </span>
                </button>
              </ContactModal>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="p-2 rounded-lg bg-secondary-background/30 border border-secondary/20 text-primary hover:text-accent hover:border-accent/40 hover:bg-secondary-background/50 transition-all duration-300 hover:scale-110"
                >
                  <link.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent my-8" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Paragraph variant="muted" size="sm" className="text-xs sm:text-sm">
            &copy; {currentYear} Axel Hamilcaro. Tous droits réservés.
          </Paragraph>

          <Paragraph
            variant="muted"
            size="sm"
            className="text-xs sm:text-sm flex items-center gap-1.5"
          >
            Fait avec{" "}
            <Heart className="w-3.5 h-3.5 text-accent animate-pulse" />,{" "}
            <Coffee className="w-3.5 h-3.5 text-accent" /> et beaucoup de{" "}
            <span className="font-mono text-accent">TypeScript</span>
          </Paragraph>

          <Paragraph variant="muted" size="sm" className="text-xs sm:text-sm">
            Touraine, remote France
          </Paragraph>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
