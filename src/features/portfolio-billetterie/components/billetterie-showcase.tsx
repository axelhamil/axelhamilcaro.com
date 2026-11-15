import {
  ArrowLeft,
  Box,
  Calendar,
  ClipboardList,
  Cloud,
  Database,
  Grid3X3,
  LayoutDashboard,
  Monitor,
  Receipt,
  Server,
  Shield,
  Wifi,
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

const heroTags = ["Billetterie", "Temps réel", "NDA"] as const;

const heroRibbon = [
  "Dashboard temps réel",
  "WebSocket",
  "Latence < 200 ms",
  "Plan de salle 2D",
  "Vue 3D",
  "Seats.io",
  "Tarifs et TVA multi-taux",
  "Réservations",
  "NestJS",
  "Next.js 15",
  "Drizzle ORM",
  "PostgreSQL",
  "Livré en 1 mois",
  "NDA",
] as const;

const stats = [
  {
    value: "1",
    label: "Mois",
    sublabel: "Conception à production",
    tone: "",
  },
  { value: "WebSocket", label: "Temps réel", tone: "etiquette-jaune" },
  { value: "3D", label: "Visualisation sièges", tone: "etiquette-gris" },
  { value: "<200ms", label: "Latence WS", tone: "etiquette-jaune" },
  { value: "100%", label: "Couverture fiscale", tone: "" },
] as const;

const secondaryStats = [
  "Dashboard temps réel",
  "Plan de salle 2D/3D",
  "Gestion tarifs & TVA",
  "WebSocket bidirectionnel",
  "NDA",
] as const;

const contextCards = [
  {
    title: "Le problème",
    text: "Les salles de spectacle et organisateurs d'événements gèrent leurs réservations avec des tableurs Excel ou des outils fragmentés. Aucune visibilité temps réel sur les ventes, pas de plan de salle interactif, gestion fiscale manuelle.",
  },
  {
    title: "La solution",
    text: "Un dashboard unifié avec plan de salle 2D/3D, ventes en temps réel via WebSocket, gestion automatisée des tarifs et TVA. L'organisateur pilote ses événements depuis une interface unique.",
  },
  {
    title: "Mon rôle",
    text: "Développement fullstack du dashboard : API NestJS avec WebSocket Gateway, frontend Next.js avec Seats.io, système de tarification multi-TVA, base PostgreSQL optimisée pour le temps réel.",
  },
  {
    title: "Résultats",
    text: "Dashboard livré en 1 mois. Latence WebSocket < 200ms, 100% de couverture fiscale (TVA multi-taux), visualisation 3D fluide, adoption immédiate par l'équipe opérations.",
  },
] as const;

const screenshots = [
  {
    src: "/portfolio/billetterie/dashboard.webp",
    alt: "Billetterie : Dashboard temps réel avec KPIs",
    label: "Dashboard",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/plan-de-salle.webp",
    alt: "Billetterie : Plan de salle interactif 2D",
    label: "Plan de salle",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/vue-3d.webp",
    alt: "Billetterie : Vue 3D isométrique du théâtre",
    label: "Vue 3D",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/tarification.webp",
    alt: "Billetterie : Gestion tarifs et TVA",
    label: "Tarification",
    width: 1776,
    height: 1055,
  },
  {
    src: "/portfolio/billetterie/reservations.webp",
    alt: "Billetterie : Liste des réservations",
    label: "Réservations",
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
  },
  {
    icon: Grid3X3,
    title: "Plan de Salle 2D",
    description:
      "Plan de salle interactif Seats.io avec code couleur : disponible, occupé, sélectionné, inaccessible. Sélection multiple, calcul automatique du sous-total, légende contextuelle.",
  },
  {
    icon: Box,
    title: "Visualisation 3D",
    description:
      "Vue isométrique du théâtre via Seats.io avec perspective 3D. Toggle 2D/3D instantané, scène visible au premier plan, même interactivité qu'en 2D.",
  },
  {
    icon: Receipt,
    title: "Tarification & TVA",
    description:
      "Gestion multi-tarifs avec calcul automatique TTC. Support des taux de TVA différenciés (20%, 5.5%, 0%). Tableau CRUD avec statut actif/fermé par catégorie.",
  },
  {
    icon: Calendar,
    title: "Gestion Événements",
    description:
      "Création et pilotage d'événements avec dates, lieux, capacités. Association plan de salle, suivi des ventes par événement, statuts et archivage.",
  },
  {
    icon: ClipboardList,
    title: "Réservations",
    description:
      "Liste exhaustive des réservations avec filtres avancés, recherche instantanée, statuts colorés (confirmé, en attente, annulé). Export CSV et pagination.",
  },
] as const;

const crossCutting = [
  {
    icon: Wifi,
    title: "WebSocket Bidirectionnel",
    description:
      "NestJS WebSocket Gateway pour la diffusion temps réel. Events : nouvelles réservations, mises à jour de statut, notifications. Reconnexion automatique, heartbeat.",
  },
  {
    icon: Shield,
    title: "Sécurité & Accès",
    description:
      "Authentification JWT, rôles admin/opérateur, validation Zod de toutes les entrées. Rate limiting, CORS strict, logs d'audit sur les opérations sensibles.",
  },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "NestJS + WS Gateway",
    description:
      "API REST + WebSocket Gateway sur NestJS. Modules : auth, events, seats, bookings, pricing. Guards JWT, pipes de validation, interceptors de logging.",
  },
  {
    icon: Database,
    title: "PostgreSQL",
    description:
      "Schéma relationnel optimisé : events, seats, bookings, pricing_tiers. Index sur les requêtes temps réel, transactions ACID pour les réservations concurrentes.",
  },
  {
    icon: Monitor,
    title: "Next.js Frontend",
    description:
      "Dashboard React avec Server Components, Seats.io pour le plan de salle, state management léger. RTK Query pour le cache, WebSocket natif pour le temps réel.",
  },
  {
    icon: Cloud,
    title: "Déploiement",
    description:
      "Conteneurs Docker, CI/CD GitHub Actions, PostgreSQL managé. Variables d'environnement validées au boot, health checks, zero-downtime deployments.",
  },
] as const;

