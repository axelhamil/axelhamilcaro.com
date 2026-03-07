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
  BookOpen,
  Boxes,
  BrainCircuit,
  Building2,
  Code2,
  Database,
  Gamepad2,
  Globe,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Palette,
  Puzzle,
  Server,
  Sparkles,
  Target,
  TestTube2,
  TreePine,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { MagneticWrapper } from "@/components/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import TransitionLink from "@/components/shared/navigation/transition-link";
import { Heading2 } from "@/components/typography/heading2";
import { Paragraph } from "@/components/typography/paragraph";

const CT = {
  charcoal: "#373034",
  gold: "#FDC300",
  orange: "#EB5A35",
  magenta: "#E20963",
  purple: "#8B1881",
  warm: "#FAF9F5",
} as const;

const stats = [
  { value: "4", label: "Ans", sublabel: "2021 — 2024", color: CT.charcoal },
  { value: "10+", label: "Serious Games", color: CT.gold },
  { value: "200+", label: "Modules RSE", color: CT.orange },
  { value: "100+", label: "Entreprises clientes", color: CT.magenta },
  { value: "250k+", label: "Collaborateurs", color: CT.purple },
] as const;

const secondaryStats = [
  "B Corp engagée",
  "22 langues",
  "70% taux de connexion",
  "65% taux de complétion",
  "Tours, France",
] as const;

const screenshots = [
  {
    src: "/portfolio/civitime/city-builder.webp",
    alt: "Civitime City Builder - Vue isométrique du serious game RSE",
    label: "City Builder",
    icon: Gamepad2,
    color: CT.gold,
    width: 1400,
    height: 930,
  },
  {
    src: "/portfolio/civitime/galaxy-universe.webp",
    alt: "Civitime CiviTamia - Univers multi-mondes avec iles flottantes",
    label: "Univers",
    icon: Sparkles,
    color: CT.purple,
    width: 1080,
    height: 1080,
  },
  {
    src: "/portfolio/civitime/mobile-engagement.webp",
    alt: "Civitime - Jeu mobile d'engagement collaborateur",
    label: "Mobile",
    icon: Globe,
    color: CT.orange,
    width: 1080,
    height: 1080,
  },
  {
    src: "/portfolio/civitime/mobile-games.webp",
    alt: "Civitime - Jeux multi-devices sur smartphones",
    label: "Multi-devices",
    icon: Gamepad2,
    color: CT.charcoal,
    width: 1200,
    height: 600,
  },
  {
    src: "/portfolio/civitime/banner.webp",
    alt: "Civitime - Le serious game qui booste l'engagement RSE",
    label: "Bannière",
    icon: Trophy,
    color: CT.magenta,
    width: 920,
    height: 230,
  },
] as const;

const features = [
  {
    icon: Gamepad2,
    title: "Serious Games RSE",
    description:
      "Conception et développement de jeux interactifs (city builder, quiz, escape games) avec runtimes H5P et SCORM custom. Déployés sur web et mobile pour sensibiliser aux enjeux RSE.",
    color: CT.gold,
  },
  {
    icon: BookOpen,
    title: "Éditeur de Scénarios",
    description:
      "Conception et développement complet d'un éditeur interne permettant à l'équipe contenu de créer des scénarios de serious game de manière autonome, sans intervention développeur.",
    color: CT.charcoal,
  },
  {
    icon: Trophy,
    title: "Gamification Avancée",
    description:
      "Systèmes de progression, parrainage, classements dynamiques, duels quiz, badges et récompenses. 50+ mécaniques de jeu pour maximiser l'engagement collaborateur.",
    color: CT.orange,
  },
  {
    icon: Puzzle,
    title: "Modules SCORM",
    description:
      "Plateforme SaaS SCORM multi-tenant from scratch : builder d'apps, API dédiée (NestJS), runtimes custom, tracking des progressions. Déployable sur n'importe quel LMS.",
    color: CT.magenta,
  },
  {
    icon: Leaf,
    title: "Contenus RSE",
    description:
      "Plus de 200 modules couvrant 70+ thématiques : bilan carbone, égalité, QVCT, gaspillage alimentaire, biodiversité, numérique responsable.",
    color: CT.purple,
  },
  {
    icon: LayoutDashboard,
    title: "Backoffice & Dashboards",
    description:
      "Création from scratch de dashboards d'administration, backoffice client avec Directus, gestion des stats, des versions et des campagnes de mailing.",
    color: CT.charcoal,
  },
] as const;

