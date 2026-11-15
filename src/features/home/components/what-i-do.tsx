import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RATES } from "@/app/_config/site.constants";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const offers = [
  {
    href: "/services/creation-application-web",
    title: "Création d'application web de A à Z",
    detail: "Du cadrage à la mise en ligne",
  },
  {
    href: "/services/developpeur-nextjs-freelance",
    title: "Développement web sur mesure",
    detail: "Architecture, MVP, refonte",
  },
  {
    href: "/services/developpement-saas",
    title: "Développement SaaS",
    detail: "Multi-tenant, jusqu'en production",
  },
  {
    href: "/services/lead-tech-fractional",
    title: "Lead tech fractional",
    detail: "Temps partiel, 3 à 18 mois",
  },
  {
    href: "/tma",
    title: "TMA au mois",
    detail: `Dès ${RATES.tma.proMonthlyEur} € par mois`,
  },
] as const;

const WhatIDo = () => {
  return (
    <section
      id="services"
      className="pleine-largeur"
      aria-labelledby="services-title"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <header className="section-tete lg:self-start">
          <p className="surtitre">Freelance</p>
          <Heading2 id="services-title" size="xl">
            Travailler <br /> <span className="marqueur">avec moi.</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            Je prends quelques projets en freelance, à côté de mon poste et
            d'OpenUp. 5 façons de travailler ensemble, chacune détaillée sur sa
            page.
          </Paragraph>
          <Button href="/services" size="lg" className="self-start">
            Travailler avec moi
            <ArrowRight className="w-5 h-5" />
          </Button>
        </header>

        <ul className="offres min-w-0">
          {offers.map((offer) => (
            <li key={offer.href} className="reveal-up">
              <TransitionLink
                href={offer.href}
                className="offre grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-1"
              >
                <span className="offre-titre heading-display">
                  {offer.title}
                </span>
                <ArrowUpRight
                  className="offre-fleche w-6 h-6 row-span-2"
                  aria-hidden="true"
                />
                <span className="label-mono ink-muted">{offer.detail}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WhatIDo;
