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
  Bell,
  BookOpen,
  Code2,
  Coffee,
  Figma,
  Heart,
  Kanban,
  LayoutDashboard,
  Mail,
  MessageCircle,
  Palette,
  Rss,
  Server,
  Smartphone,
  Target,
  TestTube2,
  Trophy,
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

const HC = {
  pink: "#F691C3",
  orange: "#F46604",
  green: "#04A056",
  yellow: "#FDCB08",
  blue: "#0062DD",
  red: "#F21622",
  beige: "#FDECCE",
} as const;

const stats = [
  {
    value: "2",
    label: "Plateformes",
    sublabel: "Web + Mobile",
    color: HC.pink,
  },
  { value: "51+", label: "Écrans", color: HC.orange },
  { value: "78", label: "Use Cases", color: HC.blue },
  { value: "29", label: "Domain Events", color: HC.red },
  { value: "+525", label: "Tests", color: HC.green },
] as const;

const secondaryStats = [
  "29 pages web",
  "22+ écrans mobile",
  "73 routes API",
  "32 tables",
  "15+ achievements",
] as const;

const screenshots = [
  {
    src: "/portfolio/homecafe/dashboard.webp",
    alt: "HomeCafe Dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    color: HC.pink,
    width: 1200,
    height: 1125,
  },
  {
    src: "/portfolio/homecafe/journal.webp",
    alt: "HomeCafe Journal",
    label: "Journal",
    icon: BookOpen,
    color: HC.orange,
    width: 1200,
    height: 1317,
  },
  {
    src: "/portfolio/homecafe/moodboard.webp",
    alt: "HomeCafe Moodboard",
    label: "Moodboard",
    icon: Palette,
    color: HC.green,
    width: 1200,
    height: 1370,
  },
  {
    src: "/portfolio/homecafe/organisation.webp",
    alt: "HomeCafe Organisation",
    label: "Organisation",
    icon: Kanban,
    color: HC.blue,
    width: 1200,
    height: 3038,
  },
  {
    src: "/portfolio/homecafe/social.webp",
    alt: "HomeCafe Social",
    label: "Social",
    icon: Rss,
    color: HC.yellow,
    width: 1200,
    height: 1060,
  },
  {
    src: "/portfolio/homecafe/messagerie.webp",
    alt: "HomeCafe Messagerie",
    label: "Messagerie",
    icon: Mail,
    color: HC.red,
    width: 1200,
    height: 1060,
  },
] as const;

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description:
      "Layout customisable avec drag & drop (@dnd-kit). Widgets repositionnables : galerie, calendrier, to-do, messagerie, journal et suivi d'humeur.",
    color: HC.pink,
  },
  {
    icon: BookOpen,
    title: "Journal",
    description:
      "Éditeur rich text (Tiptap), posts privés/publics, galerie photo, stickers et badges de régularité (streaks 7/14/30j).",
    color: HC.orange,
  },
  {
    icon: Palette,
    title: "Moodboard",
    description:
      "Grille annuelle de 9 émotions trackées, suivi d'humeur quotidien, graphiques hebdomadaires et mensuels.",
    color: HC.green,
  },
  {
    icon: Kanban,
    title: "Organisation",
    description:
      "4 outils : Kanban boards, Tableaux (spreadsheet-like), Chronologies (Gantt) et Calendrier mensuel intégré.",
    color: HC.blue,
  },
  {
    icon: Rss,
    title: "Feed Social",
    description:
      "Système d'amis (invitations, QR code, liens), posts publics avec réactions, galerie partagée et stickers.",
    color: HC.yellow,
  },
  {
    icon: MessageCircle,
    title: "Messagerie",
    description:
      "Chat temps réel SSE (9 types d'events), conversations privées/groupe, réactions et pièces jointes média.",
    color: HC.red,
  },
] as const;

const crossCutting = [
  {
    icon: Trophy,
    title: "Gamification",
    description:
      "15+ achievements débloquables, badges visuels, stickers collectionnables, streaks 7/14/30 jours. Évaluation automatique via domain events après chaque action utilisateur.",
    color: HC.yellow,
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Push notifications (Expo), SSE temps réel pour le chat et les alertes, cron jobs pour les rappels quotidiens, emails transactionnels via Resend.",
    color: HC.red,
  },
] as const;