const crossCutting = [
  {
    icon: BrainCircuit,
    title: "Outils Marketing Internes",
    description:
      "Développement d'outils marketing internes : gestion de campagnes mailing, configuration d'acquisition, tableaux de bord analytics, synchronisation des données clients.",
    color: CT.charcoal,
  },
  {
    icon: Building2,
    title: "Clients Grands Comptes",
    description:
      "Déploiement pour Crédit Agricole, L'Oréal, EDF, Société Générale, ArcelorMittal, SC Johnson et 100+ autres organisations. Campagnes de 1 jour à 4 semaines.",
    color: CT.gold,
  },
] as const;

const techStack = [
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "TypeScript", category: "language" },
  { name: "Prisma", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Firebase", category: "infra" },
  { name: "Google Cloud Platform", category: "infra" },
  { name: "RTK Query", category: "frontend" },
  { name: "Directus", category: "backend" },
  { name: "Clean Architecture", category: "architecture" },
  { name: "TDD", category: "architecture" },
  { name: "DDD", category: "architecture" },
  { name: "BDD", category: "architecture" },
  { name: "SCORM", category: "architecture" },
] as const;

const roleEvolution = [
  {
    period: "2021 — 2023",
    title: "Développeur Full-Stack",
    description:
      "Serious games RSE (city builder, quiz, escape games), éditeur de scénarios, réécriture du legacy en Clean Architecture DDD. TDD/BDD, code reviews, pair programming.",
    color: CT.gold,
    icon: Code2,
  },
  {
    period: "2023 — 2024",
    title: "Lead Full-Stack",
    description:
      "Référent technique post-départ du CTO. Produit SaaS SCORM from scratch, dashboards, backoffice Directus, outils marketing. SSO grands comptes, formation d'alternants.",
    color: CT.magenta,
    icon: LayoutDashboard,
  },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "Architecture Modulaire",
    description:
      "Séparation stricte des couches (domain, application, infrastructure), bounded contexts, injection de dépendances. Une codebase maintenable qui a permis à l'équipe de livrer plus vite.",
    color: CT.charcoal,
  },
  {
    icon: Database,
    title: "Plateforme SaaS SCORM",
    description:
      "Produit multi-tenant : gestion des clients, déploiement des contenus, tracking des progressions à l'échelle. API NestJS dédiée, builder d'apps SCORM, runtimes custom.",
    color: CT.gold,
  },
  {
    icon: Boxes,
    title: "Éditeur de Contenu",
    description:
      "Éditeur interne transformant le workflow de création : réduction majeure du temps de production, l'équipe contenu peut itérer sans dev.",
    color: CT.magenta,
  },
  {
    icon: TestTube2,
    title: "Qualite & Tests",
    description:
      "Approche TDD/BDD pour garantir la fiabilité des modules de jeu. Tests unitaires et d'intégration sur les mécaniques critiques de gamification et scoring.",
    color: CT.orange,
  },
] as const;

const categoryColors: Record<string, string> = {
  architecture: CT.charcoal,
  backend: CT.magenta,
  frontend: CT.gold,
  language: CT.orange,
  infra: CT.purple,
};

const cardVariants: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" },
};

