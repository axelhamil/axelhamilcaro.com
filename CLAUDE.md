# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Product

Portfolio + site personnel d'Axel Hamilcaro. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Biome (pas ESLint), Drizzle + PostgreSQL (Neon), better-auth (GitHub), Resend (email).

**Pages publiques** : home, portfolio (4 cases), tree, blog, 404.
**Admin privé** : dashboard, formulaires (CRUD + editor), leads, templates, analytics, tree links.
**Formulaires publics** : `/f/[slug]` avec capture leads.

## Quick Start

```bash
pnpm dev        # dev server http://localhost:3000
pnpm build      # production build
pnpm start      # production server
pnpm lint       # Biome lint
pnpm format     # Biome format
```

## Architecture

Inspirée de `raphael-openup-app` (openup), adaptée Next.js App Router.

```
Routes (Next.js app/)  → orchestrateurs minces, composition de sections
    ↓
Features (src/features)  → UI par workflow (une feature = un écran ou un flow)
    ↓
Entities (src/entities)  → concepts métier stables partagés entre ≥2 features
    ↓
Shared (src/shared)  → infra transverse, zéro métier
    ↓
Backend (src/backend)  → logique serveur (controller/service/repository)
```

**Direction d'imports stricte** : `app → features → entities → shared → backend`. Une strate n'importe QUE d'une strate inférieure. **Aucun import latéral entre features.**

### Structure

