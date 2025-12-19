import { Calendar, Coffee, Github, Heart, Linkedin, Mail } from "lucide-react";
import TransitionLink from "../navigation/transition-link";
import { Paragraphe } from "../../ui/paragraphe";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/axelhamil",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/axelhamilcaro/",
    icon: Linkedin,
  },
] as const;

const primaryCtas = [
  {
    name: "Email",
    href: "mailto:contact@axelhamilcaro.com",
    icon: Mail,
    hint: "Réponse rapide",
  },
  {
    name: "Calendly",
    href: "https://calendly.com/axel-hamilcaro-pro/appel-decouverte",
    icon: Calendar,
    hint: "15–20 min",
  },
] as const;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-secondary/20 mt-16 sm:mt-20 md:mt-24">
      <div className="container mx-auto py-10 sm:py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Signature */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xl sm:text-2xl font-bold text-primary-foreground">
              axel_hamilcaro()
            </div>

            <Paragraphe variant="secondary" size="sm" className="max-w-sm">
              Je conçois et développe des produits web premium, avec une
              architecture lisible, une UI soignée, et une prod pilotable.
            </Paragraphe>

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

          {/* Start here */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Start here
            </span>
            <nav className="flex flex-col gap-2">
              <TransitionLink
                href="/#services"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Services
              </TransitionLink>
              <TransitionLink
                href="/#approach"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Approche
              </TransitionLink>
              <TransitionLink
                href="/tree"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Liens
              </TransitionLink>
            </nav>
          </div>

          {/* Contact direct */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Contact direct
            </span>

            <div className="flex flex-col gap-2">
              {primaryCtas.map((cta) => (
                <a
                  key={cta.name}
                  href={cta.href}
                  target={cta.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    cta.href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3 bg-secondary-background/30 border border-secondary/20 hover:border-accent/40 hover:bg-secondary-background/50 transition-all duration-300"
                >
                  <span className="flex items-center gap-2 text-sm text-primary group-hover:text-accent transition-colors">
                    <cta.icon className="w-4 h-4" />
                    {cta.name}
                  </span>
                  <span className="text-xs text-secondary">{cta.hint}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
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
          <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
            &copy; {currentYear} Axel Hamilcaro. Tous droits réservés.
          </Paragraphe>

          <Paragraphe
            variant="muted"
            size="sm"
            className="text-xs sm:text-sm flex items-center gap-1.5"
          >
            Fait avec{" "}
            <Heart className="w-3.5 h-3.5 text-accent-peach animate-pulse" />,{" "}
            <Coffee className="w-3.5 h-3.5 text-accent-peach" /> et beaucoup de{" "}
            <span className="font-mono text-accent-blue">TypeScript</span>
          </Paragraphe>

          <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
            Paris, France
          </Paragraphe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
