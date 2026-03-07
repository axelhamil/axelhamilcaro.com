"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowLeft,
  BarChart3,
  Cloud,
  Code2,
  Database,
  Globe,
  Layers,
  LayoutDashboard,
  Lock,
  Monitor,
  Package,
  Server,
  Share2,
  Shield,
  Target,
  TestTube2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { MagneticWrapper } from "@/components/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import TransitionLink from "@/components/shared/navigation/transition-link";
import { Heading2 } from "@/components/typography/heading2";
import { Paragraph } from "@/components/typography/paragraph";

const SP = {
  navy: "#1B3A5C",
  blue: "#2563EB",
  cyan: "#06B6D4",
  teal: "#0D9488",
  orange: "#F59E0B",
  light: "#F0F7FF",
} as const;

const stats = [
  {
    value: "7",
    label: "Applications",
    sublabel: "Monorepo Turborepo",
    color: SP.navy,
  },
  { value: "4", label: "Bounded Contexts", color: SP.blue },
  { value: "22", label: "Use Cases", color: SP.cyan },
  { value: "Milliers", label: "d'utilisateurs actifs", color: SP.teal },
  { value: "10+", label: "Organismes clients", color: SP.orange },
] as const;

const secondaryStats = [
  "RGPD conforme",
  "Hebergement 100% europeen",
  "Multi-tenant",
  "SaaS B2B",
  "Tours, France",
] as const;

const screenshots = [
  {
    src: "/portfolio/scormpilot/dashboard.webp",
    alt: "ScormPilot - Tableau de bord avec statistiques globales",
    label: "Dashboard",
    icon: BarChart3,
    color: SP.blue,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/modules.webp",
    alt: "ScormPilot - Performance detaillee des modules SCORM",
    label: "Modules",
    icon: Layers,
    color: SP.cyan,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/library.webp",
    alt: "ScormPilot - Bibliotheque de modules avec gestion des versions",
    label: "Bibliotheque",
    icon: Package,
    color: SP.teal,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/clients.webp",
    alt: "ScormPilot - Gestion multi-tenant des clients",
    label: "Clients",
    icon: Users,
    color: SP.orange,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/pricing.webp",
    alt: "ScormPilot - Grille tarifaire SaaS",
    label: "Pricing",
    icon: Target,
    color: SP.navy,
    width: 1500,
    height: 1061,
  },
] as const;

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Analytics",
    description:
      "Tableau de bord complet avec KPIs en temps reel : nombre d'utilisateurs, taux de completion, score moyen, duree moyenne, tendance des lancements. Filtrage par client et par date.",
    color: SP.blue,
  },
  {
    icon: Package,
    title: "Gestion des Modules",
    description:
      "Upload, versionning et pilotage a distance des fichiers SCORM. Remplacement de la source sans recharger cote client, tracking des progressions par module.",
    color: SP.navy,
  },
  {
    icon: Share2,
    title: "Multi-diffusion",
    description:
      "Quatre modes de diffusion : lien unique, code iframe, SCORM connecte (tracker injecte), application Microsoft Teams. Le client choisit son canal.",
    color: SP.cyan,
  },
  {
    icon: Users,
    title: "Multi-tenant",
    description:
      "Chaque client dispose d'un pool d'utilisateurs isole via Firebase Identity Platform. Trois modes d'authentification : email, anonyme, LMS.",
    color: SP.teal,
  },
  {
    icon: Shield,
    title: "RGPD & Securite",
    description:
      "Hebergement 100% europeen (GCP Belgique, DigitalOcean Frankfurt). Aucune donnee personnelle superflue collectee, serveurs dedies par organisme.",
    color: SP.orange,
  },
  {
    icon: Monitor,
    title: "SCORM Player & Runtime",
    description:
      "Player React avec mode demo et login LMS. Runtime vanilla TypeScript : orchestration SCORM complete, monitoring de connexion, observation des commits.",
    color: SP.navy,
  },
] as const;

const crossCutting = [
  {
    icon: Cloud,
    title: "Infrastructure Production",
    description:
      "CI/CD GitHub Actions, containers Docker sur Cloud Run, PostgreSQL manage, Firebase Auth/Storage. Status page sur Cloudflare Workers. 99.9% uptime.",
    color: SP.blue,
  },
  {
    icon: Globe,
    title: "Internationalisation",
    description:
      "Dashboard admin avec next-intl, player SCORM avec i18next. Interface disponible en francais et anglais, extensible a d'autres langues.",
    color: SP.teal,
  },
] as const;