```
app/                              # Next.js routes + layouts + api — SEUL endroit Next.js-specific
├── (site)/                       # Layout group : site public
│   ├── page.tsx                  # Home (orchestrateur de sections)
│   ├── portfolio/
│   │   ├── billetterie/page.tsx  # Compose sections de portfolio-billetterie
│   │   ├── civitime/page.tsx     # Idem
│   │   ├── openup/page.tsx       # Idem
│   │   └── scormpilot/page.tsx   # Idem
│   ├── tree/page.tsx             # Compose TreeHeader + TreeLinksWrapper + TreeContact
│   └── login/page.tsx            # Compose LoginForm + LoginFooter
├── (blog)/
│   ├── blog/page.tsx             # Liste articles
│   └── blog/[slug]/page.tsx      # Article MDX
├── admin/                        # Admin protégé
│   ├── layout.tsx                # Compose Sidebar + Header + AdminPageWrapper
│   ├── page.tsx                  # Dashboard : compose 6 sections (header, today, overview, secondary, charts, recent)
│   ├── analytics/page.tsx        # Compose 9 sections analytics via AnalyticsProvider
│   ├── forms/page.tsx            # Compose FormsHeader + FormsSearch + FormsTable via FormsProvider
│   ├── forms/new/page.tsx        # FormEditor standalone
│   ├── forms/[id]/page.tsx       # FormEditor standalone
│   ├── leads/page.tsx            # Compose LeadsHeader + LeadsFilters + LeadsTable via LeadsProvider
│   ├── templates/page.tsx        # Compose TemplatesHeader + TemplatesSearch + TemplatesGrid via TemplatesProvider
│   └── tree/page.tsx             # Compose TreeAdminHeader + TreeLinkEditor + TreeLinksList via TreeLinksProvider
├── api/                          # Routes API (wrappers minces → controllers)
│   ├── forms/, leads/, templates/, tree-links/, analytics/, admin/, upload/, auth/
├── f/[slug]/page.tsx             # Form public (capture lead)
├── nice-try/page.tsx             # 403 détecté login non-autorisé (sections)
├── not-found.tsx                 # 404 (sections)
├── sitemap.ts, robots.ts         # Next.js metadata routes
├── _config/                      # Config Next.js-liée (metadata, viewport, fonts, site)
│   ├── metadata.ts, viewport.ts, fonts.ts, site.ts, site.constants.ts
│   ├── navigation.ts, blur-placeholders.ts
└── _lib/                         # auth.ts UNIQUEMENT (BetterAuth server config + Drizzle adapter — exception couplage Next.js)
    └── auth.ts

src/
├── features/                     # UI par workflow (chaque feature = un ou plusieurs écrans)
│   ├── home/                     # Home page sections
│   │   └── components/           # hero/, parcours/, experience-timeline, what-i-do, approach, case-studies, client-reviews, tech-stack, home-faq, home-mcp
│   ├── blog/                     # Blog list + article
│   │   ├── components/           # article-card, table-of-contents (mobile + desktop), article-navigation, scroll-to-top
│   │   └── lib/                  # blog.ts (getAllPosts, getPostBySlug, extractHeadings)
│   ├── not-found/                # 404 page sections
│   │   └── components/           # fragment-hunt, not-found-label
│   ├── tree/                     # Tree public page
│   │   └── components/           # header, tree-contact, tree-links-wrapper
│   ├── nice-try/                 # 403 page sections
│   │   └── components/           # nice-try-{header,terminal,data-points,warning,return-link,incident-info}
│   ├── auth/                     # UI auth (login)
│   │   └── components/           # login-form, login-loading, login-footer
│   ├── form-public/              # /f/[slug] page
│   │   └── components/           # form-background, form-card
│   ├── portfolio-billetterie/    # Case billetterie (1 feature = 1 page showcase)
│   │   └── components/billetterie-showcase.tsx  # named exports: Backdrop, Hero, Stats, Context, Screenshots, Features, Architecture, TechStack, BottomCta
│   ├── portfolio-civitime/       # Case civitime (même pattern)
│   ├── portfolio-openup/         # Case openup (même pattern)
│   ├── portfolio-scormpilot/     # Case scormpilot (même pattern)
│   ├── admin/                    # Admin shell + dashboard
│   │   └── components/
│   │       ├── admin-page-wrapper, header, sidebar
│   │       ├── dashboard/        # 7 sections dashboard : week-chart, dashboard-{header,loading}, today-stats, overview-stats, secondary-stats, weekly-charts, recent-activity
│   │       └── shared/           # admin-{empty-state,search-input,stat-card} (cross-admin atoms)
│   ├── admin-analytics/          # Analytics page
│   │   └── components/
│   │       ├── analytics-provider (context state : date range, refresh interval, filters)
│   │       ├── analytics-loading, analytics-header, custom-date-range
│   │       ├── 7 sections : insights-panel, overview-stats, activity-charts, breakdown-panels, traffic-sources, top-links-panel, recent-activity-panels
│   │       ├── helpers : hourly-chart, day-chart, analytics-constants, generate-insights
│   ├── admin-forms/              # Forms list + editor
│   │   └── components/
│   │       ├── forms-provider (context : search + SWR forms)
│   │       ├── 3 sections : forms-header, forms-search, forms-table
│   │       ├── helpers : copy-slug-button, delete-form-button
│   │       └── form-editor/      # Éditeur complet (form-editor.tsx + tabs : background, content, email + hooks + types)
│   ├── admin-leads/              # Leads list
│   │   └── components/
│   │       ├── leads-provider (context : search, filter formId, SWR leads)
│   │       ├── 3 sections : leads-header, leads-filters, leads-table
│   │       ├── cell-helpers : status-select, notes-editor, delete-lead-button, export-button
│   │       └── lead-status-config.ts
│   ├── admin-templates/          # Templates list
│   │   └── components/
│   │       ├── templates-provider (context : search, props templates)
│   │       ├── 3 sections : templates-header, templates-search, templates-grid
│   │       └── template-card, delete-template-button
│   └── admin-tree/               # Tree admin (drag-and-drop)
│       └── components/
│           ├── tree-links-provider (context : editing state, CRUD, reorder)
│           ├── 3 sections : tree-admin-header, tree-link-editor, tree-links-list
│           └── tree-icon-options.ts
├── entities/                     # Concepts métier stables partagés cross-feature
│   ├── form/api.ts               # useForms() — SWR hook CRUD formulaires
│   ├── lead/api.ts               # useLeads() — SWR hook CRUD leads
│   └── tree-link/api.ts          # useTreeLinks() — SWR hook CRUD tree links
├── shared/                       # Infra transverse, zéro métier
│   ├── api/                      # Infra API client
│   │   ├── swr-config.ts         # swrConfig + fetcher
│   │   ├── auth-client.ts        # BetterAuth React client (createAuthClient)
│   │   └── api-auth.ts           # requireAdminAuth() pour routes API Next.js
│   ├── ui/                       # Atomes UI spécifiques (pas shadcn)
│   │   ├── contact/              # contact-modal (formulaire, valide via backend/contact)
│   │   ├── typography/           # heading2, paragraph
│   │   ├── effects/              # animated-counter, magnetic-field, typewriter
│   │   ├── navigation/           # transition-link
│   │   ├── portfolio/            # button (site-wide custom button), link-card
│   │   └── widgets/              # key-stats (homepage widget)
│   ├── layouts/                  # navbar, site-widgets
│   ├── seo/                      # json-ld
│   └── hooks/                    # use-mobile-menu, use-scroll-progress
├── backend/                      # Clean Architecture backend (controller → service → repository)
│   ├── forms/, leads/, templates/, tree-links/, analytics/, auth/
│   │   └── *.controller.ts, *.service.ts, *.repository.ts, *.schema.ts
│   └── email/                    # Email infrastructure
│       ├── email.service.ts      # sendLeadEmail, sendAdminNotification
│       ├── resend.ts             # SDK init + helpers legacy (resend instance + send helpers)
│       └── templates/            # lead-email.tsx, admin-notification.tsx
├── core/errors/                  # NotFoundError, ValidationError, ConflictError
└── lib/                          # http.ts (abstraction NextResponse), utils (date, slug, email)

components/ui/                    # shadcn primitives UNIQUEMENT (button, card, dialog, input, etc.)
drizzle/                          # schema.ts + db connection
public/                           # assets statiques
```

