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
  Box,
  TestTube2,
  Calendar,
  ClipboardList,
  Cloud,
  Database,
  Grid3X3,
  Layers,
  LayoutDashboard,
  Lock,
  Monitor,
  Receipt,
  Server,
  Shield,
  Target,
  Ticket,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { MagneticWrapper } from "@/components/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "@/components/effects/reveal";
import { TiltCard } from "@/components/effects/tilt-card";
import TransitionLink from "@/components/shared/navigation/transition-link";
import { Heading2 } from "@/components/typography/heading2";
import { Paragraph } from "@/components/typography/paragraph";

const BI = {
  navy: "#0F172A",
  violet: "#7C3AED",
  purple: "#A855F7",
  gold: "#F59E0B",
  amber: "#D97706",
  slate: "#334155",
  light: "#F8FAFF",
} as const;

const stats = [
  {
    value: "1",
    label: "Mois",
    sublabel: "Conception à production",
    color: BI.navy,
  },
  { value: "WebSocket", label: "Temps réel", color: BI.violet },
  { value: "3D", label: "Visualisation sièges", color: BI.purple },
  { value: "<200ms", label: "Latence WS", color: BI.gold },
  { value: "100%", label: "Couverture fiscale", color: BI.amber },
] as const;

const secondaryStats = [
  "Dashboard temps réel",
  "Plan de salle 2D/3D",
  "Gestion tarifs & TVA",
  "WebSocket bidirectionnel",
  "NDA",
] as const;

const screenshots = [
  {
    src: "/portfolio/billetterie/dashboard.webp",
    alt: "Billetterie - Dashboard temps réel avec KPIs",
    label: "Dashboard",
    icon: BarChart3,
    color: BI.violet,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/plan-de-salle.webp",
    alt: "Billetterie - Plan de salle interactif 2D",
    label: "Plan de salle",
    icon: Grid3X3,
    color: BI.purple,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/vue-3d.webp",
    alt: "Billetterie - Vue 3D isométrique du théâtre",
    label: "Vue 3D",
    icon: Box,
    color: BI.gold,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/tarification.webp",
    alt: "Billetterie - Gestion tarifs et TVA",
    label: "Tarification",
    icon: Receipt,
    color: BI.amber,
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/reservations.webp",
    alt: "Billetterie - Liste des réservations",
    label: "Réservations",
    icon: ClipboardList,
    color: BI.slate,
    width: 1776,
    height: 1055,
  },
] as const;

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Temps Réel",
    description:
      "KPIs actualisés en temps réel via WebSocket : billets vendus, revenus, taux de remplissage, événements actifs. Feed d'activité avec indicateur de connexion live.",
    color: BI.violet,
  },
  {
    icon: Grid3X3,
    title: "Plan de Salle 2D",
    description:
      "Plan de salle interactif Seats.io avec code couleur : disponible, occupé, sélectionné, inaccessible. Sélection multiple, calcul automatique du sous-total, légende contextuelle.",
    color: BI.purple,
  },
  {
    icon: Box,
    title: "Visualisation 3D",
    description:
      "Vue isométrique du théâtre via Seats.io avec perspective 3D. Toggle 2D/3D instantané, scène visible au premier plan, même interactivité qu'en 2D.",
    color: BI.gold,
  },
  {
    icon: Receipt,
    title: "Tarification & TVA",
    description:
      "Gestion multi-tarifs avec calcul automatique TTC. Support des taux de TVA différenciés (20%, 5.5%, 0%). Tableau CRUD avec statut actif/fermé par catégorie.",
    color: BI.amber,
  },
  {
    icon: Calendar,
    title: "Gestion Événements",
    description:
      "Création et pilotage d'événements avec dates, lieux, capacités. Association plan de salle, suivi des ventes par événement, statuts et archivage.",
    color: BI.navy,
  },
  {
    icon: ClipboardList,
    title: "Réservations",
    description:
      "Liste exhaustive des réservations avec filtres avancés, recherche instantanée, statuts colorés (confirmé, en attente, annulé). Export CSV et pagination.",
    color: BI.slate,
  },
] as const;

const crossCutting = [
  {
    icon: Wifi,
    title: "WebSocket Bidirectionnel",
    description:
      "NestJS WebSocket Gateway pour la diffusion temps réel. Events : nouvelles réservations, mises à jour de statut, notifications. Reconnexion automatique, heartbeat.",
    color: BI.violet,
  },
  {
    icon: Shield,
    title: "Sécurité & Accès",
    description:
      "Authentification JWT, rôles admin/opérateur, validation Zod de toutes les entrées. Rate limiting, CORS strict, logs d'audit sur les opérations sensibles.",
    color: BI.navy,
  },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "NestJS + WS Gateway",
    description:
      "API REST + WebSocket Gateway sur NestJS. Modules : auth, events, seats, bookings, pricing. Guards JWT, pipes de validation, interceptors de logging.",
    color: BI.violet,
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description:
      "Schéma relationnel optimisé : events, seats, bookings, pricing_tiers. Index sur les requêtes temps réel, transactions ACID pour les réservations concurrentes.",
    color: BI.purple,
  },
  {
    icon: Monitor,
    title: "Next.js Frontend",
    description:
      "Dashboard React avec Server Components, Seats.io pour le plan de salle, state management léger. RTK Query pour le cache, WebSocket natif pour le temps réel.",
    color: BI.gold,
  },
  {
    icon: Cloud,
    title: "Déploiement",
    description:
      "Conteneurs Docker, CI/CD GitHub Actions, PostgreSQL managé. Variables d'environnement validées au boot, health checks, zero-downtime deployments.",
    color: BI.amber,
  },
] as const;

