"use client";

import { motion } from "framer-motion";
import { Check, Cpu, Gauge, Layers, Shield } from "lucide-react";
import { DotGrid, GlowOrb } from "@/components/effects/geometric-shapes";
import { MagneticWrapper } from "@/components/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import { Heading2 } from "@/components/typography/heading2";
import { Paragraph } from "@/components/typography/paragraph";
import { cn } from "@/lib/utils";

const blocks = [
  {
    eyebrow: "Frontend",
    title: "React & Next.js",
    desc: "TypeScript strict, composants réutilisables et architecture modulaire pour une base de code évolutive.",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-500",
    bullets: [
      "Server Components & App Router",
      "State management optimisé",
      "Tests unitaires et E2E",
    ],
  },
  {
    eyebrow: "UI/UX",
    title: "Design system moderne",
    desc: "Tailwind CSS, animations Framer Motion et composants accessibles pour une expérience utilisateur premium.",
    icon: Gauge,
    gradient: "from-amber-500 to-orange-500",
    bullets: [
      "Responsive mobile-first",
      "SEO technique optimisé",
      "Accessibilité WCAG",
    ],
  },
  {
    eyebrow: "Backend",
    title: "Node.js & PostgreSQL",
    desc: "APIs REST/GraphQL, authentification sécurisée et base de données performante pour des applications robustes.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    bullets: [
      "APIs documentées",
      "Authentification OAuth/JWT",
      "Migrations et backups",
    ],
  },
] as const;

const TechStack = () => {
  return (
    <section
      id="stack"
      className="relative container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20 overflow-hidden"
      aria-labelledby="stack-title"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <DotGrid
          rows={5}
          cols={5}
          gap={20}
          className="top-20 right-10 opacity-30"
        />
        <DotGrid
          rows={4}
          cols={4}
          gap={16}
          className="bottom-32 left-10 opacity-20"
        />
        <GlowOrb
          size={350}
          position={{ bottom: "20%", left: "5%" }}
          intensity="low"
        />
      </div>

      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.03}>
            <motion.div
              className="badge mb-4 inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ rotate: [0, 90, 180] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <Cpu className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-sm font-medium">Stack</span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="stack-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Technologies et expertise
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraph
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base"
          >
            Une stack moderne et éprouvée pour des applications performantes,
            maintenables et scalables
          </Paragraph>
        </RevealItem>
      </RevealContainer>

      <RevealContainer
        staggerDelay={0.15}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
      >
        {blocks.map((b, index) => {
          const Icon = b.icon;

          return (
            <RevealItem
              key={b.title}
              direction={index === 1 ? "up" : index === 0 ? "left" : "right"}
            >
              <MagneticWrapper strength={0.04}>
                <TiltCard
                  className="h-full rounded-2xl"
                  tiltAmount={6}
                  glareOpacity={0.08}
                >
                  <motion.div
                    className={cn(
                      "group relative rounded-2xl card-accent overflow-hidden h-full",
                      "p-5 sm:p-6",
                    )}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 16px 32px rgba(0, 0, 0, 0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${b.gradient} opacity-0 blur-3xl`}
                      whileHover={{ opacity: 0.1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <motion.p
                            className={`text-xs uppercase tracking-wider font-semibold bg-gradient-to-r ${b.gradient} bg-clip-text text-transparent`}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                          >
                            {b.eyebrow}
                          </motion.p>
                          <h3 className="mt-1 text-lg sm:text-xl font-semibold text-primary">
                            {b.title}
                          </h3>
                        </div>

                        <motion.div
                          className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                            `bg-gradient-to-br ${b.gradient}`,
                          )}
                          whileHover={{
                            scale: 1.08,
                            rotate: 4,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>

                      <p className="mt-3 text-sm text-secondary leading-relaxed">
                        {b.desc}
                      </p>

                      <ul className="mt-4 space-y-2">
                        {b.bullets.map((txt, bulletIndex) => (
                          <motion.li
                            key={txt}
                            className="flex items-start gap-2"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + bulletIndex * 0.1 }}
                          >
                            <motion.span
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 350 }}
                            >
                              <Check className="w-4 h-4 mt-0.5 text-accent" />
                            </motion.span>
                            <span className="text-sm text-primary">{txt}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1"
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
            </RevealItem>
          );
        })}
      </RevealContainer>

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.025}>
            <motion.div
              className="badge inline-flex"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Cpu className="w-4 h-4 text-accent" />
              </motion.span>
              <span className="text-xs sm:text-sm text-secondary">
                Stack adaptable : MVP rapide, refonte progressive, SaaS
                multi-tenant ou app haute performance
              </span>
            </motion.div>
          </MagneticWrapper>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default TechStack;