## Key Rules

1. **La route Next.js EST la page.** Pas de `<feature>-page.tsx` wrapper. Le fichier `app/**/page.tsx` compose les sections directement. Extraire des helpers dans `/src/features/<feature>/components/` ou `/src/shared/` — jamais de wrapper intermédiaire qui rerender la même composition.

2. **Une page = composition visible de sections.** Quand on ouvre `app/.../page.tsx`, on DOIT voir la structure : `<Hero />`, `<Stats />`, `<Features />`, etc. Pas `return <BigComponent />`. Exception unique : pages triviales qui n'ont qu'un seul composant logique (ex: `form-public` n'a qu'un `FormCard` dans un `FormPageBackground`).

3. **État partagé entre sections = Provider dans la feature.** Si 2+ sections partagent du state (search, filters, selection, SWR data), créer `<feature>-provider.tsx` avec React Context. Sections lisent via `use<Feature>Context()`. Exemples existants : `admin-forms`, `admin-leads`, `admin-analytics`, `admin-templates`, `admin-tree`.

4. **État local à UNE section = local à la section.** Si un state ne concerne qu'une section (ex: `activeScreenshot` dans `Screenshots`), garder `useState` INSIDE la section. Pas de provider inutile.

5. **No barrel exports.** Pas de `index.ts` qui re-exporte. Toujours import direct vers le fichier : `@/src/features/admin-forms/components/forms-table` pas `@/src/features/admin-forms`.

6. **Direction d'imports stricte.** `app → features → entities → shared → backend`. Une feature ne peut PAS importer une autre feature. Si besoin cross-feature : remonter d'une strate (concept métier → `entities/`, UI pure → `shared/ui/`).

7. **Server Components par défaut.** `'use client'` uniquement si : interactivité (onClick/onChange), React hooks (useState/useEffect), browser APIs (localStorage/window). Les routes qui font du data fetching server-side restent Server Components — passent data en props à des Client Components enfants.

8. **Pages portfolio : sections exportées nommées dans le SAME fichier.** Chaque `portfolio-<case>/components/<case>-showcase.tsx` exporte plusieurs sections nommées (`<Case>Backdrop`, `<Case>Hero`, `<Case>Stats`, etc.) plutôt que de créer 9 fichiers par case. Data constants et helpers restent en tête du fichier. Route importe et compose.

9. **No direct Drizzle in `/app`.** Tous les appels Drizzle passent par `/src/backend/<feature>/<feature>.repository.ts`. Routes API délèguent aux controllers. Server Components peuvent appeler services directement (`formService.getById()`). Exception : `app/_lib/auth.ts` pour l'adapter better-auth.

