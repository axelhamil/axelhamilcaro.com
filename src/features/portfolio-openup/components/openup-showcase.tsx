"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Anchor,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Code2,
  CreditCard,
  ExternalLink,
  Globe2,
  Link2,
  Network,
  Palette,
  QrCode,
  Server,
  Settings2,
  Smartphone,
  Sparkles,
  Target,
  TestTube2,
  UserCog,
  Wallet,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { blurDataURLs } from "@/app/_config/blur-placeholders";
import { MagneticWrapper } from "@/src/shared/ui/effects/magnetic-wrapper";
import { RevealContainer, RevealItem } from "@/src/shared/ui/effects/reveal";
import { TiltCard } from "@/src/shared/ui/effects/tilt-card";
import TransitionLink from "@/src/shared/ui/navigation/transition-link";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const OU = {
  blue: "#0066FF",
  violet: "#7C3AED",
  emerald: "#10B981",
  pink: "#EC4899",
  amber: "#F59E0B",
  slate: "#475569",
  sky: "#0EA5E9",
} as const;

const stats = [
  {
    value: "5",
    label: "Piliers",
    sublabel: "Liens · QR · Bio · Analytics · Domaines",
    color: OU.blue,
  },
  {
    value: "4",
    label: "Plans Stripe",
    sublabel: "EUR + USD auto",
    color: OU.emerald,
  },
  { value: "76", label: "Tests BDD API", color: OU.violet },
  { value: "~25j", label: "Scope solo", color: OU.amber },
  {
    value: "3",
    label: "Plateformes",
    sublabel: "iOS · Android · PWA",
    color: OU.pink,
  },
] as const;

const secondaryStats = [
  "+940 fichiers TypeScript",
  "+190 fichiers domain/application",
  "8 packages monorepo",
  "Edge <50ms via Cloudflare Worker",
  "Apple Wallet + Google Wallet",
] as const;

const screenshots = [
  {
    src: "/portfolio/openup/links-dashboard.webp",
    alt: "OpenUp - Dashboard de gestion des liens raccourcis avec sidebar et tableau de stats",
    label: "Dashboard",
    icon: Link2,
    color: OU.blue,
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/analytics.webp",
    alt: "OpenUp - Analytics global avec courbes de clics, répartition par appareil et géographie",
    label: "Analytics",
    icon: BarChart3,
    color: OU.violet,
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/bio-editor.webp",
    alt: "OpenUp - Éditeur Link-in-bio WYSIWYG avec preview iPhone temps réel",
    label: "Bio editor",
    icon: Palette,
    color: OU.pink,
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/qr-customizer.webp",
    alt: "OpenUp - Personnalisation de QR Code dynamique avec motifs, repères, logo et couleurs",
    label: "QR codes",
    icon: QrCode,
    color: OU.amber,
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/pricing.webp",
    alt: "OpenUp - Page pricing avec 4 plans Stripe en EUR ou USD selon géolocalisation IP",
    label: "Pricing",
    icon: CreditCard,
    color: OU.emerald,
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/link-advanced.webp",
    alt: "OpenUp - Création de lien avec paramètres avancés : expiration, geo, password, UTM, deep links",
    label: "Lien avancé",
    icon: Settings2,
    color: OU.slate,
    width: 1920,
    height: 1080,
  },
] as const;

