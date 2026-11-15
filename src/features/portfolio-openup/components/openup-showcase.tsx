import {
  Anchor,
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  Globe2,
  Link2,
  Network,
  Palette,
  QrCode,
  Server,
  Smartphone,
  UserCog,
  Zap,
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

const heroTags = ["Produit", "En production", "Web + iOS + Android"] as const;

const heroLede =
  "Un lien partagé sur Instagram ou TikTok s'ouvre dans le navigateur intégré de l'app, où l'utilisateur n'est connecté à rien. OpenUp le sort de là et ouvre Spotify, Amazon ou YouTube en natif : 57 applications résolues, 11 in-app browsers contournés, redirection décidée en moins de 50 ms depuis l'edge.";

const heroRibbon = [
  "Deep links",
  "Liens raccourcis",
  "QR codes dynamiques",
  "Link-in-bio",
  "Analytics",
  "Domaine personnalisé",
  "57 apps en natif",
  "11 in-app browsers",
  "Edge < 50 ms",
  "Stripe EUR + USD",
  "iOS, Android, PWA",
  "Monorepo 8 packages",
  "Clean Architecture",
  "Hono RPC",
] as const;

const stats = [
  {
    value: "57",
    label: "Apps ouvertes en natif",
    sublabel: "Spotify · Amazon · YouTube · Uber…",
    tone: "",
  },
  {
    value: "10-15%",
    label: "Conversion payante",
    sublabel: "Sur plusieurs milliers d'utilisateurs",
    tone: "etiquette-jaune",
  },
  {
    value: "11",
    label: "In-app browsers contournés",
    sublabel: "Instagram · TikTok · WeChat…",
    tone: "etiquette-gris",
  },
  {
    value: "<50ms",
    label: "Edge Cloudflare",
    sublabel: "Partout dans le monde",
    tone: "etiquette-jaune",
  },
] as const;

const secondaryStats = [
  "+940 fichiers TypeScript",
  "+190 fichiers domain/application",
  "8 packages monorepo",
  "4 plans Stripe EUR + USD",
  "iOS · Android · PWA",
] as const;

const contextCards = [
  {
    title: "Problématique",
    text: "Sur Instagram, TikTok ou Facebook, un lien s'ouvre dans le navigateur intégré de l'app. L'utilisateur n'y est connecté à rien : ni à Spotify, ni à Amazon, ni à YouTube. Le clic se perd avant d'arriver. Les créateurs, marques et entreprises qui vivent de ces liens ont besoin qu'ils ouvrent la vraie app, partout dans le monde, sans attendre.",
  },
  {
    title: "Mon rôle",
    text: "Je suis le fondateur technique d'OpenUp. Toute la technique, de zéro, première version en production en quelques semaines : architecture, backend Hono DDD, app mobile Capacitor (iOS + Android + PWA depuis une seule codebase), Cloudflare Worker pour les redirections edge et les deep links, intégration Stripe multi-devise, BetterAuth, Cloudflare for SaaS pour les domaines custom, CI/CD Fastlane pour les releases mobiles.",
  },
  {
    title: "Collaboration",
    icon: UserCog,
    text: "Itérations courtes, décisions produit prises à deux, design system construit en chemin sur shadcn/ui + Tailwind 4. Le site marketing openup.to est sur Framer (hors monorepo), proxifié via le worker pour garder un domaine unique : openup.to (Framer) + app.openup.to (PWA) + openup.to/xxx (redirections edge).",
  },
  {
    title: "Approche technique",
    text: "Monorepo basé sur CleanStack (mon template open-source) : Clean Architecture + DDD, typage de bout en bout via Hono RPC. Les redirections shortlinks vivent sur l'edge Cloudflare pour rester sub-50ms partout. iOS et Android compilent depuis le même code que la PWA grâce à Capacitor.",
  },
] as const;

const screenshots = [
  {
    src: "/portfolio/openup/links-dashboard.webp",
    alt: "OpenUp : Dashboard de gestion des liens raccourcis avec sidebar et tableau de stats",
    label: "Tableau de bord",
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/analytics.webp",
    alt: "OpenUp : Analytics global avec courbes de clics, répartition par appareil et géographie",
    label: "Analytics",
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/bio-editor.webp",
    alt: "OpenUp : Éditeur Link-in-bio WYSIWYG avec preview iPhone temps réel",
    label: "Éditeur de bio",
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/qr-customizer.webp",
    alt: "OpenUp : Personnalisation de QR Code dynamique avec motifs, repères, logo et couleurs",
    label: "QR codes",
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/pricing.webp",
    alt: "OpenUp : Page de tarifs avec 4 plans Stripe en EUR ou USD selon géolocalisation IP",
    label: "Tarifs",
    width: 1920,
    height: 1080,
  },
  {
    src: "/portfolio/openup/link-advanced.webp",
    alt: "OpenUp : Création de lien avec paramètres avancés : expiration, geo, password, UTM, deep links",
    label: "Lien avancé",
    width: 1920,
    height: 1080,
  },
] as const;

const features = [
  {
    icon: Anchor,
    title: "Deep links natifs",
    description:
      "57 applications résolues : un lien Spotify ouvre le bon titre dans l'app, un lien Amazon la bonne fiche produit. Intent Android avec fallback navigateur, Universal Links iOS.",
  },
  {
    icon: Link2,
    title: "Liens raccourcis",
    description:
      "URLs courtes openup.to/xxx avec slug custom, expiration, limite de clics, filtre géo, mot de passe, UTM et scheduling.",
  },
  {
    icon: QrCode,
    title: "QR Codes dynamiques",
    description:
      "8 motifs, repères Pro, logo (auto-détecté plateforme ou custom image), palette + couleurs custom. Export PNG/JPG/SVG, ajout Apple Wallet en 1 tap.",
  },
  {
    icon: Palette,
    title: "Link-in-bio WYSIWYG",
    description:
      "Éditeur avec preview iPhone temps réel. Widgets audio, Google Maps, contact chat, Calendly, Spotify. Thèmes, dark mode, drag & drop.",
  },
  {
    icon: BarChart3,
    title: "Analytics complet",
    description:
      "Dashboard liens + QR + bio. KPIs, évolution temporelle, répartition appareil/OS/navigateur/géo/heures, top sources de trafic.",
  },
  {
    icon: Globe2,
    title: "Domaine personnalisé",
    description:
      "Branding total via Cloudflare for SaaS. Configuration DNS guidée, vérification automatique, certificats SSL provisionnés à la volée.",
  },
] as const;

const techHighlights = [
  {
    icon: Anchor,
    title: "Sortir des in-app browsers",
    description:
      "11 navigateurs intégrés détectés server-side. Scheme d'évasion pour Instagram et Facebook, instructions guidées pour TikTok et WeChat qui n'en laissent aucun. Cascade de secours sur 5 navigateurs iOS, détection d'ouverture réelle via visibilitychange, repli web à 1,8s.",
  },
  {
    icon: CreditCard,
    title: "Multi-devise EUR + USD",
    description:
      "Détection auto de la devise via geo IP, override possible. Stripe gère un Product avec un Price par couple devise/période. Promos appliquées sur les 2 devises automatiquement.",
  },
  {
    icon: Smartphone,
    title: "Mobile natif iOS + Android",
    description:
      "Capacitor partage 100% du code avec la PWA web. Wrappers natifs pour clipboard, share, haptics. Releases via Fastlane vers TestFlight + Play Store automatiques sur tag.",
  },
] as const;

const archHighlights = [
  {
    icon: Server,
    title: "Clean Architecture + DDD",
    description:
      "Zéro import externe dans le domaine (ddd-kit + Zod uniquement). Result<T,E>, Option<T>, ValueObjects, Aggregates avec events. Use cases purs : zéro logique métier, tout dans les agrégats.",
  },
  {
    icon: Zap,
    title: "Edge <50ms partout",
    description:
      "Cloudflare Worker dédié pour les endpoints critiques : redirections courtes openup.to/xxx et proxy Framer du site marketing. Latence sub-50ms partout dans le monde, scaling auto, coût négligeable.",
  },
  {
    icon: Network,
    title: "Event-driven découplé",
    description:
      "Domain events après chaque mutation persistée. Handlers idempotents pour les side effects (emails, logs, notifs). Zéro appel direct à un service externe depuis un use case.",
  },
] as const;

const techStack = [
  "Hono",
  "TypeScript 5",
  "Drizzle ORM",
  "PostgreSQL",
  "Cloudflare Workers",
  "Cloudflare for SaaS",
  "Capacitor",
  "React 19",
  "Vite + PWA",
  "TanStack Router",
  "TanStack Query",
  "Hono RPC client",
  "BetterAuth",
  "Stripe",
  "Resend",
  "Cloudflare R2",
  "Apple Wallet",
  "Google Wallet",
  "shadcn/ui",
  "Tailwind 4",
  "i18next",
  "Zod",
  "inwire DI",
  "Clean Architecture",
  "DDD",
  "Fastlane CI/CD",
] as const;

const monorepo = [
  { name: "apps/api", desc: "Backend Hono (DDD, 9 modules domaine)" },
  {
    name: "apps/app",
    desc: "Mobile Capacitor + PWA (TanStack Router, Hono RPC)",
  },
  {
    name: "apps/link-router",
    desc: "Cloudflare Worker (redirections + proxy Framer)",
  },
  {
    name: "packages/ddd-kit",
    desc: "Result, Option, Entity, ValueObject, EventDispatcher",
  },
  { name: "packages/drizzle", desc: "Schema DB + migrations + seeds" },
  {
    name: "packages/reserved-slugs",
    desc: "Slugs interdits partagés API + worker",
  },
  { name: "packages/ui", desc: "shadcn/ui partagé Tailwind 4" },
  { name: "packages/test", desc: "Utilitaires de test (mocks, factories)" },
] as const;

export function OpenupHero() {
  return (
    <section className="cas-hero trame pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <Button href="/#portfolio" variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </Button>
          <p aria-hidden="true" className="tampon tampon-droite mr-2 mt-2">
            <span className="tampon-haut">En cours</span>{" "}
            <span className="tampon-bas">2026</span>
          </p>
        </div>

        <div className="cas-hero-texte flex flex-col gap-6">
          <p className="surtitre">
            Axel Hamilcaro / OpenUp / Fondateur technique
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <span className="cas-logo">
              <Image
                src="/portfolio/openup/logo.svg"
                alt="OpenUp logo"
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12"
                unoptimized
              />
            </span>
            <SharedElement name={projectTransitionName("openup")}>
              <h1 className="cas-h1 heading-display">OpenUp</h1>
            </SharedElement>
          </div>

          <p className="cas-accroche heading-display">
            <span className="marqueur">Le lien qui ouvre la vraie app.</span>
          </p>

          <Paragraph size="lg" className="cas-lede">
            <strong>
              Je suis Axel Hamilcaro, fondateur technique d&apos;OpenUp depuis
              2026 : un générateur de deep links live sur openup.to.
            </strong>{" "}
            <BrandText text={heroLede} />
          </Paragraph>

          <Paragraph variant="secondary" className="cas-lede">
            Autour du lien : QR codes, link-in-bio et analytics. Web, iOS et
            Android depuis une seule codebase, abonnés payants en euros et en
            dollars. Plusieurs milliers d&apos;utilisateurs, 10 à 15% convertis
            en payant.
          </Paragraph>

          <ul className="cas-tags">
            {heroTags.map((tag) => (
              <li key={tag} className="etiquette etiquette-sm label-mono">
                {tag}
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6">
            <Button href="https://openup.to" size="lg">
              Voir openup.to
              <ArrowUpRight className="w-5 h-5" />
            </Button>
            <Button href="https://app.openup.to" variant="secondary" size="lg">
              Ouvrir l&apos;app
              <ArrowUpRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <Ribbon items={heroRibbon} hachures />
    </section>
  );
}

export function OpenupStats() {
  return (
    <CaseStats
      stats={stats}
      facts={secondaryStats}
      columns="grid-cols-2 lg:grid-cols-4"
    />
  );
}

export function OpenupContext() {
  return <CaseContext title="Le produit" cards={contextCards} />;
}

export function OpenupScreenshots() {
  return (
    <section className="cas-section container mx-auto">
      <header className="cas-entete">
        <p className="surtitre">Aperçu</p>
        <Heading2 size="xl">Captures de l&apos;application</Heading2>
        <Paragraph variant="secondary">
          Captures réelles de la version live, prises sur app.openup.to.
        </Paragraph>
      </header>

      <CaseGallery
        shots={screenshots}
        label="Captures d'OpenUp"
        address={{ href: "https://app.openup.to", text: "app.openup.to" }}
      />
    </section>
  );
}

export function OpenupFeatures() {
  return (
    <section className="cas-section container mx-auto flex flex-col gap-10">
      <header className="cas-entete mb-0">
        <p className="surtitre">Fonctionnalités</p>
        <Heading2 size="xl">
          Le deep link d&apos;abord, <br />
          <span className="marqueur">le reste autour</span>
        </Heading2>
        <Paragraph variant="secondary">
          Le cœur, c&apos;est le deep link. Liens raccourcis, QR codes,
          link-in-bio, analytics et domaines personnalisés s&apos;ajoutent
          autour, dans une seule app bilingue FR/EN.
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

      <ul className="grille-cartes lg:grid-cols-3">
        {techHighlights.map((item) => (
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

export function OpenupArchitecture() {
  return (
    <section className="cas-section bloc-inverse pleine-largeur">
      <div className="container mx-auto px-4 sm:px-6 md:px-10">
        <header className="cas-entete">
          <p className="surtitre">Architecture</p>
          <Heading2 size="xl">
            Pensée pour la prod, <br />
            <span className="marqueur">pas pour la démo</span>
          </Heading2>
          <Paragraph variant="secondary">
            Chaque couche isolée et testable. Chaque décision technique
            justifiée par un besoin produit, pas par la mode.
          </Paragraph>
        </header>

        <ul className="grille-cartes lg:grid-cols-3">
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

export function OpenupTechStack() {
  return (
    <CaseTechStack
      tech={techStack}
      aside={
        <div className="etiquette etiquette-jaune etiquette-carte cas-carte mr-1.5">
          <p className="label-mono">Monorepo · 8 packages</p>
          <dl className="cas-monorepo">
            {monorepo.map((pkg) => (
              <div key={pkg.name}>
                <dt>{pkg.name}</dt>
                <dd>
                  <BrandText text={pkg.desc} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      }
    />
  );
}

export function OpenupBottomCta() {
  return <CaseBottomCta />;
}
