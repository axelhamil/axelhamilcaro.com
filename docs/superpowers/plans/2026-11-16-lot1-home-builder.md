# Lot 1 : home recentrée builder, Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Skills front à charger avant d'écrire et à citer dans chaque brief d'implémenteur : `frontend-design` et `lean-ui` (toujours), `redesign-existing-ui` (page existante à recentrer, avec sa règle « Protect SEO and GEO »).** Le design system du repo (`app/global.css`, `app/styles/*.css`) prime sur leurs presets : pas de Geist, pas de changement de palette.

**Goal:** Faire de la home un site de builder qui construit en public, avec les missions clients en retrait filtrant, sans changer la DA ni l'identité SEO.

**Architecture:** Les textes de la home sont figés dans `app/_config/home-copy.ts` (un seul endroit à relire par Axel, testé contre les règles absolues). « En ce moment » est un fichier de config typé Zod (`app/_config/now.ts`) rendu par une section masquée quand il est vide. Les sections existantes sont réordonnées et réécrites en place ; tout le style vit dans `app/global.css` et `app/styles/home.css`.

**Tech Stack:** Next.js 16 App Router (Server Components), React 19, Tailwind v4 (layout seulement), CSS global (tokens `--encre`, `--aplat`, classes `.etiquette`, `.surtitre`, `.marqueur`, `.offre`), Zod v4, Biome, runner de tests `node:test` via tsx.

**Spec:** `docs/superpowers/specs/2026-11-16-builder-repositioning-design.md` (lot 1, plus décisions des sections 6 à 8). Règles du repo : `CLAUDE.md`.

## Global Constraints

- `IDENTITY_TITLE` (« Axel Hamilcaro, développeur fullstack et builder ») et `JOB_TITLE` inchangés ; le H1 de la home garde « Axel Hamilcaro, développeur fullstack et builder ». `fullstack` en un mot.
- Texte visible et meta description à la 1re personne ; JSON-LD, `llms*.txt`, MCP à la 3e. Jamais plus de 2 fois la thèse en entier sur une page.
- Aucun tiret cadratin ni demi-cadratin, nulle part. Accents complets. Aucun commentaire dans le code, pas de barrel `index.ts`, pas de `as X` ni `!`, guard clauses.
- **Règle absolue : Eskimoz et Weathertop ne sont jamais associés** (même phrase, même entrée, même section). Jamais de vocabulaire SEO, GEO, ranking, classement ou marque à propos de Weathertop ; aucun concurrent nommé.
- Un projet privé (Weathertop, Afterlive) ne se décrit que par les textes de `PRIVATE_BUILD_TEXTS` (`app/_config/projects.ts`) : jamais de stack, de méthode, d'idée ni de date de sortie inventée.
- Tous les prix à 500 € HT par jour. Hébergement au nom du client. Aucun client identifiable hors cas déjà publiés.
- DA centralisée : Tailwind des composants = layout seulement ; couleurs, bordures, ombres, typo, hover dans `app/global.css` ou `app/styles/home.css`. Radius 0, bordures 2px, aucun dégradé, flou ni glow, jamais de texte jaune sur papier, aucune couleur en dur ni `dark:` couleur. Mouvement CSS seulement (`.reveal-up`), pas de `framer-motion`. Cliquable = `Button` (`src/shared/ui/portfolio/button.tsx`) ou `TransitionLink`.
- Strates : `app → features → entities → shared → backend`, aucun import latéral entre features. Server Components par défaut.
- Contenu dans le HTML servi (SSR) ; une seule `h1` ; ids d'ancre conservés (`portfolio`, `parcours`, `services`, `mcp`, `methode`) car la navbar et les pages portfolio y pointent.
- Commits : Conventional Commits, un par tâche, signés, jamais `--no-verify`, ne pas changer de branche (`feat/builder-repositioning`).
- Runner : `node --import tsx --test <fichier>` ; tout : `node --import tsx --test "app/**/*.test.ts" "src/**/*.test.ts" "src/**/*.test.tsx"` (base : 139 tests verts). Vérifs : `pnpm lint` (Biome), `pnpm exec tsc --noEmit`, `pnpm build`.

