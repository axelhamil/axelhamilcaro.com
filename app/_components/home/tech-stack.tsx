"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight, Cpu, Gauge, Layers, Shield } from "lucide-react";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import cn from "../../_lib/cn";

const blocks = [
  {
    eyebrow: "Core",
    title: "App moderne, base saine",
    desc: "TypeScript + Next.js pour ship vite, sans dette invisible.",
    icon: Layers,
    accent: "text-accent-mauve",
    border: "hover:border-accent-mauve/50",
    gradient: "from-accent-mauve/16 to-accent-mauve/5",
    bullets: [
      "Architecture claire (DDD / boundaries)",
      "Refactors rapides et sûrs",
      "Composants réutilisables",
    ],
  },
  {
    eyebrow: "Produit",
    title: "UI premium, sans gimmicks",
    desc: "Tailwind + motion utile pour un rendu clean et cohérent.",
    icon: Gauge,
    accent: "text-accent-blue",
    border: "hover:border-accent-blue/50",
    gradient: "from-accent-blue/16 to-accent-blue/5",
    bullets: [
      "Responsive solide",
      "SEO technique + accessibilité",
      "Micro-interactions sobres",
    ],
  },
  {
    eyebrow: "Production",
    title: "Backend fiable, prod pilotable",
    desc: "Node + PostgreSQL avec monitoring et déploiements maîtrisés.",
    icon: Shield,
    accent: "text-accent-teal",
    border: "hover:border-accent-teal/50",
    gradient: "from-accent-teal/16 to-accent-teal/5",
    bullets: ["Observabilité", "Scalabilité pragmatique", "Sécurité & rôles"],
  },
] as const;

const TechStack = () => {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
  };

  const item = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    show: prefersReducedMotion
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        },
  };

  return (
    <section
      id="stack"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="stack-title"
    >
      {/* Header ultra lisible */}
      <motion.div
        className="text-center mb-10 sm:mb-12 md:mb-16"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass-card">
            <Cpu className="w-4 h-4 text-accent-blue" />
            <span className="text-sm font-medium text-primary">Stack</span>
          </div>
        </motion.div>

        <motion.div variants={item}>
          <Heading2
            id="stack-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
          >
            Une stack au service du produit
          </Heading2>
        </motion.div>

        <motion.div variants={item}>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base"
          >
            Moins de buzzwords. Plus de résultats : performance, qualité, SEO,
            et sérénité en production.
          </Paragraphe>
        </motion.div>
      </motion.div>

      {/* 3 cartes scannables */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        {blocks.map((b) => {
          const Icon = b.icon;

          return (
            <motion.article
              key={b.title}
              variants={item}
              className={cn(
                "group relative rounded-2xl glass-card glow-border border border-secondary/20",
                "p-5 sm:p-6",
                "transition-all duration-500",
                "hover:-translate-y-2 hover:shadow-xl",
                b.border,
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-500 pointer-events-none",
                  `bg-linear-to-br ${b.gradient}`,
                )}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-secondary">
                      {b.eyebrow}
                    </p>
                    <h3 className="mt-1 text-lg sm:text-xl font-semibold text-primary">
                      {b.title}
                    </h3>
                  </div>

                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center",
                      "border border-secondary/20 bg-secondary-background/40",
                      "transition-all duration-500",
                      "group-hover:scale-110 group-hover:rotate-3",
                    )}
                    aria-hidden="true"
                  >
                    <Icon className={cn("w-5 h-5", b.accent)} />
                  </div>
                </div>

                <p className="mt-3 text-sm text-secondary leading-relaxed">
                  {b.desc}
                </p>

                <ul className="mt-4 space-y-2">
                  {b.bullets.map((txt) => (
                    <li key={txt} className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 mt-0.5 text-secondary" />
                      <span className="text-sm text-primary">{txt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      {/* Footer sobre */}
      <motion.div
        className="text-center mt-10 sm:mt-12"
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
          <span className="text-xs sm:text-sm text-secondary">
            La stack s’adapte au contexte : MVP, refonte, SaaS multi-tenant,
            contraintes perf ou SEO.
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default TechStack;
