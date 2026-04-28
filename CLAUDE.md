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
│   ├── tree/page.tsx             # Compose TreeHeader + TreeLinksWrapper + TreeFooter
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
│   ├── navigation.ts, tree-links.ts, blur-placeholders.ts
└── _lib/                         # auth.ts UNIQUEMENT (BetterAuth server config + Drizzle adapter — exception couplage Next.js)
    └── auth.ts

src/
├── features/                     # UI par workflow (chaque feature = un ou plusieurs écrans)
│   ├── home/                     # Home page sections
│   │   └── components/           # hero/, experience-timeline, case-studies, tech-stack, testimonials, footer, what-i-do, approach, trusted-by
│   ├── blog/                     # Blog list + article
│   │   ├── components/           # article-card, blog-navbar, table-of-contents (mobile + desktop), article-navigation, scroll-to-top
│   │   └── lib/                  # blog.ts (getAllPosts, getPostBySlug, extractHeadings)
│   ├── not-found/                # 404 page sections
│   │   └── components/           # caught-counter, glitch-text, particle, success-message
│   ├── tree/                     # Tree public page
│   │   └── components/           # header, footer, links, tree-links-wrapper
│   ├── nice-try/                 # 403 page sections
│   │   └── components/           # nice-try-{backdrop,header,terminal,data-points,warning,return-link,incident-info}, hacker-terminal, use-typewriter
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
│   │   ├── typography/           # heading1, heading2, paragraph
│   │   ├── effects/              # reveal, tilt-card, magnetic-wrapper, scroll-progress, emoji-rain, etc.
│   │   ├── navigation/           # transition-link, page-transition
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

## Page Structure

### Layouts

- `app/layout.tsx` : root (fonts, metadata, JsonLd, SiteWidgets, PageTransition)
- `app/(site)/layout.tsx` : layout du site public (Navbar + main)
- `app/(blog)/layout.tsx` : layout blog (BlogNavbar)
- `app/admin/layout.tsx` : admin shell (Sidebar + Header + AdminPageWrapper + Toaster)

### Patterns de composition

**Orchestrateur simple (home, tree public) :**
```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <CaseStudies />
      <TechStack />
      <Footer />
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

- `@tailwindcss/postcss`
- Editorial/Magazine theme, accent unique `#ff4d00`
- Fonts : Geist Sans, Geist Mono, Space Grotesk (display)
- Utility `cn()` dans `lib/cn.tsx`
- Classes utilitaires custom : `.card`, `.card-accent`, `.badge`

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
