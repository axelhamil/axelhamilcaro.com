import {
  ArrowLeft,
  ArrowUpRight,
  Cloud,
  Database,
  ExternalLink,
  Globe,
  LayoutDashboard,
  Lock,
  Monitor,
  Package,
  Server,
  Share2,
  Shield,
  TestTube2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Ribbon } from "@/src/shared/ui/motifs/ribbon";
import {
  projectTransitionName,
  SharedElement,
} from "@/src/shared/ui/navigation/shared-element";
import { Button } from "@/src/shared/ui/portfolio/button";
import { CaseGallery } from "@/src/shared/ui/portfolio/case-gallery";
import {
  CaseBottomCta,
  CaseContext,
  CaseStats,
  CaseTechStack,
} from "@/src/shared/ui/portfolio/case-sections";
import { BrandText } from "@/src/shared/ui/typography/brand-text";
import { Heading2 } from "@/src/shared/ui/typography/heading2";
import { Paragraph } from "@/src/shared/ui/typography/paragraph";

const heroTags = ["E-learning", "RGPD", "Solo Dev"] as const;

const heroRibbon = [
  "SCORM 1.2 et 2004",
  "Player et runtime",
  "Multi-diffusion",
  "Multi-tenant",
  "Dashboard analytics",
  "App Teams",
  "5 apps en solo",
  "Monorepo Turborepo",
  "Architecture hexagonale",
  "RGPD",
  "Hébergement européen",
  "99.9% uptime",
  "MVP en 3 mois",
  "Tours",
] as const;

const stats = [
  {
    value: "100%",
    label: "Solo",
    sublabel: "Conception à production",
    tone: "",
  },
  {
    value: "Milliers",
    label: "de players quotidiens",
    sublabel: undefined,
    tone: "etiquette-jaune",
  },
  {
    value: "5",
    label: "Apps",
    sublabel: "Monorepo Turborepo",
    tone: "etiquette-gris",
  },
  {
    value: "99.9%",
    label: "Uptime",
    sublabel: undefined,
    tone: "etiquette-jaune",
  },
  {
    value: "Dizaines",
    label: "de clients actifs",
    sublabel: undefined,
    tone: "",
  },
] as const;

const secondaryStats = [
  "Multi-tenant SaaS B2B",
  "RGPD conforme",
  "Hébergement 100% européen",
  "SCORM 1.2 & 2004",
  "Tours, France",
] as const;

const contextCards = [
  {
    title: "Le problème",
    text: "Les organismes de formation qui vendent des modules SCORM n'ont aucun contrôle une fois le fichier ZIP envoyé au client. Les LMS sont rigides, coûteux et surdimensionnés pour la simple diffusion de contenus e-learning.",
  },
  {
    title: "La solution",
    text: "ScormPilot centralise les modules SCORM et permet leur diffusion multi-canal (lien, iframe, SCORM connecté, Teams). L'organisme garde le contrôle sur le versioning, les accès et les analytics de ses contenus.",
  },
  {
    title: "Mon rôle",
    text: "Conception produit, architecture, développement de 5 applications (API, dashboard, player, runtime, Teams), infrastructure cloud et mise en production. Tout en solo, du premier commit à la première facture.",
  },
  {
    title: "Résultats",
    text: "MVP livré en 3 mois. Adopté par une dizaine d'organismes de formation, plusieurs milliers de players quotidiens, dizaines de clients actifs. Produit en croissance continue avec un modèle SaaS récurrent.",
  },
] as const;

