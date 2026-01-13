"use client";

import { Briefcase, GraduationCap, Rocket, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2, Paragraphe } from "@/components/typography";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { MagneticWrapper } from "../shared/effects/magnetic-wrapper";
import { TiltCard } from "../shared/effects/tilt-card";

const experiences = [
  {
    period: "2021 - 2024",
    company: "Civitime",
    role: "Lead Dev Full-Stack",
    description:
      "4 ans à structurer la stack technique d'une startup EdTech : serious games RSE, refonte DDD, éditeur de contenu.",
    icon: Briefcase,
    gradient: "from-accent to-orange-600",
    side: "right" as const,
    highlight: "4 ans",
  },
  {
    period: "2025 - Présent",
    company: "ScormPilot",
    role: "Développeur Full-Stack",
    description:
      "SaaS e-learning from scratch. Next.js, NestJS, PostgreSQL.",
    icon: Code2,
    gradient: "from-emerald-500 to-teal-500",
    side: "left" as const,
    highlight: "SaaS",
  },
  {
    period: "2024 - 2025",
    company: "Superprof",
    role: "Mentor Dev Web",
    description:
      "Accompagnement de 10+ devs sur React, Clean Architecture et bonnes pratiques.",
    icon: GraduationCap,
    gradient: "from-purple-500 to-pink-500",
    side: "right" as const,
    highlight: "10+ élèves",
  },
  {
    period: "2025 - Présent",
    company: "Freelance",
    role: "Développeur Full-Stack",
    description:
      "J'accompagne startups et entrepreneurs. MVP, refontes, SaaS sur mesure.",
    icon: Rocket,
    gradient: "from-blue-500 to-cyan-500",
    side: "left" as const,
    highlight: "Dispo",
  },
] as const;

const ExperienceTimeline = () => {
  return (
    <section
      id="parcours"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="parcours-title"
    >
      <RevealContainer className="text-center mb-12 sm:mb-16 md:mb-20">
        <RevealItem direction="scale">
          <motion.div className="badge mb-4" whileHover={{ scale: 1.05 }}>
            <span className="animate-icon-wiggle">
              <Briefcase className="w-4 h-4 text-accent" />
            </span>
            <span className="text-sm font-medium">Parcours</span>
          </motion.div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="parcours-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Mon expérience professionnelle
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base"
          >
            5+ années à construire des produits web solides et scalables
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <div className="relative max-w-4xl mx-auto">
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, var(--accent), var(--accent), transparent)",
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        <div className="relative space-y-6 md:space-y-0">
          {experiences.map((exp, index) => {
            const Icon = exp.icon;
            const isLeft = exp.side === "left";

            return (
              <motion.div
                key={exp.company}
                className={`relative md:flex md:items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
              >
                <div
                  className={`md:w-1/2 ${isLeft ? "md:pr-12 md:text-right" : "md:pl-12"}`}
                >
                  <MagneticWrapper strength={0.15}>
                    <TiltCard className="rounded-2xl" tiltAmount={6} glareOpacity={0.08}>
                      <motion.div
                        className="relative p-5 sm:p-6 rounded-2xl card-accent overflow-hidden group"
                        whileHover={{
                          boxShadow: "0 20px 40px rgba(255, 77, 0, 0.12)",
                        }}
                      >
                        <motion.div
                          className={`absolute top-3 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold z-20 ${isLeft ? "right-3" : "right-3"}`}
                          initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.12 + 0.3 }}
                        >
                          {exp.highlight}
                        </motion.div>

                        <motion.div
                          className={`absolute -top-16 ${isLeft ? "-left-16" : "-right-16"} w-32 h-32 rounded-full bg-gradient-to-br ${exp.gradient} opacity-0 blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
                        />

                        <div
                          className={`relative z-10 flex items-start gap-4 ${isLeft ? "md:flex-row-reverse" : ""}`}
                        >
                          <div
                            className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg animate-bounce-soft`}
                            style={{ animationDelay: `${index * 0.3}s` }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          <div className={`flex-1 ${isLeft ? "md:text-right" : ""}`}>
                            <motion.p
                              className={`text-xs uppercase tracking-wider font-semibold bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent`}
                            >
                              {exp.period}
                            </motion.p>
                            <h3 className="mt-1 text-lg sm:text-xl font-bold text-primary">
                              {exp.company}
                            </h3>
                            <p className="text-sm font-medium text-accent">
                              {exp.role}
                            </p>
                            <Paragraphe
                              variant="secondary"
                              size="sm"
                              className="mt-2 text-sm"
                            >
                              {exp.description}
                            </Paragraphe>
                          </div>
                        </div>

                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5"
                          style={{
                            background:
                              "linear-gradient(to right, transparent, var(--accent), transparent)",
                          }}
                          initial={{ scaleX: 0, opacity: 0 }}
                          whileHover={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </TiltCard>
                  </MagneticWrapper>
                </div>

                <motion.div
                  className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.12 + 0.2,
                    type: "spring",
                    stiffness: 400,
                  }}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-br ${exp.gradient} shadow-lg ring-4 ring-background animate-scale-pulse`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  />
                </motion.div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;