## Review Focus

- `NOW_ENTRIES` vide : la section « En ce moment » ne rend rien, ni titre ni ancre (Task 2).
- Une entrée dont le `slug` n'existe plus dans `PROJECTS` ou dont la date n'est pas `AAAA-MM-JJ` : refusée au chargement du module, donc au build, pas en production (Task 2).
- Plusieurs entrées dans le désordre : la plus récente d'abord, ordre stable à date égale (Task 2).
- Un texte de la home qui associe Eskimoz et Weathertop, ou contient un tiret cadratin ou demi-cadratin, ou du vocabulaire SEO/GEO sur Weathertop (Task 1).
- Mobile 390 px : accroche longue en capitales, trois stats avec libellés longs, deux listes « prend / refuse » : aucun débordement horizontal (Task 7, preuve visuelle).

---

### Task 1: Textes figés et garde-fous de copy

**Files:**
- Create: `app/_config/home-copy.ts`
- Create: `app/_config/home-copy.test.ts`

**Interfaces:**
- Produces (consommé par les Tasks 2 à 6) : `HERO_COPY`, `FACT_LABELS`, `NOW_COPY`, `WORK_COPY`, `HOME_RIBBONS`, `PARCOURS_INTRO`, `HOME_FAQ_ANSWERS`, `HOME_DESCRIPTION` (tous `as const`, textes ci-dessous), et `ALL_HOME_TEXTS: readonly string[]` (aplatit toutes les chaînes, utilisé par le test).

- [ ] **Step 1: Écrire le test qui échoue** dans `app/_config/home-copy.test.ts` (importe `ALL_HOME_TEXTS`, `NOW_ENTRIES` de la Task 2 est exclu : il a son propre test) :
  - `test("no home text names Eskimoz and Weathertop together")` : pour chaque texte de `ALL_HOME_TEXTS`, `assert.ok(!(/eskimoz/i.test(t) && /weathertop/i.test(t)))`.
  - `test("no home text uses an em or en dash")` : `assert.doesNotMatch(t, /[–—]/)`.
  - `test("no home text pairs Weathertop with search vocabulary")` : si le texte contient `weathertop`, `assert.doesNotMatch(t, /\b(seo|geo|ranking|classement|marque)\b/i)`.
  - `test("home meta description is 140 to 160 characters")` : `HOME_DESCRIPTION.length` entre 140 et 160.

- [ ] **Step 2: Lancer** `node --import tsx --test app/_config/home-copy.test.ts`. Attendu : FAIL, module introuvable.

- [ ] **Step 3: Créer `app/_config/home-copy.ts`** avec exactement ces textes (Axel les valide dans la PR) :

