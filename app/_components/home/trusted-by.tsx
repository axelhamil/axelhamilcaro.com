"use client";

import { Building2, Briefcase, Award } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { AnimatedCounter } from "../shared/effects/animated-counter";
import { TiltCard } from "../shared/effects/tilt-card";

const companies = [
  {
    name: "Civitime",
    type: "Elearning",
    logo: "CT",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Scormpilot",
    type: "SaaS B2B",
    logo: "SP",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "MentorTroc",
    type: "Éducation",
    logo: "MT",
    gradient: "from-purple-500 to-pink-500",
  },
] as const;

const TrustedBy = () => {
  return (
    <section
      id="trusted-by"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="trusted-by-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <motion.div className="badge mb-4" whileHover={{ scale: 1.05 }}>
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Briefcase className="w-4 h-4 text-accent" />
            </motion.span>
            <span className="text-sm font-medium">Références</span>
          </motion.div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="trusted-by-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Ils m'ont fait confiance
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Startups, scale-ups, et entreprises établies. Du MVP au produit
            mature.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer
        staggerDelay={0.15}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto"
      >
        {companies.map((company, index) => (
          <RevealItem key={company.name} direction="scale">
            <TiltCard
              className="h-full rounded-2xl"
              tiltAmount={10}
              glareOpacity={0.1}
            >
              <motion.div
                className="relative flex flex-col items-center justify-center gap-3 p-6 sm:p-8 rounded-2xl card-accent overflow-hidden h-full"
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(255, 77, 0, 0.15)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${company.gradient} opacity-0`}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />

                <motion.div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${company.gradient} opacity-10 blur-2xl`}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 45, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                />

                <motion.div
                  className={`relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${company.gradient} flex items-center justify-center shadow-xl`}
                  whileHover={{
                    scale: 1.15,
                    rotate: 5,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span
                    className="text-xl sm:text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {company.logo}
                  </span>
                </motion.div>

                <div className="relative z-10 text-center">
                  <motion.p
                    className="text-base sm:text-lg font-bold text-primary"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {company.name}
                  </motion.p>
                  <p className="text-xs sm:text-sm text-secondary mt-0.5">
                    {company.type}
                  </p>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{
                    background: `linear-gradient(to right, transparent, var(--accent), transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </TiltCard>
          </RevealItem>
        ))}
      </RevealContainer>

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <motion.div
            className="badge inline-flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              animate={{ rotate: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Award className="w-4 h-4 text-amber-500" />
            </motion.span>
            <span className="text-xs sm:text-sm text-secondary">
              <span className="font-semibold text-accent">
                <AnimatedCounter value="15+" className="inline" />
              </span>{" "}
              projets livrés depuis 2020 · Disponible pour nouveaux projets
            </span>
          </motion.div>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default TrustedBy;
