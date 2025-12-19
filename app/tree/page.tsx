import {
  Briefcase,
  Calendar,
  Coffee,
  Github,
  Globe,
  Linkedin,
  type LucideIcon,
  Mail,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Heading1 } from "../_components/ui/heading1";
import { LinkCard } from "../_components/ui/link-card";
import { Paragraphe } from "../_components/ui/paragraphe";

export const metadata: Metadata = {
  title: "Liens",
  description:
    "Retrouvez tous mes liens professionnels : GitHub, LinkedIn, Malt, et prenez rendez-vous.",
  openGraph: {
    title: "Liens | Axel Hamilcaro",
    description:
      "Retrouvez tous mes liens professionnels : GitHub, LinkedIn, Malt, et prenez rendez-vous.",
    url: "https://axelhamilcaro.com/tree",
  },
  twitter: {
    title: "Liens | Axel Hamilcaro",
    description:
      "Retrouvez tous mes liens professionnels : GitHub, LinkedIn, Malt, et prenez rendez-vous.",
  },
  alternates: {
    canonical: "https://axelhamilcaro.com/tree",
  },
};

interface ILink {
  title: string;
  url: string;
  icon: LucideIcon;
  description?: string;
  featured?: boolean;
}

const links: ILink[] = [
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
    url: "https://axelhamilcaro.com",
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

export default function TreePage() {
  return (
    <main className="min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-100px)] flex flex-col items-center py-6 sm:py-10 md:py-16">
      <div className="w-full max-w-sm sm:max-w-md flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-col items-center gap-3 sm:gap-4 animate-fade-in">
          <div className="relative group">
            <div className="absolute -inset-1 sm:-inset-1.5 rounded-full bg-gradient-to-r from-accent-mauve via-accent-blue to-accent-teal opacity-50 blur-md group-hover:opacity-75 group-hover:blur-lg transition-all duration-500" />

            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-secondary-background border-2 border-secondary/30 overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/profil_pp.jpeg"
                alt="Axel Hamilcaro"
                width={96}
                height={96}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            <div className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 text-lg sm:text-xl animate-bounce">
              <span role="img" aria-label="wave">
                <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-accent-peach" />
              </span>
            </div>
          </div>

          <div className="text-center">
            <Heading1
              size="lg"
              className="font-mono text-2xl sm:text-3xl md:text-4xl"
            >
              Axel Hamilcaro
            </Heading1>
            <Paragraphe
              variant="secondary"
              className="mt-1 text-sm sm:text-base"
            >
              Full-Stack Developer · TypeScript
            </Paragraphe>

            <div className="inline-flex items-center gap-1.5 sm:gap-2 mt-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-accent-teal/10 border border-accent-teal/30">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-accent-teal" />
              </span>
              <span className="text-xs sm:text-sm font-medium text-accent-teal">
                Disponible
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-2 text-secondary/70 animate-fade-in"
          style={{ animationDelay: "150ms" }}
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-mauve" />
          <span className="text-xs sm:text-sm italic">
            Building products, not just features
          </span>
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent-mauve" />
        </div>

        <nav
          className="w-full flex flex-col gap-2.5 sm:gap-3"
          aria-label="Liens sociaux"
        >
          {links.map((link, index) => (
            <div
              key={link.url}
              className="animate-fade-in-up"
              style={{
                animationDelay: `${(index + 2) * 80}ms`,
                animationFillMode: "both",
              }}
            >
              <LinkCard
                href={link.url}
                icon={<link.icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                title={link.title}
                description={link.description}
                variant={link.featured ? "featured" : "default"}
              />
            </div>
          ))}
        </nav>

        <footer
          className="mt-2 sm:mt-4 text-center animate-fade-in flex flex-col gap-2"
          style={{ animationDelay: "800ms" }}
        >
          <Paragraphe variant="muted" size="sm" className="text-xs sm:text-sm">
            Made with{" "}
            <span className="inline-block animate-pulse text-accent-peach">
              &hearts;
            </span>{" "}
            & lots of{" "}
            <Coffee className="inline-block w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent-peach" />
          </Paragraphe>
          <Paragraphe
            variant="muted"
            size="sm"
            className="opacity-60 text-xs sm:text-sm"
          >
            &copy; {new Date().getFullYear()} Axel Hamilcaro
          </Paragraphe>
        </footer>
      </div>
    </main>
  );
}
