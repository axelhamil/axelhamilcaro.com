"use client";

import { Cpu, GitBranch, Radar, ShieldCheck, Zap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { RevealContainer, RevealItem } from "../shared/effects/reveal";
import { Heading2 } from "../ui/heading2";
import { Paragraphe } from "../ui/paragraphe";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Qualité durable",
    description:
      "Clean Architecture, boundaries claires, tests ciblés. Le produit reste évolutif.",
    gradient: "from-emerald-500 to-teal-500",
    number: "01",
  },
  {
    icon: Zap,
    title: "Performance & UX",
    description:
      "Core Web Vitals, accessibilité, et détails UI. Rapide, stable, premium.",
    gradient: "from-amber-500 to-orange-500",
    number: "02",
  },
  {
    icon: GitBranch,
    title: "Delivery pragmatique",
    description:
      "Itérations courtes, scope maîtrisé, release fréquentes. Tu vois l'impact vite.",
    gradient: "from-blue-500 to-cyan-500",
    number: "03",
  },
  {
    icon: Radar,
    title: "Observabilité",
    description:
      "Logs, métriques, alerting. Une prod pilotable, pas une boîte noire.",
    gradient: "from-purple-500 to-pink-500",
    number: "04",
  },
] as const;

const Approach = () => {
  return (
    <section
      id="approach"
      className="container mx-auto py-16 sm:py-20 md:py-24 scroll-mt-20"
      aria-labelledby="approach-title"
    >
      <RevealContainer className="text-center mb-10 sm:mb-12 md:mb-16">
        <RevealItem direction="scale">
          <motion.div
            className="badge mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Cpu className="w-4 h-4 text-accent" />
            </motion.span>
            <span className="text-sm font-medium">Approche</span>
          </motion.div>
        </RevealItem>

        <RevealItem>
          <Heading2
            id="approach-title"
            size="xl"
            className="text-2xl sm:text-3xl md:text-4xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Comment je construis
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraphe
            variant="secondary"
            className="mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base"
          >
            Une approche orientée produit, avec un standard de qualité qui tient
            dans le temps.
          </Paragraphe>
        </RevealItem>
      </RevealContainer>

      <RevealContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {pillars.map((p, index) => (
          <RevealItem key={p.title} direction="scale">
            <motion.div
              className="relative h-full flex flex-col items-center text-center gap-3 sm:gap-4 p-5 sm:p-6 rounded-2xl card-accent overflow-hidden group"
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.span
                className="absolute top-3 right-3 text-4xl font-bold text-border/50 select-none"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {p.number}
              </motion.span>

              <motion.div
                className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-br ${p.gradient} opacity-0 blur-3xl`}
                whileHover={{ opacity: 0.15 }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className={`relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shadow-lg`}
                whileHover={{
                  scale: 1.2,
                  rotate: 8,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <p.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>

              <h3 className="relative z-10 font-semibold text-primary text-lg sm:text-xl">
                {p.title}
              </h3>

              <Paragraphe
                variant="secondary"
                size="sm"
                className="relative z-10 text-sm"
              >
                {p.description}
              </Paragraphe>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, var(--accent), transparent)`,
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </RevealItem>
        ))}
      </RevealContainer>

      <RevealContainer className="text-center mt-10 sm:mt-12">
        <RevealItem direction="scale">
          <motion.div
            className="badge inline-flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </motion.span>
            <span className="text-xs sm:text-sm text-secondary">
              Résultat : un produit livrable rapidement, maintenable, et prêt
              pour la production.
            </span>
          </motion.div>
        </RevealItem>
      </RevealContainer>
    </section>
  );
};

export default Approach;
