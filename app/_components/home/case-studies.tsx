"use client";

import { Briefcase, ExternalLink, Layers, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2, Paragraphe } from "@/components/typography";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { TiltCard } from "../shared/effects/tilt-card";
import { MagneticWrapper } from "../shared/effects/magnetic-wrapper";
import { DotGrid, GlowOrb } from "../shared/effects/geometric-shapes";

const projects = [
  {
    title: "ScormPilot",
    type: "SaaS from scratch",
    description:
      "Création complète d'un SaaS e-learning : architecture, développement et déploiement. Plateforme stable, extensible et prête à scaler.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Stripe"],
    metric: "SaaS complet",
    metricLabel: "en production",
    gradient: "from-emerald-500 to-teal-500",
    logo: "SP",
  },
  {
    title: "Billetterie Interne",
    type: "Dashboard temps réel",
    description:
      "Dashboard interne pour la gestion de billetterie en temps réel. Interface fluide, données live et fiabilité en production.",
    tech: ["Next.js", "NestJS", "WebSocket", "PostgreSQL"],
    metric: "Temps réel",
    metricLabel: "fluide et fiable",
    gradient: "from-blue-500 to-cyan-500",
    logo: "BI",
  },
  {
    title: "Civitime",
    type: "Éditeur de contenu",
    description:
      "4 ans de développement sur un éditeur e-learning complexe. Architecture DDD, Event Sourcing et nouveau produit SCORM.",
    tech: ["React", "DDD", "Event Sourcing", "SCORM"],
    metric: "Délais ÷2",
    metricLabel: "sur les itérations",
    gradient: "from-accent to-orange-600",
    logo: "CT",
  },
] as const;

const CaseStudies = () => {
  return (
    <section
      id="projets"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="projets-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <DotGrid rows={4} cols={4} gap={18} className="top-16 left-10 opacity-25" />
        <DotGrid rows={3} cols={3} gap={14} className="bottom-24 right-10 opacity-20" />
        <GlowOrb size={300} position={{ top: "30%", right: "10%" }} intensity="low" />
      </div>

      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.1}>
            <motion.div className="badge mb-4 inline-flex" whileHover={{ scale: 1.05 }}>
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Briefcase className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-sm font-medium">Projets</span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="projets-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Projets et réalisations
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Du MVP au produit en production. Des projets concrets avec des résultats mesurables.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer
        staggerDelay={0.15}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
      >
        {projects.map((project, index) => (
          <RevealItem
            key={project.title}
            direction={index === 1 ? "up" : index === 0 ? "left" : "right"}
          >
            <MagneticWrapper strength={0.12}>
              <TiltCard className="h-full rounded-2xl" tiltAmount={6} glareOpacity={0.08}>
                <motion.div
                  className="group relative rounded-2xl card-accent overflow-hidden h-full p-5 sm:p-6"
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl`}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <motion.p
                          className={`text-xs uppercase tracking-wider font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {project.type}
                        </motion.p>
                        <h3 className="mt-1 text-lg sm:text-xl font-semibold text-primary">
                          {project.title}
                        </h3>
                      </div>

                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <span
                          className="text-xs font-bold text-white"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {project.logo}
                        </span>
                      </motion.div>
                    </div>

                    <p className="text-sm text-secondary leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs font-medium bg-primary/5 text-secondary rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <motion.div
                      className={`flex items-center gap-2 pt-4 border-t border-border/50`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Zap className={`w-4 h-4 text-accent`} />
                      <span className="text-sm font-semibold text-accent">
                        {project.metric}
                      </span>
                      <span className="text-xs text-secondary">{project.metricLabel}</span>
                    </motion.div>
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
            </MagneticWrapper>
          </RevealItem>
        ))}
      </RevealContainer>

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.08}>
            <motion.div className="badge inline-flex" whileHover={{ scale: 1.02 }}>
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Layers className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-xs sm:text-sm text-secondary">
                Plus de projets disponibles sur demande
              </span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default CaseStudies;
