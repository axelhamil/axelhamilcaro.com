import type { ServiceData } from "../lib/services-data";

export function ServiceApproach({ data }: { data: ServiceData["approach"] }) {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl font-bold text-primary mb-12"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {data.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.steps.map((step, index) => (
            <div key={step.title} className="card p-8">
              <span
                className="text-5xl font-bold text-accent block mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-secondary leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
