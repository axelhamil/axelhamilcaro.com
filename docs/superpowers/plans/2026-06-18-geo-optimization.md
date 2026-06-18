# GEO Optimization Implementation Plan — axelhamilcaro.com

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rendre axelhamilcaro.com maximalement citable par les moteurs génératifs (ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot) en consolidant le graphe d'entités JSON-LD, en affirmant un positionnement de niche Next.js / React / Node.js, et en complétant les signaux de fraîcheur et d'autorité — sans créer de nouveau contenu rédactionnel.

**Architecture :** Le site (Next.js 16 App Router) a déjà une base GEO solide posée par le commit `feat(seo): muscler la visibilité IA`. Ce plan ne réécrit rien : il (1) relie les schémas JSON-LD existants via `@id` pour former un knowledge graph cohérent, (2) ajoute un `aggregateRating` à partir du seul vrai avis, (3) recentre la copie d'entité sur la niche Next.js/React/Node, (4) câble les signaux `image`/`dateModified` déjà supportés par le builder blog, (5) couvre les pages orphelines de schéma. Une seconde moitié, **off-site** (non-code), liste le playbook d'autorité que l'utilisateur exécute lui-même.

**Tech Stack :** Next.js 16, React 19, TypeScript strict, Biome (lint+format, pas de framework de test), JSON-LD inline via `dangerouslySetInnerHTML`, MDX (gray-matter) pour le blog.

## Global Constraints