const archHighlights = [
  {
    icon: Database,
    title: "Architecture Hexagonale",
    description:
      "Separation stricte domain / application / infrastructure. 4 bounded contexts (Organisme, Client, Module, Plan), 22 use cases, 25+ value objects, 7 ports d'abstraction.",
    color: SP.navy,
  },
  {
    icon: Server,
    title: "Monorepo Turborepo",
    description:
      "7 apps (API Fastify, Dashboard Next.js, Player React, Runtime SCORM, Teams App, App Builder, Status Page) et 5 packages partages (drizzle, libs, types, ui, config).",
    color: SP.blue,
  },
  {
    icon: Lock,
    title: "Multi-tenant & Auth",
    description:
      "Firebase Identity Platform avec tenant dedie par client. Trois modes d'auth (email, anonyme, LMS). Validators domaine pour l'isolation des donnees entre organismes.",
    color: SP.cyan,
  },
  {
    icon: TestTube2,
    title: "DI & Qualite",
    description:
      "InversifyJS pour l'injection de dependances. Validation Zod au demarrage (env vars). Containers Docker non-root, secrets valides au boot.",
    color: SP.teal,
  },
] as const;

const techStack = [
  { name: "Next.js 16", category: "frontend" },
  { name: "React 19", category: "frontend" },
  { name: "Vite 7", category: "frontend" },
  { name: "Tailwind CSS 4", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "Fastify 5", category: "backend" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "PostgreSQL 16", category: "backend" },
  { name: "InversifyJS", category: "backend" },
  { name: "Zod", category: "backend" },
  { name: "Firebase", category: "infra" },
  { name: "Google Cloud Run", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Turborepo", category: "infra" },
  { name: "GitHub Actions", category: "infra" },
  { name: "Cloudflare Workers", category: "infra" },
  { name: "Hexagonal Architecture", category: "architecture" },
  { name: "DDD", category: "architecture" },
  { name: "SCORM", category: "architecture" },
] as const;

const categoryColors: Record<string, string> = {
  architecture: SP.navy,
  backend: SP.cyan,
  frontend: SP.blue,
  infra: SP.teal,
};

const cardVariants: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" },
};