const techStack = [
  { name: "Next.js 16.1", category: "frontend" },
  { name: "React 19", category: "frontend" },
  { name: "Expo 54", category: "mobile" },
  { name: "React Native 0.81", category: "mobile" },
  { name: "TypeScript 5.9", category: "language" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "BetterAuth 1.4", category: "backend" },
  { name: "Tailwind CSS 4.1", category: "frontend" },
  { name: "Turborepo", category: "infra" },
  { name: "shadcn/ui", category: "frontend" },
  { name: "Tiptap 3.19", category: "frontend" },
  { name: "TanStack Query 5.90", category: "frontend" },
  { name: "Zod 4.2", category: "language" },
  { name: "Resend", category: "backend" },
  { name: "AWS S3/R2", category: "infra" },
  { name: "CQRS", category: "architecture" },
  { name: "DDD", category: "architecture" },
  { name: "Clean Architecture", category: "architecture" },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "Clean Architecture + DDD",
    description:
      "16 aggregates, 44 value objects, 126 fichiers domain. Couches strictes : Domain, Application, Adapters, Infrastructure. Injection de dépendances custom.",
    color: HC.orange,
  },
  {
    icon: Kanban,
    title: "CQRS",
    description:
      "78 commands (use cases) + 30 queries read-side. Séparation write/read complète. Chaque use case = 1 fichier testable isolément.",
    color: HC.blue,
  },
  {
    icon: Users,
    title: "18 Bounded Contexts",
    description:
      "User, Auth, Profile, Post, Chat, Board, Tableau, Chronologie, CalendarEvent, Mood, Emotion, Gallery, Friend, Notification, Reward, PushToken, Upload, UserPreference.",
    color: HC.green,
  },
  {
    icon: Heart,
    title: "Event-Driven",
    description:
      "29 domain events, 5 handlers (Gamification, Push, Chat SSE, Notification SSE, Email). Évaluation automatique des achievements après chaque mutation.",
    color: HC.pink,
  },
] as const;

const monorepo = [
  {
    name: "apps/nextjs",
    desc: "Web + API (29 pages protégées)",
    color: HC.pink,
  },
  {
    name: "apps/expo",
    desc: "Mobile iOS + Android (22+ écrans)",
    color: HC.green,
  },
  { name: "packages/ddd-kit", desc: "Primitives DDD custom", color: HC.blue },
  {
    name: "packages/drizzle",
    desc: "Schema DB (32 tables, 18 domaines)",
    color: HC.orange,
  },
  {
    name: "packages/ui",
    desc: "25 composants shadcn/ui partagés",
    color: HC.yellow,
  },
  {
    name: "packages/i18n",
    desc: "Internationalisation (FR + EN)",
    color: HC.red,
  },
  { name: "packages/test", desc: "Config Vitest partagée", color: HC.green },
  {
    name: "packages/typescript-config",
    desc: "TSConfig partagée",
    color: HC.pink,
  },
] as const;

const categoryColors: Record<string, string> = {
  architecture: HC.pink,
  backend: HC.blue,
  mobile: HC.green,
  frontend: HC.orange,
  language: HC.yellow,
  infra: HC.red,
};

const cardVariants: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" },
};

