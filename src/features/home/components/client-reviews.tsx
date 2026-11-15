import { Fragment } from "react";
import {
  MALT_APPRAISALS,
  MALT_RECOMMENDATIONS,
  MALT_REVIEWS_SOURCE,
} from "@/app/_config/malt-reviews";
import { cn } from "@/lib/utils";
import { formatLongDate } from "@/src/lib/utils/date.utils";
import { Heading2 } from "@/src/shared/ui/typography/heading2";

interface Testimonial {
  reviewer: (typeof MALT_APPRAISALS)[number]["reviewer"];
  date: string;
  body: string;
  rating?: number;
  kind: string;
}

interface ClientFile {
  reviewer: Testimonial["reviewer"];
  testimonials: Testimonial[];
}

const testimonials: Testimonial[] = [
  ...MALT_APPRAISALS.map((appraisal) => ({
    ...appraisal,
    kind: `Évaluation ${appraisal.rating}/5`,
  })),
  ...MALT_RECOMMENDATIONS.map((recommendation) => ({
    ...recommendation,
    kind: "Recommandation",
  })),
].sort((a, b) => b.date.localeCompare(a.date));

const clientFiles = [
  ...testimonials
    .reduce((files, testimonial) => {
      const file = files.get(testimonial.reviewer.id) ?? {
        reviewer: testimonial.reviewer,
        testimonials: [],
      };
      file.testimonials.push(testimonial);
      return files.set(testimonial.reviewer.id, file);
    }, new Map<string, ClientFile>())
    .values(),
];

const formatRating = (ratings: number[]) =>
  (
    ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
  ).toLocaleString("fr-FR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const averageRating = formatRating(
  MALT_APPRAISALS.map((appraisal) => appraisal.rating),
);

const SHADOWS = ["", "etiquette-gris", "etiquette-jaune"] as const;

const formatMonth = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    month: "2-digit",
    year: "numeric",
  });

const describePeriod = (file: ClientFile) => {
  const newest = formatMonth(file.testimonials[0]?.date ?? "");
  const oldest = formatMonth(file.testimonials.at(-1)?.date ?? "");
  const count = `${file.testimonials.length} avis`;

  return newest === oldest
    ? `${count}, en ${newest}`
    : `${count}, de ${oldest} à ${newest}`;
};

const describeRating = (file: ClientFile) => {
  const ratings = file.testimonials.flatMap((testimonial) =>
    testimonial.rating === undefined ? [] : [testimonial.rating],
  );

  return ratings.length === 0 ? null : `Note ${formatRating(ratings)}/5`;
};

interface TestimonialMetaProps {
  testimonial: Testimonial;
  className?: string;
}

function TestimonialMeta({ testimonial, className }: TestimonialMetaProps) {
  return (
    <p
      className={cn(
        "label-mono flex flex-wrap justify-between gap-x-4 gap-y-1",
        className,
      )}
    >
      <span>{testimonial.kind}</span>
      <time dateTime={testimonial.date}>
        {formatLongDate(testimonial.date)}
      </time>
    </p>
  );
}

interface ClientFileStackProps {
  file: ClientFile;
}

function ClientFileStack({ file }: ClientFileStackProps) {
  const chronological = file.testimonials.toReversed();
  const total = chronological.length;
  const longest = chronological.reduce((best, testimonial) =>
    testimonial.body.length > best.body.length ? testimonial : best,
  );

  return (
    <fieldset className="dossier flex flex-wrap">
      <legend className="sr-only">Avis de {file.reviewer.name}</legend>
      {chronological.map((testimonial, index) => {
        const inputId = `${file.reviewer.id}-avis-${index + 1}`;

        return (
          <Fragment key={inputId}>
            <input
              type="radio"
              id={inputId}
              name={`${file.reviewer.id}-avis`}
              defaultChecked={testimonial === longest}
              aria-label={`Avis ${index + 1} sur ${total}, ${formatLongDate(testimonial.date)}`}
              className="dossier-radio sr-only"
            />
            <label
              htmlFor={inputId}
              className="dossier-onglet label-mono flex items-center justify-center"
            >
              {index + 1}
            </label>
            <div className="dossier-avis flex flex-col">
              <TestimonialMeta
                testimonial={testimonial}
                className="dossier-meta"
              />
              <blockquote className="avis-texte para">
                {testimonial.body}
              </blockquote>
            </div>
          </Fragment>
        );
      })}
    </fieldset>
  );
}

export function ClientReviews() {
  return (
    <section id="avis" className="pleine-largeur" aria-labelledby="avis-title">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 section-home section-suite">
        <header className="section-tete">
          <Heading2 id="avis-title" size="lg">
            Avis clients
          </Heading2>
          <p className="para para-lg ink-secondary section-intro">
            <span className="stat-valeur marqueur">{averageRating}/5</span> sur{" "}
            {MALT_APPRAISALS.length} évaluations et{" "}
            {MALT_RECOMMENDATIONS.length} recommandations,{" "}
            <a
              href={MALT_REVIEWS_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              vérifiables sur Malt
            </a>
            .
          </p>
        </header>

        <ul className="grille-cartes avis-liste">
          {clientFiles.map((file, index) => {
            const [first] = file.testimonials;
            const rating = describeRating(file);

            return (
              <li key={file.reviewer.id} className="reveal-up">
                <figure
                  className={cn(
                    "avis-carte etiquette etiquette-carte",
                    SHADOWS[index % SHADOWS.length],
                  )}
                >
                  {file.testimonials.length > 1 ? (
                    <>
                      <p className="avis-tete label-mono flex flex-wrap justify-between gap-x-4 gap-y-1">
                        <span>{describePeriod(file)}</span>
                        {rating && <span>{rating}</span>}
                      </p>
                      <ClientFileStack file={file} />
                    </>
                  ) : (
                    first && (
                      <>
                        <TestimonialMeta
                          testimonial={first}
                          className="avis-tete"
                        />
                        <blockquote className="avis-texte para">
                          {first.body}
                        </blockquote>
                      </>
                    )
                  )}
                  <figcaption className="avis-signature mt-auto flex flex-col">
                    <span className="avis-nom">{file.reviewer.name}</span>
                    <span className="label-mono ink-muted">
                      {file.reviewer.jobTitle}, {file.reviewer.company}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