10. **Routes API minces.** `app/api/**/route.ts` ne fait que : extraire request, appeler controller. ~5 lignes max. Toute logique dans `/src/backend/*/[feature].controller.ts`.

11. **Framework decoupling backend.** Controllers importent `@/src/lib/http` (abstraction NextResponse), auth service reçoit `Headers` en paramètre. Pour changer de framework : changer seulement les routes + `src/lib/http.ts`.

12. **Errors domain.** Jamais swallow les erreurs. Lancer `NotFoundError`, `ValidationError`, `ConflictError` depuis services — controllers les traduisent en HTTP. Ne JAMAIS wrapper `redirect()` dans try/catch (`NEXT_REDIRECT` doit propager).

13. **Zod v4 `.parse` vs `.safeParse`.** Préférer `safeParse` dans les services (renvoie result). `parse` uniquement si tu veux catcher plus haut.

14. **No comments.** Code self-documenting. Pas de commentaires explicatifs — noms de fonctions/variables doivent suffire. Exceptions : `biome-ignore` justifiés, markers de section `{/* HERO */}` dans showcases pour navigation visuelle.

15. **Nom fichiers kebab-case, composants PascalCase.** `forms-header.tsx` exporte `FormsHeader`. Hooks `use-<name>.ts` exportent `use<Name>`.

16. **Types avec `import type`.** Toujours `import type { Metadata } from "next"`. Biome warn si manquant.

17. **shadcn dans `/components/ui` uniquement.** Ne pas créer de composants UI custom dans `/components/ui`. Les atomes UI app-specific vont dans `/src/shared/ui/`. Les composants métier vont dans `/src/features/<feature>/components/` ou `/src/entities/<entity>/components/`.

18. **Figma/screenshots = référence absolue.** Pixel-perfect ou c'est faux. Signaler contraintes techniques AVANT d'implémenter.

19. **SWR hooks dans `/src/entities/<entity>/api.ts`.** Hooks SWR de domain stable (forms, leads, tree-links) dans entities. Hooks de feature admin (analytics, dashboard) dans `/src/features/admin*/hooks/`. Ne PAS créer de hooks SWR dans `/app/`.

20. **DA centralisée dans `app/global.css`.** Le Tailwind des composants ne fait que du layout et du positionnement. Couleurs, bordures, radius, ombres, typographie, états hover/focus et animations vivent dans le CSS global. DA « atelier d'expédition » à deux thèmes : clair par défaut et sombre (`.dark` sur `<html>`, posé par `next-themes`, choix mémorisé), sélecteur `ThemeToggle` dans la navbar. 4 primitives `--noir`, `--papier`, `--jaune`, `--gris` ; `:root` (clair) et `.dark` (sombre) ne redéfinissent que les tokens sémantiques `--fond`, `--fond-2`, `--encre`, `--encre-douce`, `--encre-muette`, `--encre-accent` (jaune en sombre, noir en clair), `--aplat` (jaune), `--sur-aplat` (noir), `--surligne`, `--ombre`, `--ombre-gris`, `--ombre-jaune` (noires en clair), `--filet`, `--filet-fort`, `--dot`, `--anneau`. Jamais de texte jaune sur papier, jamais de couleur en dur ni de variante `dark:` de couleur dans un composant. `.bloc-inverse` bascule ses enfants sur l'autre thème. Radius 0, bordures 2px, ombres dures décalées uniquement, aucun dégradé, flou ni glow. Titres `.heading-display` (Inter 900 capitales), méta et boutons en Geist Mono capitales. Motifs partagés : `.etiquette` (+ `-gris`, `-jaune`, `-sm`, `-inverse`, `-fond-jaune`, `-appui`, `-carte`), `.grille-cartes`, `.tampon`, `.ruban` (composant `Ribbon`), `.hachures`, `.trame`, `.surtitre`, `.titre-accent`, `.souligne-trace`. Mouvement en CSS uniquement (`animation-timeline: view()` sous `@supports`, repli = contenu affiché, coupé sous `prefers-reduced-motion`) : pas de `framer-motion` ni de `"use client"` pour une animation. L'admin reste en clair quel que soit le thème du site : `ThemeProvider` force `light` sous `/admin` et `.admin-theme` (aussi posé sur `:root:has(.admin-theme)` pour les portails shadcn) redéfinit ses tokens. Exception `/f/[slug]` : le fond (couleur ou dégradé), la couleur et le style du badge réglés dans l'éditeur sont des données, posées en variables `--form-fond` et `--form-accent` par l'unique attribut `style` du conteneur (`formThemeStyle`), lues par `app/styles/pages.css`.