const features = [
  {
    icon: Link2,
    title: "Liens raccourcis",
    description:
      "URLs courtes openup.to/xxx avec slug custom, expiration, limite de clics, filtre géo, mot de passe, UTM, scheduling et deep links iOS/Android natifs.",
    color: OU.blue,
  },
  {
    icon: QrCode,
    title: "QR Codes dynamiques",
    description:
      "8 motifs, repères Pro, logo (auto-détecté plateforme ou custom image), palette + couleurs custom. Export PNG/JPG/SVG, ajout Apple Wallet en 1 tap.",
    color: OU.amber,
  },
  {
    icon: Palette,
    title: "Link-in-bio WYSIWYG",
    description:
      "Éditeur avec preview iPhone temps réel. Widgets audio, Google Maps, contact chat, Calendly, Spotify. Thèmes, dark mode, drag & drop.",
    color: OU.pink,
  },
  {
    icon: BarChart3,
    title: "Analytics complet",
    description:
      "Dashboard liens + QR + bio. KPIs, évolution temporelle, répartition appareil/OS/navigateur/géo/heures, top sources de trafic.",
    color: OU.violet,
  },
  {
    icon: Globe2,
    title: "Domaine personnalisé",
    description:
      "Branding total via Cloudflare for SaaS. Configuration DNS guidée, vérification automatique, certificats SSL provisionnés à la volée.",
    color: OU.sky,
  },
] as const;

const techHighlights = [
  {
    icon: Anchor,
    title: "Deep links iOS + Android",
    description:
      "Un tap sur openup.to/xxx ouvre l'app native si elle est installée (UA parser + interstitial dédié), sinon fallback web propre. Contournement des in-app browsers Instagram/TikTok via guide d'ouverture navigateur.",
    color: OU.sky,
  },
  {
    icon: CreditCard,
    title: "Multi-devise EUR + USD",
    description:
      "Détection auto de la devise via geo IP, override possible. Stripe gère un Product avec un Price par couple devise/période. Promos appliquées sur les 2 devises automatiquement.",
    color: OU.emerald,
  },
  {
    icon: Smartphone,
    title: "Mobile natif iOS + Android",
    description:
      "Capacitor partage 100% du code avec la PWA web. Wrappers natifs pour clipboard, share, haptics. Releases via Fastlane vers TestFlight + Play Store automatiques sur tag.",
    color: OU.blue,
  },
] as const;

const techStack = [
  { name: "Hono", category: "backend" },
  { name: "TypeScript 5", category: "language" },
  { name: "Drizzle ORM", category: "backend" },
  { name: "PostgreSQL", category: "backend" },
  { name: "Cloudflare Workers", category: "infra" },
  { name: "Cloudflare for SaaS", category: "infra" },
  { name: "Capacitor", category: "mobile" },
  { name: "React 19", category: "frontend" },
  { name: "Vite + PWA", category: "frontend" },
  { name: "TanStack Router", category: "frontend" },
  { name: "TanStack Query", category: "frontend" },
  { name: "Hono RPC client", category: "frontend" },
  { name: "BetterAuth", category: "backend" },
  { name: "Stripe", category: "backend" },
  { name: "Resend", category: "backend" },
  { name: "Cloudflare R2", category: "infra" },
  { name: "Apple Wallet", category: "mobile" },
  { name: "Google Wallet", category: "mobile" },
  { name: "shadcn/ui", category: "frontend" },
  { name: "Tailwind 4", category: "frontend" },
  { name: "i18next", category: "frontend" },
  { name: "Zod", category: "language" },
  { name: "inwire DI", category: "architecture" },
  { name: "Clean Architecture", category: "architecture" },
  { name: "DDD", category: "architecture" },
  { name: "Fastlane CI/CD", category: "infra" },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "Clean Architecture + DDD",
    description:
      "Zéro import externe dans le domaine (ddd-kit + Zod uniquement). Result<T,E>, Option<T>, ValueObjects, Aggregates avec events. Use cases purs : zéro logique métier, tout dans les agrégats.",
    color: OU.blue,
  },
  {
    icon: Zap,
    title: "Edge <50ms partout",
    description:
      "Cloudflare Worker dédié pour les redirections courtes openup.to/xxx + le proxy Framer du site marketing. Latence sub-50ms partout dans le monde, scaling auto, coût négligeable.",
    color: OU.amber,
  },
  {
    icon: Network,
    title: "Event-driven découplé",
    description:
      "Domain events après chaque mutation persistée. Handlers idempotents pour les side effects (emails, logs, notifs). Zéro appel direct à un service externe depuis un use case.",
    color: OU.emerald,
  },
] as const;

