import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { SITE_URL } from "@/app/_config/site.constants";
import { servicesData } from "@/src/features/services/lib/services-data";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";

const SERVICES_URL = `${SITE_URL}/services`;

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Services", url: "/services" },
]);

export const metadata: Metadata = {
  title: "Services freelance — Développement Next.js, SaaS, Lead tech",
  description:
    "3 services freelance Axel Hamilcaro : développement Next.js, développement SaaS multi-tenant, lead tech fractional. Devis sous 24h, démarrage sous 1-3 semaines, 100% remote France.",
  alternates: { canonical: SERVICES_URL },
  openGraph: {
    title: "Services freelance — Axel Hamilcaro",
    description:
      "Développement Next.js, SaaS multi-tenant, lead tech fractional. 5 ans d'expérience, devis sous 24h.",
    url: SERVICES_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services freelance — Axel Hamilcaro",
    description:
      "Développement Next.js, SaaS, lead tech fractional. 5 ans d'expérience.",
  },
};

const services = Object.values(servicesData);

export default function ServicesIndexPage() {
  return (
    <main className="pb-8">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-20 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <p className="text-accent font-medium uppercase tracking-wider text-sm mb-4">
            Services freelance
          </p>
          <h1
            className="text-4xl sm:text-6xl font-bold text-primary mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            3 façons de travailler ensemble
          </h1>
          <p className="text-secondary text-lg sm:text-xl max-w-3xl mx-auto">
            Chaque service est cadré, chiffré, et basé sur des références
            livrées en production. Choisis celui qui colle à ta situation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <TransitionLink
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group flex flex-col p-8 rounded-2xl border border-secondary/20 bg-secondary-background/30 hover:border-accent/40 hover:bg-secondary-background/50 transition-all duration-300"
            >
              <p className="text-accent font-medium uppercase tracking-wider text-xs mb-4">
                {service.hero.eyebrow}
              </p>
              <h2
                className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {service.hero.title}
              </h2>
              <p className="text-secondary leading-relaxed mb-6 flex-1">
                {service.hero.subtitle}
              </p>
              <span className="inline-flex items-center gap-2 text-accent font-medium text-sm">
                Découvrir
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </TransitionLink>
          ))}
        </div>
      </section>
    </main>
  );
}