21. **Portfolio : DA du site, une couleur de marque par cas.** Les études de cas suivent la même DA que le reste du site (Inter 900 capitales, étiquettes, tampons, ruban, radius 0, aucun dégradé, flou ni glow, deux thèmes) et partagent l'ossature CSS de `app/styles/portfolio.css`. Seule différence : `<main className="cas cas-<case>">` remplace le jaune par UNE couleur de marque du client, via les tokens locaux `--marque` (aplat, texte noir dessus) et `--marque-profonde` (ombre d'accent en clair) qui redéfinissent `--aplat`, `--encre-accent` et `--ombre-jaune` pour les deux thèmes ; contraste texte mesuré ≥ 4.5:1. Aucun hex dans le JSX.

## Page Structure

### Layouts

- `app/layout.tsx` : root (fonts, metadata, JsonLd, SiteWidgets)
- `app/(site)/layout.tsx` : layout du site public (Navbar + main)
- `app/(blog)/layout.tsx` : layout blog (Navbar + Footer)
- `app/admin/layout.tsx` : admin shell (Sidebar + Header + AdminPageWrapper + Toaster)

### Patterns de composition

**Orchestrateur simple (home, tree public) :**
```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <WhatIDo />
      <Approach />
      <CaseStudies />
      <TechStack />
      <HomeFaq />
    </main>
  );
}
```

**Avec Provider (admin forms/leads/templates/tree, analytics) :**
```tsx
export default function FormsPage() {
  return (
    <FormsProvider>
      <div className="space-y-6">
        <FormsHeader />
        <FormsSearch />
        <FormsTable />
      </div>
    </FormsProvider>
  );
}
```

**Avec Loading boundary (dashboard, analytics) :**
```tsx
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />
      <DashboardLoading>
        <TodayStats />
        <OverviewStats />
        <WeeklyCharts />
        <RecentActivity />
      </DashboardLoading>
    </div>
  );
}
```

**Portfolio case (sections exportées nommées) :**
```tsx
export default function BilletteriePage() {
  return (
    <main className="pb-8">
      <div className="relative">
        <BilletterieBackdrop />
        <BilletterieHero />
        <BilletterieStats />
        <BilletterieContext />
        <BilletterieScreenshots />
        <BilletterieFeatures />
        <BilletterieArchitecture />
        <BilletterieTechStack />
        <BilletterieBottomCta />
      </div>
    </main>
  );
}
```

## Backend Patterns

### Zod v4

```typescript
import { z, ZodError } from "zod";

const schema = z.object({
  email: z.email("Email invalide"),
  name: z.string().min(2),
});

try {
  schema.parse(data);
} catch (error) {
  if (error instanceof ZodError) {
    error.issues[0].message;
  }
}
```

### Domain errors

```typescript
import { NotFoundError, ValidationError, ConflictError } from "@/src/core/errors/domain.error";

throw new NotFoundError("Formulaire", id);
throw new ValidationError("Ce formulaire n'est plus actif");
throw new ConflictError("Un formulaire avec ce slug existe déjà");
```

### Repository

```typescript
export const formRepository = {
  async findById(id: string): Promise<Form | null> { ... },
  async create(data: FormInsert): Promise<Form> { ... },
  async update(id: string, data: Partial<FormInsert>): Promise<Form> { ... },
  async delete(id: string): Promise<void> { ... },
};
```

### Service

```typescript
export const formService = {
  async create(input: unknown) {
    const data = createFormSchema.parse(input);
    const slug = generateSlug(data.slug || data.title);
    if (await formRepository.slugExists(slug)) {
      throw new ConflictError("Slug existe déjà");
    }
    return formRepository.create({ ...data, slug });
  },
};
```

### Controller + Route