```ts
HERO_COPY = {
  accroche: "Je construis des API et des outils sur lesquels d'autres bâtissent, et je le fais en public.",
  intro: "Je suis Axel Hamilcaro, développeur fullstack et builder, basé à Tours.",
  context: "Je suis aussi développeur chez Eskimoz et je mène OpenUp en parallèle.",
  primaryCta: "Voir ce que je construis",
  secondaryCta: "Suivre mes builds",
  selective: "J'accepte quelques projets choisis par trimestre.",
  selectiveLink: "Voir comment travailler avec moi",
}
FACT_LABELS = { publicBuilds: "builds publics sur GitHub", privateBuilds: "builds privés en cours", developerSince: "développeur depuis" }
NOW_COPY = {
  surtitre: "En ce moment",
  titleTop: "Mon journal",
  titleAccent: "de chantier.",
  intro: "Où en sont mes builds, point daté par point daté. Rien n'est annoncé avant d'être vrai.",
  nextLabel: "Prochaine étape",
}
WORK_COPY = {
  surtitre: "Missions choisies",
  titleTop: "Travailler",
  titleAccent: "avec moi.",
  intro: "Je construis d'abord mes produits. Je prends quelques projets choisis, quand ils ressemblent à ce que je construis.",
  takeTitle: "Ce que je prends",
  take: ["API et données", "Briques pour agents IA", "Produits partis de zéro", "Lead tech à temps partiel"],
  refuseTitle: "Ce que je refuse",
  refuse: ["Sites vitrines", "Régie", "Maintenance de legacy sans refonte"],
  doubt: "Un doute sur le fit ? Écris-moi, je réponds sous 24 h.",
  cta: "Voir les 5 offres",
  detailTitle: "Le détail des offres",
}
HOME_RIBBONS.work = ["Travailler avec moi", "API", "Données", "Briques pour agents IA", "Produits partis de zéro", "Lead tech à temps partiel", "Démo chaque semaine", "Un seul interlocuteur"]
PARCOURS_INTRO = "De développeur à lead technique chez Civitime, puis à mon compte. Aujourd'hui développeur chez Eskimoz, avec OpenUp en parallèle."
HOME_DESCRIPTION = "Je suis Axel Hamilcaro, développeur fullstack et builder à Tours. Je construis des API et des outils en public, dont clean-stack, et j'accepte peu de projets."
HOME_FAQ_ANSWERS.freelance = "Oui, quelques projets choisis, à côté de mes builds, de mon poste et d'OpenUp. Je prends des API, des données, des briques pour agents IA, des produits partis de zéro et du lead tech à temps partiel. Le détail est sur la page Services, à l'adresse axelhamilcaro.com/services."
HOME_FAQ_ANSWERS.projectTypes = "Des API et des produits de données, des briques pour agents IA, des produits qui partent de zéro, du lead tech à temps partiel. Je ne prends ni sites vitrines, ni régie, ni maintenance de legacy sans refonte. Stack principal : Next.js, React, Node.js, TypeScript, PostgreSQL."
```

Les fichiers consommés lisent ces constantes ; `ALL_HOME_TEXTS` = toutes les chaînes et éléments de tableaux.

