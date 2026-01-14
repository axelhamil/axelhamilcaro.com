"use client";

import { motion } from "framer-motion";
import { Award, Building2 } from "lucide-react";
import { Heading2, Paragraphe } from "@/components/typography";
import { AnimatedCounter } from "../shared/effects/animated-counter";
import { MagneticWrapper } from "../shared/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";

const companies = [
  {
    name: "Civitime",
    type: "EdTech",
    logo: "CT",
    gradient: "from-accent to-orange-600",
  },
  {
    name: "ScormPilot",
    type: "SaaS B2B",
    logo: "SP",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Superprof",
    type: "Plateforme",
    logo: "S",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "MentorTroc",
    type: "App sociale",
    logo: "MT",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Artisans",
    type: "Sites vitrines",
    logo: "AL",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    name: "Startups",
    type: "MVPs",
    logo: "S+",
    gradient: "from-cyan-500 to-blue-500",
  },
] as const;

const CompanyCard = ({ company }: { company: (typeof companies)[number] }) => (
  <MagneticWrapper strength={0.04}>
    <motion.div
      className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white border border-border/50 shadow-sm hover:shadow-lg transition-all cursor-pointer shrink-0"
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <motion.div
        className={`w-10 h-10 rounded-lg bg-gradient-to-br ${company.gradient} flex items-center justify-center shadow-md`}
        whileHover={{ rotate: 8, scale: 1.1 }}
      >
        <span
          className="text-xs font-bold text-white"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {company.logo}
        </span>
      </motion.div>
      <div>
        <p
          className="font-semibold text-primary text-sm whitespace-nowrap"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {company.name}
        </p>
        <p className="text-xs text-secondary whitespace-nowrap">
          {company.type}
        </p>
      </div>
    </motion.div>
  </MagneticWrapper>
);

const TrustedBy = () => {
  return (
    <section
      id="trusted-by"
      className="relative py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="trusted-by-title"
    >
      <RevealContainer className="container mx-auto text-center mb-10 sm:mb-12">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.03}>
            <motion.div
              className="badge mb-4 inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Building2 className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-sm font-medium">Références</span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="trusted-by-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Projets et collaborations
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Startups tech, scale-ups et entrepreneurs. Du MVP au produit en
            production.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...companies, ...companies, ...companies, ...companies].map(
            (company, i) => (
              <CompanyCard key={`${company.name}-${i}`} company={company} />
            ),
          )}
        </motion.div>
      </div>

      <RevealContainer className="container mx-auto text-center mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.025}>
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
                  <AnimatedCounter value="20+" className="inline" />
                </span>{" "}
                applications livrées depuis 2020 · Disponible pour votre projet
              </span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default TrustedBy;