const monorepo = [
  {
    name: "apps/api",
    desc: "Backend Hono (DDD, 9 modules domaine)",
    color: OU.blue,
  },
  {
    name: "apps/app",
    desc: "Mobile Capacitor + PWA (TanStack Router, Hono RPC)",
    color: OU.pink,
  },
  {
    name: "apps/link-router",
    desc: "Cloudflare Worker (redirections + proxy Framer)",
    color: OU.amber,
  },
  {
    name: "packages/ddd-kit",
    desc: "Result, Option, Entity, ValueObject, EventDispatcher",
    color: OU.violet,
  },
  {
    name: "packages/drizzle",
    desc: "Schema DB + migrations + seeds",
    color: OU.emerald,
  },
  {
    name: "packages/reserved-slugs",
    desc: "Slugs interdits partagés API + worker",
    color: OU.sky,
  },
  {
    name: "packages/ui",
    desc: "shadcn/ui partagé Tailwind 4",
    color: OU.slate,
  },
  {
    name: "packages/test",
    desc: "Utilitaires de test (mocks, factories)",
    color: OU.blue,
  },
] as const;

const categoryColors: Record<string, string> = {
  architecture: OU.violet,
  backend: OU.blue,
  mobile: OU.pink,
  frontend: OU.sky,
  language: OU.amber,
  infra: OU.emerald,
};

const cardVariants: Variants = {
  rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" },
  hover: { y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" },
};

export function OpenupBackdrop() {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-[700px] pointer-events-none -z-10"
      style={{
        background: `radial-gradient(ellipse 90% 60% at 50% 0%, ${OU.blue}18 0%, ${OU.violet}10 50%, transparent 80%)`,
      }}
    />
  );
}

