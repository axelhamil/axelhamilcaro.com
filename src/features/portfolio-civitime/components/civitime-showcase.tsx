import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Boxes,
  BrainCircuit,
  Building2,
  Code2,
  Database,
  Gamepad2,
  LayoutDashboard,
  Leaf,
  Puzzle,
  Server,
  TestTube2,
  Trophy,
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

const heroTags = ["Serious Games", "RSE / B Corp", "Lead Dev"] as const;

const heroRibbon = [
  "Serious games",
  "RSE",
  "B Corp",
  "200+ modules RSE",
  "250k+ collaborateurs",
  "100+ entreprises",
  "22 langues",
  "SCORM",
  "Gamification",
  "Éditeur de scénarios",
  "Backoffice Directus",
  "Clean Architecture",
  "DDD",
  "2021 à 2024",
] as const;

const stats = [
  { value: "4", label: "Ans", sublabel: "2021-2024", tone: "" },
  { value: "10+", label: "Serious Games", tone: "etiquette-jaune" },
  { value: "200+", label: "Modules RSE", tone: "etiquette-gris" },
  { value: "100+", label: "Entreprises clientes", tone: "etiquette-jaune" },
  { value: "250k+", label: "Collaborateurs", tone: "" },
] as const;

const secondaryStats = [
  "B Corp engagée",
  "22 langues",
  "70% taux de connexion",
  "65% taux de complétion",
  "Tours, France",
] as const;

const contextCards = [
  {
    title: "L'entreprise",
    text: "Civitime est une startup B Corp fondée à Tours en 2018, spécialisée dans l'engagement RSE en entreprise via des serious games. Avec 200+ modules couvrant 70+ thématiques (carbone, biodiversité, inclusion, QVCT), la plateforme atteint 65-73% de taux de complétion vs 10% pour le e-learning classique.",
  },
  {
    title: "Mon rôle",
    text: "Arrivé comme développeur dans une équipe de 4-5 devs en méthodologie agile (Scrum, sprints, daily standups). Après le départ du CTO, mon mentor, j'ai pris le relais comme référent technique : choix techno, relation directe avec les CTO clients pour les SSO, formation d'alternants.",
  },
  {
    title: "Impact mesurable",
    text: "Crédit Agricole, L'Oréal, EDF, Société Générale et 100+ autres organisations. 70% de taux de connexion moyen sur plusieurs mois, 250 000+ collaborateurs mobilisés. Taux de complétion 65-73% vs 10% pour le e-learning classique.",
  },
  {
    title: "Contributions clés",
    text: "Réécriture legacy en Clean Architecture DDD. Éditeur de scénarios. Dashboards et backoffice Directus. Outils marketing internes. Plateforme SaaS SCORM multi-tenant from scratch. Intégration SSO grands comptes. CI/CD et pipelines de déploiement continu.",
  },
] as const;

const screenshots = [
  {
    src: "/portfolio/civitime/city-builder.webp",
    alt: "Civitime City Builder : Vue isométrique du serious game RSE",
    label: "City Builder",
    width: 4500,
    height: 3000,
  },
  {
    src: "/portfolio/civitime/galaxy-universe.webp",
    alt: "Civitime CiviTamia : Univers multi-mondes avec îles flottantes",
    label: "Univers",
    width: 1440,
    height: 1440,
  },
  {
    src: "/portfolio/civitime/mobile-engagement.webp",
    alt: "Civitime : Jeu mobile d'engagement collaborateur",
    label: "Mobile",
    width: 1080,
    height: 1080,
  },
  {
    src: "/portfolio/civitime/mobile-games.webp",
    alt: "Civitime : Jeux multi-devices sur smartphones",
    label: "Multi-devices",
    width: 1024,
    height: 512,
  },
  {
    src: "/portfolio/civitime/banner.webp",
    alt: "Civitime : serious game pour l'engagement RSE",
    label: "Bannière",
    width: 920,
    height: 230,
  },
] as const;

