import type { Metadata } from "next";
import { ServicePageShell } from "@/src/features/services/components/service-page-shell";
import { servicesData } from "@/src/features/services/lib/services-data";
import { JsonLdScript } from "@/src/shared/seo/json-ld-script";
import { buildPageMetadata } from "@/src/shared/seo/page-metadata";
import { buildBreadcrumbListSchema } from "@/src/shared/seo/schemas/breadcrumb-list";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";
import { buildServiceSchema } from "@/src/shared/seo/schemas/service-schema";

const data = servicesData["developpement-saas"];

export const metadata: Metadata = buildPageMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: "/services/developpement-saas",
});

const serviceSchema = buildServiceSchema({
  name: data.schema.name,
  description: data.schema.description,
  url: data.url,
  serviceType: data.schema.serviceType,
  offers: data.schema.offers,
});

const faqSchema = buildFaqPageSchema(data.faq);

const breadcrumbSchema = buildBreadcrumbListSchema([
  { name: "Accueil", url: "/" },
  { name: "Services", url: "/services" },
  { name: "Développement SaaS", url: "/services/developpement-saas" },
]);

export default function SaasServicePage() {
  return (
    <>
      <JsonLdScript data={serviceSchema} />
      <JsonLdScript data={faqSchema} />
      <JsonLdScript data={breadcrumbSchema} />
      <ServicePageShell data={data} />
    </>
  );
}
