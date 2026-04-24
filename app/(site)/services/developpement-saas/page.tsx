import type { Metadata } from "next";
import { ServicePageShell } from "@/src/features/services/components/service-page-shell";
import { servicesData } from "@/src/features/services/lib/services-data";
import { buildFaqPageSchema } from "@/src/shared/seo/schemas/faq-page";
import { buildServiceSchema } from "@/src/shared/seo/schemas/service-schema";

const data = servicesData["developpement-saas"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: data.url },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: data.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: data.metaTitle,
    description: data.metaDescription,
  },
};

const serviceSchema = buildServiceSchema({
  name: data.hero.title,
  description: data.metaDescription,
  url: data.url,
  serviceType: data.schema.serviceType,
  offers: data.schema.offers,
});

const faqSchema = buildFaqPageSchema(data.faq);

export default function SaasServicePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicePageShell data={data} />
    </>
  );
}
