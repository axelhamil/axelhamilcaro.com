"use client";

import { ChevronRight, Cpu, Gauge, Layers, Shield, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import cn from "../../_lib/cn";

const blocks = [
  {
    eyebrow: "Core",
    title: "App moderne, base saine",
    desc: "TypeScript + Next.js pour ship vite, sans dette invisible.",
    icon: Layers,
    gradient: "from-blue-500 to-cyan-500",
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
    gradient: "from-amber-500 to-orange-500",
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
    gradient: "from-emerald-500 to-teal-500",
    bullets: ["Observabilité", "Scalabilité pragmatique", "Sécurité & rôles"],
  },
] as const;

const TechStack = () => {
  return (
    <section
      id="stack"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="stack-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <motion.div
            className="badge mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 text-accent" />
            </motion.span>
            <span className="text-sm font-medium">Stack</span>
          </motion.div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="stack-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Une stack au service du produit
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base"
          >
            Moins de buzzwords. Plus de résultats : performance, qualité, SEO,
            et sérénité en production.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer staggerDelay={0.15} className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {blocks.map((b, index) => {
          const Icon = b.icon;

          return (
            <RevealItem key={b.title} direction={index === 1 ? "up" : index === 0 ? "left" : "right"}>
              <motion.div
                className={cn(
                  "group relative rounded-2xl card-accent overflow-hidden",
                  "p-5 sm:p-6",
                )}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
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
                        scale: 1.15,
                        rotate: 8,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                        transition={{ delay: 0.3 + bulletIndex * 0.1 }}
                      >
                        <motion.span
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
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
                    background: `linear-gradient(to right, transparent, var(--accent), transparent)`,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileHover={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </RevealItem>
          );
        })}
      </RevealContainer>

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <motion.div
            className="badge"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Cpu className="w-4 h-4 text-accent" />
            </motion.span>
            <span className="text-xs sm:text-sm text-secondary">
              La stack s'adapte au contexte : MVP, refonte, SaaS multi-tenant,
              contraintes perf ou SEO.
            </span>
          </motion.div>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default TechStack;