const screenshots = [
  {
    src: "/portfolio/scormpilot/dashboard.webp",
    alt: "ScormPilot : Tableau de bord avec statistiques globales",
    label: "Dashboard",
    path: "dashboard",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/modules.webp",
    alt: "ScormPilot : Performance détaillée des modules SCORM",
    label: "Modules",
    path: "modules",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/library.webp",
    alt: "ScormPilot : Bibliothèque de modules avec gestion des versions",
    label: "Bibliothèque",
    path: "bibliothèque",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/scormpilot/clients.webp",
    alt: "ScormPilot : Gestion multi-tenant des clients",
    label: "Clients",
    path: "clients",
    width: 1776,
    height: 1055,
  },
] as const;

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Analytics",
    description:
      "Tableau de bord complet avec KPIs en temps réel : nombre d'utilisateurs, taux de complétion, score moyen, durée moyenne, tendance des lancements. Filtrage par client et par date.",
  },
  {
    icon: Package,
    title: "Gestion des Modules",
    description:
      "Upload, versionning et pilotage à distance des fichiers SCORM. Remplacement de la source sans recharger côté client, tracking des progressions par module.",
  },
  {
    icon: Share2,
    title: "Multi-diffusion",
    description:
      "Quatre modes de diffusion : lien unique, code iframe, SCORM connecté (tracker injecté), application Microsoft Teams. Le client choisit son canal.",
  },
  {
    icon: Users,
    title: "Multi-tenant",
    description:
      "Chaque client dispose d'un pool d'utilisateurs isolé via Firebase Identity Platform. Trois modes d'authentification : email, anonyme, LMS.",
  },
  {
    icon: Shield,
    title: "RGPD & Sécurité",
    description:
      "Hébergement 100% européen (GCP Belgique, DigitalOcean Frankfurt). Aucune donnée personnelle superflue collectée, serveurs dédiés par organisme.",
  },
  {
    icon: Monitor,
    title: "SCORM Player & Runtime",
    description:
      "Player React avec mode démo et login LMS. Runtime vanilla TypeScript : orchestration SCORM complète, monitoring de connexion, observation des commits.",
  },
] as const;

const crossCutting = [
  {
    icon: Cloud,
    title: "Infrastructure Production",
    description:
      "CI/CD GitHub Actions, containers Docker sur Cloud Run, PostgreSQL managé, Firebase Auth/Storage. 99.9% uptime.",
  },
  {
    icon: Globe,
    title: "Internationalisation",
    description:
      "Dashboard admin avec next-intl, player SCORM avec i18next. Interface disponible en français et anglais, extensible à d'autres langues.",
  },
] as const;

const archHighlights = [
  {
    icon: Database,
    title: "Architecture Hexagonale",
    description:
      "Séparation stricte domain / application / infrastructure. 4 bounded contexts (Organisme, Client, Module, Plan), 22 use cases, 25+ value objects, 7 ports d'abstraction.",
  },
  {
    icon: Server,
    title: "Monorepo Turborepo",
    description:
      "5 apps (API Fastify, Dashboard Next.js, Player React, Runtime SCORM, Teams App) et 5 packages partages (drizzle, libs, types, ui, config).",
  },
  {
    icon: Lock,
    title: "Multi-tenant & Auth",
    description:
      "Firebase Identity Platform avec tenant dédié par client. Trois modes d'auth (email, anonyme, LMS). Validators domaine pour l'isolation des données entre organismes.",
  },
  {
    icon: TestTube2,
    title: "DI & Qualite",
    description:
      "InversifyJS pour l'injection de dépendances. Validation Zod au démarrage (env vars). Containers Docker non-root, secrets validés au boot.",
  },
] as const;

const techStack = [
  "Next.js 16",
  "React 19",
  "Vite 7",
  "Tailwind CSS 4",
  "TanStack Query",
  "Fastify 5",
  "Drizzle ORM",
  "PostgreSQL 16",
  "InversifyJS",
  "Zod",
  "Firebase",
  "Google Cloud Run",
  "Docker",
  "Turborepo",
  "GitHub Actions",
  "Cloudflare Workers",
  "Hexagonal Architecture",
  "DDD",
  "SCORM",
] as const;

