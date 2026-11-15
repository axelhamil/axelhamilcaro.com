import Image from "next/image";
import { PUBLIC_BUILDS_COUNT } from "@/app/_config/projects";
import { getFreelanceYears, THESIS } from "@/app/_config/site.constants";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const ABOUT_RIBBON = [
  "Développeur fullstack",
  "Builder",
  "Wild Code School 2020",
  "Concepteur Développeur",
  "Civitime 2021 à 2024",
  "De dev à lead tech",
  "EdTech B Corp",
  "Event sourcing",
  "Freelance depuis 2024",
  "Eskimoz depuis 2026",
  "Fondateur technique d'OpenUp",
  "Tours",
  "Remote France",
] as const;

export function AboutHero() {
  const faits = [
    { valeur: "4 ans", label: "chez Civitime, de dev à lead tech", ombre: "" },
    {
      valeur: `${getFreelanceYears()} ans`,
      label: "à mon compte, 20+ projets livrés",
      ombre: "etiquette-gris",
    },
    {
      valeur: `${PUBLIC_BUILDS_COUNT}`,
      label: "builds publics sur GitHub",
      ombre: "etiquette-jaune",
    },
  ] as const;

  return (
    <section className="trame pleine-largeur flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16 grid gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div className="page-entete flex flex-col gap-7 min-w-0">
          <p className="surtitre">
            À propos · Développeur fullstack et builder
          </p>

          <h1 className="page-h1 heading-display">
            Je fabrique les briques <br />
            <span className="marqueur">
              sur lesquelles d'autres construisent.
            </span>
          </h1>

          <div className="mesure flex flex-col gap-4">
            <Paragraph size="lg">
              <strong>
                Je suis Axel Hamilcaro, développeur fullstack et builder, basé à
                Tours, en Centre-Val de Loire, en remote sur toute la France.
              </strong>{" "}
              {`${THESIS.firstPerson} Le jour, je développe chez Eskimoz. OpenUp, dont je suis le fondateur technique, avance en parallèle.`}
            </Paragraph>
            <Paragraph variant="secondary">
              J'aime les briques qu'on ne remarque que quand elles manquent : un
              modèle de données juste, des règles métier testées, une API qu'on
              branche sans lire trois pages de doc.
            </Paragraph>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:gap-5 max-w-xl pr-2">
            {faits.map(({ valeur, label, ombre }) => (
              <li
                key={label}
                className={`etiquette aimant ${ombre} flex-col items-start gap-1 px-3 py-2 sm:px-4 sm:py-3`}
              >
                <span className="fait-valeur">{valeur}</span>
                <span className="label-mono fait-label">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figure className="relative justify-self-start lg:justify-self-end mr-4">
          <Image
            src="/axel-hamilcaro-developpeur-fullstack.jpeg"
            alt="Axel Hamilcaro, développeur fullstack et builder"
            width={320}
            height={320}
            className="apropos-portrait w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover"
            preload
            fetchPriority="high"
            sizes="(max-width: 640px) 240px, (max-width: 1024px) 288px, 320px"
          />
          <p
            aria-hidden="true"
            className="tampon tampon-droite absolute -top-5 -right-6"
          >
            <span className="tampon-haut">Builds</span>
            <span className="tampon-bas">En chantier</span>
          </p>
        </figure>
      </div>

      <Ribbon items={ABOUT_RIBBON} hachures />
    </section>
  );
}
