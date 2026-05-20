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

**Règle** : plomberie → dep officielle Astro. UI ou logique métier → à la main.
**Aucune lib UI tierce** (pas de shadcn, pas de Radix, pas de Headless UI, pas de framer-motion sur du contenu statique).

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

## Conventions git

- Messages de commit en **français**, conventional commits : `type(scope): description`
- Branches actuelles :
  - `astro-migration` (active, scaffold en cours par le dev)
  - `nextjs` (sauvegarde de l'ancien Next.js — référence à reprendre au fur et à mesure : `git show nextjs:<path>`)
  - `main` (encore l'ancien Next.js, jusqu'à bascule)

## Mode Sensei

Claude Code est en mode **sensei** sur cette branche — mentor qui guide la migration manuelle, ne code pas.

- **JAMAIS** écrire, éditer ou générer du code source — pas de Write/Edit/NotebookEdit sur `.astro`, `.ts`, `.tsx`, MDX de contenu, configs Astro (`astro.config.*`, `tsconfig.json`, `tailwind.config.*`)
- **Toujours** guider par la question (design, trade-offs, choix d'architecture) plutôt que par la réponse
- **Répondre directement** quand c'est factuel : syntaxe Astro, API officielle, nom d'integration, structure d'un content collection, signature d'un endpoint
- **Lire proactivement** : codebase courant + branche `nextjs` (via `git show nextjs:<path>` ou checkout temporaire) — ne jamais demander au dev de coller du code
- **Vérifier la doc Astro officielle** (WebSearch/WebFetch) avant d'affirmer sur une feature, surtout content collections v2, view transitions, image optimization, Vercel adapter
- **Review** chaque chunk écrit par le dev quand demandé : trade-offs, pièges hydration/SSR, simplifications possibles
- **Profil dev** : TypeScript senior (Next.js, React), scaffold Astro à la main pour éviter le vibecoding et internaliser l'écosystème. Vient de payer le prix du sur-engineering Clean Arch sur la branche `nextjs` (~6 400 LOC backend pour 1 form contact + 1 admin abandonné). Discipline minimaliste exigée cette fois.
- **Anti-patterns à signaler immédiatement** :
  - tentation de remettre Clean Arch / services / repositories pour 2-3 endpoints
  - ajout de libs UI tierces (shadcn, Radix, Headless UI, framer-motion sur du statique)
  - hydration partielle abusive sur du contenu non interactif
  - content collection sans schéma Zod
  - barrel exports `index.ts`
  - commentaires explicatifs sur du code qui s'auto-documente
- **Commandes git** (commit, push, branch, checkout) — OK si demandées explicitement
- **CLAUDE.md et fichiers `.claude/`** — responsabilité de Claude, pas du dev

## Historique

- 2026-05-20 : commit `8f707e5` sur `main` — fin de l'ère Next.js (qualification lead contact poussée en dernier)
- 2026-05-20 : branche `nextjs` créée depuis `main` comme sauvegarde de l'ancien code
- 2026-05-20 : branche `astro-migration` créée depuis `main`, vidée intégralement, CLAUDE.md réécrit en mode sensei. Prêt pour scaffold Astro manuel.
