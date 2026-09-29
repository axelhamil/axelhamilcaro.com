import {
  MALT_APPRAISALS,
  MALT_RECOMMENDATIONS,
  MALT_REVIEWS_SOURCE,
} from "@/app/_config/malt-reviews";

const testimonials = [...MALT_APPRAISALS, ...MALT_RECOMMENDATIONS].sort(
  (a, b) => b.date.localeCompare(a.date),
);

const averageRating = (
  MALT_APPRAISALS.reduce((sum, appraisal) => sum + appraisal.rating, 0) /
  MALT_APPRAISALS.length
).toLocaleString("fr-FR", { minimumFractionDigits: 1 });

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function ClientReviews() {
  return (
    <section id="avis" className="py-12 sm:py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          className="text-4xl sm:text-5xl font-bold text-primary mb-4"
        >
          Avis clients
        </h2>
        <p className="text-secondary text-lg mb-12">
          {averageRating}/5 sur {MALT_APPRAISALS.length} évaluations et{" "}
          {MALT_RECOMMENDATIONS.length} recommandations,{" "}
          <a
            href={MALT_REVIEWS_SOURCE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-accent-ink"
          >
            vérifiables sur Malt
          </a>
          .
        </p>
        <ul className="grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <li
              key={`${testimonial.reviewer.id}-${testimonial.date}`}
              className="card p-6"
            >
              <figure className="flex h-full flex-col gap-4">
                <blockquote className="text-secondary leading-relaxed">
                  {testimonial.body}
                </blockquote>
                <figcaption className="mt-auto text-sm">
                  <span className="font-semibold text-primary">
                    {testimonial.reviewer.name}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    · {testimonial.reviewer.jobTitle},{" "}
                    {testimonial.reviewer.company} ·{" "}
                    <time dateTime={testimonial.date}>
                      {formatDate(testimonial.date)}
                    </time>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
