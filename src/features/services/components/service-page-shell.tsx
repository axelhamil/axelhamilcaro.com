import type { ServiceData } from "../lib/services-data";
import { ServiceApproach } from "./service-approach";
import { ServiceCases } from "./service-cases";
import { ServiceCta } from "./service-cta";
import { ServiceFaq } from "./service-faq";
import { ServiceHero } from "./service-hero";
import { ServiceProblem } from "./service-problem";

export function ServicePageShell({ data }: { data: ServiceData }) {
  return (
    <main className="pb-8">
      <ServiceHero data={data.hero} />
      <ServiceProblem data={data.problem} />
      <ServiceApproach data={data.approach} />
      <ServiceCases relatedCases={data.relatedCases} />
      <ServiceFaq items={data.faq} />
      <ServiceCta data={data.hero} />
    </main>
  );
}
