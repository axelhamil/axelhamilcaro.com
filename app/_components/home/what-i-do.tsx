"use client";

import { Code2, Lightbulb, Rocket, Sparkles, Wrench, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { TiltCard } from "../shared/effects/tilt-card";
import { MagneticWrapper } from "../shared/effects/magnetic-wrapper";
import { AnimatedCounter } from "../shared/effects/animated-counter";

const stats = [
  { value: "20+", label: "applications livrées" },
  { value: "4 ans", label: "expérience lead" },
  { value: "10+", label: "élèves mentorés" },
  { value: "48h", label: "sites artisans" },
] as const;

const services = [
  {
    icon: Lightbulb,
    title: "Conception",
    description:
      "Analyse de vos besoins, architecture technique et roadmap claire pour démarrer sur de bonnes bases.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Code2,
    title: "Développement",
    description:
      "Code TypeScript moderne, testé et documenté. Votre app évolue sans dette technique.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Déploiement",
    description:
      "Pipeline CI/CD, monitoring et mise en production automatisée. Zéro stress au lancement.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Wrench,
    title: "Support",
    description:
      "Évolutions fonctionnelles, corrections et support réactif. Votre produit reste performant.",
    gradient: "from-emerald-500 to-teal-500",
  },
];

const WhatIDo = () => {
  return (
    <section
      id="services"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.1}>
            <motion.div
              className="badge mb-4 inline-flex"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                animate={{ rotate: [0, 15, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-sm font-medium">Services</span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>

        <RevealItem>
          <Heading2
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Mes services de développement web
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base"
          >
            Un accompagnement complet de l'idée au lancement, puis au-delà
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer
        staggerDelay={0.1}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
      >
        {services.map((service, index) => (
          <RevealItem key={service.title} direction="scale">
            <MagneticWrapper strength={0.12}>
              <TiltCard className="h-full rounded-2xl">
                <motion.div
                  className="relative h-full flex flex-col items-center text-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl card-accent overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500`}
                    whileHover={{ opacity: 0.05 }}
                  />

                  <motion.div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/5 blur-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  />

                  <motion.div
                    className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{
                      scale: 1.15,
                      rotate: 8,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </motion.div>

                  <h3 className="relative z-10 font-semibold text-primary text-lg sm:text-xl">
                    {service.title}
                  </h3>

                  <Paragraphe
                    variant="secondary"
                    size="sm"
                    className="relative z-10 text-sm"
                  >
                    {service.description}
                  </Paragraphe>

                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </TiltCard>
            </MagneticWrapper>
          </RevealItem>
        ))}
      </RevealContainer>

      <RevealContainer className="mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.06}>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 px-6 py-4 rounded-2xl bg-primary/5 max-w-3xl mx-auto"
              whileHover={{ scale: 1.01 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Trophy className="w-4 h-4 text-accent hidden sm:block" />
                  <span className="font-bold text-accent">
                    <AnimatedCounter value={stat.value} className="inline" />
                  </span>
                  <span className="text-xs sm:text-sm text-secondary">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </MagneticWrapper>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default WhatIDo;
