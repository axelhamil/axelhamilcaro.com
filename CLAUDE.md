# axelhamilcaro.com

Portfolio + site personnel d'Axel Hamilcaro. Astro static-first, écrit à la main, zéro CMS.

## Positionnement

- **Cible** : prospects techniques (CTO, lead dev, startups) cherchant un freelance Next.js / SaaS / lead tech sur la Touraine + remote France
- **Avantage vs portfolio générique** : pages de cas détaillées (4 portfolios), blog technique, contact qualifié (scoring lead par type de projet + budget)
- **Pas un produit** : pas de CMS, pas d'admin, pas de DB. Site édité directement dans le code.

## Stack

- **Framework** : Astro (static-first, îlots d'hydratation au cas par cas)
- **Contenu** : Content Collections Astro (blog MDX + portfolio MDX) avec schémas Zod
- **Styling** : Tailwind CSS v4
- **Endpoints SSR** : ~2-3 endpoints Astro (`src/pages/api/*.ts`) — au minimum `contact` (Resend)
- **Email** : Resend + templates `@react-email/components`
- **Hosting** : Vercel (adapter `@astrojs/vercel`, mode statique + SSR à la carte sur les endpoints)

## Politique de dépendances

**Deps autorisées** (plomberie / infra) :
- `astro` + integrations officielles (`@astrojs/mdx`, `@astrojs/tailwind`, `@astrojs/vercel`, `@astrojs/sitemap`, `@astrojs/check`)
- `tailwindcss` (v4)
- `resend` + `@react-email/components`
- `zod` (validation schemas content + payload contact)

**Écrit à la main** (UI / métier) :
- Tous les composants (`.astro` + îlots `.tsx` rares)
- Helpers (date, slug, lead-score, formatting)
- Endpoint contact (validation Zod + score lead + appel Resend, ~80 lignes max dans un seul fichier)
- Layouts, navbar, footer, SEO (JSON-LD à la main)

**Règle** : plomberie → dep officielle Astro. UI ou logique métier → à la main, **sauf primitives shadcn** (cf. ci-dessous).

**Primitives UI : shadcn autorisé** (décision 2026-05-20). Raison : l'objectif d'apprentissage du dev sur ce projet est **l'écosystème Astro** (pages, content collections, layouts, actions, view transitions, slots, hydration partielle), pas la rééducation à `cva` + `twMerge` + design tokens. shadcn = primitives standards déjà maîtrisées dans son patrimoine cognitif (Next.js), inutile de les réécrire. Composants installés via la CLI shadcn dans `src/components/ui/`, composés sur Tailwind v4 + tokens CSS de `src/styles/globals.css`. Reste interdit : **Radix UI** brut (overkill ici), **Headless UI**, **framer-motion** sur du contenu statique. Règle : primitives stateless via shadcn OK, tout ce qui apporte un runtime React lourd ou des deps tierces non-shadcn = à challenger.

## Architecture

Strates Astro idiomatiques, sans surcouche.

```
src/pages/         ← routes Astro (= les pages, point d'entrée). Inclut src/pages/api/* pour les endpoints.
src/layouts/       ← layouts partagés (base.astro, blog.astro, portfolio.astro)
src/components/    ← composants .astro (kebab-case fichier, PascalCase usage). Peut contenir sous-dossiers par feature (home/, portfolio/, blog/) si volume.
src/content/       ← collections MDX (blog/, portfolio/) + config.ts (schémas Zod)
src/lib/           ← helpers TS purs (date, slug, contact-score, env)
src/styles/        ← globals.css, design tokens
public/            ← assets statiques (favicons, og images, photos)
```

**Pas de** `features/`, `entities/`, `backend/`, `services/`, `repositories/`. Une page Astro est l'orchestrateur. Si une logique d'endpoint dépasse 80 lignes, elle se découpe en helpers dans `src/lib/`, jamais en services/repos.

## Conventions

- Fichiers : `kebab-case.astro` / `kebab-case.ts`
- Composants importés : `import HeroSection from "@/components/hero-section.astro"`
- Aliases TS : `@/*` → `src/*`
- Hydration : `client:load` / `client:visible` / `client:idle` uniquement si nécessaire (form contact, animations interactives). Tout le reste = composants `.astro` statiques.
- Pas de barrel `index.ts`. Imports directs vers le fichier.
- Pas de commentaires sauf si le WHY est non-évident (le code se documente).
- Content collections : toujours un schéma Zod sur le frontmatter.
- Pas de caractères AI slop dans le contenu/copy : pas d'em-dash (—), en-dash (–), ellipse (…), guillemets typographiques (« »).

## Style & composition (règles transversales, inspirées clean-stack)

**Principe** : une page Astro = composition de composants. Le markup applique du **placement**, jamais du look. Si une classe ne fait pas du placement, c'est soit un token de thème, soit un composant à extraire, soit une erreur.

1. **`class` est réservé au placement.** Autorisé : `flex` (défaut pour les stacks), `flex-col`, `flex-row`, `items-*`, `justify-*`, `gap-*`, `w-*`, `h-*`, `min-*`, `max-*`, `mx-auto`, `p[xy]?-*` *de mise en page* (gouttières d'une `section`, container), responsive breakpoints (`md:`, `lg:`, …), `aspect-*`, `order-*`, `z-*`, `sticky`/`fixed`/`absolute`/`relative` + offsets, `overflow-*`, `hidden`/`block`. **`grid` réservé au 2D réel** ; pour empiler verticalement → `flex flex-col gap-*`.
2. **Interdit inline** : couleurs (`bg-*`, `text-*` sauf utilitaire neutre comme `text-center`), `border-*` (color/radius/width), `shadow-*`, `rounded-*`, `font-*` (size/weight/family), `tracking-*`, `leading-*`, paddings de "look" (padding interne d'une card, d'un bouton — c'est le job du composant). Si tu écris `class="bg-... text-... p-4 rounded-..."` dans une page, **c'est un composant manquant**.
3. **Le look vit dans 3 endroits, jamais ailleurs** :
   - **Tokens** : `@theme` dans `src/styles/globals.css` (couleurs, radii, shadows, fonts).
   - **Utilities sémantiques** : `@layer utilities` dans `globals.css` (`.card`, `.badge`, `.btn-primary`, …) — quand le pattern n'a pas d'état/slot.
   - **Composants** : `src/components/ui/*` (primitives shadcn et customs partagées) et `src/components/<feature>/*` (sections de page). Tout ce qui a des slots, props, ou variantes va ici.
4. **Test décisif** avant d'écrire une classe Tailwind sur une page : *"est-ce que cette classe positionne quelque chose dans le flux ?"* Non → extraire. Oui → OK.
5. **Toujours shadcn d'abord, shadcn-pur ensuite.** Avant un composant custom, check `src/components/ui/` + le [registre shadcn](https://ui.shadcn.com/docs/components). Utilise les **vrais slots** (`Card`+`CardHeader`+`CardTitle`+`CardContent`) — mauvais slot = bricolage (`pt-6`, `space-y-*`). Pas de wrapper-variant ni d'override `data-slot="*"`. Ajustement nécessaire → token de thème ou édition de la primitive, **pas** d'override inline.
6. **Un seul `<main>` et un seul `<h1>` par page rendue.** `base.astro` ne wrappe pas en `<main>` — chaque `<page>.astro` (ou son layout dédié) owns son `<header>`/`<main>`/`<footer>` + son `<h1>` unique.

**Conséquence pratique** : une page comme `index.astro` doit être lisible comme une table des matières — `<Hero />`, `<Services />`, `<Portfolio />`, `<Testimonials />`, `<Contact />`. Pas de markup décoratif inline entre deux composants.

## Conventions git

- Messages de commit en **français**, conventional commits : `type(scope): description`
- Branches actuelles :
  - `astro-migration` (active, scaffold en cours par le dev)
  - `nextjs` (sauvegarde de l'ancien Next.js — référence à reprendre au fur et à mesure : `git show nextjs:<path>`)
  - `main` (encore l'ancien Next.js, jusqu'à bascule)

## Mode

Implémentation directe. Le dev cadre, valide les trade-offs aux moments-clés, Claude code.

- **Profil dev** : TypeScript senior (Next.js, React), découvre l'écosystème Astro sur ce projet. Discipline minimaliste exigée — vient de payer le prix du sur-engineering Clean Arch sur la branche `nextjs` (~6 400 LOC backend pour 1 form contact + 1 admin abandonné).
- **Lire proactivement** : codebase courant + branche `nextjs` (`git show nextjs:<path>`).
- **Vérifier la doc Astro officielle** (WebSearch/WebFetch) avant d'affirmer sur une feature mouvante : content collections v2, view transitions, image optimization, Vercel/Cloudflare adapter.
- **Anti-patterns à refuser** :
  - Clean Arch / services / repositories pour 2-3 endpoints
  - libs UI tierces **hors shadcn** (Radix brut, Headless UI, framer-motion sur du statique)
  - hydration partielle abusive (`client:*`) sur du contenu non interactif
  - content collection sans schéma Zod
  - barrel exports `index.ts`
  - commentaires explicatifs sur du code qui s'auto-documente
- **Actions destructrices** (rm, reset hard, force push) : confirmer avant. Tout le reste : exécuter.

## Historique

- 2026-05-20 : commit `8f707e5` sur `main` — fin de l'ère Next.js (qualification lead contact poussée en dernier)
- 2026-05-20 : branche `nextjs` créée depuis `main` comme sauvegarde de l'ancien code
- 2026-05-20 : branche `astro-migration` créée depuis `main`, vidée intégralement, CLAUDE.md réécrit en mode sensei. Prêt pour scaffold Astro manuel.
- 2026-05-20 : décision shadcn — l'objectif d'apprentissage est l'écosystème Astro, pas la rééducation aux primitives UI. shadcn devient la lib de référence pour `components/ui/`. Mode sensei se recentre sur Astro (slots, content collections, layouts, actions, view transitions, hydration), plus sur la composition Tailwind manuelle.