```typescript
// app/api/forms/route.ts — route thin
import { headers } from "next/headers";
import * as formController from "@/src/backend/forms/form.controller";

export async function GET() {
  return formController.list(await headers());
}

export async function POST(request: Request) {
  return formController.create(await request.json(), await headers());
}

// src/backend/forms/form.controller.ts — framework-agnostic
import { json, error } from "@/src/lib/http";
import { authService } from "@/src/backend/auth/auth.service";
import { formService } from "./form.service";

export async function list(headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);
  const forms = await formService.list();
  return json(forms);
}
```

## Configuration

### Biome (`biome.json`)

- Formatter : 2 spaces, 80 char, double quotes, semicolons
- Import organization enabled
- Strict TS (no unused variables/imports)
- a11y rules enabled
- `console.log` OK, `console.warn` non

### Next.js (`next.config.ts`)

- React strict mode, compression, view transitions
- Headers security (DNS prefetch, nosniff, referrer policy)
- Redirects : `/linkedin`, `/github`, `/malt`, `/rdv` → externes

### Tailwind v4 + design system

- `@tailwindcss/postcss`, couche custom `lots` déclarée entre `components` et `utilities`
- `app/global.css` : primitives, tokens et classes partagées (fondation). CSS propre à une zone dans `app/styles/{home,services,pages,blog,portfolio}.css`, importés par `global.css` dans la couche `lots` (gagne sur les classes partagées, perd contre les utilitaires Tailwind)
- Fonts : Inter 400/500/700/900 (`--font-inter`, texte et titres), Geist Mono (`--font-geist-mono`, méta, navigation, boutons) ; `--font-display` est un alias d'Inter
- Thèmes : `next-themes` (`defaultTheme="light"`, classe `.dark`), `ThemeToggle` dans `src/shared/ui/theme/theme-toggle.tsx`
- Navigation : `TransitionLink` = `next/link` simple ; transitions de page par View Transitions (`experimental.viewTransition` + `<ViewTransition>` dans les layouts `(site)` et `(blog)`), tout le style dans `global.css` (tokens `--vt-*`) : balayage au marqueur jaune sur la racine (vers une fiche `main.cas` ou un article = gauche à droite, sinon droite à gauche), navbar et trait actif `.nav-trait` continus, titre de carte → H1 par `SharedElement` (`src/shared/ui/navigation/shared-element.tsx`, un nom par slug). Le retour navigateur n'anime pas (Next 16.0.7 commit le `popstate` hors transition)
- Bouton du site `src/shared/ui/portfolio/button.tsx` (variantes `primary`, `secondary`, `on-accent`, `ghost`, tailles `sm`, `md`, `lg`, `icon`) rendu par les classes `.btn-*`
- Utility `cn()` dans `lib/utils`

## Environment

- Analytics Vercel + Speed Insights (layout racine)
- Auth : better-auth + GitHub provider
- DB : Drizzle + Neon PostgreSQL
- Email : Resend (templates dans `src/backend/email/templates/`)

## Checklist refacto future

- [x] Migrer `/app/_hooks/swr/use-*` → `/src/entities/<entity>/api.ts` (pattern raphael)
- [x] Migrer `/app/_lib/{auth,auth-client,swr-config,api-auth}` → `/src/shared/api/`
- [x] Migrer `/app/_lib/{emails,resend}` → `/src/backend/email/`
- [ ] Créer `src/entities/form/components/` si des composants form sont réutilisés cross-feature
- [ ] Créer `src/entities/lead/components/` si pertinent
- [x] Décomposer `admin-forms/components/form-editor/` (reste monolithique à ~275 lignes dans `form-editor.tsx`)

## Identité & parcours (canonique SEO/GEO)

But : une seule identité, formulée à l'identique partout, pour que les IA qui scrapent (ChatGPT, Perplexity, AI Overviews) citent une entité cohérente.