export function OpenupHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
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
                Mission Freelance
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                style={{
                  background: `${OU.blue}12`,
                  color: OU.blue,
                  borderColor: `${OU.blue}30`,
                }}
              >
                <Sparkles className="w-3 h-3" />
                En production
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest font-semibold border"
                style={{
                  background: `${OU.violet}12`,
                  color: OU.violet,
                  borderColor: `${OU.violet}30`,
                }}
              >
                <Code2 className="w-3 h-3" />
                Solo + founder
              </span>
            </div>
          </RevealItem>

          <RevealItem>
            <div className="flex items-center gap-4 sm:gap-6">
              <Image
                src="/portfolio/openup/logo.svg"
                alt="OpenUp logo"
                width={120}
                height={48}
                className="w-24 sm:w-28 md:w-32 h-auto"
                unoptimized
              />
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9]"
                style={{
                  fontFamily: "var(--font-space-grotesk)",
                  color: OU.blue,
                }}
              >
                OpenUp
              </h1>
            </div>
          </RevealItem>

          <RevealItem>
            <p
              className="mt-3 text-lg sm:text-xl md:text-2xl font-medium text-secondary max-w-2xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              SaaS de gestion de liens tout-en-un, live sur openup.to
            </p>
          </RevealItem>

          <RevealItem>
            <Paragraph
              variant="secondary"
              className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed"
            >
              Livraison from scratch en quelques semaines, en solo avec le
              founder. Concurrent direct de Bitly + Linktree + Beacons combinés
              : 5 piliers (liens raccourcis, QR codes, link-in-bio, analytics,
              custom domains), deep links iOS/Android natifs, 4 plans Stripe
              multi-devise EUR/USD, mobile natif via Capacitor, edge {"<"}50ms
              via Cloudflare Worker. Architecture Clean + DDD, 76 tests BDD côté
              API.
            </Paragraph>
          </RevealItem>

          <RevealItem>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticWrapper strength={0.04}>
                <motion.a
                  href="https://openup.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg group"
                  style={{
                    background: OU.blue,
                    color: "#fff",
                  }}
                  whileHover={{ y: -2, boxShadow: `0 12px 24px ${OU.blue}40` }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Voir openup.to
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </MagneticWrapper>
              <MagneticWrapper strength={0.04}>
                <motion.a
                  href="https://app.openup.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border group"
                  style={{
                    background: "var(--primary-background)",
                    color: OU.violet,
                    borderColor: `${OU.violet}40`,
                  }}
                  whileHover={{
                    y: -2,
                    borderColor: OU.violet,
                    boxShadow: `0 8px 20px ${OU.violet}25`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Ouvrir l&apos;app
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.a>
              </MagneticWrapper>
            </div>
          </RevealItem>
        </RevealContainer>
      </motion.div>
    </section>
  );
}

export function OpenupStats() {
  return (
    <section
      className="relative py-6 sm:py-8"
      style={{ background: `${OU.blue}06` }}
    >
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent 10%, ${OU.blue}40, ${OU.violet}40, ${OU.emerald}40, ${OU.amber}40, transparent 90%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent 10%, ${OU.amber}40, ${OU.emerald}40, ${OU.violet}40, ${OU.blue}40, transparent 90%)`,
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
  );
}

export function OpenupContext() {
  return (
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
              borderLeft: `3px solid ${OU.blue}`,
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
              Les créateurs, marques et entreprises jonglent avec 3 abonnements
              séparés (Bitly pour shortlinks, Linktree pour la page bio, Beacons
              pour les QR codes) sans analytics unifié. Le client voulait un
              seul outil cohérent, premium côté UX et capable de passer à
              l&apos;échelle internationale dès le jour 1.
            </p>
          </motion.div>
        </RevealItem>

        <RevealItem direction="right">
          <motion.div
            className="rounded-xl p-5 sm:p-6 h-full"
            style={{
              background: "var(--primary-background)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${OU.violet}`,
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
              Tout, en solo et from scratch avec le founder en quelques
              semaines. Architecture, backend Hono DDD, app mobile Capacitor
              (iOS + Android + PWA depuis une seule codebase), Cloudflare Worker
              pour les redirections edge et les deep links, intégration Stripe
              multi-devise, BetterAuth, Cloudflare for SaaS pour les domaines
              custom, CI/CD Fastlane pour les releases mobiles.
            </p>
          </motion.div>
        </RevealItem>

        <RevealItem direction="left">
          <motion.div
            className="rounded-xl p-5 sm:p-6 h-full"
            style={{
              background: "var(--primary-background)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${OU.pink}`,
            }}
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <UserCog className="w-4 h-4" style={{ color: OU.pink }} />
              <h3
                className="text-sm sm:text-base font-semibold text-primary"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Collaboration
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              Duo direct avec le founder : itérations courtes, décisions produit
              prises à deux, design system construit en chemin sur shadcn/ui +
              Tailwind 4. Le site marketing openup.to est sur Framer (hors
              monorepo), proxifié via le worker pour garder un domaine unique :
              openup.to (Framer) + app.openup.to (PWA) + openup.to/xxx
              (redirections edge).
            </p>
          </motion.div>
        </RevealItem>

        <RevealItem direction="right">
          <motion.div
            className="rounded-xl p-5 sm:p-6 h-full"
            style={{
              background: "var(--primary-background)",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${OU.emerald}`,
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
              Monorepo basé sur CleanStack (mon template open-source) : Clean
              Architecture + DDD, type-safety bout-en-bout via Hono RPC. Les
              redirections shortlinks vivent sur l&apos;edge Cloudflare pour
              rester sub-50ms partout. iOS et Android compilent depuis le même
              code que la PWA grâce à Capacitor.
            </p>
          </motion.div>
        </RevealItem>
      </RevealContainer>
    </section>
  );
}

export function OpenupScreenshots() {
  const [activeScreenshot, setActiveScreenshot] = useState(0);
  const active = screenshots[activeScreenshot];

  return (
    <section
      className="relative py-12 sm:py-16"
      style={{ background: `${OU.blue}06` }}
    >
      <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.03}>
            <motion.div
              className="badge mb-3 inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
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
            Captures de l&apos;application
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraph
            variant="secondary"
            className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Captures réelles de la version live, prises sur app.openup.to.
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
                    style={{ background: OU.pink }}
                  />
                  <span
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                    style={{ background: OU.amber }}
                  />
                  <span
                    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
                    style={{ background: OU.emerald }}
                  />
                </div>
                <a
                  href="https://app.openup.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 mx-2 sm:mx-8 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] text-center font-mono truncate hover:opacity-80 transition-opacity"
                  style={{
                    background: `${active.color}08`,
                    color: "var(--secondary)",
                    border: `1px solid ${active.color}12`,
                  }}
                >
                  app.openup.to
                </a>
                <div className="w-6 sm:w-[46px]" />
              </div>

              <div
                className="h-[2px]"
                style={{
                  background: `linear-gradient(to right, ${active.color}, ${screenshots[(activeScreenshot + 1) % screenshots.length].color})`,
                }}
              />

              <div
                className="relative overflow-hidden"
                style={{
                  height: "clamp(280px, 50vw, 640px)",
                  background: `linear-gradient(180deg, ${OU.blue}10 0%, ${OU.blue}03 100%)`,
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
                      placeholder="blur"
                      blurDataURL={blurDataURLs[active.src]}
                      priority={activeScreenshot === 0}
                    />
                  </motion.div>
                </AnimatePresence>

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
  );
}

export function OpenupFeatures() {
  return (
    <section className="relative py-12 sm:py-16">
      <RevealContainer className="container mx-auto text-center mb-8 sm:mb-10">
        <RevealItem direction="scale">
          <MagneticWrapper strength={0.03}>
            <motion.div
              className="badge mb-3 inline-flex"
              whileHover={{ scale: 1.05 }}
            >
              <Wallet className="w-4 h-4 text-accent" />
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
            5 piliers, un seul outil
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraph
            variant="secondary"
            className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Tout ce que les créateurs, marques et entreprises veulent dans un
            outil de gestion de liens, sans les compromis. Bilingue FR/EN.
          </Paragraph>
        </RevealItem>
      </RevealContainer>

      <RevealContainer
        staggerDelay={0.08}
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 max-w-5xl"
      >
        {features.map((feature, i) => (
          <RevealItem
            key={feature.title}
            direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"}
            className={i < 3 ? "lg:col-span-2" : "lg:col-span-3"}
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
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mt-4"
      >
        {techHighlights.map((item, i) => (
          <RevealItem
            key={item.title}
            direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
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
  );
}

export function OpenupArchitecture() {
  return (
    <section
      className="relative py-12 sm:py-16"
      style={{ background: `${OU.violet}06` }}
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
            Pensée pour la prod, pas pour le démo
          </Heading2>
        </RevealItem>

        <RevealItem>
          <Paragraph
            variant="secondary"
            className="mt-2 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Chaque couche isolée et testable. Chaque décision technique
            justifiée par un besoin produit, pas par la mode.
          </Paragraph>
        </RevealItem>
      </RevealContainer>

      <RevealContainer
        staggerDelay={0.1}
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-5xl"
      >
        {archHighlights.map((item, i) => (
          <RevealItem
            key={item.title}
            direction={i === 0 ? "left" : i === 2 ? "right" : "up"}
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
  );
}

export function OpenupTechStack() {
  return (
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
            const color = categoryColors[tech.category] || OU.blue;
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
              Monorepo · 8 packages
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
  );
}

export function OpenupBottomCta() {
  return (
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
  );
}
