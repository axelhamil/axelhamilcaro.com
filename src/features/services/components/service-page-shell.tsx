import type { ServiceData } from "../lib/services-data";
import { ServiceApproach } from "./service-approach";
import { ServiceCases } from "./service-cases";
import { ServiceCta } from "./service-cta";
import { ServiceFaq } from "./service-faq";
import { ServiceHero } from "./service-hero";
import { ServiceProblem } from "./service-problem";

interface ServicePageShellProps {
  data: ServiceData;
}

export function ServicePageShell({ data }: ServicePageShellProps) {
  return (
    <main>
      <ServiceHero data={data.hero} ribbon={data.ribbons.hero} />
      <ServiceProblem data={data.problem} />
      <ServiceApproach data={data.approach} />
      <ServiceCases relatedCases={data.relatedCases} />
      <ServiceFaq items={data.faq} guide={data.guide} />
      <ServiceCta data={data.hero} ribbon={data.ribbons.cta} />
    </main>
  );
}