const techStack = [
  { name: "Next.js 15", category: "frontend" },
  { name: "React 19", category: "frontend" },
  { name: "Tailwind CSS 4", category: "frontend" },
  { name: "RTK Query", category: "frontend" },
  { name: "Seats.io", category: "frontend" },
  { name: "NestJS", category: "backend" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "WebSocket", category: "backend" },
  { name: "Zod", category: "backend" },
  { name: "Docker", category: "infra" },
  { name: "GitHub Actions", category: "infra" },
  { name: "Nginx", category: "infra" },
  { name: "Clean Architecture", category: "architecture" },
  { name: "DDD", category: "architecture" },
  { name: "CQRS", category: "architecture" },
] as const;

const categoryColors: Record<string, string> = {
  architecture: BI.navy,
  backend: BI.violet,
  frontend: BI.purple,
  infra: BI.gold,
};

const cardVariants: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" },
};

export default function BilletterieShowcase() {
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
          background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${BI.light}50 0%, ${BI.violet}08 50%, transparent 80%)`,
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
                  Freelance
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${BI.violet}12`,
                    color: BI.violet,
                    borderColor: `${BI.violet}30`,
                  }}
                >
                  <Ticket className="w-3 h-3" />
                  Billetterie
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${BI.gold}12`,
                    color: BI.gold,
                    borderColor: `${BI.gold}30`,
                  }}
                >
                  <Wifi className="w-3 h-3" />
                  Temps réel
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                  style={{
                    background: `${BI.navy}12`,
                    color: BI.navy,
                    borderColor: `${BI.navy}30`,
                  }}
                >
                  <Lock className="w-3 h-3" />
                  NDA
                </span>
              </div>
            </RevealItem>

            <RevealItem>
              <div className="flex items-center gap-4 sm:gap-6">
                <Image
                  src="/portfolio/billetterie/logo.svg"
                  alt="Billetterie logo"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                  unoptimized
                />
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Billetterie Interne
                </h1>
              </div>
            </RevealItem>

            <RevealItem>
              <p
                className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-secondary max-w-2xl"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Dashboard de gestion d'événements et ventes en temps réel
              </p>
            </RevealItem>

            <RevealItem>
              <Paragraph
                variant="secondary"
                className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
              >
                Dashboard interne conçu et développé en freelance pour un
                organisateur d'événements. Plan de salle 2D/3D, ventes en temps
                réel via WebSocket, gestion automatisée des tarifs et TVA.
                Projet sous NDA.
              </Paragraph>
            </RevealItem>
          </RevealContainer>
        </motion.div>
      </section>

      {/* STATS */}
      <section
        className="relative py-6 sm:py-8"
        style={{ background: `${BI.light}25` }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${BI.violet}40, ${BI.purple}40, ${BI.gold}40, ${BI.amber}40, transparent 90%)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 10%, ${BI.amber}40, ${BI.gold}40, ${BI.purple}40, ${BI.violet}40, transparent 90%)`,
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
                borderLeft: `3px solid ${BI.violet}`,
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
                Le problème
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Les salles de spectacle et organisateurs d'événements gèrent
                leurs réservations avec des tableurs Excel ou des outils
                fragmentés. Aucune visibilité temps réel sur les ventes, pas de
                plan de salle interactif, gestion fiscale manuelle.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${BI.purple}`,
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
                Un dashboard unifié avec plan de salle 2D/3D, ventes en temps
                réel via WebSocket, gestion automatisée des tarifs et TVA.
                L'organisateur pilote ses événements depuis une interface unique.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="left">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${BI.gold}`,
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
                Développement full-stack du dashboard : API NestJS avec
                WebSocket Gateway, frontend Next.js avec Seats.io, système
                de tarification multi-TVA, base PostgreSQL optimisée pour le
                temps réel.
              </p>
            </motion.div>
          </RevealItem>

          <RevealItem direction="right">
            <motion.div
              className="rounded-xl p-5 sm:p-6 h-full"
              style={{
                background: "var(--primary-background)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${BI.amber}`,
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
                Résultats
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Dashboard livré en 1 mois. Latence WebSocket &lt; 200ms, 100%
                de couverture fiscale (TVA multi-taux), visualisation 3D
                performante, adoption immédiate par l'équipe opérations.
              </p>
            </motion.div>
          </RevealItem>
        </RevealContainer>
      </section>

      {/* SCREENSHOTS */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${BI.light}18` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <LayoutDashboard className="w-4 h-4 text-accent" />
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
              L'application en images
            </Heading2>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
            >
              Dashboard temps réel, plan de salle interactif 2D/3D, tarification
              et gestion des réservations.
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
                    dashboard.billetterie-interne.local/{active.label.toLowerCase()}
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
                    background: `linear-gradient(180deg, ${BI.light}20 0%, ${BI.light}08 100%)`,
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

      {/* FEATURES */}
      <section
        className="relative py-12 sm:py-16"
        style={{ background: `${BI.light}12` }}
      >
        <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
          <RevealItem direction="scale">
            <MagneticWrapper strength={0.03}>
              <motion.div
                className="badge mb-3 inline-flex"
                whileHover={{ scale: 1.05 }}
              >
                <Layers className="w-4 h-4 text-accent" />
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
              Dashboard temps réel, plan de salle 2D/3D, tarification multi-TVA
              et gestion complète des réservations et événements.
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
              Une architecture Clean avec DDD et CQRS, pensée pour la
              performance temps réel et la scalabilité des réservations
              concurrentes.
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
        style={{ background: `${BI.light}12` }}
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
              const color = categoryColors[tech.category] || BI.violet;
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