export default function HomecafeShowcase() {
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
      {/* Warm ambient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none -z-10"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${HC.beige}30 0%, ${HC.pink}08 50%, transparent 80%)`,
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
                href="/#projets"
                className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent transition-colors mb-6 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Retour aux projets
              </TransitionLink>
            </RevealItem>

            <RevealItem>
              <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                <span className="badge text-xs uppercase tracking-widest font-semibold text-secondary">
                  Mission Freelance
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${HC.pink}12`,
                    color: HC.pink,
                    borderColor: `${HC.pink}30`,
                  }}
                >
                  <Smartphone className="w-3 h-3" />
                  Web + Mobile
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${HC.blue}12`,
                    color: HC.blue,
                    borderColor: `${HC.blue}30`,
                  }}
                >
                  <Code2 className="w-3 h-3" />
                  Lead Dev
                </span>
              </div>
            </RevealItem>

            <RevealItem>
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <span style={{ color: HC.red }}>H</span>
                <span style={{ color: HC.green }}>o</span>
                <span style={{ color: HC.pink }}>m</span>
                <span style={{ color: HC.yellow }}>e</span>
                <span style={{ color: HC.orange }}>C</span>
                <span style={{ color: HC.blue }}>a</span>
                <span style={{ color: HC.green }}>f</span>
                <span style={{ color: HC.green }}>é</span>
              </h1>
            </RevealItem>

            <RevealItem>
              <p
                className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-secondary max-w-2xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Application web & mobile de bien-être et productivité
              </p>
            </RevealItem>

            <RevealItem>
              <Paragraph
                variant="secondary"
                className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
              >
                Conception et développement from scratch d'une application
                complète déployée sur web (Next.js) et mobile (Expo/React
                Native). Mood tracking, journaling, organisation, chat temps
                réel, feed social et gamification. Monorepo de 8 packages,
                architecture Clean Architecture + DDD + CQRS, +525 tests
                unitaires et d'intégration.
              </Paragraph>
            </RevealItem>
          </RevealContainer>
        </motion.div>
      </section>

      {/* STATS */}
      <section
        className="relative py-6 sm:py-8"
        style={{ background: `${HC.beige}18` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${HC.pink}40, ${HC.orange}40, ${HC.green}40, ${HC.blue}40, transparent 90%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${HC.blue}40, ${HC.green}40, ${HC.orange}40, ${HC.pink}40, transparent 90%)`,
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

      {/* CONTEXTE & RÔLE */}
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
                borderLeft: `3px solid ${HC.orange}`,
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
                Problématique
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Le client souhaitait une application tout-en-un de bien-être
                personnel : suivi d'humeur, journaling, organisation et
                dimension sociale. Le défi : créer un produit cohérent sur web
                et mobile avec un code partagé maximum, tout en maintenant une
                architecture capable d'évoluer avec les besoins.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${HC.blue}`,
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
                Lead développeur full-stack et architecte technique. J'ai conçu
                l'architecture from scratch (Clean Architecture + DDD + CQRS),
                développé l'intégralité du backend et du frontend web et mobile,
                mis en place le monorepo Turborepo, et défini la stratégie de
                tests (+525). Seul développeur sur le projet.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="left">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${HC.pink}`,
              }}
              variants={cardVariants}
              initial="rest"
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Figma className="w-4 h-4" style={{ color: HC.pink }} />
                <h3
                  className="text-sm sm:text-base font-semibold text-primary"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Collaboration
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Travail en binôme avec une designeuse UX/UI. Elle concevait les
                maquettes Figma, je les implémentais pixel-perfect. Échanges
                réguliers sur les contraintes techniques, les interactions et
                les micro-animations pour garantir une expérience fluide sur les
                deux plateformes.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${HC.green}`,
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
                Approche technique
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Monorepo Turborepo pour partager le maximum de code entre web et
                mobile : schéma DB, composants UI, primitives DDD,
                internationalisation et config de tests. Architecture
                event-driven pour découpler les modules et permettre l'ajout de
                features sans régression.
              </p>
            </motion.div>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* SCREENSHOTS */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${HC.beige}12` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Coffee className="w-4 h-4 text-accent" />
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
              Interfaces de l'application
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Design réalisé par la designeuse UX/UI sur Figma, implémenté
              pixel-perfect sur web (Next.js) et mobile (Expo).
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
                      style={{ background: HC.red }}
                    />
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ background: HC.yellow }}
                    />
                    <span
                      className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                      style={{ background: HC.green }}
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
                    homecafe.app/{active.label.toLowerCase()}
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
                    background: `linear-gradient(180deg, ${HC.beige}20 0%, ${HC.beige}08 100%)`,
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
                        priority={activeScreenshot === 0}
                        unoptimized
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

      {/* FEATURES */}
      <section className="relative py-12 sm:py-16">
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Smartphone className="w-4 h-4 text-accent" />
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
              Un écosystème complet
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              6 modules interconnectés pour le bien-être, l'organisation et le
              partage. Chaque module implémenté sur les deux plateformes — web
              (Next.js) et mobile (Expo) — avec un code partagé via monorepo.
              Bilingue FR/EN.
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

        {/* Cross-cutting: Gamification + Notifications */}
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
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${HC.beige}12` }}
      >
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
              Ingénierie robuste
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Une architecture pensée pour la maintenabilité, la testabilité et
              l'évolutivité. Chaque décision technique documentée et justifiée.
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
      <section className="relative py-12 sm:py-16">
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
              const color = categoryColors[tech.category] || HC.orange;
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

        <RevealContainer className="container mx-auto mt-8 sm:mt-10 max-w-xl">
          <RevealItem>
            <div
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-xs uppercase tracking-widest font-semibold text-secondary mb-4"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Monorepo — 8 packages
              </p>
              <div className="space-y-2.5 font-mono text-sm">
                {monorepo.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="flex flex-wrap items-baseline gap-x-2.5 gap-y-0.5"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 self-center"
                      style={{ background: pkg.color }}
                    />
                    <span className="text-primary font-medium text-xs sm:text-sm">
                      {pkg.name}
                    </span>
                    <span className="text-secondary text-[10px] sm:text-xs">
                      {pkg.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-10 sm:py-14">
        <RevealContainer className="container mx-auto text-center">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.02}>
              <TransitionLink
                href="/#projets"
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