1. **Identité canonique** : « Axel Hamilcaro, développeur fullstack et builder » (`IDENTITY_TITLE`), `jobTitle` = `Développeur fullstack et builder` (`JOB_TITLE`), dans `app/_config/site.constants.ts`. Thèse de référence, reprise à l'identique ou presque (1re personne dans le visible : hero home, hero /about, hero /portfolio ; 3e personne dans `IDENTITY_SUMMARY`, `PERSON_DESCRIPTION`, `llms*.txt`) : « Je construis les API et les outils de fondation sur lesquels d'autres bâtissent leurs produits, plutôt que des SaaS qui consomment ces API. Mon pari pour 2026 et 2027 : fournir l'outil et la donnée, pas l'application finale. » Jamais plus de 2 fois en entier sur une même page (l'intro « Mes builds » et la fiche du parcours n'en reprennent qu'un écho). Il est défini par l'ensemble de ses builds : clean-stack (boilerplate SaaS open source), weathertop (« une API de données : on lui envoie des prompts en volume et elle renvoie ce que les assistants IA répondent réellement, sous une forme exploitable par du code », projet personnel, Eskimoz jamais cité dans un texte sur Weathertop, en chantier depuis 6 mois, pas encore sortie ; jamais de vocabulaire SEO, GEO, ranking, classement ou marque à son sujet, ni de lien avec Eskimoz, ni de concurrent nommé), afterlive (« transforme l'enregistrement d'un direct, ou n'importe quelle vidéo longue, en clips courts, montés et prêts à publier : 2 heures de vidéo traitées en 5 minutes environ, une quinzaine de clips et davantage si besoin », bientôt en production) et les outils publiés sur GitHub (`app/_config/projects.ts`, source du texte validé). Un projet privé ne se décrit que par son domaine, son ambition générale, son statut et sa durée : jamais d'idée, de stack, de fonctionnalité, d'offre ni de `SoftwareApplication` détaillé dans les métadonnées, le JSON-LD, le sitemap, les `llms*.txt` ou le MCP. Exception validée par Axel : afterlive dit ce qu'il fait et ses chiffres (ci-dessus), jamais comment (ni stack, ni méthode, ni dépôt). OpenUp est un projet parallèle parmi d'autres : le fait « fondateur technique d'OpenUp depuis 2026 » reste, jamais en tête ni dans la phrase d'identité. Le freelance reste vrai sans être le titre. À garder alignés : `metadata.ts`, `site.ts`, `src/shared/seo/json-ld.tsx` (`PERSON_DESCRIPTION`), `public/llms.txt` + `llms-full.txt`, serveur MCP (`src/backend/mcp/`), eyebrow `/about`.
2. **Orthographe et intentions** : `fullstack` en un seul mot (jamais `full-stack`). Le H1 de la home dit « Axel Hamilcaro, développeur fullstack et builder » : la home vise l'entité (nom + builder). L'intention « développeur fullstack freelance » appartient à `/services` (title, meta, `ProfessionalService` + `Offer` aux prix réels de `RATES`). Exception : `/services/creation-application-web` vise les clients non techniques avec « développeur web freelance ». Une intention par URL, jamais deux pages sur la même requête.
3. **Personne grammaticale** : texte visible et meta description à la 1re personne ; JSON-LD, `llms*.txt`, ressources MCP, `alt` et `<title>` à la 3e personne. `FAQPage` reprend mot pour mot la FAQ visible.
4. **Métadonnées par page** : `buildPageMetadata()` (`src/shared/seo/page-metadata.ts`) donne canonical, OG et Twitter complets. `<title>` ≤ 60 caractères marque comprise (le template `%s · Axel Hamilcaro` ajoute 17), description unique de 140 à 160 caractères. Le JSON-LD global ne porte que `Person`, l'`Organization` OpenUp, `WebSite` et le `WebAPI` du serveur MCP (`@id` stables `#person`, `#website`, `#mcp`) ; le `ProfessionalService` `#service` (offres, adresse, SIRET, note et avis Malt) sort d'un seul builder, `buildProfessionalServiceSchema()`, émis à l'identique sur la home et `/services` ; tout `@id` référencé sur une page y est défini (test `professional-service.test.ts`) ; chaque page ajoute le sien via `JsonLdScript`.
5. **Parcours réel (faits canoniques, ne pas réinventer)** : Wild Code School 2020 (Concepteur Développeur, Bac+3/4) → Civitime janvier 2021 à décembre 2024, **de développeur à lead technique** (jamais "lead dès l'embauche") → freelance depuis 2024 → développeur fullstack chez Eskimoz depuis septembre 2026 (nom d'organisation seulement, aucun détail interne) ; fondateur technique d'OpenUp depuis 2026. Civitime = EdTech B Corp, plateforme RSE, refonte Clean Archi + DDD + event sourcing.
6. **Durée freelance dynamique** : `getFreelanceYears()` (`FREELANCE_SINCE_YEAR = 2024`), recalculé au build. Jamais de "X ans" en dur. Dans les métas/OG, préférer la date absolue "depuis 2024" (citable, ne périme pas).
7. **Rédaction SEO/GEO** : answer-first (1re phrase = entité + localisation + spécialité, en gras), pas de tiret cadratin, accents complets, phrases de longueur variée. Voir skill `write-seo-geo-article` pour le détail.
8. **Format d'un article** : `content/blog/<slug>.mdx`, nom de fichier = slug = URL `/blog/<slug>` (slug avec le mot-clé exact). Pas de `# H1` dans le MDX (le `title` est rendu en H1), commencer aux `##` ; seuls H2/H3 alimentent la table des matières. Frontmatter : `title` (H1, max 65), `seoTitle` optionnel (max 43, le suffixe de marque ajoute 17 pour un `<title>` ≤ 60), `subtitle`, `date` et `dateModified` (`AAAA-MM-JJ`), `excerpt` (meta et OG, 140 à 160 caractères, answer-first, sans deux-points), `tags`, `category` (Guide, Étude de cas, Traduction…), `faq` optionnel (liste `question`/`answer`). Validé par zod au build : un `excerpt` > 160 caractères casse la page (erreur 500). `faq` n'injecte que le JSON-LD `FAQPage` : écrire aussi `## Questions fréquentes` dans le corps, synchronisée mot pour mot. Images `![alt](/chemin)`, blockquotes et tableaux stylés automatiquement, sans import. Sitemap, BlogPosting lié à `#person` et image OG par article (`/blog/<slug>/og`) déjà câblés.
9. **Sitemap** : `lastModified` réels, jamais `new Date()` ; une page statique change de date seulement quand son contenu change.
10. **Espacement sections `/about`** : `py-12 sm:py-16` (pas `py-20 sm:py-32`, jugé trop aéré).

## IndexNow (indexation instantanée)

Notifie Bing, Yandex, Seznam, Naver, Yep, Amazon à chaque publication/màj. **Google ne supporte PAS IndexNow** (pour lui : sitemap + Search Console). Endpoint unique `https://api.indexnow.org/indexnow` (hub qui redistribue à tous les participants).

**Composants :**
1. `public/{clé}.txt` — preuve de propriété servie par Vercel (`/{clé}.txt`). Clé actuelle : `a07af9fbd3a6615ffc58dca83622cc58`. **Ne pas supprimer/renommer** sans régénérer (sinon 403 côté moteurs).
2. `scripts/indexnow.mjs` — `pnpm indexnow --all` (lit `sitemap.xml` live → soumet tout, pour bootstrap/re-sync), `pnpm indexnow <url…>` (liste ciblée), `--dry-run` (n'envoie rien). La clé est résolue en cherchant dans `public/` le `.txt` dont le **contenu == le nom** (évite de confondre avec `llms.txt`/`llms-full.txt`).
3. `.github/workflows/indexnow.yml` — déclenché sur `deployment_status` **success + Production** (pas sur `push`), pour ne jamais pinger une URL avant qu'elle soit live. Diff `git HEAD^..HEAD` sur `content/blog/*.mdx` → URLs d'articles ajoutés/modifiés/supprimés + `/blog` + home → ping ciblé.

**Prérequis CI :** Vercel doit créer des GitHub Deployments (Vercel → Settings → Git, actif par défaut ; `vercel[bot]` crée des deployments `environment: Production`).

**Limites assumées :** diff sur le dernier commit uniquement (un push = un article, cas réel). Pour soumettre des pages statiques ajoutées hors blog → `pnpm indexnow --all` à la main.

**Cloudflare :** DNS-only (trafic sort direct de Vercel). **Crawler Hints non utilisable** (faudrait proxifier Vercel derrière CF en orange cloud, déconseillé). L'approche CI ci-dessus est indépendante de l'hébergeur.
