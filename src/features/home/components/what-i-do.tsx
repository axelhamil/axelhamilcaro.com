import { ArrowRight } from "lucide-react";
import { WORK_COPY } from "@/app/_config/home-copy";
import { RATES } from "@/app/_config/site.constants";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Button } from "@/src/shared/ui/portfolio/button";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const offers = [
  {
    href: "/services/creation-application-web",
    title: "Création d'application web de A à Z",
  },
  {
    href: "/services/developpeur-nextjs-freelance",
    title: "Développement web sur mesure",
  },
  { href: "/services/developpement-saas", title: "Développement SaaS" },
  { href: "/services/lead-tech-fractional", title: "Lead tech fractional" },
  {
    href: "/tma",
    title: `TMA dès ${RATES.tma.proMonthlyEur} € par mois`,
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
          <p className="surtitre">{WORK_COPY.surtitre}</p>
          <Heading2 id="services-title" size="xl">
            {WORK_COPY.titleTop} <br />{" "}
            <span className="marqueur">{WORK_COPY.titleAccent}</span>
          </Heading2>
          <Paragraph variant="secondary" size="lg" className="section-intro">
            {WORK_COPY.intro}
          </Paragraph>
          <Paragraph variant="secondary">{WORK_COPY.doubt}</Paragraph>
          <Paragraph variant="secondary">
            {WORK_COPY.mcpLead}{" "}
            <TransitionLink href="/#mcp" className="link-underline">
              {WORK_COPY.mcpLink}
            </TransitionLink>
            .
          </Paragraph>
          <Button href="/services" size="lg" className="self-start">
            {WORK_COPY.cta(offers.length)}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </header>

        <div className="min-w-0 flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h3 className="heading-display title-md">{WORK_COPY.takeTitle}</h3>
            <ul className="offres">
              {WORK_COPY.take.map((item) => (
                <li
                  key={item}
                  className="fit-ligne offre-titre heading-display"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <div className="hachures" aria-hidden="true" />
            <h3 className="heading-display title-md">
              {WORK_COPY.refuseTitle}
            </h3>
            <ul className="offres">
              {WORK_COPY.refuse.map((item) => (
                <li
                  key={item}
                  className="fit-ligne fit-refus offre-titre heading-display"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-labelledby="services-offres"
            className="flex flex-col gap-4"
          >
            <h3 id="services-offres" className="label-mono ink-muted">
              {WORK_COPY.detailTitle}
            </h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {offers.map((offer) => (
                <li key={offer.href}>
                  <TransitionLink
                    href={offer.href}
                    className="link-underline label-mono"
                  >
                    {offer.title}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