const roleEvolution = [
  {
    period: "2021-2023",
    title: "Développeur Fullstack",
    description:
      "Serious games RSE (city builder, quiz, escape games), éditeur de scénarios, réécriture du legacy en Clean Architecture DDD. TDD/BDD, code reviews, pair programming.",
    icon: Code2,
    tone: "",
  },
  {
    period: "2023-2024",
    title: "Lead Fullstack",
    description:
      "Référent technique post-départ du CTO. Produit SaaS SCORM de zéro, dashboards, backoffice Directus, outils marketing. SSO grands comptes, formation d'alternants.",
    icon: LayoutDashboard,
    tone: "etiquette-jaune",
  },
] as const;

const features = [
  {
    icon: Gamepad2,
    title: "Serious Games RSE",
    description:
      "Conception et développement de jeux interactifs (city builder, quiz, escape games) avec runtimes H5P et SCORM custom. Déployés sur web et mobile pour sensibiliser aux enjeux RSE.",
  },
  {
    icon: BookOpen,
    title: "Éditeur de Scénarios",
    description:
      "Conception et développement complet d'un éditeur interne permettant à l'équipe contenu de créer des scénarios de serious game de manière autonome, sans intervention développeur.",
  },
  {
    icon: Trophy,
    title: "Gamification Avancée",
    description:
      "Systèmes de progression, parrainage, classements dynamiques, duels quiz, badges et récompenses. 50+ mécaniques de jeu pour maximiser l'engagement collaborateur.",
  },
  {
    icon: Puzzle,
    title: "Modules SCORM",
    description:
      "Plateforme SaaS SCORM multi-tenant de zéro : builder d'apps, API dédiée (NestJS), runtimes custom, tracking des progressions. Déployable sur n'importe quel LMS.",
  },
  {
    icon: Leaf,
    title: "Contenus RSE",
    description:
      "Plus de 200 modules couvrant 70+ thématiques : bilan carbone, égalité, QVCT, gaspillage alimentaire, biodiversité, numérique responsable.",
  },
  {
    icon: LayoutDashboard,
    title: "Backoffice & Dashboards",
    description:
      "Création de zéro de dashboards d'administration, backoffice client avec Directus, gestion des stats, des versions et des campagnes de mailing.",
  },
] as const;

const crossCutting = [
  {
    icon: BrainCircuit,
    title: "Outils Marketing Internes",
    description:
      "Développement d'outils marketing internes : gestion de campagnes mailing, configuration d'acquisition, tableaux de bord analytics, synchronisation des données clients.",
  },
  {
    icon: Building2,
    title: "Clients Grands Comptes",
    description:
      "Déploiement pour Crédit Agricole, L'Oréal, EDF, Société Générale, ArcelorMittal, SC Johnson et 100+ autres organisations. Campagnes de 1 jour à 4 semaines.",
  },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "Architecture Modulaire",
    description:
      "Séparation stricte des couches (domain, application, infrastructure), bounded contexts, injection de dépendances. Une codebase maintenable qui a permis à l'équipe de livrer plus vite.",
  },
  {
    icon: Database,
    title: "Plateforme SaaS SCORM",
    description:
      "Produit multi-tenant : gestion des clients, déploiement des contenus, tracking des progressions à l'échelle. API NestJS dédiée, builder d'apps SCORM, runtimes custom.",
  },
  {
    icon: Boxes,
    title: "Éditeur de Contenu",
    description:
      "Éditeur interne transformant le workflow de création : réduction majeure du temps de production, l'équipe contenu peut itérer sans dev.",
  },
  {
    icon: TestTube2,
    title: "Qualite & Tests",
    description:
      "Approche TDD/BDD pour garantir la fiabilité des modules de jeu. Tests unitaires et d'intégration sur les mécaniques critiques de gamification et scoring.",
  },
] as const;

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "Firebase",
  "Google Cloud Platform",
  "RTK Query",
  "Directus",
  "Clean Architecture",
  "TDD",
  "DDD",
  "BDD",
  "SCORM",
] as const;