- [ ] **Step 4: Relancer** le test. Attendu : PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add app/_config/home-copy.ts app/_config/home-copy.test.ts
git commit -m "feat(home): fix the builder copy with absolute-rule guards"
```

### Task 2: « En ce moment » (config typée + section)

**Files:**
- Create: `app/_config/now.ts`
- Create: `app/_config/now.test.ts`
- Create: `src/features/home/components/now.tsx`
- Modify: `app/styles/home.css` (classes `.maintenant-*`)

**Interfaces:**
- Consumes: `NOW_COPY` (Task 1), `PRIVATE_BUILD_TEXTS`, `getProjectBySlug`, `getProjectMeta` de `app/_config/projects.ts` ; `formatLongDate(isoDate: string): string` de `src/lib/utils/date.utils.ts`.
- Produces :
  - `nowEntrySchema` (Zod) : `{ date: z.iso.date(), slug: z.string().min(1), summary: z.string().min(1), next: z.string().min(1) }` ; `type NowEntry = z.infer<typeof nowEntrySchema>`.
  - `sortNowEntries(entries: readonly NowEntry[]): NowEntry[]` (date décroissante, stable).
  - `NOW_ENTRIES: readonly NowEntry[]` = `z.array(nowEntrySchema).parse([...])` déjà trié.
  - `export function Now({ entries = NOW_ENTRIES }: NowProps)` avec `export interface NowProps { entries?: readonly NowEntry[] }`, retourne `null` si aucune entrée valide.

- [ ] **Step 1: Écrire les tests qui échouent** dans `app/_config/now.test.ts` (et un `renderToStaticMarkup(Now({entries: []}))` pour la section) :
  - `test("an entry with a malformed date is rejected")` : `nowEntrySchema.safeParse({...entry, date: "14/11/2026"}).success === false`.
  - `test("every entry points to an existing project")` : chaque `slug` de `NOW_ENTRIES` donne `getProjectBySlug(slug) !== undefined`.
  - `test("entries are sorted newest first and ties keep their order")` : `sortNowEntries` sur 3 entrées désordonnées dont 2 à date égale.
  - `test("no entry names Eskimoz, nor search vocabulary next to Weathertop")` : sur `summary` et `next`, pas de `/eskimoz/i` ; si `slug === "weathertop"`, pas de `/\b(seo|geo|ranking|classement|marque)\b/i` ; pas de tiret cadratin ni demi-cadratin.
  - `test("the section renders nothing without entries")` : `renderToStaticMarkup(<Now entries={[]} />)` égale `""` (fichier de test en `.tsx` : `app/_config/now.test.tsx`).
  - `test("the section shows the long French date and links to the project page")` avec une entrée du 2026-11-14 : le markup contient `14 novembre 2026`, `datetime="2026-11-14"` et `href="/portfolio/weathertop"`. Si `next/link` ne se rend pas sous node:test, rendre le lien via `TransitionLink` déjà utilisé ailleurs et ne pas asserter le `href` ici.

- [ ] **Step 2: Lancer** `node --import tsx --test app/_config/now.test.tsx`. Attendu : FAIL, module introuvable.

- [ ] **Step 3: Implémenter `app/_config/now.ts`** avec deux entrées, aucune autre (rien d'inventé, textes dérivés de `PRIVATE_BUILD_TEXTS`) :
  - Weathertop, `date: "2026-11-14"`, `summary: \`Weathertop est ${weathertop.pitch}. En chantier depuis ${weathertop.duration}, pas encore sortie.\``, `next: "Je continue ticket par ticket et je ne donne pas de date."`.
  - Afterlive, `date: "2026-11-14"`, `summary: \`Afterlive ${afterlive.pitch}. Je le construis seul depuis fin septembre 2026.\``, `next: "Il sera bientôt en production, sans date annoncée."`.
  Dates = `dateModified` réelles des fiches.

- [ ] **Step 4: Implémenter `Now` dans `src/features/home/components/now.tsx`** : `<section id="maintenant" aria-labelledby="maintenant-title">` calquée sur `what-i-do.tsx` (grille `lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`, `.section-tete`, `.surtitre`, `Heading2 size="xl"` avec `NOW_COPY`). Liste `<ol>` d'entrées `.reveal-up` : `<time dateTime>` en `.etiquette .etiquette-sm`, nom du projet en lien `TransitionLink` vers `/portfolio/${slug}` (`.heading-display`), statut via `getProjectBySlug(slug)` + `getProjectMeta`, `summary` en `Paragraph`, `next` précédé de `NOW_COPY.nextLabel` en `.label-mono`. Entrée dont le projet est introuvable : ignorée (guard clause). Style dans `app/styles/home.css` en réutilisant `.offre` (filet 2px, hover aplat) ; aucune couleur en dur.

- [ ] **Step 5: Relancer** les tests, puis `pnpm lint`. Attendu : PASS, Biome propre.

- [ ] **Step 6: Commit**

```bash
git add app/_config/now.ts app/_config/now.test.tsx src/features/home/components/now.tsx app/styles/home.css
git commit -m "feat(home): add the dated en ce moment section"
```

### Task 3: Hero builder, CTA, stats, meta description

**Files:**
- Modify: `src/features/home/components/hero/hero-left.tsx`
- Modify: `src/features/home/components/hero/hero.tsx` (ruban : ajouter `"Next.js"`, `"NestJS"`, `"Cloudflare Workers"`, `"Capacitor"`, récupérés de `tech-stack.tsx` retiré en Task 6)
- Modify: `app/_config/projects.ts` (ajouter `PRIVATE_BUILDS_COUNT` ; retirer « 17 étoiles » des `highlights` et du `ribbon` de `clean-stack`)
- Modify: `app/_config/site.ts` (`description: HOME_DESCRIPTION`)
- Modify: `app/styles/home.css` (`.hero-accroche`, ligne « sélective »)

