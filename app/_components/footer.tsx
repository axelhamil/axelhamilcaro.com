import { Github, Linkedin, Mail, Calendar, Heart, Coffee } from "lucide-react";
import TransitionLink from "./transition-link";
import { Paragraphe } from "./ui/paragraphe";

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
  {
    name: "Email",
    href: "mailto:contact@axelhamilcaro.com",
    icon: Mail,
  },
  {
    name: "Calendly",
    href: "https://calendly.com/axel-hamilcaro-pro/appel-decouverte",
    icon: Calendar,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-secondary/20 mt-16 sm:mt-20 md:mt-24">
      <div className="container mx-auto py-10 sm:py-12 md:py-16">
        {/* Main footer content */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left: Brand & tagline */}
          <div className="flex flex-col gap-3">
            <div className="font-mono text-xl sm:text-2xl font-bold text-primary-foreground">
              axel_hamilcaro()
            </div>
            <Paragraphe variant="secondary" size="sm" className="max-w-xs">
              Développeur Full-Stack passionné par la création de produits web
              qui font la différence.
            </Paragraphe>
          </div>

          {/* Center: Quick links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Navigation
            </span>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              <TransitionLink
                href="/"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Accueil
              </TransitionLink>
              <TransitionLink
                href="/tree"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Liens
              </TransitionLink>
              <a
                href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-accent transition-colors"
              >
                Rendez-vous
              </a>
            </nav>
          </div>

          {/* Right: Social links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary/60">
              Me retrouver
            </span>
            <div className="flex items-center gap-3">
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

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent my-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Copyright */}
          <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
            &copy; {currentYear} Axel Hamilcaro. Tous droits réservés.
          </Paragraphe>

          {/* Fun message */}
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

          {/* Location */}
          <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
            Paris, France
          </Paragraphe>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
