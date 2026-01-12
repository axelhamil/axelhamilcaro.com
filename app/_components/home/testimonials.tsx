import { MessageSquare, Quote, Star } from "lucide-react";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";

const testimonials = [
  {
    name: "Léo",
    role: "CTO @ Scormpilot",
    content:
      "Intervention rapide et qualitative sur notre stack Next.js. Axel a restructuré notre architecture frontend et ajouté des fonctionnalités clés sans casser l'existant. Pro et autonome.",
    rating: 5,
  },
  {
    name: "Anthony M.",
    role: "Product Manager",
    content:
      "Axel a développé plusieurs modules critiques de notre plateforme e-learning. Son code est propre, bien testé, et il pose les bonnes questions. Un renfort technique solide.",
    rating: 5,
  },
  {
    name: "Aboubacar",
    role: "Fondateur @ MentorTroc",
    content:
      "Mission réussie sur notre app Next.js. Axel a livré dans les temps, avec un code maintenable et une vraie attention aux détails UX. Je recommande.",
    rating: 5,
  },
] as const;

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="testimonials-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem>
          <div className="badge mb-4">
            <MessageSquare className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">Témoignages</span>
          </div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="testimonials-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ce qu'en disent mes clients
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Des retours concrets de CTOs, CEOs et Product Leads qui ont fait
            confiance à mon expertise.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial) => (
          <RevealItem key={testimonial.name} className="group h-full">
            <div className="relative h-full flex flex-col gap-4 p-6 sm:p-7 rounded-2xl card transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1">
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-accent-light"
                aria-hidden="true"
              />

              <div className="relative z-10 flex items-start justify-between gap-3">
                <Quote
                  className="w-8 h-8 text-accent opacity-60"
                  aria-hidden="true"
                />
                <div
                  className="flex gap-0.5"
                  aria-label={`${testimonial.rating} étoiles sur 5`}
                >
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-accent fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <Paragraphe
                variant="secondary"
                size="sm"
                className="relative z-10 flex-1 italic leading-relaxed"
              >
                {testimonial.content}
              </Paragraphe>

              <div className="relative z-10 pt-3 border-t border-border">
                <p className="font-semibold text-primary text-sm">
                  {testimonial.name}
                </p>
                <p className="text-xs text-secondary mt-0.5">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealContainer>
    </section>
  );
};

export default Testimonials;
