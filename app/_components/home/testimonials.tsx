"use client";

import { MessageSquare, Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { TiltCard } from "../shared/effects/tilt-card";

const testimonials = [
  {
    name: "Léo",
    role: "CTO @ Scormpilot",
    content:
      "Intervention rapide et qualitative sur notre stack Next.js. Axel a restructuré notre architecture frontend et ajouté des fonctionnalités clés sans casser l'existant. Pro et autonome.",
    rating: 5,
    avatar: "L",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Anthony M.",
    role: "Product Manager",
    content:
      "Axel a développé plusieurs modules critiques de notre plateforme e-learning. Son code est propre, bien testé, et il pose les bonnes questions. Un renfort technique solide.",
    rating: 5,
    avatar: "A",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Aboubacar",
    role: "Fondateur @ MentorTroc",
    content:
      "Mission réussie sur notre app Next.js. Axel a livré dans les temps, avec un code maintenable et une vraie attention aux détails UX. Je recommande.",
    rating: 5,
    avatar: "Ab",
    color: "from-emerald-500 to-teal-500",
  },
] as const;

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <motion.div className="badge mb-4" whileHover={{ scale: 1.05 }}>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <MessageSquare className="w-4 h-4 text-accent" />
            </motion.span>
            <span className="text-sm font-medium">Témoignages</span>
          </motion.div>
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

      <RevealContainer
        staggerDelay={0.15}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
      >
        {testimonials.map((testimonial, index) => (
          <RevealItem
            key={testimonial.name}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <TiltCard
              className="h-full rounded-2xl"
              tiltAmount={5}
              glareOpacity={0.06}
            >
              <motion.div
                className="relative h-full flex flex-col gap-4 p-6 sm:p-7 rounded-2xl card overflow-hidden"
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(255, 77, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${testimonial.color} opacity-10 blur-3xl`}
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Quote
                      className="w-8 h-8 text-accent opacity-60"
                      aria-hidden="true"
                    />
                  </motion.div>
                  <div
                    className="flex gap-0.5"
                    aria-label={`${testimonial.rating} étoiles sur 5`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.1,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Star
                          className="w-4 h-4 text-amber-400 fill-current"
                          aria-hidden="true"
                        />
                      </motion.span>
                    ))}
                  </div>
                </div>

                <Paragraphe
                  variant="secondary"
                  size="sm"
                  className="relative z-10 flex-1 italic leading-relaxed"
                >
                  "{testimonial.content}"
                </Paragraphe>

                <motion.div
                  className="relative z-10 pt-3 border-t border-border flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm`}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-primary text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-secondary mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealContainer>
    </section>
  );
};

export default Testimonials;
