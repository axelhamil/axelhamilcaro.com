import { Briefcase, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { AUTHOR, EXTERNAL_LINKS } from "@/app/_config/site.constants";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const PROFILE_LINKS = [
  { href: EXTERNAL_LINKS.malt, label: "Malt", Icon: Briefcase },
  { href: EXTERNAL_LINKS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: EXTERNAL_LINKS.github, label: "GitHub", Icon: Github },
] as const;

interface BlogAuthorBioProps {
  label?: string;
}

export function BlogAuthorBio({
  label = "À propos de l'auteur",
}: BlogAuthorBioProps) {
  return (
    <aside
      className="auteur etiquette etiquette-carte etiquette-gris gap-6 sm:flex-row"
      aria-label={label}
    >
      <TransitionLink
        href="/about"
        aria-label={`À propos d'${AUTHOR.name}`}
        className="auteur-photo shrink-0 self-start"
      >
        <Image
          src={AUTHOR.imagePath}
          alt={AUTHOR.name}
          width={96}
          height={96}
          className="block w-20 h-20 sm:w-24 sm:h-24 object-cover"
        />
      </TransitionLink>

      <div className="flex flex-col gap-3 min-w-0">
        <p className="surtitre">{label}</p>
        <TransitionLink
          href="/about"
          rel="author"
          className="auteur-nom heading-display w-fit"
        >
          {AUTHOR.name}
        </TransitionLink>
        <p className="auteur-texte">
          Je suis Axel Hamilcaro, développeur fullstack et builder, basé à
          Tours, en Centre-Val de Loire, en remote sur toute la France. Je
          construis les API et les outils de fondation sur lesquels d'autres
          bâtissent leurs produits. J'ai passé 4 ans chez Civitime, de
          développeur à lead technique, je suis à mon compte depuis fin 2024
          avec 20+ projets livrés, et je prends des projets en freelance.
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-1">
          {PROFILE_LINKS.map(({ href, label: linkLabel, Icon }) => (
            <li key={linkLabel}>
              <a
                href={href}
                target="_blank"
                rel="me noopener noreferrer"
                className="auteur-lien link-underline inline-flex items-center gap-2"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