**Interfaces:**
- Consumes: `HERO_COPY`, `FACT_LABELS`, `HOME_DESCRIPTION` (Task 1), `THESIS.firstPerson`, `EXTERNAL_LINKS.github`, `PUBLIC_BUILDS_COUNT`, `PARCOURS.civitime.debut.iso`.
- Produces: `export const PRIVATE_BUILDS_COUNT: number` (= `PROJECTS.filter(({ visibility }) => visibility === "private").length`).

- [ ] **Step 1: Écrire le test qui échoue** `PRIVATE_BUILDS_COUNT` : dans `src/backend/mcp/mcp.projects.test.ts` ou un nouveau `app/_config/projects.test.ts`, `test("the clean-stack poster no longer leans on the star count")` : `getProjectBySlug("clean-stack")` ne contient « étoiles » ni dans `highlights` ni dans `ribbon` (la fiche `/portfolio/clean-stack`, `stats` et `llms*.txt` gardent le fait, daté).
- [ ] **Step 2: Lancer** ce test. Attendu : FAIL.
- [ ] **Step 3: Implémenter** : `highlights: ["Open source", "v2.2.2", "Auth + multi-tenant"]`, ruban sans « 17 étoiles » ; export `PRIVATE_BUILDS_COUNT`.
- [ ] **Step 4: Réécrire `hero-left.tsx`** : H1 inchangé ; `<p className="hero-accroche">` = `HERO_COPY.accroche` ; lede = `<strong>{HERO_COPY.intro}</strong> {THESIS.firstPerson} {HERO_COPY.context}` ; CTA primaire `Button href="/#portfolio"` (`primaryCta`, `ArrowDown`), CTA secondaire `Button href={EXTERNAL_LINKS.github} external variant="secondary"` (`secondaryCta`, `ArrowUpRight`) ; sous les CTA, `<p>` : `HERO_COPY.selective` suivi d'un `TransitionLink href="/#services"` (`selectiveLink`, `.link-underline .label-mono .cible-tactile`). Stats = 3 faits : `{ v: String(PUBLIC_BUILDS_COUNT), l: FACT_LABELS.publicBuilds }`, `{ v: String(PRIVATE_BUILDS_COUNT), l: FACT_LABELS.privateBuilds }`, `{ v: PARCOURS.civitime.debut.iso.slice(0, 4), l: FACT_LABELS.developerSince }`, mêmes `tone` qu'aujourd'hui. Supprimer `FIRST_JOB_YEAR`, « 20+ applications livrées », « ans de métier ».
- [ ] **Step 5: CSS** : `.hero-accroche { max-width: 32ch }` (l'accroche passe de 7 à 17 mots), taille inchangée sauf débordement constaté à 390 px.
- [ ] **Step 6: `site.ts`** : `description: HOME_DESCRIPTION` (importer depuis `./home-copy`). Vérifier qu'aucun test ne fige l'ancienne description : `grep -rn "prends des projets en freelance" app src`.
- [ ] **Step 7: Lancer** tests complets, `pnpm lint`, `pnpm exec tsc --noEmit`. Attendu : tout vert (139 + nouveaux).
- [ ] **Step 8: Commit**

```bash
git add src/features/home/components/hero app/_config/projects.ts app/_config/site.ts app/styles/home.css app/_config/projects.test.ts
git commit -m "feat(home): recentre the hero on what I build in public"
```

### Task 4: Builds d'abord, missions en retrait

**Files:**
- Modify: `src/features/home/components/case-studies.tsx`
- Modify: `app/_config/case-studies.ts` (export `HOME_CLIENT_CASES`)
- Modify: `src/entities/project/components/project-build-card.tsx` (prop `showUpdate`)
- Modify: `app/styles/atelier.css` seulement si la grille à 2 cartes déborde

**Interfaces:**
- Consumes: `OPENUP_CASE`, `MISSION_CASES`, `PROJECTS` (`featured`), `formatLongDate`.
- Produces: `export const HOME_CLIENT_CASES: readonly CaseStudy[]` = `MISSION_CASES` filtrée sur `slug` dans `["scormpilot", "billetterie"]` (ordre conservé) ; `ProjectBuildCardProps` gagne `showUpdate?: boolean` : ajoute à `meta` le segment `Mis à jour le ${formatLongDate(project.dateModified)}`.

- [ ] **Step 1: Test qui échoue** `app/_config/case-studies.test.ts` : `test("the home keeps only the two strong client cases")` : `HOME_CLIENT_CASES.map(c => c.slug)` égale `["scormpilot", "billetterie"]`.
- [ ] **Step 2: Lancer**, attendu FAIL ; **Step 3: implémenter** l'export.
- [ ] **Step 4: Réécrire `case-studies.tsx`** (garder `id="portfolio"` et `aria-labelledby`). En-tête : surtitre « Mes builds », titre « Ce que <br/> <span marqueur>je construis. », intro courte qui garde un écho de la thèse sans la répéter en entier (« Des API, des briques et des outils de fondation, construits en public, avec leur statut et leur dernière mise à jour. OpenUp, que je mène en parallèle, en fait partie. »). Première grille `.grille-cartes.atelier-grille` : builds `featured` dans l'ordre de `PROJECTS` (weathertop, afterlive, clean-stack, inwire, burnrate) avec `showUpdate`, OpenUp inséré en 3e position (ordre visible : Weathertop, Afterlive, OpenUp, CleanStack, inwire, burnrate). Second bloc avec sous-titre `h3` « Construit pour d'autres » et une grille de `HOME_CLIENT_CASES`. Bouton `Voir les {BUILDS_COUNT} builds` conservé. Texte du sous-titre et de l'intro à ajouter à `home-copy.ts` (clé `BUILDS_COPY`) pour passer sous le test de la Task 1.
- [ ] **Step 5: Lancer** tests, lint, tsc. Attendu vert.
- [ ] **Step 6: Commit**

```bash
git add app/_config src/features/home/components/case-studies.tsx src/entities/project/components/project-build-card.tsx app/styles/atelier.css
git commit -m "feat(home): lead with builds and demote client missions"
```

### Task 5: « Travailler avec moi » filtrant et FAQ alignée

**Files:**
- Modify: `src/features/home/components/what-i-do.tsx`
- Modify: `src/features/home/components/home-faq.tsx` (réponses 2 et 3 = `HOME_FAQ_ANSWERS`)
- Modify: `app/styles/home.css`

**Interfaces:**
- Consumes: `WORK_COPY`, `HOME_FAQ_ANSWERS` (Task 1), `RATES`, `buildFaqPageSchema(items)` (déjà branché sur les `items` visibles, donc le JSON-LD suit mot pour mot).

- [ ] **Step 1: Réécrire `what-i-do.tsx`** (garder `id="services"`, `aria-labelledby="services-title"`, grille 5fr/7fr). Colonne gauche : en-tête de `WORK_COPY`, `doubt`, `Button href="/services" size="lg"` (`cta`). Colonne droite : liste « Ce que je prends » (`WORK_COPY.take`, lignes style `.offre` sans flèche) puis « Ce que je refuse » (`WORK_COPY.refuse`, mêmes lignes sur `.hachures` ou `.etiquette-gris`, aucune nouvelle couleur), puis `detailTitle` avec les 5 liens existants des offres (`/services/creation-application-web`, `/services/developpeur-nextjs-freelance`, `/services/developpement-saas`, `/services/lead-tech-fractional`, `/tma`) en liens `.link-underline .label-mono` : on garde le maillage interne vers les pages qui portent le SEO « freelance ».
- [ ] **Step 2: FAQ** : remplacer les réponses des questions « Prends-tu encore des projets en freelance ? » et « Quels types de projets prends-tu ? » par `HOME_FAQ_ANSWERS.freelance` et `.projectTypes` ; garder les questions.
- [ ] **Step 3: Test** (existant `professional-service.test.ts` + Task 1) puis lint, tsc. Pas de nouveau test de rendu de texte statique.
- [ ] **Step 4: Commit**

```bash
git add src/features/home/components/what-i-do.tsx src/features/home/components/home-faq.tsx app/styles/home.css
git commit -m "feat(home): turn work with me into a filtering section"
```

### Task 6: Ordre de la home, navigation, retrait du stack, docs

**Files:**
- Modify: `app/(site)/page.tsx`
- Modify: `app/_config/navigation.ts` (`DESKTOP_SECTIONS = ["portfolio", "parcours", "services"]`)
- Modify: `src/features/home/components/experience-timeline.tsx` (intro = `PARCOURS_INTRO`)
- Delete: `src/features/home/components/tech-stack.tsx` (seule la home l'importe)
- Modify: `CLAUDE.md` (liste des composants de la home, exemple d'orchestrateur, DA : sections de la home)

- [ ] **Step 1: Recomposer `page.tsx`** : `JsonLdScript` conservé, puis `<Hero />`, `<CaseStudies />`, `<Now />`, `<Approach />`, `<HomeMcp />`, `<ExperienceTimeline />`, `<Ribbon items={HOME_RIBBONS.work} hachures className="pleine-largeur" />`, `<WhatIDo />`, `<ClientReviews />`, `<HomeFaq />`. Supprimer la constante `WORK_RIBBON` locale (remplacée par `HOME_RIBBONS.work`), garder `HOME_TITLE` et `metadata` (description via `siteConfig`).
- [ ] **Step 2: Intro du parcours** : `PARCOURS_INTRO` retire la phrase qui plaçait Eskimoz à côté de weathertop. Vérifier : `grep -rn "eskimoz" -i src/features/home app/\(site\)/page.tsx` ne montre aucune ligne qui cite aussi weathertop.
- [ ] **Step 3: Retirer `tech-stack.tsx`** et la valeur `"stack"` de `DESKTOP_SECTIONS` ; `grep -rn "tech-stack\|#stack" app src` ne renvoie plus rien pour la home.
- [ ] **Step 4: CLAUDE.md** : mettre à jour les listes (`tech-stack` retiré, `now` ajouté) et l'ordre de la home.
- [ ] **Step 5: Vérifs** : `node --import tsx --test "app/**/*.test.ts" "app/**/*.test.tsx" "src/**/*.test.ts" "src/**/*.test.tsx"`, `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`. Attendu : tout vert ; le build produit `/` statique ; le HTML de `/` contient un seul `<h1>`, le JSON-LD `FAQPage` identique aux réponses visibles et ne cite pas Eskimoz à côté de Weathertop.
- [ ] **Step 6: Commit**

```bash
git add app/\(site\)/page.tsx app/_config/navigation.ts src/features/home/components CLAUDE.md
git commit -m "feat(home): reorder sections and retire the redundant stack"
```

### Task 7: Preuve visuelle

**Files:** aucun (sauf corrections CSS issues de la relecture).

- [ ] **Step 1: Serveur** : `pnpm dev` en arrière-plan (jamais `pkill` par motif).
- [ ] **Step 2: Chrome** (skill `chrome-browser`, extension Claude in Chrome, onglet du groupe Claude) : ouvrir `http://localhost:3000/` et capturer à 390, 768 et 1440 px (émulation de viewport ; si l'extension ne sait pas, `chrome-devtools` `emulate`). Pour chaque largeur vérifier : H1 et accroche lisibles sans débordement horizontal (`document.documentElement.scrollWidth <= innerWidth` via `evaluate_script`), 3 stats alignées, 6 cartes de builds puis 2 cartes « Construit pour d'autres », section « En ce moment » avec 2 entrées datées, ordre des sections conforme à la Task 6, listes « prend / refuse » lisibles, thème sombre et clair, console sans erreur ni warning.
- [ ] **Step 3: Clic** : CTA primaire (ancre `#portfolio`), CTA secondaire (GitHub, nouvel onglet), lien sélectif (`#services`), un lien d'entrée « En ce moment » (`/portfolio/weathertop`).
- [ ] **Step 4: Corriger** tout écart dans `app/styles/*.css`, relancer lint, tsc, tests, build.
- [ ] **Step 5: Relecture en fin de lot** sur le diff écrit dans un fichier par les 6 agents du skill `delivering-tickets`, sans relecteur de conventions ; Opus pour tout ce qui touche au texte métier ; défauts confirmés corrigés avec test.
- [ ] **Step 6: Commit** des corrections éventuelles : `fix(home): <effet observable>`.

---

## Self-review

- Couverture du lot 1 : hero (accroche, paragraphe, Eskimoz discret, ligne sélective) T1+T3 ; CTA T3 ; stats T3 ; projets (builds d'abord, missions réduites, retrait « 17 étoiles ») T3+T4 ; « En ce moment » T2 ; ordre de la home et `tech-stack` T6 ; « Travailler avec moi » T5 ; metadata/JSON-LD/llms : description T3, FAQ T5, `llms*.txt` inchangés car thèse et « quelques projets en freelance » y restent vrais.
- Aucune signature citée en aval sans être définie en amont (`HERO_COPY`… Task 1, `NOW_ENTRIES`/`Now` Task 2, `HOME_CLIENT_CASES` Task 4).
- Proportion : plan nettement plus court que le code qu'il décrit n'est pas atteint, mais aucun corps de composant n'est écrit, seulement signatures, textes figés et assertions.

## Points tranchés à valider par Axel

1. **Eskimoz et Weathertop** : l'intro du parcours les associait dans une phrase (« le jour chez Eskimoz, ... weathertop »). Elle est réécrite sans builds. Eskimoz reste dans le hero (une phrase), le parcours et les `llms*.txt`, Weathertop dans les cartes et « En ce moment » : jamais dans le même texte. Si Axel veut zéro co-présence sur la page entière, retirer Eskimoz du hero.
2. **« Suivre mes builds »** pointe vers GitHub seulement : `SOCIAL_LINKS` ne contient que Instagram et TikTok (GitHub et LinkedIn sont dans `EXTERNAL_LINKS`) ; LinkedIn reste dans le footer et `/tree`, pour ne pas avoir trois CTA.
3. **Stats** : « N builds publics sur GitHub » (dérivé), « 2 builds privés en cours » (dérivé), « développeur depuis 2021 » (dérivé de `PARCOURS`). Le compteur de requêtes MCP est reporté au lot 3 : il demande une lecture serveur et un volume réel qui n'existe pas encore.
4. **« Prochaine étape »** n'existe que sur les 2 entrées « En ce moment » (formulées sans rien inventer) ; les cartes de builds affichent statut et dernière mise à jour réelle (`dateModified`), pas de champ nouveau à écrire pour les 5 autres projets.
5. **MCP absent des cartes de builds** : il garde sa section dédiée ; et « estimer son projet via le MCP » n'est pas écrit en lot 1 car `estimate_project` n'existe qu'au lot 2 : la section « Travailler avec moi » propose « Écris-moi, je réponds sous 24 h » et le rappel MCP est ajouté au lot 3.
6. **`tech-stack.tsx` supprimé** : 4 termes absents du ruban du hero (Next.js, NestJS, Cloudflare Workers, Capacitor) y sont ajoutés ; la FAQ garde la stack principale.
7. **« par trimestre »** (ligne sélective) est un engagement de capacité : Axel confirme ou le retire.