- **Aucun framework de test** dans ce repo. La vérification de chaque tâche = `pnpm lint` (biome check) + `pnpm build` (next build, qui valide types + imports) + assertion `grep` ciblée + validation manuelle du JSON-LD sur https://validator.schema.org. Ne PAS fabriquer de suite Jest/Vitest.
- **Pas de nouveau contenu rédactionnel** (décision utilisateur : « optimiser l'existant seulement »). Interdiction de créer articles de blog, pages comparatives ou glossaire.
- **Positionnement de niche** : affirmer « développeur freelance **Next.js, React & Node.js** » (spécialisé SaaS B2B), sans supprimer le terme « Full-Stack ». C'est un recentrage d'accent, pas un rebrand.
- **Honnêteté des données** : ne jamais inventer de note, de date de modification fausse, ni de métrique. Le seul avis réel est celui de Bryan Kaneb (Malt, 5/5, 2025-12-19).
- **Pas de commentaires** dans le code (règle projet). `biome-ignore` uniquement où déjà présent.
- **Imports** : `import type` pour les types. Chemins absolus `@/...`. Pas de barrel.
- **Domaine canonique** : `https://axelhamilcaro.com` (constante `SITE_URL`).
- **Convention `@id` du graphe** (à respecter dans toutes les tâches) :
  - Person → `https://axelhamilcaro.com/#person`
  - WebSite → `https://axelhamilcaro.com/#website`
  - ProfessionalService → `https://axelhamilcaro.com/#service` (déjà en place)

---

## File Structure

| Fichier | Responsabilité | Tâches |
|---|---|---|
| `src/shared/seo/json-ld.tsx` | Graphe d'entités global (Person, WebSite, ProfessionalService) injecté dans `app/(site)/layout.tsx` | 1, 2 |
| `app/_config/metadata.ts` | Metadata racine (title, keywords) | 2 |
| `app/_config/site.ts` | `siteConfig.description` (source de la meta description) | 2 |
| `public/llms.txt` | Résumé citable pour crawlers IA | 2 |
| `content/blog/therac-25.mdx` | Frontmatter de l'unique article | 3 |
| `src/features/blog/lib/blog.ts` | Parsing frontmatter → type `BlogPost` | 3 |
| `app/(blog)/blog/[slug]/page.tsx` | Appel `buildBlogPostingSchema` | 3 |
| `app/(site)/tree/page.tsx` | Page liens (sans schéma actuellement) | 4 |
| `app/(site)/page.tsx` | Composition home (section Approach absente) | 5 |
| `src/features/home/components/trusted-by.tsx` | Incohérence « depuis 2020 » | 5 |
| `public/llms-full.txt` | (Optionnel) version développée | 6 |

**Builders déjà prêts (ne pas modifier) :** `src/shared/seo/schemas/blog-posting.ts` supporte déjà `dateModified` (défaut = `datePublished`) et `image` conditionnel — seul le câblage manque.

---

## Task 1 : Graphe d'entités JSON-LD (`@id` + cross-refs + aggregateRating)

**Files:**
- Modify: `src/shared/seo/json-ld.tsx`

**Interfaces:**
- Consumes: rien.
- Produces: `Person @id = "https://axelhamilcaro.com/#person"`, `WebSite @id = "https://axelhamilcaro.com/#website"` — référencés par les tâches 2 et 4. Le `ProfessionalService @id = ".../#service"` existe déjà.

**Pourquoi (GEO) :** sans `@id`, chaque schéma est une île — les moteurs ne savent pas que la Person, le WebSite et le ProfessionalService décrivent la même entité. Lier via `@id` crée un graphe vérifiable croisé (signal d'entité = corrélation 0,664 avec les citations IA, vs 0,218 pour les backlinks). `aggregateRating` à partir d'un avis réel rend une note exploitable par les rich results et les réponses IA.

- [ ] **Step 1 : Ajouter `@id` à la Person**

Dans `personSchema` (juste après `"@type": "Person",`, ligne ~10), insérer la ligne `@id` :

```tsx
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Axel Hamilcaro",
```

- [ ] **Step 2 : Ajouter `@id` au WebSite et le relier à la Person**

Remplacer le bloc `websiteSchema` (lignes ~85-103) par cette version (ajout de `@id`, `publisher`/`author`/`creator` référencés par `@id`, et `about`) :

```tsx
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Axel Hamilcaro - Développeur Full-Stack TypeScript",
    alternateName: "Axel Hamilcaro Portfolio",
    url: SITE_URL,
    description:
      "Portfolio d'Axel Hamilcaro, développeur freelance Next.js, React et Node.js basé en Touraine, intervient à 100% en remote sur la France. Expertise SaaS B2B multi-tenant, Clean Architecture et lead tech.",
    inLanguage: "fr-FR",
    copyrightYear: new Date().getFullYear(),
    about: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
  };
```

- [ ] **Step 3 : Relier le ProfessionalService à la Person via `@id`**

Dans `professionalServiceSchema`, remplacer le `provider` inline (lignes ~115-118) par une référence `@id` :

```tsx
    provider: { "@id": `${SITE_URL}/#person` },
```

- [ ] **Step 4 : Ajouter `aggregateRating` au ProfessionalService**

Juste avant la clé `review:` (ligne ~181), insérer le bloc `aggregateRating` (1 avis réel, donc `reviewCount: "1"`) :

```tsx
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
```

- [ ] **Step 5 : Vérifier la présence des `@id`**

Run: `grep -c "#person" src/shared/seo/json-ld.tsx`
Expected: `5` ou plus (1 définition Person + 4 références : about, author, creator, publisher, provider).

- [ ] **Step 6 : Lint + build**

Run: `pnpm lint && pnpm build`
Expected: lint sans erreur, build « Compiled successfully ».

- [ ] **Step 7 : Valider le JSON-LD**

Lancer `pnpm dev`, ouvrir http://localhost:3000, copier chaque bloc `<script type="application/ld+json">` du HTML source dans https://validator.schema.org — attendu : 0 erreur, les 3 entités reconnues, `Person`/`WebSite`/`ProfessionalService` partageant le même `@id` person.

- [ ] **Step 8 : Commit**

```bash
git add src/shared/seo/json-ld.tsx
git commit -m "feat(geo): lie les schemas JSON-LD via @id + aggregateRating"
```

---

## Task 2 : Positionnement de niche Next.js / React / Node.js (answer-first)

**Files:**
- Modify: `src/shared/seo/json-ld.tsx` (Person `jobTitle`, `description`, `knowsAbout`)
- Modify: `app/_config/site.ts` (`siteConfig.description`)
- Modify: `app/_config/metadata.ts` (title `default`, `keywords`)
- Modify: `public/llms.txt`

**Interfaces:**
- Consumes: `Person @id` (Task 1).
- Produces: copie d'entité recentrée, réutilisée par les OG/Twitter (qui lisent `siteConfig.description`).

**Pourquoi (GEO) :** les IA citent un individu bien plus vite sur une niche cohérente (« freelance Next.js SaaS B2B ») que sur « full-stack » générique, où elles renvoient vers Malt/Toptal. L'answer-first (réponse dense en tête) est la règle universelle : 44 % des citations viennent du premier tiers du contenu. On répète donc la triade Next.js/React/Node de façon cohérente sur tous les points d'entrée d'entité.

- [ ] **Step 1 : Recentrer le `jobTitle` et la `description` de la Person**

Dans `personSchema` (`json-ld.tsx`), remplacer :

```tsx
    jobTitle: "Développeur Full-Stack TypeScript",
    description:
      "Développeur Full-Stack freelance basé en Touraine, intervient à 100% en remote sur la France. Spécialisé TypeScript, Next.js, React, Node.js, architecture Clean / DDD et lead tech temps partiel. Lead technique 4 ans Civitime, 10+ projets livrés en autonomie depuis 2021.",
```

par :

```tsx
    jobTitle: "Développeur freelance Next.js, React & Node.js",
    description:
      "Axel Hamilcaro est un développeur freelance spécialisé Next.js, React et Node.js, basé en Touraine et intervenant à 100% en remote sur la France. Il conçoit des SaaS B2B multi-tenant et des applications web sur mesure en TypeScript, avec une architecture Clean / DDD. Lead technique 4 ans chez Civitime, 10+ projets livrés en autonomie depuis 2021. TJM 450€ HT/jour.",
```

- [ ] **Step 2 : Réordonner `knowsAbout` (niche en tête)**

Dans `personSchema`, remplacer le début du tableau `knowsAbout` pour que la triade de niche apparaisse en premier :

```tsx
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "TypeScript",
      "SaaS B2B",
      "Multi-tenancy SaaS",
      "JavaScript",
      "Tailwind CSS",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST API",
      "Clean Architecture",
      "Domain-Driven Design",
      "SaaS Development",
      "Web Development",
      "Vercel",
      "Docker",
      "Capacitor",
      "Stripe",
      "NestJS",
      "Fastify",
      "RAG",
      "Vercel AI SDK",
      "Event Sourcing",
      "CQRS",
      "Turborepo",
    ],
```

- [ ] **Step 3 : Aligner la description du site (answer-first)**

Dans `app/_config/site.ts`, remplacer la `description` :

```tsx
  description:
    "Axel Hamilcaro, développeur freelance Next.js, React et Node.js basé en Touraine, 100% remote France. Je conçois des SaaS B2B multi-tenant et des applications web sur mesure en TypeScript, robustes et scalables (Clean Architecture / DDD), et j'accompagne les équipes en lead tech temps partiel.",
```

- [ ] **Step 4 : Recentrer le title et enrichir les keywords**

Dans `app/_config/metadata.ts`, remplacer le `title.default` :

```tsx
    default:
      "Axel Hamilcaro | Développeur freelance Next.js, React & Node.js - France",
```

Puis, dans le tableau `keywords`, insérer ces 5 termes après `"développeur Next.js freelance",` (ligne ~20) :

```tsx
    "développeur React freelance",
    "développeur Node.js freelance",
    "freelance Next.js React Node",
    "développeur SaaS B2B freelance",
    "freelance multi-tenant SaaS",
```

- [ ] **Step 5 : Mettre à jour le bloc citable de `llms.txt`**

Dans `public/llms.txt`, remplacer les lignes 2-6 (le bloc `>`) par :

```
> Axel Hamilcaro est un développeur freelance spécialisé Next.js, React et Node.js, basé en Touraine, 100% remote France.
> Il conçoit des SaaS B2B multi-tenant et des applications web sur mesure en TypeScript, architecture Clean / DDD.
> 10+ projets livrés en autonomie depuis 2021. Lead technique 4 ans chez Civitime (EdTech B Corp).
> Stack : Next.js, React, Node.js, TypeScript, PostgreSQL, NestJS, Fastify, Drizzle, Stripe, Capacitor.
> TJM 450€ HT/jour. Devis sous 24h, démarrage sous 1 à 3 semaines, MVP en 4 à 8 semaines.
```

Puis remplacer la dernière ligne `Dernière mise à jour: 2026-06-12` par `Dernière mise à jour: 2026-06-18`.

- [ ] **Step 6 : Vérifier la cohérence du positionnement**

Run: `grep -rl "Next.js, React" app/_config src/shared/seo public/llms.txt`
Expected: les 4 fichiers ressortent.

- [ ] **Step 7 : Lint + build**

Run: `pnpm lint && pnpm build`
Expected: succès.

- [ ] **Step 8 : Commit**

```bash
git add src/shared/seo/json-ld.tsx app/_config/site.ts app/_config/metadata.ts public/llms.txt
git commit -m "feat(geo): affirme la niche Next.js/React/Node (answer-first)"
```

---

## Task 3 : Signaux de fraîcheur du blog (`image` + `dateModified`)

**Files:**
- Modify: `content/blog/therac-25.mdx` (frontmatter)
- Modify: `src/features/blog/lib/blog.ts` (interface frontmatter)
- Modify: `app/(blog)/blog/[slug]/page.tsx` (appel builder)

**Interfaces:**
- Consumes: `buildBlogPostingSchema({ image?, dateModified? })` — déjà supporté par `src/shared/seo/schemas/blog-posting.ts` (ne pas le modifier).
- Produces: `BlogPost.image?` et `BlogPost.dateModified?` exposés par `getPostBySlug`.

**Pourquoi (GEO) :** un `BlogPosting` avec `image` est mieux exploité par Google AI Overviews (multimodal +156 %). `dateModified` est un signal de fraîcheur fort sur Perplexity (RAG live). L'image pointée est l'OG dynamique déjà généré par Next.js (`/blog/[slug]/opengraph-image`) — pas de nouvel asset.

- [ ] **Step 1 : Ajouter les champs optionnels au frontmatter de l'article**

Dans `content/blog/therac-25.mdx`, ajouter `dateModified` sous `date` (valeur = date réelle de dernière révision du contenu, ici la publication, on ne fabrique pas de fraîcheur) :

```yaml
date: "2025-03-17"
dateModified: "2025-03-17"
```

- [ ] **Step 2 : Étendre l'interface frontmatter dans `blog.ts`**

Dans `src/features/blog/lib/blog.ts`, ajouter deux champs optionnels à `BlogPostFrontmatter` :

```tsx
interface BlogPostFrontmatter {
  title: string;
  subtitle: string;
  date: string;
  dateModified?: string;
  excerpt: string;
  tags: string[];
  category: string;
  pdfUrl?: string;
  image?: string;
}
```

(Aucune autre modif nécessaire : `getAllPosts`/`getPostBySlug` font déjà `...frontmatter`, donc les champs sont propagés automatiquement.)

- [ ] **Step 3 : Passer `image` et `dateModified` au builder**

Dans `app/(blog)/blog/[slug]/page.tsx`, remplacer l'appel `buildBlogPostingSchema` (ligne ~84) par :

```tsx
  const blogPostingJsonLd = buildBlogPostingSchema({
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${slug}`,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    image: post.image ?? `${SITE_URL}/blog/${slug}/opengraph-image`,
    author: "Axel Hamilcaro",
    keywords: post.tags,
    articleSection: post.category,
    wordCount,
  });
```

- [ ] **Step 4 : Vérifier que le schéma porte une image**

Run: `pnpm dev` puis `curl -s http://localhost:3000/blog/therac-25 | grep -o '"image":"[^"]*"'`
Expected: une ligne `"image":"https://axelhamilcaro.com/blog/therac-25/opengraph-image"`.

- [ ] **Step 5 : Lint + build**

Run: `pnpm lint && pnpm build`
Expected: succès.

- [ ] **Step 6 : Commit**

```bash
git add content/blog/therac-25.mdx src/features/blog/lib/blog.ts "app/(blog)/blog/[slug]/page.tsx"
git commit -m "feat(geo): cable image + dateModified sur le schema BlogPosting"
```

---

## Task 4 : Schéma `ProfilePage` sur `/tree`

**Files:**
- Modify: `app/(site)/tree/page.tsx`

**Interfaces:**
- Consumes: `Person @id = "https://axelhamilcaro.com/#person"` (Task 1), accessible car `/tree` est dans le layout `(site)` qui injecte `<JsonLd />`.
- Produces: rien.

**Pourquoi (GEO) :** `/tree` est la page-carrefour des liens d'entité (LinkedIn, GitHub, Malt). Un `ProfilePage` pointant `mainEntity` sur le `@id` person en fait un nœud reconnu du graphe — exactement le type de page que les IA utilisent pour vérifier l'identité et les `sameAs`.

- [ ] **Step 1 : Importer `SITE_URL`**

Dans `app/(site)/tree/page.tsx`, ajouter l'import en tête :

```tsx
import { SITE_URL } from "@/app/_config/site.constants";
```

- [ ] **Step 2 : Définir et injecter le schéma `ProfilePage`**

Dans `TreePage`, après `const links = await treeLinkService.listActive();`, ajouter la constante, puis injecter le `<script>` en premier enfant du `<main>` :

```tsx
  const profilePageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/tree`,
    url: `${SITE_URL}/tree`,
    name: "Axel Hamilcaro — Liens et réseaux",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    about: { "@id": `${SITE_URL}/#person` },
    inLanguage: "fr-FR",
  };
```

```tsx
  return (
    <main className="relative h-full flex flex-col items-center justify-start px-4 pt-20 sm:pt-0 overflow-hidden">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data for SEO
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
      />
      <div className="relative z-10 w-full max-w-sm sm:max-w-md flex flex-col items-center gap-4 sm:gap-6">
        <TreeHeader />
        <TreeLinksWrapper links={links} />
      </div>
    </main>
  );
```

- [ ] **Step 3 : Vérifier l'injection**

Run: `pnpm dev` puis `curl -s http://localhost:3000/tree | grep -c "ProfilePage"`
Expected: `1`.

- [ ] **Step 4 : Lint + build**

Run: `pnpm lint && pnpm build`
Expected: succès.

- [ ] **Step 5 : Commit**

```bash
git add "app/(site)/tree/page.tsx"
git commit -m "feat(geo): ajoute le schema ProfilePage sur /tree"
```

---

## Task 5 : Activer la section Approach + cohérence des chiffres

**Files:**
- Modify: `app/(site)/page.tsx` (import + rendu de `Approach`)
- Modify: `src/features/home/components/trusted-by.tsx` (« depuis 2020 » → 2021)

**Interfaces:**
- Consumes: `src/features/home/components/approach.tsx` (default export `Approach`, `"use client"`, sans props — déjà prêt).
- Produces: rien.

**Pourquoi (GEO) :** `approach.tsx` (4 piliers : Code maintenable, Performance & SEO, Livraison continue, Monitoring) est du contenu extractible déjà écrit mais jamais rendu — donc invisible des crawlers. Le réactiver densifie la home en contenu structuré sans rien rédiger. La mention « depuis 2020 » contredit « depuis 2021 » partout ailleurs : une incohérence factuelle affaiblit la confiance qu'une IA accorde à l'entité.

- [ ] **Step 1 : Déclarer le dynamic import `Approach`**

Dans `app/(site)/page.tsx`, après le bloc `const WhatIDo = dynamic(...)` (ligne ~32), ajouter :

```tsx
const Approach = dynamic(
  () => import("@/src/features/home/components/approach"),
);
```

- [ ] **Step 2 : Rendre `<Approach />` dans la composition**

Dans le `return` de `Home`, insérer `<Approach />` entre `<WhatIDo />` et `<CaseStudies />` :

```tsx
  return (
    <main>
      <Hero />
      <ExperienceTimeline />
      <WhatIDo />
      <Approach />
      <CaseStudies />
      <TrustedBy />
      <TechStack />
      <HomeFaq />
    </main>
  );
```

- [ ] **Step 3 : Corriger « depuis 2020 »**

Dans `src/features/home/components/trusted-by.tsx` (ligne ~213), remplacer :

```tsx
                applications livrées depuis 2020 · Disponible pour votre projet
```

par :

```tsx
                applications livrées depuis 2021 · Disponible pour votre projet
```

- [ ] **Step 4 : Vérifier**

Run: `grep -rn "depuis 2020" src/features/home/ ; grep -c "approach" "app/(site)/page.tsx"`
Expected: aucune occurrence de « depuis 2020 » ; au moins `1` pour `approach`.

- [ ] **Step 5 : Lint + build + contrôle visuel**

Run: `pnpm lint && pnpm build`
Expected: succès. Puis `pnpm dev`, vérifier sur http://localhost:3000 que la section « Ma méthodologie de développement » (id `#approach`) s'affiche bien entre « What I Do » et les case studies.

- [ ] **Step 6 : Commit**

```bash
git add "app/(site)/page.tsx" src/features/home/components/trusted-by.tsx
git commit -m "feat(geo): rend la section Approach + corrige la chronologie (2021)"
```

---

## Task 6 (optionnel, faible priorité) : `public/llms-full.txt`

**Files:**
- Create: `public/llms-full.txt`

**Pourquoi (et pourquoi optionnel) :** la recherche est claire — `llms.txt`/`llms-full.txt` sont aujourd'hui quasi ignorés des crawlers IA (OtterlyAI : 0,1 % du trafic bot ; John Mueller : « no AI system currently uses llms.txt »). Coût ~10 min, valeur surtout future (agents IA). À faire seulement si les tâches 1-5 sont terminées et qu'il reste du temps. Ne PAS prioriser.

- [ ] **Step 1 : Créer le fichier**

Créer `public/llms-full.txt` reprenant verbatim les faits déjà publics sur le site (services, pricing TMA 350€/800€, case studies chiffrés Civitime 250 000+ collaborateurs / ScormPilot 7 apps solo / OpenUp edge <50ms / Billetterie <200ms, stack, parcours Wild Code School 2021 → Civitime 4 ans → freelance). Sourcer uniquement le contenu existant des pages `/about`, `/services/*`, `/tma`, `/portfolio/*`. Terminer par `Dernière mise à jour: 2026-06-18`.

- [ ] **Step 2 : Vérifier + commit**

Run: `test -f public/llms-full.txt && echo OK`

```bash
git add public/llms-full.txt
git commit -m "feat(geo): ajoute llms-full.txt (contenu developpe citable)"
```

---

## Playbook OFF-SITE (non-code — exécuté par Axel)

> La recherche est sans ambiguïté : **85 % des mentions de marque dans les IA viennent de sources tierces**, et la présence off-site augmente les citations de **+325 %** vs contenu owned uniquement. Le code ci-dessus est nécessaire mais plafonne vite. Ces actions sont le vrai levier. Classées par ROI.

- [ ] **Bing Webmaster Tools (priorité 1, ~15 min).** Créer un compte, vérifier le domaine, soumettre `https://axelhamilcaro.com/sitemap.xml`. **Bing alimente les réponses temps réel de ChatGPT et Copilot** — c'est le prérequis le plus souvent oublié. (Google Search Console aussi si pas déjà fait.)
- [ ] **Tester l'accès des crawlers IA (~5 min).** `robots.ts` autorise déjà tous les bots (`*` + `allow: "/"`), donc GPTBot / OAI-SearchBot / PerplexityBot / ClaudeBot / Bingbot passent. Confirmer sur https://axelhamilcaro.com/robots.txt qu'aucun n'est `Disallow`. Rien à coder, juste vérifier après déploiement.
- [ ] **Cohérence d'entité multi-plateforme (priorité 1).** Aligner mot pour mot le positionnement « développeur freelance Next.js, React & Node.js — SaaS B2B » sur : profil **Malt**, **LinkedIn** (headline + about), bio **GitHub**, bio **Reddit**. La cohérence du nom + intitulé sur tous les points de présence est le signal d'entité le plus cité par les IA.
- [ ] **Reddit authentique (priorité 2, durable).** Contribuer dans r/nextjs, r/reactjs, r/node, r/webdev, r/freelance, r/ExperiencedDevs. **Règle 9:1** (9 réponses utiles pour 1 mention de soi). Reddit est la source #1 citée par Perplexity et Google AIO. Cibler les threads en question (« best stack for SaaS B2B ? », « Next.js vs … »). Format réponse : contexte → solution → étapes numérotées → tradeoffs. Jamais de pitch direct (= downvotes = contre-signal).
- [ ] **LinkedIn technique (priorité 2).** Poster des retours d'expérience chiffrés (architecture multi-tenant, RAG chez Civitime, migration Capacitor) — pas des updates perso. LinkedIn est la source la plus citée pour les requêtes professionnelles sur ChatGPT/Copilot.
- [ ] **Wikidata (priorité 3, ~30 min).** Créer une entité Wikidata « Axel Hamilcaro » (profession : développeur de logiciels) reliée aux `sameAs` (site, LinkedIn, GitHub, Malt). Wikidata/Wikipedia sont des ancres de vérité crawlées en live par tous les LLMs majeurs.
- [ ] **Annuaires validés.** S'assurer d'être présent et complet sur Malt (déjà), envisager Toptal/Contra/Codeur. Les marketplaces sont les sources que les IA citent déjà pour les requêtes freelance.
- [ ] **YouTube (priorité 4, fort signal si fait).** La présence YouTube a la **plus forte corrélation mesurée (0,74)** avec les citations IA (transcripts + chapitres crawlés). Optionnel mais à garder en tête.

---

## Mesure & suivi (mensuel)

- [ ] **Tests manuels de citation (gratuit).** Une fois par mois, soumettre ces prompts sur ChatGPT, Perplexity, Google AI Overviews, Claude et noter si « Axel Hamilcaro / axelhamilcaro.com » apparaît :
  - « développeur freelance Next.js France »
  - « meilleur dev freelance SaaS B2B React »
  - « développeur freelance Next.js App Router multi-tenant »
  - « freelance Node.js TypeScript Clean Architecture »
- [ ] **Tracker (optionnel, payant).** Si budget : Otterly.AI (~29 $/mo, point d'entrée, alerte sur chutes de visibilité) ou Ahrefs Brand Radar si déjà client Ahrefs.
- [ ] **Timeline réaliste à anticiper :** Perplexity & Google AIO ~4-8 semaines après déploiement (signal schema + fraîcheur), ChatGPT 3-6 mois (cycle d'entraînement + index Bing).

---

## Self-Review (effectuée)

- **Couverture des gaps d'audit :** `@id` Person ✓ (T1), aggregateRating ✓ (T1), cross-link schémas ✓ (T1), niche positioning ✓ (T2), dateModified/image blog ✓ (T3), ProfilePage /tree ✓ (T4), section Approach orpheline ✓ (T5), incohérence 2020/2021 ✓ (T5), llms-full ✓ (T6 opt). Bing/Reddit/Wikidata/entité ✓ (playbook off-site).
- **Hors-scope assumé :** page /contact indexable, nouveaux articles, comparatifs, glossaire — exclus par la décision « optimiser l'existant seulement ». Le levier d'autorité passe alors par l'off-site (Reddit/LinkedIn/Wikidata).
- **Cohérence des types :** `BlogPostFrontmatter.image?`/`dateModified?` (T3) ↔ champs consommés dans `page.tsx` ; builder `buildBlogPostingSchema` déjà compatible (vérifié `blog-posting.ts:6,8`). `@id` person identique partout : `${SITE_URL}/#person`.
- **Placeholders :** aucun — chaque step montre le code exact.
