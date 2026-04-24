import { Button } from "@/src/shared/ui/portfolio/button";
import type { ServiceData } from "../lib/services-data";

export function ServiceHero({ data }: { data: ServiceData["hero"] }) {
  return (
    <section className="py-20 sm:py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-accent font-medium uppercase tracking-wider text-sm mb-4">
          {data.eyebrow}
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight mb-6"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {data.title}
        </h1>
        <p className="text-secondary text-lg leading-relaxed max-w-3xl mx-auto mb-10">
          {data.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href={data.primaryCtaHref} variant="primary" size="lg">
            {data.primaryCtaLabel}
          </Button>
          <Button href={data.secondaryCtaHref} variant="secondary" size="lg">
            {data.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