export function ScormpilotHero() {
  return (
    <section className="cas-hero trame pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <Button href="/#portfolio" variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </Button>
          <p aria-hidden="true" className="tampon tampon-droite mr-2 mt-2">
            <span className="tampon-haut">Expédié</span>{" "}
            <span className="tampon-bas">2025</span>
          </p>
        </div>

        <div className="cas-hero-texte flex flex-col gap-6">
          <p className="surtitre">Freelance, SaaS</p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="cas-logo">
              <Image
                src="/portfolio/scormpilot/logo.webp"
                alt="ScormPilot logo"
                width={200}
                height={160}
                className="h-10 w-auto sm:h-12"
              />
            </span>
            <SharedElement name={projectTransitionName("scormpilot")}>
              <h1 className="cas-h1 heading-display">ScormPilot</h1>
            </SharedElement>
          </div>

          <p className="cas-accroche heading-display">
            <span className="marqueur">
              Plateforme SaaS de gestion et diffusion de modules SCORM
            </span>
          </p>

          <Paragraph size="lg" className="cas-lede">
            <strong>
              Je suis Axel Hamilcaro, développeur fullstack freelance : en 2025,
              j&apos;ai conçu et développé seul ScormPilot, une plateforme SaaS
              de gestion et de diffusion de modules SCORM.
            </strong>{" "}
            Elle s&apos;adresse aux organismes de formation qui vendent des
            contenus SCORM et veulent garder la main sur la diffusion.
            Versioning, multi-diffusion, analytics et multi-tenant, développé en
            solo. Plusieurs milliers de players quotidiens, dizaines de clients
            actifs.
          </Paragraph>

          <ul className="cas-tags">
            {heroTags.map((tag) => (
              <li key={tag} className="etiquette etiquette-sm label-mono">
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
            <Button href="https://scormpilot.com" size="lg">
              <ExternalLink className="w-5 h-5" />
              Voir scormpilot.com
              <ArrowUpRight className="w-5 h-5" />
            </Button>
            <Button
              href="https://dashboard.scormpilot.com/dashboard"
              variant="secondary"
              size="lg"
            >
              Ouvrir le dashboard
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Ribbon items={heroRibbon} hachures />
    </section>
  );
}

export function ScormpilotStats() {
  return (
    <CaseStats
      stats={stats}
      facts={secondaryStats}
      columns="grid-cols-2 lg:grid-cols-5"
      lastItemSpan="max-lg:last:col-span-2"
    />
  );
}

export function ScormpilotContext() {
  return <CaseContext title="Le projet" cards={contextCards} />;
}

export function ScormpilotScreenshots() {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <p className="surtitre">Aperçu</p>
        <Heading2 size="xl">L&apos;application en images</Heading2>
        <Paragraph variant="secondary">
          Dashboard admin, gestion des modules, suivi des clients et analytics
          détaillées par module.
        </Paragraph>
      </header>

      <CaseGallery
        shots={screenshots}
        label="Captures de ScormPilot"
        address={{
          href: "https://dashboard.scormpilot.com/dashboard",
          text: "dashboard.scormpilot.com/",
        }}
      />
    </section>
  );
}

export function ScormpilotFeatures() {
  return (
    <section className="cas-section container mx-auto flex flex-col gap-10">
      <header className="cas-entete mb-0">
        <p className="surtitre">Fonctionnalités</p>
        <Heading2 size="xl">
          Ce que j&apos;ai <br /> <span className="marqueur">construit</span>
        </Heading2>
        <Paragraph variant="secondary">
          Dashboard analytics, gestion multi-tenant, diffusion multi-canal et
          runtime SCORM custom. Un produit complet déployé en production.
        </Paragraph>
      </header>

      <ul className="grille-cartes md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <li
            key={feature.title}
            className="etiquette etiquette-carte cas-carte"
          >
            <span className="cas-pastille">
              <feature.icon className="w-5 h-5" />
            </span>
            <h3 className="heading-display title-sm">{feature.title}</h3>
            <p className="cas-carte-texte">
              <BrandText text={feature.description} />
            </p>
          </li>
        ))}
      </ul>

      <ul className="grille-cartes md:grid-cols-2">
        {crossCutting.map((item) => (
          <li
            key={item.title}
            className="etiquette etiquette-jaune etiquette-carte cas-carte"
          >
            <span className="cas-pastille">
              <item.icon className="w-5 h-5" />
            </span>
            <h3 className="heading-display title-sm">{item.title}</h3>
            <p className="cas-carte-texte">
              <BrandText text={item.description} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ScormpilotArchitecture() {
  return (
    <section className="cas-section bloc-inverse pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <header className="cas-entete">
          <p className="surtitre">Architecture</p>
          <Heading2 size="xl">
            Décisions <br /> <span className="marqueur">techniques</span>
          </Heading2>
          <Paragraph variant="secondary">
            Une architecture hexagonale avec DDD, pensée pour la scalabilité et
            l&apos;isolation multi-tenant des données.
          </Paragraph>
        </header>

        <ul className="grille-cartes md:grid-cols-2">
          {archHighlights.map((item) => (
            <li
              key={item.title}
              className="etiquette etiquette-gris etiquette-carte cas-carte"
            >
              <span className="cas-pastille">
                <item.icon className="w-5 h-5" />
              </span>
              <h3 className="heading-display title-sm">{item.title}</h3>
              <p className="cas-carte-texte">
                <BrandText text={item.description} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ScormpilotTechStack() {
  return <CaseTechStack tech={techStack} />;
}

export function ScormpilotBottomCta() {
  return <CaseBottomCta />;
}