export default function ScormpilotShowcase() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const active = screenshots[activeScreenshot];

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${SP.light}50 0%, ${SP.blue}08 50%, transparent 80%)`,
        }}
      />

      {/* HERO */}
      <section ref={heroRef} className="relative pt-6 sm:pt-10 pb-12 sm:pb-16">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto"
        >
          <RevealContainer className="max-w-4xl">
            <RevealItem>
              <TransitionLink
                href="/#portfolio"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Retour aux projets
              </TransitionLink>
            </RevealItem>

            <RevealItem>
              <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                <span className="badge text-xs uppercase tracking-widest font-semibold text-secondary">
                  Freelance — SaaS
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${SP.blue}12`,
                    color: SP.blue,
                    borderColor: `${SP.blue}30`,
                  }}
                >
                  <Package className="w-3 h-3" />
                  E-learning
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${SP.teal}12`,
                    color: SP.teal,
                    borderColor: `${SP.teal}30`,
                  }}
                >
                  <Shield className="w-3 h-3" />
                  RGPD
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${SP.navy}12`,
                    color: SP.navy,
                    borderColor: `${SP.navy}30`,
                  }}
                >
                  <Code2 className="w-3 h-3" />
                  Solo Dev
                </span>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="flex items-center gap-4 sm:gap-6">
                <Image
                  src="/portfolio/scormpilot/logo.webp"
                  alt="ScormPilot logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  unoptimized
                />
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  ScormPilot
                </h1>
              </div>
            </RevealItem>

            <RevealItem>
              <p
                className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-secondary max-w-2xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Plateforme SaaS de gestion et diffusion de modules SCORM
              </p>
            </RevealItem>

            <RevealItem>
              <Paragraph
                variant="secondary"
                className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
              >
                Produit concu, developpe et mis en production en solo. Alternative
                simple aux LMS rigides pour les organismes de formation :
                versioning, multi-diffusion, analytics, multi-tenant. Plusieurs
                milliers de players quotidiens, dizaines de clients actifs.
              </Paragraph>
            </RevealItem>
          </RevealContainer>
        </motion.div>
      </section>

      {/* STATS */}
      <section
        className="relative py-6 sm:py-8"
        style={{ background: `${SP.light}25` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${SP.blue}40, ${SP.cyan}40, ${SP.teal}40, ${SP.orange}40, transparent 90%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${SP.orange}40, ${SP.teal}40, ${SP.cyan}40, ${SP.blue}40, transparent 90%)`,
          }}
        />
        <RevealContainer
          staggerDelay={0.06}
          className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} direction="scale">
              <MagneticWrapper strength={0.03}>
                <motion.div
                  className="text-center cursor-default"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <p
                    className="text-3xl sm:text-4xl md:text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-secondary uppercase tracking-wider">
                    {stat.label}
                  </p>
                  {"sublabel" in stat && stat.sublabel && (
                    <p
                      className="text-[10px] font-medium uppercase tracking-wider mt-0.5"
                      style={{ color: stat.color }}
                    >
                      {stat.sublabel}
                    </p>
                  )}
                </motion.div>
              </MagneticWrapper>
            </RevealItem>
          ))}
        </RevealContainer>

        <RevealContainer className="container mx-auto mt-4">
          <RevealItem>
            <p className="text-center text-xs text-muted tracking-wide">
              {secondaryStats.join(" · ")}
            </p>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* CONTEXTE & ROLE */}
      <section className="relative py-12 sm:py-16">
        <RevealContainer className="container mx-auto max-w-4xl">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Contexte</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Le projet
            </Heading2>
          </RevealItem>
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.1}
          className="container mx-auto max-w-4xl mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          <RevealItem direction="left">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${SP.blue}`,
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3
                className="text-sm sm:text-base font-semibold text-primary mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Le probleme
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Les organismes de formation qui vendent des modules SCORM
                n'ont aucun controle une fois le fichier ZIP envoye au client.
                Les LMS sont rigides, couteux et surdimensionnes pour la
                simple diffusion de contenus e-learning.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${SP.cyan}`,
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3
                className="text-sm sm:text-base font-semibold text-primary mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                La solution
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                ScormPilot centralise les modules SCORM et permet leur
                diffusion multi-canal (lien, iframe, SCORM connecte, Teams).
                L'organisme garde le controle sur le versioning, les acces
                et les analytics de ses contenus.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="left">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${SP.teal}`,
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3
                className="text-sm sm:text-base font-semibold text-primary mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Mon role
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Conception produit, architecture, developpement de 7 applications
                (API, dashboard, player, runtime, Teams, status page),
                infrastructure cloud et mise en production. Tout en solo,
                du premier commit a la premiere facture.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${SP.orange}`,
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <h3
                className="text-sm sm:text-base font-semibold text-primary mb-2"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Resultats
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                MVP robuste livre en 3 mois. Adopte par une dizaine
                d'organismes de formation, plusieurs milliers de players
                quotidiens, dizaines de clients actifs. Produit en croissance
                continue avec un modele SaaS recurrent.
              </p>
            </motion.div>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* SCREENSHOTS */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${SP.light}18` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <LayoutDashboard className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Apercu</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              L'application en images
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Dashboard admin, gestion des modules, suivi des clients et
              analytics detaillees par module.
            </Paragraph>
          </RevealItem>
        </RevealContainer>

        <RevealContainer className="container mx-auto max-w-5xl">
          <RevealItem>
            <div className="flex justify-center gap-1 sm:gap-1.5 mb-5 sm:mb-6 flex-wrap">
              {screenshots.map((s, i) => {
                const isActive = activeScreenshot === i;
                return (
                  <motion.button
                    key={s.label}
                    type="button"
                    onClick={() => setActiveScreenshot(i)}
                    className="relative flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[11px] sm:text-sm font-medium transition-all duration-200"
                    style={{
                      background: isActive ? s.color : `${s.color}08`,
                      color: isActive ? "#fff" : "var(--secondary)",
                      boxShadow: isActive ? `0 4px 16px ${s.color}35` : "none",
                      border: `1px solid ${isActive ? s.color : `${s.color}15`}`,
                    }}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <s.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 hidden sm:block" />
                    {s.label}
                  </motion.button>
                );
              })}
            </div>
          </RevealItem>

          <RevealItem>
            <TiltCard
              className="rounded-2xl sm:rounded-3xl"
              tiltAmount={2}
              glareOpacity={0.03}
            >
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
                style={{
                  boxShadow: `0 25px 80px ${active.color}12, 0 8px 32px rgba(0,0,0,0.06)`,
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.src}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Image
                      src={active.src}
                      alt={active.alt}
                      width={active.width}
                      height={active.height}
                      className="w-full h-auto"
                      priority={activeScreenshot === 0}
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </TiltCard>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* FEATURES */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${SP.light}12` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Layers className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Fonctionnalites</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Ce que j'ai construit
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Dashboard analytics, gestion multi-tenant, diffusion multi-canal
              et runtime SCORM custom. Un produit complet deploye en production.
            </Paragraph>
          </RevealItem>
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.08}
          className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-5xl"
        >
          {features.map((feature, i) => (
            <RevealItem
              key={feature.title}
              direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
            >
              <MagneticWrapper strength={0.03}>
                <TiltCard
                  className="h-full rounded-xl"
                  tiltAmount={4}
                  glareOpacity={0.04}
                >
                  <motion.div
                    className="relative rounded-xl overflow-hidden h-full p-4 sm:p-5"
                    style={{
                      background: "var(--primary-background)",
                      border: "1px solid var(--border)",
                      borderLeft: `3px solid ${feature.color}`,
                    }}
                    variants={cardVariants}
                    initial="rest"
                    whileHover="hover"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${feature.color}12`,
                        }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <feature.icon
                          className="w-4.5 h-4.5"
                          style={{ color: feature.color }}
                        />
                      </motion.div>
                      <div className="min-w-0">
                        <h3
                          className="text-sm sm:text-base font-semibold text-primary"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-secondary leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </MagneticWrapper>
            </RevealItem>
          ))}
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.1}
          className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mt-4"
        >
          {crossCutting.map((item, i) => (
            <RevealItem key={item.title} direction={i === 0 ? "left" : "right"}>
              <MagneticWrapper strength={0.03}>
                <motion.div
                  className="rounded-xl p-4 sm:p-5 h-full"
                  style={{
                    background: "var(--primary-background)",
                    border: "1px solid var(--border)",
                    borderLeft: `3px solid ${item.color}`,
                  }}
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}12` }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <item.icon
                        className="w-4.5 h-4.5"
                        style={{ color: item.color }}
                      />
                    </motion.div>
                    <div className="min-w-0">
                      <h3
                        className="text-sm sm:text-base font-semibold text-primary"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MagneticWrapper>
            </RevealItem>
          ))}
        </RevealContainer>
      </section>

      {/* ARCHITECTURE */}
      <section className="relative py-12 sm:py-16">
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Server className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Architecture</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Decisions techniques
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Une architecture hexagonale avec DDD, pensee pour la scalabilite
              et l'isolation multi-tenant des donnees.
            </Paragraph>
          </RevealItem>
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.1}
          className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 max-w-4xl"
        >
          {archHighlights.map((item, i) => (
            <RevealItem
              key={item.title}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <MagneticWrapper strength={0.03}>
                <motion.div
                  className="rounded-xl p-4 sm:p-5 h-full"
                  style={{
                    background: "var(--primary-background)",
                    border: "1px solid var(--border)",
                    borderLeft: `3px solid ${item.color}`,
                  }}
                  variants={cardVariants}
                  initial="rest"
                  whileHover="hover"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}12` }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <item.icon
                        className="w-4.5 h-4.5"
                        style={{ color: item.color }}
                      />
                    </motion.div>
                    <div>
                      <h3
                        className="text-sm sm:text-base font-semibold text-primary"
                        style={{ fontFamily: "var(--font-space-grotesk)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MagneticWrapper>
            </RevealItem>
          ))}
        </RevealContainer>
      </section>

      {/* TECH STACK */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${SP.light}12` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <TestTube2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Stack technique</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Technologies utilisees
            </Heading2>
          </RevealItem>
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.03}
          className="container mx-auto max-w-3xl"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => {
              const color = categoryColors[tech.category] || SP.blue;
              return (
                <RevealItem key={tech.name} direction="scale">
                  <MagneticWrapper strength={0.04}>
                    <motion.span
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium cursor-default"
                      style={{
                        background: `${color}10`,
                        border: `1px solid ${color}25`,
                        color: "var(--primary)",
                      }}
                      whileHover={{
                        scale: 1.06,
                        y: -2,
                        boxShadow: `0 6px 16px ${color}15`,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: color }}
                      />
                      {tech.name}
                    </motion.span>
                  </MagneticWrapper>
                </RevealItem>
              );
            })}
          </div>
        </RevealContainer>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-10 sm:py-14">
        <RevealContainer className="container mx-auto text-center">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.02}>
              <TransitionLink
                href="/#portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-border hover:border-accent hover:shadow-lg transition-all group"
                style={{ background: "var(--primary-background)" }}
              >
                <ArrowLeft className="w-4 h-4 text-accent transition-transform group-hover:-translate-x-1" />
                Voir tous les projets
              </TransitionLink>
            </MagneticWrapper>
          </RevealItem>
        </RevealContainer>
      </section>
    </div>
  );
}
