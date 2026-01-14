"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Code2, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/portfolio";
import { Heading2, Paragraphe } from "@/components/typography";
import { AnimatedCounter } from "../../shared/effects/animated-counter";
import { PulsingDot } from "../../shared/effects/floating-element";
import { MagneticWrapper } from "../../shared/effects/magnetic-wrapper";
import { RunawayBadge } from "../../shared/effects/runaway-badge";
import { LetterReveal } from "../../shared/effects/text-reveal";
import { HeroMotionItem } from "./hero-motion";

const stats = [
  { v: "5+", l: "ans d'expérience" },
  { v: "20+", l: "apps livrées" },
  { v: "100%", l: "satisfaction client" },
] as const;

const techIcons = [
  { Icon: Code2, label: "React / Next.js", delay: 0 },
  { Icon: Zap, label: "TypeScript", delay: 0.1 },
  { Icon: Rocket, label: "Node.js", delay: 0.2 },
];

const HeroLeft = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8 min-w-0">
      <HeroMotionItem>
        <div className="flex flex-wrap items-center gap-2">
          <RunawayBadge
            className="badge group"
            maxEscapes={5}
            escapeDistance={60}
          >
            <PulsingDot size="sm" />
            <span className="text-xs sm:text-sm font-medium">
              Disponible · Paris & Remote
            </span>
          </RunawayBadge>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-bold text-primary"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          <LetterReveal text="Développeur" delay={0.2} />
          <br className="hidden sm:block" />{" "}
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="inline-block animate-color-pulse">FullStack</span>
          </motion.span>{" "}
          <LetterReveal text="Freelance" delay={0.8} />
        </h1>
      </HeroMotionItem>

      <HeroMotionItem>
        <Heading2
          size="lg"
          className="text-lg sm:text-xl md:text-2xl flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {techIcons.map(({ Icon, label, delay }, index) => (
            <motion.span
              key={label}
              className="inline-flex items-center gap-1.5 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + delay, duration: 0.5 }}
            >
              <span
                className="animate-icon-wiggle"
                style={{ animationDelay: `${delay * 2}s` }}
              >
                <Icon className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              </span>
              {label}
              {index < techIcons.length - 1 && (
                <span className="hidden sm:inline text-muted ml-3">·</span>
              )}
            </motion.span>
          ))}
        </Heading2>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="flex flex-col gap-3 md:gap-4 min-w-0">
          <Paragraphe size="lg" className="text-base md:text-lg">
            Je suis <strong>Axel Hamilcaro</strong>, développeur web freelance
            basé à Paris. Je crée des{" "}
            <span className="font-semibold text-primary">
              applications web performantes et scalables
            </span>{" "}
            pour startups et entreprises tech.
          </Paragraphe>

          <Paragraphe size="md" className="text-base md:text-lg text-secondary">
            Spécialiste <strong>React, Next.js et TypeScript</strong>.
            J'accompagne mes clients du MVP à la production : SaaS, plateformes
            métier, et APIs robustes.
          </Paragraphe>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
          <MagneticWrapper strength={0.06}>
            <Button
              href="https://calendly.com/axel-hamilcaro-pro/appel-decouverte"
              external
              size="lg"
              className="w-full sm:w-auto justify-center group"
            >
              <span
                className="animate-wiggle"
                style={{ animationDuration: "3s" }}
              >
                <Calendar className="w-5 h-5" />
              </span>
              Discuter de ton projet
            </Button>
          </MagneticWrapper>

          <MagneticWrapper strength={0.06}>
            <Button
              href="/tree"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto justify-center group"
            >
              Mes réseaux
              <span className="inline-block animate-bounce-x">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Button>
          </MagneticWrapper>
        </div>
      </HeroMotionItem>

      <HeroMotionItem>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2">
          {stats.map(({ v, l }, _index) => (
            <motion.div
              key={l}
              className="flex flex-col items-center px-4 py-3 rounded-xl card-accent"
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 10px 30px rgba(255, 77, 0, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <AnimatedCounter
                value={v}
                className="text-2xl sm:text-3xl font-bold text-accent"
              />
              <span className="text-xs sm:text-sm text-secondary text-center">
                {l}
              </span>
            </motion.div>
          ))}
        </div>
      </HeroMotionItem>
    </div>
  );
};

export default HeroLeft;
