"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Quote,
  Star,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { MagneticWrapper } from "@/src/shared/ui/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "@/src/shared/ui/effects/reveal";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const testimonials = [
  {
    name: "Léo",
    role: "CTO @ ScormPilot",
    content:
      "Intervention rapide et qualitative sur notre stack Next.js. Axel a restructuré notre architecture frontend et ajouté des fonctionnalités clés sans casser l'existant. Pro et autonome.",
    rating: 5,
    avatar: "L",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Anthony M.",
    role: "Product Manager @ Civitime",
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
  {
    name: "Sophie L.",
    role: "CEO @ Startup EdTech",
    content:
      "Excellent travail sur notre MVP. Axel a su comprendre nos besoins métier et proposer des solutions techniques pragmatiques. Le produit est sorti en 6 semaines.",
    rating: 5,
    avatar: "S",
    color: "from-amber-500 to-orange-500",
  },
  {
    name: "Thomas R.",
    role: "Développeur @ Agence Web",
    content:
      "J'ai suivi le mentorat d'Axel pendant 3 mois. Ses explications sur React et Clean Architecture m'ont fait progresser très vite. Pédagogue et patient.",
    rating: 5,
    avatar: "T",
    color: "from-rose-500 to-red-500",
  },
] as const;

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex;
    const normalizedDiff =
      ((diff + testimonials.length + Math.floor(testimonials.length / 2)) %
        testimonials.length) -
      Math.floor(testimonials.length / 2);

    if (normalizedDiff === 0) {
      return {
        x: 0,
        scale: 1,
        zIndex: 10,
        opacity: 1,
        rotateY: 0,
      };
    }

    const side = normalizedDiff > 0 ? 1 : -1;
    const absOffset = Math.abs(normalizedDiff);

    if (absOffset === 1) {
      return {
        x: side * 260,
        scale: 0.92,
        zIndex: 5,
        opacity: 0.6,
        rotateY: side * -8,
      };
    }

    return {
      x: side * 400,
      scale: 0.8,
      zIndex: 2,
      opacity: 0,
      rotateY: side * -12,
    };
  };

  return (
    <section
      id="temoignages"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="temoignages-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.03}>
            <motion.div
              className="badge mb-4 inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <MessageSquare className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-sm font-medium">Témoignages</span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="temoignages-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Avis et témoignages clients
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraph
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Retours de CTOs, fondateurs et Product Managers sur mes
            collaborations
          </Paragraph>
        </RevealItem>
      </RevealContainer>

      <section
        className="relative max-w-4xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Témoignages"
      >
        <div
          className="relative h-[380px] sm:h-[350px] flex items-center justify-center"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => {
              const style = getCardStyle(index);
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={testimonial.name}
                  className="absolute w-full max-w-lg px-4"
                  initial={{
                    x: direction > 0 ? 400 : -400,
                    opacity: 0,
                    scale: 0.85,
                    rotateY: direction > 0 ? 15 : -15,
                  }}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    zIndex: style.zIndex,
                    opacity: style.opacity,
                    rotateY: style.rotateY,
                  }}
                  exit={{
                    x: direction > 0 ? -400 : 400,
                    opacity: 0,
                    scale: 0.85,
                    rotateY: direction > 0 ? -15 : 15,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  onClick={() => !isActive && goTo(index)}
                >
                  <MagneticWrapper strength={isActive ? 0.03 : 0}>
                    <motion.div
                      className={`relative flex flex-col gap-4 p-6 sm:p-8 rounded-2xl overflow-hidden transition-shadow ${
                        isActive
                          ? "bg-white shadow-2xl shadow-accent/10 ring-1 ring-accent/10"
                          : "bg-white/80 shadow-lg"
                      }`}
                      whileHover={isActive ? { y: -4 } : undefined}
                    >
                      <motion.div
                        className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${testimonial.color} opacity-10 blur-3xl`}
                      />

                      <div className="relative z-10 flex items-start justify-between gap-3">
                        <Quote
                          className="w-10 h-10 text-accent opacity-40"
                          aria-hidden="true"
                        />
                        <div
                          className="flex gap-0.5"
                          role="img"
                          aria-label={`${testimonial.rating} étoiles sur 5`}
                        >
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <motion.span
                                // biome-ignore lint/suspicious/noArrayIndexKey: star index is structurally stable (fixed count per testimonial)
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * i }}
                              >
                                <Star
                                  className="w-4 h-4 text-amber-400 fill-current"
                                  aria-hidden="true"
                                />
                              </motion.span>
                            ),
                          )}
                        </div>
                      </div>

                      <Paragraph
                        variant="secondary"
                        className={`relative z-10 flex-1 italic leading-relaxed ${
                          isActive ? "text-base sm:text-lg" : "text-sm"
                        }`}
                      >
                        "{testimonial.content}"
                      </Paragraph>

                      <div className="relative z-10 pt-4 border-t border-border/50 flex items-center gap-3">
                        <motion.div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {testimonial.avatar}
                        </motion.div>
                        <div>
                          <p className="font-semibold text-primary">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-secondary">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </MagneticWrapper>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <MagneticWrapper strength={0.025}>
            <motion.button
              onClick={prev}
              className="p-3 rounded-full bg-primary/5 hover:bg-accent/10 text-primary hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
          </MagneticWrapper>

          <div className="flex gap-2">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.name}
                onClick={() => goTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-primary/20 hover:bg-primary/40"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>

          <MagneticWrapper strength={0.025}>
            <motion.button
              onClick={next}
              className="p-3 rounded-full bg-primary/5 hover:bg-accent/10 text-primary hover:text-accent transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </MagneticWrapper>
        </div>
      </section>
    </section>
  );
};

export default Testimonials;
