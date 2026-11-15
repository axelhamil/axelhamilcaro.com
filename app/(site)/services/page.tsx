import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { RATES } from "@/app/_config/site.constants";
import { cn } from "@/lib/utils";
import { servicesData } from "@/src/features/services/lib/services-data";
import { TMA_FORFAITS } from "@/src/features/tma/lib/tma-data";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildProfessionalServiceSchema } from "@/src/shared/seo/schemas/professional-service";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { AccentTitle } from "@/src/shared/ui/typography/accent-title";

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Services", url: "/services" },
]);

export const metadata: Metadata = buildPageMetadata({
  title: "Développeur fullstack freelance à Tours",
  description: `Je suis développeur fullstack freelance à Tours, en remote en France : application web de A à Z, SaaS, lead tech, TMA dès ${RATES.tma.proMonthlyEur} € par mois. Devis sous 24h.`,
  path: "/services",
  keywords: [
    "développeur fullstack freelance",
    "développeur freelance Tours",
    "création application web",
    "développement SaaS",
    "lead tech fractional",
    "TMA",
    "Axel Hamilcaro",
  ],
});

const services = Object.values(servicesData).map((service) => ({
  href: `/services/${service.slug}`,
  eyebrow: service.hero.eyebrow,
  title: service.card.title,
  subtitle: service.card.subtitle,
  points: service.approach.steps.map((step) => step.title),
}));

services.push({
  href: "/tma",
  eyebrow: "Forfait mensuel",
  title: "Tierce Maintenance Applicative (TMA)",
  subtitle: `Forfait mensuel sans engagement pour garder ton app en prod vivante : bugs, sécurité, monitoring, support. PRO à ${RATES.tma.proMonthlyEur} € HT par mois (5h) ou PREMIUM à ${RATES.tma.premiumMonthlyEur} € HT par mois (10h).`,
  points: TMA_FORFAITS.map(
    (forfait) => `${forfait.name} : ${forfait.hoursLabel}`,
  ),
});

const HUB_RIBBON = [
  "Application web",
  "Next.js",
  "SaaS multi-tenant",
  "Lead tech fractional",
  "TMA",
  `${RATES.dailyHtEur} € HT par jour`,
  "Devis sous 24h",
  "Premier échange gratuit",
  "Web, iOS, Android",
  "MVP en 4 à 8 semaines",
  "Missions de 3 à 18 mois",
  `Maintenance dès ${RATES.tma.proMonthlyEur} € HT par mois`,
  "Basé à Tours",
];

export default function ServicesIndexPage() {
  return (
    <main>
      <JsonLdScript data={buildProfessionalServiceSchema()} />
      <JsonLdScript data={breadcrumbSchema} />
      <section className="trame pleine-largeur">
        <div className="svc-hero-corps container flex flex-col items-start gap-8">
          <div className="flex w-full flex-wrap items-start justify-between gap-6">
            <p className="surtitre">Services freelance</p>
            <p aria-hidden="true" className="tampon tampon-droite">
              <span className="tampon-haut">Devis</span>{" "}
              <span className="tampon-bas">sous 24h</span>
            </p>
          </div>
          <h1 className="svc-h1 heading-display">
            <AccentTitle text="Développeur fullstack freelance à Tours : 5 façons de travailler ensemble" />
          </h1>
          <p className="svc-lede">
            {`Je suis Axel Hamilcaro, développeur fullstack freelance à Tours, en remote partout en France. Je prends en charge une application web de A à Z, un SaaS ou un lead tech à temps partiel à ${RATES.dailyHtEur} € HT par jour, et la maintenance au forfait dès ${RATES.tma.proMonthlyEur} € HT par mois. Next.js est ma signature, mais je prends ton projet quelle que soit la stack : React/Node, Vite, mobile natif iOS/Android.`}
          </p>
        </div>
        <Ribbon items={HUB_RIBBON} hachures />
      </section>

      <section className="svc-section container">
        <ul className="grille-cartes svc-grille-2">
          {services.map((service) => (
            <li
              key={service.href}
              className={service.href === "/tma" ? "svc-offre-tma" : undefined}
            >
              <TransitionLink
                href={service.href}
                className={cn(
                  "svc-carte etiquette etiquette-carte etiquette-appui",
                  service.href === "/tma" ? "svc-aplat" : "etiquette-gris",
                )}
              >
                <p className="svc-meta">{service.eyebrow}</p>
                <h2 className="svc-carte-titre">{service.title}</h2>
                <p className="svc-texte">{service.subtitle}</p>
                <ul className="svc-carte-points">
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <span className="svc-lien-carte">
                  <span className="svc-lien-carte-texte">Découvrir</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