const techStack = [
  "Next.js 15",
  "React 19",
  "Tailwind CSS 4",
  "RTK Query",
  "Seats.io",
  "NestJS",
  "Drizzle ORM",
  "PostgreSQL",
  "WebSocket",
  "Zod",
  "Docker",
  "GitHub Actions",
  "Nginx",
  "Clean Architecture",
  "DDD",
  "CQRS",
] as const;

export function BilletterieHero() {
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
          <p className="surtitre">Freelance</p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="cas-logo">
              <Image
                src="/portfolio/billetterie/logo.svg"
                alt="Billetterie logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                unoptimized
              />
            </span>
            <SharedElement name={projectTransitionName("billetterie")}>
              <h1 className="cas-h1 heading-display">Billetterie Interne</h1>
            </SharedElement>
          </div>

          <p className="cas-accroche heading-display">
            <span className="marqueur">
              Dashboard de gestion d&apos;événements et ventes en temps réel
            </span>
          </p>

          <Paragraph size="lg" className="cas-lede">
            <strong>
              Je suis Axel Hamilcaro, développeur fullstack freelance : en 2025,
              j&apos;ai conçu et développé en un mois la Billetterie Interne, un
              dashboard de gestion d&apos;événements et de ventes en temps réel
              pour un organisateur d&apos;événements.
            </strong>{" "}
            Plan de salle 2D/3D, ventes en temps réel via WebSocket, gestion
            automatisée des tarifs et TVA. Projet sous NDA.
          </Paragraph>

          <ul className="cas-tags">
            {heroTags.map((tag) => (
              <li key={tag} className="etiquette etiquette-sm label-mono">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Ribbon items={heroRibbon} hachures />
    </section>
  );
}

export function BilletterieStats() {
  return (
    <CaseStats
      stats={stats}
      facts={secondaryStats}
      columns="md:grid-cols-2 xl:grid-cols-5"
      lastItemSpan="md:max-xl:last:col-span-2"
    />
  );
}

export function BilletterieContext() {
  return <CaseContext title="Le projet" cards={contextCards} />;
}

export function BilletterieScreenshots() {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <p className="surtitre">Aperçu</p>
        <Heading2 size="xl">L&apos;application en images</Heading2>
        <Paragraph variant="secondary">
          Dashboard temps réel, plan de salle interactif 2D/3D, tarification et
          gestion des réservations.
        </Paragraph>
      </header>

      <CaseGallery
        shots={screenshots}
        label="Captures de la billetterie"
        address={{ text: "dashboard.billetterie-interne.local" }}
      />
    </section>
  );
}

export function BilletterieFeatures() {
  return (
    <section className="cas-section container mx-auto flex flex-col gap-10">
      <header className="cas-entete mb-0">
        <p className="surtitre">Fonctionnalités</p>
        <Heading2 size="xl">Ce que j&apos;ai construit</Heading2>
        <Paragraph variant="secondary">
          Dashboard temps réel, plan de salle 2D/3D, tarification multi-TVA et
          gestion complète des réservations et événements.
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

export function BilletterieArchitecture() {
  return (
    <section className="cas-section bloc-inverse pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <header className="cas-entete">
          <p className="surtitre">Architecture</p>
          <Heading2 size="xl">Décisions techniques</Heading2>
          <Paragraph variant="secondary">
            Une architecture Clean avec DDD et CQRS, pensée pour la performance
            temps réel et la scalabilité des réservations concurrentes.
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

export function BilletterieTechStack() {
  return <CaseTechStack tech={techStack} />;
}

export function BilletterieBottomCta() {
  return <CaseBottomCta />;
}