export function CivitimeHero() {
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
            <span className="tampon-bas">2024</span>
          </p>
        </div>

        <div className="cas-hero-texte flex flex-col gap-6">
          <p className="surtitre">Axel Hamilcaro / Civitime / CDI, 4 ans</p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="cas-logo">
              <Image
                src="/portfolio/civitime/logo.webp"
                alt="Civitime logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
            </span>
            <SharedElement name={projectTransitionName("civitime")}>
              <h1 className="cas-h1 heading-display">Civitime</h1>
            </SharedElement>
          </div>

          <p className="cas-accroche heading-display">
            <span className="marqueur">
              Serious Games & Plateforme SaaS pour l&apos;engagement RSE
            </span>
          </p>

          <Paragraph size="lg" className="cas-lede">
            <strong>
              Je suis Axel Hamilcaro : de janvier 2021 à décembre 2024,
              j&apos;ai été développeur puis lead technique chez Civitime,
              startup B Corp de Tours spécialisée dans la sensibilisation RSE
              par le jeu.
            </strong>{" "}
            Serious games, plateforme SaaS SCORM, outils internes, déployés
            auprès de 100+ entreprises et 250 000+ collaborateurs.
          </Paragraph>

          <ul className="cas-tags">
            {heroTags.map((tag) => (
              <li key={tag} className="etiquette etiquette-sm label-mono">
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
            <Button href="https://civitime.com" size="lg">
              Voir civitime.com
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Ribbon items={heroRibbon} hachures />
    </section>
  );
}

export function CivitimeStats() {
  return (
    <CaseStats
      stats={stats}
      facts={secondaryStats}
      columns="grid-cols-2 lg:grid-cols-5"
      lastItemSpan="max-lg:last:col-span-2"
    />
  );
}

export function CivitimeContext() {
  return <CaseContext title="La mission" cards={contextCards} />;
}

export function CivitimeScreenshots() {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <p className="surtitre">Aperçu</p>
        <Heading2 size="xl">Les produits Civitime</Heading2>
        <Paragraph variant="secondary">
          City builders, quiz interactifs, escape games et univers immersifs.
          Des jeux déployés sur web et mobile pour sensibiliser à grande
          échelle.
        </Paragraph>
      </header>

      <CaseGallery
        shots={screenshots}
        label="Captures de Civitime"
        address={{ href: "https://civitime.com", text: "civitime.com" }}
      />
    </section>
  );
}

export function CivitimeRoleEvolution() {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <p className="surtitre">Progression</p>
        <Heading2 size="xl">Évolution du rôle</Heading2>
        <Paragraph variant="secondary">
          De développeur à lead technique en 4 ans, avec une montée en
          responsabilité progressive sur des produits à forte contrainte métier.
        </Paragraph>
      </header>

      <ol className="grille-cartes md:grid-cols-2">
        {roleEvolution.map((role) => (
          <li
            key={role.period}
            className={`etiquette etiquette-carte cas-carte ${role.tone}`}
          >
            <span className="cas-pastille">
              <role.icon className="w-5 h-5" />
            </span>
            <p className="label-mono">{role.period}</p>
            <h3 className="heading-display title-sm">{role.title}</h3>
            <p className="cas-carte-texte">
              <BrandText text={role.description} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CivitimeFeatures() {
  return (
    <section className="cas-section container mx-auto flex flex-col gap-10">
      <header className="cas-entete mb-0">
        <p className="surtitre">Fonctionnalités</p>
        <Heading2 size="xl">Ce que j&apos;ai construit</Heading2>
        <Paragraph variant="secondary">
          Serious games, éditeur de contenu, gamification et plateforme SaaS.
          Des produits déployés à l&apos;échelle pour des grands comptes
          internationaux.
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

export function CivitimeArchitecture() {
  return (
    <section className="cas-section bloc-inverse pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <header className="cas-entete">
          <p className="surtitre">Architecture</p>
          <Heading2 size="xl">Décisions techniques</Heading2>
          <Paragraph variant="secondary">
            Une architecture pensée pour la maintenabilité et l&apos;évolution
            produit, avec une attention particulière à l&apos;autonomie des
            équipes non-techniques.
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

export function CivitimeTechStack() {
  return <CaseTechStack tech={techStack} />;
}

export function CivitimeBottomCta() {
  return <CaseBottomCta />;
}