export default function CivitimeShowcase() {
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
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${CT.warm}50 0%, ${CT.purple}08 50%, transparent 80%)`,
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
                  CDI — 4 ans
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${CT.gold}12`,
                    color: CT.gold,
                    borderColor: `${CT.gold}30`,
                  }}
                >
                  <Gamepad2 className="w-3 h-3" />
                  Serious Games
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${CT.purple}12`,
                    color: CT.purple,
                    borderColor: `${CT.purple}30`,
                  }}
                >
                  <TreePine className="w-3 h-3" />
                  RSE / B Corp
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${CT.orange}12`,
                    color: CT.orange,
                    borderColor: `${CT.orange}30`,
                  }}
                >
                  <Code2 className="w-3 h-3" />
                  Lead Dev
                </span>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="flex items-center gap-4 sm:gap-6">
                <Image
                  src="/portfolio/civitime/logo.webp"
                  alt="Civitime logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Civitime
                </h1>
              </div>
            </RevealItem>

            <RevealItem>
              <p
                className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-secondary max-w-2xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Serious Games & Plateforme SaaS pour l'engagement RSE
              </p>
            </RevealItem>

            <RevealItem>
              <Paragraph
                variant="secondary"
                className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
              >
                4 ans chez Civitime, startup B Corp spécialisée dans la
                sensibilisation RSE par le jeu. De développeur à référent
                technique de l'entreprise. Serious games, plateforme SaaS SCORM,
                outils internes, déployés auprès de 100+ entreprises et 250 000+
                collaborateurs.
              </Paragraph>
            </RevealItem>
          </RevealContainer>
        </motion.div>
      </section>

      {/* STATS */}
      <section
        className="relative py-6 sm:py-8"
        style={{ background: `${CT.warm}25` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${CT.purple}40, ${CT.gold}40, ${CT.orange}40, ${CT.orange}40, transparent 90%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${CT.orange}40, ${CT.orange}40, ${CT.gold}40, ${CT.purple}40, transparent 90%)`,
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
              La mission
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
                borderLeft: `3px solid ${CT.purple}`,
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
                L'entreprise
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Civitime est une startup B Corp fondée à Tours en 2018,
                spécialisée dans l'engagement RSE en entreprise via des serious
                games. Avec 200+ modules couvrant 70+ thématiques (carbone,
                biodiversité, inclusion, QVCT), la plateforme atteint 65-73% de
                taux de complétion vs 10% pour le e-learning classique.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${CT.gold}`,
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
                Mon rôle
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Arrivé comme développeur dans une équipe de 4-5 devs en
                méthodologie agile (Scrum, sprints, daily standups). Après le
                départ du CTO, mon mentor, j'ai pris le relais comme référent
                technique : choix techno, relation directe avec les CTO clients
                pour les SSO, formation d'alternants.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="left">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${CT.orange}`,
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-4 h-4" style={{ color: CT.orange }} />
                <h3
                  className="text-sm sm:text-base font-semibold text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Impact mesurable
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Crédit Agricole, L'Oréal, EDF, Société Générale et 100+ autres
                organisations. 70% de taux de connexion moyen sur plusieurs
                mois, 250 000+ collaborateurs mobilisés. Taux de complétion
                65-73% vs 10% pour le e-learning classique.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${CT.orange}`,
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
                Contributions clés
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Réécriture legacy en Clean Architecture DDD. Éditeur de
                scénarios. Dashboards et backoffice Directus. Outils marketing
                internes. Plateforme SaaS SCORM multi-tenant from scratch.
                Intégration SSO grands comptes. CI/CD et pipelines de
                déploiement continu.
              </p>
            </motion.div>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* SCREENSHOTS */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${CT.warm}18` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Gamepad2 className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Aperçu</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Les produits Civitime
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              City builders, quiz interactifs, escape games et univers
              immersifs. Des jeux déployés sur web et mobile pour sensibiliser à
              grande échelle.
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
              className="rounded-xl sm:rounded-2xl"
              tiltAmount={2}
              glareOpacity={0.03}
            >
              <div
                className="relative rounded-xl sm:rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${active.color}20`,
                  boxShadow: `0 25px 80px ${active.color}15, 0 8px 32px rgba(0,0,0,0.08)`,
                }}
              >
                {/* Browser chrome */}
                <div
                  className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b"
                  style={{
                    background: "var(--primary-background)",
                    borderColor: `${active.color}15`,
                  }}
                >
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ background: "#FF5F57" }}
                    />
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ background: "#FFBD2E" }}
                    />
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ background: "#28C840" }}
                    />
                  </div>
                  <div
                    className="flex-1 mx-2 sm:mx-8 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] text-center font-mono truncate"
                    style={{
                      background: `${active.color}08`,
                      color: "var(--secondary)",
                      border: `1px solid ${active.color}12`,
                    }}
                  >
                    app.civitime.com/{active.label.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                  <div className="w-6 sm:w-[46px]" />
                </div>

                {/* Gradient accent line */}
                <div
                  className="h-[2px]"
                  style={{
                    background: `linear-gradient(to right, ${active.color}, ${screenshots[(activeScreenshot + 1) % screenshots.length].color})`,
                  }}
                />

                {/* Screenshot viewport */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    height: "clamp(280px, 50vw, 640px)",
                    background: `linear-gradient(180deg, ${CT.warm}20 0%, ${CT.warm}08 100%)`,
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.src}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={active.src}
                        alt={active.alt}
                        width={active.width}
                        height={active.height}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 900px"
                        priority={activeScreenshot === 0}
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Bottom fade */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, var(--primary-background), transparent)",
                    }}
                  />
                </div>
              </div>
            </TiltCard>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* EVOLUTION DU ROLE */}
      <section className="relative py-12 sm:py-16">
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <GraduationCap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Progression</span>
              </motion.div>
            </MagneticWrapper>
          </RevealItem>

          <RevealItem>
            <Heading2
              size="xl"
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Évolution du rôle
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              De développeur à lead technique en 4 ans, avec une montée en
              responsabilité progressive sur des produits à forte contrainte
              métier.
            </Paragraph>
          </RevealItem>
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.12}
          className="container mx-auto max-w-4xl"
        >
          <div className="relative">
            <div
              className="absolute left-4 sm:left-6 top-0 bottom-0 w-px hidden md:block"
              style={{
                background: `linear-gradient(to bottom, ${CT.gold}, ${CT.purple}, ${CT.orange})`,
              }}
            />

            <div className="space-y-4 sm:space-y-6">
              {roleEvolution.map((role, i) => (
                <RevealItem
                  key={role.period}
                  direction={i % 2 === 0 ? "left" : "right"}
                >
                  <MagneticWrapper strength={0.03}>
                    <motion.div
                      className="rounded-xl p-5 sm:p-6 md:ml-12"
                      style={{
                        background: "var(--primary-background)",
                        border: "1px solid var(--border)",
                        borderLeft: `3px solid ${role.color}`,
                      }}
                      variants={cardVariants}
                      initial="rest"
                      whileHover="hover"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${role.color}12` }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <role.icon
                            className="w-4.5 h-4.5"
                            style={{ color: role.color }}
                          />
                        </motion.div>
                        <div className="min-w-0">
                          <p
                            className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest mb-1"
                            style={{ color: role.color }}
                          >
                            {role.period}
                          </p>
                          <h3
                            className="text-sm sm:text-base font-semibold text-primary"
                            style={{
                              fontFamily: "var(--font-space-grotesk)",
                            }}
                          >
                            {role.title}
                          </h3>
                          <p className="mt-1 text-xs sm:text-sm text-secondary leading-relaxed">
                            {role.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </MagneticWrapper>
                </RevealItem>
              ))}
            </div>
          </div>
        </RevealContainer>
      </section>

      {/* FEATURES */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${CT.warm}12` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Fonctionnalités</span>
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
              Serious games, éditeur de contenu, gamification et plateforme
              SaaS. Des produits déployés à l'échelle pour des grands comptes
              internationaux.
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
              Décisions techniques
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Une architecture pensée pour la maintenabilité et l'évolution
              produit, avec une attention particulière à l'autonomie des équipes
              non-techniques.
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
        style={{ background: `${CT.warm}12` }}
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
              Technologies utilisées
            </Heading2>
          </RevealItem>
        </RevealContainer>

        <RevealContainer
          staggerDelay={0.03}
          className="container mx-auto max-w-3xl"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech) => {
              const color = categoryColors[tech.category] || CT.gold;
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
