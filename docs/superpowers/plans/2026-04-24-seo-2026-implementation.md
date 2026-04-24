# SEO 2026 — Implementation Plan

> **For agentic workers:** Execute via subagent-driven (parallel batches). Commit after each batch. Push at end.

**Goal:** Implémenter la spec `docs/superpowers/specs/2026-04-24-seo-2026-authority-design.md` complète.

**Architecture:** Refonte SEO en 6 batches. Batches 1-3 indépendants entre eux (parallélisables). Batches 4-6 dépendent des précédents.

**Tech Stack:** Next.js 16.0.7, React 19.2, Tailwind v4 (CSS-only), Biome, framer-motion 12, lucide-react.

**Validation entre batches:** `pnpm lint && pnpm build`. Visite manuelle des routes nouvelles. Validateur Schema.org après injection schemas.

---

## Conventions à respecter

- `"use client"` sur composants avec interactivité ou animations framer-motion. Sections statiques = server components.
- Exports nommés pour sections multiples par fichier (pattern portfolio). Default export pour composants principaux.
- Liens internes : `TransitionLink` (`@/src/shared/ui/navigation/transition-link`).
- Accent orange : `bg-accent` / `text-accent` (var CSS `#ff4d00`).
- Font display : `style={{ fontFamily: "var(--font-space-grotesk)" }}` sur `<h1>`/`<h2>`.
- Calendly URL : import depuis `@/app/_config/site.constants` → `EXTERNAL_LINKS.calendly`.
- Sitemap : ajouter chaque nouvelle route publique.
- No comments in code (CLAUDE.md rule 14).
- Pas de barrel `index.ts`.

---

## Batch 1 — Foundation (parallèle, ~1h30)

### Task 1.1 — Geo Touraine + cleanup fake testimonials + Person enrichment

**Files:**
- Modify: `app/_config/metadata.ts` (retirer Paris partout)
- Modify: `app/_config/site.ts` (description sans Paris)
- Modify: `src/shared/seo/json-ld.tsx` (retirer testimonials, geo Touraine, enrichir Person + ProfessionalService)

**Changements `metadata.ts`** :
- `title.default` : `"Axel Hamilcaro | Développeur Full-Stack Freelance France - Next.js & TypeScript"`
- `keywords` : retirer `"Paris"`, `"développeur freelance Paris"`, `"développeur web Paris"`, `"Île-de-France"`. Ajouter `"développeur freelance France"`, `"développeur freelance remote"`, `"freelance Touraine"`, `"développeur Next.js freelance"`, `"intégration IA freelance"`, `"développement SaaS Next.js"`.
- `openGraph.title` : same as title.default
- `twitter.title` : `"Axel Hamilcaro | Dev Full-Stack Freelance France"`

**Changements `site.ts`** :
- `description` : `"Développeur Full-Stack freelance basé en Touraine, intervient à 100% en remote sur la France. Expert TypeScript, Next.js, React et Node.js. Je crée des applications web et SaaS sur mesure, robustes et scalables, avec intégration IA quand pertinent."`

**Changements `json-ld.tsx`** :
- Retirer entièrement la const `testimonials` (lignes 7-43).
- `personSchema.address.addressLocality` : `"Tours"` (retirer Paris).
- `personSchema.description` : `"Développeur Full-Stack freelance basé en Touraine, intervient à 100% en remote sur la France. Spécialisé TypeScript, Next.js, React, Node.js et intégration IA. Lead technique 4 ans Civitime, 10+ projets livrés en autonomie depuis 2021."`
- Ajouter à `personSchema` :
  ```typescript
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Wild Code School",
    url: "https://www.wildcodeschool.com/"
  },
  hasCredential: [{
    "@type": "EducationalOccupationalCredential",
    name: "Concepteur Développeur d'applications Web & Mobile (Bac+3/4)",
    credentialCategory: "degree"
  }],
  workLocation: { "@type": "Place", name: "Remote — France" }
  ```
- `personSchema.knowsAbout` : ajouter `"React Native"`, `"Expo"`, `"NestJS"`, `"Fastify"`, `"RAG"`, `"Vercel AI SDK"`, `"Multi-tenancy SaaS"`, `"Event Sourcing"`, `"CQRS"`, `"Turborepo"`.
- `professionalServiceSchema.areaServed` : retirer City Paris, garder uniquement `[{"@type": "Country", "name": "France"}]`.
- Retirer `aggregateRating` et `review` du `professionalServiceSchema`.
- Ajouter inline avant le bloc `aggregateRating` retiré : commentaire JSX `{/* TODO: réintégrer aggregateRating + review quand >= 3 vrais témoignages collectés */}`.

**Validation** : `pnpm lint && pnpm build`. Vérifier 0 erreur.

### Task 1.2 — Helpers schemas

**Files (create):**
- `src/shared/seo/schemas/faq-page.ts`
- `src/shared/seo/schemas/creative-work.ts`
- `src/shared/seo/schemas/service-schema.ts`
- `src/shared/seo/schemas/blog-posting.ts`
- `src/shared/seo/schemas/about-page.ts`

Chaque helper exporte une fonction qui retourne un objet JSON-LD typé. Pas de `<script>` tag — juste l'objet, le composant appelant fait le `JSON.stringify` + `dangerouslySetInnerHTML`.

### Task 1.3 — llms.txt

**File:** `public/llms.txt` (contenu exact dans spec section 5.9).

### Task 1.4 — CTA reformulation

**Files:**
- `src/shared/layouts/navbar.tsx` : "Contact" → "Audit gratuit 30min" (desktop) ; "Prendre rendez-vous" → "Audit gratuit 30min" (mobile)
- `src/features/home/components/hero/hero-left.tsx` : "Discuter de ton projet" → "Lancer mon projet sous 24h"
- `src/features/home/components/footer.tsx` : "Email" / "Réponse rapide" → "Écrire en 3 lignes" / "Réponse sous 1h en journée" ; "Calendly" / "15-20 min" → "Réserver mon audit" / "30 min, sans engagement"

### Validation Batch 1
```bash
pnpm lint
pnpm build
git add -p && git commit -m "feat(seo): foundation - geo Touraine + cleanup fake testimonials + helpers schemas + llms.txt + CTA reformulés"
```

---

## Batch 2 — Section FAQ home + page about (parallèle, ~3h)

### Task 2.1 — Section FAQ home

**Files:**
- Create: `src/features/home/components/home-faq.tsx`
- Modify: `app/(site)/page.tsx` (ajouter `<HomeFaq />` avant `<Footer />`)

**FAQ home** (5 questions de qualification) :
1. **Quels types de projets prends-tu ?** — Applications web sur mesure, SaaS multi-tenant, intégration IA (RAG, agents), refonte d'architecture, lead tech temps partiel. Stack Next.js / React / Node.js / TypeScript / PostgreSQL.
2. **Quels sont tes délais ?** — Mission ferme : démarrage sous 1-3 semaines selon disponibilité. MVP : 4 à 8 semaines pour une v1 production-ready. Audit ou consulting court : sous 5 jours ouvrés.
3. **Quel est ton TJM et mode de facturation ?** — TJM 450€ HT (référence Malt). Facturation au temps passé (régie) ou au forfait pour scope fermé. Devis détaillé sous 24h après notre échange.
4. **Travailles-tu en remote ou sur site ?** — 100% remote, basé en Touraine. Disponible pour des points sur site ponctuels en France selon le projet.
5. **Comment se passe le premier contact ?** — Tu m'écris en 3 lignes (objectif business, contexte, deadline) ou tu réserves un appel découverte 30 min sur Calendly. Je reviens avec une analyse et un plan d'action concret.

Pattern markup : `<dl>` avec `<details>/<summary>` pour UX accordéon native (pas de JS).

Inject FAQPage schema dans `home-faq.tsx` via `dangerouslySetInnerHTML`.

### Task 2.2 — Page /about

**Files (create):**
- `app/(site)/about/page.tsx`
- `src/features/about/components/about-hero.tsx`
- `src/features/about/components/about-story.tsx`
- `src/features/about/components/about-values.tsx`
- `src/features/about/components/about-credentials.tsx`
- `src/features/about/components/about-proof.tsx`
- `src/features/about/components/about-cta.tsx`

**Modify:**
- `app/sitemap.ts` (ajouter `/about` priorité 0.9)

**Contenu sections** (je rédige basé sur Malt + LinkedIn) :

**AboutHero** :
- Photo profil (`/profil_pp.jpeg`)
- Eyebrow : "Développeur Full-Stack Freelance"
- Title : "Je conçois des produits web qui servent ton business."
- Subtitle : "Depuis 2021, j'aide startups, PME et équipes produit à livrer des applications web et SaaS robustes, scalables, et alignées sur leurs objectifs métier."
- 3 KPI cards : "5 ans de freelance", "10+ projets livrés en autonomie", "100% remote France"

**AboutStory** (3 paragraphes) :
- Para 1 : Formation Wild Code School (Bac+3/4 en alternance) en 2021. Choix freelance dès la sortie pour garder la liberté de choisir mes projets et mes clients.
- Para 2 : 4 ans de lead technique chez Civitime (plateforme RSE B Corp) : refonte Clean Architecture + DDD + event sourcing, conception d'un éditeur IA RAG qui a divisé par 2 les délais de livraison de l'équipe pédagogique. C'est là que j'ai compris la valeur d'un dev qui pense produit autant qu'il code.
- Para 3 : Aujourd'hui je travaille en parallèle sur ScormPilot (SaaS e-learning multi-tenant), HomeCafé (app web + mobile native, 70+ parcours métier) et des missions courtes d'audit / consulting. Focus actuel : intégration IA pragmatique (RAG, agents, AI SDK Vercel) pour augmenter les produits sans tomber dans le hype.

**AboutValues** (4 valeurs, une phrase chacune) :
- **Code propre, pas dogmatique.** Clean Architecture + DDD quand le produit le mérite, pragmatique quand il faut juste livrer vite.
- **Vision produit avant la technique.** Je pose les bonnes questions sur le métier avant de coder. Le code doit servir un objectif business clair.
- **Livraison fiable.** Je tiens mes engagements. Pas de surprise sur les délais, pas de dette technique cachée, pas de "ça marchait sur mon poste".
- **Communication directe.** Je travaille en async, je documente, je préviens dès qu'un blocage apparaît. Pas besoin de me chasser.

**AboutCredentials** :
- Formation : Wild Code School — Bac+3/4 Concepteur Développeur d'applications Web & Mobile (2021)
- Stack maîtrisée : TypeScript, React, Next.js, Node.js, NestJS, Fastify, PostgreSQL, React Native, Expo, Turborepo, Docker, GCP, Cloudflare R2, Vercel AI SDK
- Architectures : Clean Architecture, DDD, CQRS, Event Sourcing, Multi-tenancy SaaS, RAG
- Méthodes : TDD/BDD, CI/CD, gestion projet agile

**AboutProof** :
- 4 cards stats : "4 ans lead tech Civitime" / "5 apps en solo ScormPilot" / "545+ tests BDD HomeCafé" / "1 mois Billetterie 2D/3D"
- Phrase : "Chaque ligne de chiffre est documentée dans les case studies."

**AboutCta** :
- Titre : "Ton projet a besoin d'un développeur qui pense produit ?"
- Sous-titre : "Décris-moi ta situation en 3 lignes. Je te réponds dans l'heure avec une première analyse."
- 2 boutons : `Button primary "Lancer mon projet sous 24h"` (mailto) + `Button secondary "Réserver mon audit"` (Calendly)

**Metadata `/about`** :
```typescript
export const metadata: Metadata = {
  title: "À propos — Axel Hamilcaro, développeur full-stack freelance",
  description: "Développeur full-stack freelance depuis 2021. Formé à la Wild Code School. Lead technique 4 ans chez Civitime. 10+ projets livrés en autonomie. Focus Next.js, React, Node.js, intégration IA.",
  alternates: { canonical: "https://axelhamilcaro.com/about" },
  openGraph: {
    title: "À propos — Axel Hamilcaro",
    description: "Développeur full-stack freelance basé en Touraine. 5 ans d'expérience, 10+ projets livrés. Focus Next.js, React, Node.js, intégration IA.",
    url: "https://axelhamilcaro.com/about",
    type: "profile"
  }
};
```

Inject AboutPage schema via helper `about-page.ts`.

### Validation Batch 2
```bash
pnpm lint
pnpm build
# Visite : http://localhost:3000/about
git add ... && git commit -m "feat(seo): add /about page + section FAQ home"
```

---

## Batch 3 — Pages services (séquentiel partiel, ~5h)

### Task 3.1 — services-data.ts + ServicePageShell

**Files (create):**
- `src/features/services/lib/services-data.ts`
- `src/features/services/components/service-page-shell.tsx`
- `src/features/services/components/service-hero.tsx`
- `src/features/services/components/service-problem.tsx`
- `src/features/services/components/service-approach.tsx`
- `src/features/services/components/service-cases.tsx`
- `src/features/services/components/service-faq.tsx`
- `src/features/services/components/service-cta.tsx`

**`services-data.ts`** : 3 entrées complètes (slug, metaTitle, metaDescription, hero, problem, approach, relatedCases, faq, schema). Voir spec section 5.5 pour le type. Contenu détaillé pour chaque service ci-dessous.

#### Service 1 — `developpeur-nextjs-freelance`

**metaTitle** : "Développeur Next.js Freelance — Architecture, MVP, Refonte | Axel Hamilcaro"
**metaDescription** : "Développeur Next.js freelance, 5 ans d'expérience. Architecture moderne, MVP en 4-8 semaines, refonte d'apps existantes. Stack TypeScript / React 19 / Tailwind v4. Devis sous 24h."

**Hero** :
- eyebrow : "Service freelance"
- title : "Développeur Next.js freelance qui livre vraiment."
- subtitle : "Tu cherches un freelance Next.js senior qui prend en charge ton produit de A à Z et livre en production sans surprise ? J'interviens sur architecture, MVP, refonte et intégration IA."
- primaryCta : `{ label: "Lancer mon projet sous 24h", href: "mailto:..." }`

**Problem** :
- title : "Tu reconnais une de ces situations ?"
- bullets :
  - "Ton équipe est saturée et ton roadmap dérape."
  - "Ta stack legacy ralentit tes livraisons et ton équipe perd patience."
  - "Tu as une idée de produit mais personne pour le construire correctement en autonomie."
  - "Ton MVP a explosé en complexité et tu as besoin de remettre l'architecture à plat."

**Approach** :
- title : "Comment je travaille."
- steps :
  1. "Cadrage business (gratuit, 30min)" — On valide objectif, contexte, contraintes, budget. Tu repars avec une analyse honnête : si je suis le bon profil ou pas.
  2. "Architecture + plan de livraison" — Je conçois l'architecture technique adaptée à ton stade (pas de Clean Archi sur un MVP de 2 semaines). Tu valides avant qu'on touche au code.
  3. "Livraison incrémentale" — Push hebdo en preview, démo, retour. Pas de tunnel de 6 semaines avec un livrable surprise.
  4. "Mise en production + transmission" — Déploiement, monitoring, doc. Tu repars autonome ou je continue en maintenance, ton choix.

**RelatedCases** : `["scormpilot", "homecafe", "billetterie"]`

**FAQ** (4 questions) :
1. **Quel est ton TJM ?** — 450€ HT/jour. Devis au forfait possible pour scope fermé.
2. **Tu peux démarrer quand ?** — Selon ma charge actuelle, généralement sous 1-3 semaines. Je suis transparent sur ma dispo dès le premier échange.
3. **Tu travailles seul ou en équipe ?** — Les deux. En autonomie sur un produit complet, ou intégré à une équipe existante (review, pair programming, lead tech temps partiel).
4. **Tu fais du React Native aussi ?** — Oui, mobile native via Expo + React Native. HomeCafé est ma référence récente : app web Next.js + app mobile native dans le même monorepo Turborepo.

**Schema** : `Service` type avec `serviceType: "Software development consulting"`, offers détaillées.

#### Service 2 — `developpement-saas`

**metaTitle** : "Développement SaaS Freelance — Multi-tenant, Architecture, Production | Axel Hamilcaro"
**metaDescription** : "Développeur freelance spécialisé SaaS B2B. Architecture multi-tenant, Clean Architecture + DDD, mise en production complète. Référence : ScormPilot (5 apps en solo). Devis sous 24h."

**Hero** :
- eyebrow : "Service freelance"
- title : "Je conçois et livre ton SaaS de zéro jusqu'en production."
- subtitle : "Multi-tenancy, Clean Architecture, DDD, CI/CD, monitoring. Stack moderne et maintenable, pas de YAGNI déguisé en sur-ingénierie."

**Problem** :
- "Ton MVP fonctionne mais l'architecture craque sous la charge clients."
- "Tu veux lancer un SaaS B2B mais ton équipe n'a pas l'expérience multi-tenancy."
- "Tu as un produit interne qu'il faut transformer en SaaS commercialisable."
- "Tes coûts cloud explosent à mesure que les clients arrivent."

**Approach** :
1. "Audit produit + business" — On clarifie le modèle (mono-tenant, multi-tenant, hybride), les contraintes de scale, le budget cloud, la roadmap commerciale.
2. "Architecture domain-driven" — Découpage en bounded contexts, Clean Architecture côté backend, choix techno justifiés (Fastify vs NestJS, PostgreSQL row-level security ou schema-per-tenant, etc.).
3. "Livraison itérative en production" — Premier déploiement en semaine 2-3 (vrais clients, pas de mock). CI/CD dès le jour 1. Monitoring + alerting dès la mise en prod.
4. "Industrialisation" — Tests BDD, documentation, onboarding tech, transmission progressive si tu construis une équipe interne.

**RelatedCases** : `["scormpilot", "civitime"]`

**FAQ** :
1. **Tu peux faire du multi-tenancy avec quel pattern ?** — Selon le contexte : row-level security PostgreSQL (simple, économique), schema-per-tenant (isolation forte, plus coûteux), database-per-tenant (clients enterprise). Je t'aide à choisir, pas un dogme.
2. **Combien de temps pour livrer un MVP SaaS ?** — 4 à 12 semaines selon scope. Référence : ScormPilot = 5 apps livrées en solo (API, dashboard, lecteur SCORM, runtime, app Teams).
3. **Tu peux reprendre un SaaS existant qui a déjà mal vieilli ?** — Oui, c'est même fréquent. Audit + refonte progressive sans casser l'existant. Civitime = 4 ans de refonte continue, baisse du churn, hausse de l'engagement.
4. **Tu gères le côté infra/devops ?** — Oui. Docker, CI/CD GitHub Actions, déploiement GCP / Vercel / Cloudflare R2. Je ne suis pas un SRE pur, mais je couvre tout ce qu'il faut pour qu'un SaaS B2B tourne.

**Schema** : `Service` avec offers SaaS-specific.

#### Service 3 — `integration-ia-rag`

**metaTitle** : "Intégration IA / RAG Freelance — Vercel AI SDK, OpenAI, Claude | Axel Hamilcaro"
**metaDescription** : "Développeur freelance spécialisé intégration IA pragmatique : RAG, agents, AI SDK Vercel, OpenAI, Claude API. Référence : éditeur IA RAG Civitime (délais d'itération /2). Devis sous 24h."

**Hero** :
- eyebrow : "Service freelance"
- title : "Intégration IA pragmatique dans ton produit."
- subtitle : "RAG, agents, génération assistée. Pas de hype : on identifie où l'IA crée de la vraie valeur business, on livre, on mesure."

**Problem** :
- "Ton équipe veut intégrer l'IA mais ne sait pas par où commencer."
- "Tu as testé ChatGPT en interne mais ça ne s'intègre pas proprement à ton produit."
- "Tu veux un copilote interne qui connaît tes données (RAG) sans envoyer ton corpus à OpenAI."
- "Tu as besoin d'agents qui automatisent des workflows complexes dans ton produit."

**Approach** :
1. "Cadrage cas d'usage" — On identifie 1 à 3 cas d'usage IA qui ont le ROI le plus clair pour ton produit. Pas 50 features gadget.
2. "POC en 1-2 semaines" — Un POC fonctionnel, pas une slide. Vercel AI SDK + OpenAI/Claude + retrieval (Pinecone, pg_vector ou simple). Tu valides avant qu'on industrialise.
3. "Intégration produit" — Streaming, gestion des erreurs LLM, observabilité (Langfuse / Helicone), gestion des coûts par tenant, fallbacks.
4. "Mesure et itération" — On instrumente l'usage. Si une feature IA ne sert à personne, on la coupe. Pas de prod-show.

**RelatedCases** : `["civitime"]`

**FAQ** :
1. **Quels modèles tu utilises ?** — OpenAI (GPT-4o, GPT-5), Anthropic (Claude Opus / Sonnet / Haiku), Vercel AI SDK pour l'orchestration. Choix dicté par le cas d'usage et le budget, pas par la mode.
2. **Tu peux faire du RAG sans envoyer mes données à OpenAI ?** — Oui : modèles auto-hébergés (Llama, Mistral via vLLM), embeddings open source, vector store self-hosted (pg_vector PostgreSQL). Compromis qualité/coût/sécurité à arbitrer ensemble.
3. **Combien ça coûte de faire tourner ça en prod ?** — Très variable. Je t'aide à modéliser le coût par utilisateur dès le POC pour que tu saches si le business case tient avant d'industrialiser.
4. **Tu fais aussi de l'automatisation type n8n / agents ?** — Oui, agents avec AI SDK Vercel ou stack custom. Pour des workflows internes, n8n peut suffire. Pour de l'IA dans le produit, je code l'orchestration en TypeScript pour garder la maîtrise.

**Schema** : `Service` avec offers IA-specific.

### Task 3.2 — Créer 3 routes pages services

**Files (create):**
- `app/(site)/services/developpeur-nextjs-freelance/page.tsx`
- `app/(site)/services/developpement-saas/page.tsx`
- `app/(site)/services/integration-ia-rag/page.tsx`

Pattern identique pour chaque (même squelette, importe la data du slug correspondant).

### Task 3.3 — Update sitemap

**Modify:** `app/sitemap.ts` — ajouter les 3 routes services + `/about` (`/about` peut déjà avoir été ajouté en Batch 2).

### Validation Batch 3
```bash
pnpm lint
pnpm build
# Visite chacune des 3 routes services
git add ... && git commit -m "feat(seo): add 3 services pages with Service+FAQPage schemas"
```

---

## Batch 4 — Restructuration cases portfolio (parallèle ×4, ~3h)

### Task 4.1 à 4.4 — Pour chaque case (billetterie, civitime, homecafe, scormpilot)

**Files par case** :
- Create: `src/features/portfolio-{case}/components/{case}-faq.tsx`
- Modify: `app/(site)/portfolio/{case}/page.tsx` (ajouter FAQ section + 2 schemas JSON-LD)
- Optionally: reformuler intro Hero pour être "réponse directe LLM"

**FAQ par case** (drafts à partir des contenus existants) :

#### Billetterie
1. **Quel était le challenge technique principal ?** — Construire un système de billetterie complet (plan 2D/3D interactif, ventes temps réel WebSocket, calcul automatique TVA et tarifs) en solo en 1 mois pour un événement précis avec deadline ferme.
2. **Pourquoi WebSocket et pas du polling ?** — Le plan de salle devait refléter en temps réel les places vendues par d'autres opérateurs en parallèle. Polling = latence et conflits, WebSocket = sync sub-200ms et UX fluide pour les agents en caisse.
3. **Combien de temps de la conception à la mise en production ?** — 1 mois calendaire, en solo, avec un client en parallèle. Adoption immédiate par l'équipe opérations le jour J.
4. **Tu as utilisé quelle stack ?** — Next.js (dashboard), Node.js (API + WebSocket), PostgreSQL, Three.js pour le rendu 3D du plan de salle. Déploiement sur infra cliente.

#### Civitime
1. **Pourquoi une refonte Clean Architecture + DDD + event sourcing ?** — La codebase legacy de Civitime souffrait de couplage fort métier/techno. Refonte progressive vers DDD + event sourcing pour permettre l'audit complet de l'historique RSE et faciliter l'ajout de nouvelles métriques sans casser l'existant.
2. **Qu'est-ce que l'éditeur IA RAG a apporté concrètement ?** — Les pédagogues utilisaient une chaîne d'outils manuels pour produire le contenu RSE. Avec le RAG (corpus interne + GPT-4) intégré dans l'éditeur, les délais d'itération ont été divisés par 2 sans dégrader la qualité éditoriale.
3. **Tu étais lead technique seul ou avec une équipe ?** — Lead technique au sein d'une équipe produit. Je définissais l'architecture, codais les fondations, et accompagnais les autres devs en revue + pair.
4. **Combien de temps a duré la mission ?** — 4 ans (janvier 2021 à décembre 2024). Civitime est mon plus long engagement et ma meilleure école produit.

#### HomeCafé
1. **Pourquoi un monorepo Turborepo plutôt que deux repos séparés web et mobile ?** — Partage des modèles de domaine, des helpers et de la logique métier entre web (Next.js) et mobile (Expo / React Native). Un seul source of truth, un seul déploiement, moins de drift.
2. **545+ tests BDD, c'est utile ou de la vanity metric ?** — Utile : 12 domaines métier complexes (mood tracking, journaling, kanban, calendrier, gamification, feed social) interagissent. Sans tests BDD côté domaine, chaque ajout de feature aurait cassé l'existant.
3. **70+ parcours métier en 6 mois, comment c'est tenable ?** — Architecture Clean + DDD + CQRS qui découple les parcours. Chaque domaine est isolé (12 bounded contexts). Ajouter un parcours = ajouter dans un domaine, pas refactorer 50 endroits.
4. **Tu as fait l'app mobile native, pas juste un wrapper ?** — App native via Expo + React Native, vraies notifications push, intégrations OS (Google Calendar, Cloudflare R2 pour le stockage media). Pas un PWA déguisée.

#### ScormPilot
1. **Pourquoi 5 applications séparées et pas un monolithe ?** — Chaque app a un cycle de release différent : API et dashboard évoluent vite, lecteur SCORM doit être ultra stable (clients = organismes de formation), runtime SCORM doit fonctionner offline, app Teams doit suivre les contraintes Microsoft.
2. **Multi-tenancy, comment c'est implémenté ?** — Schema-per-tenant PostgreSQL avec migration automatique à l'onboarding client. Isolation forte des données (exigence des organismes de formation pour leurs apprenants).
3. **Combien de joueurs supportés en prod ?** — Plusieurs milliers de sessions quotidiennes au moment du lancement. Architecture pensée pour scale horizontal sans intervention manuelle.
4. **Tu as livré ça vraiment seul ?** — Oui, en solo de juin 2025 à aujourd'hui. Stack moderne + Clean Architecture + CI/CD = un dev autonome peut livrer un SaaS multi-app. C'est la promesse de mon offre.

**Pattern composant `{case}-faq.tsx`** : copy/adapt du `home-faq.tsx` (Batch 2). Inject FAQPage schema spécifique au case.

**Schemas dans `app/(site)/portfolio/{case}/page.tsx`** :
- Inject `CreativeWork` schema via helper `creative-work.ts` avec `name`, `description`, `dateCreated`, `keywords`, `image`, `creator`.
- Inject `FAQPage` schema via helper `faq-page.ts`.

### Validation Batch 4
```bash
pnpm lint
pnpm build
# Visite des 4 cases
# Validateur Schema.org sur chaque case (manuel)
git add ... && git commit -m "feat(seo): add FAQ + CreativeWork+FAQPage schemas to 4 portfolio cases"
```

---

## Batch 5 — OG images dynamiques (parallèle ×10, ~2h)

### Task 5.1 — OG image template

**File (create):** `src/shared/seo/og-image-template.tsx`

Template `ImageResponse` `next/og` :
- Background : `#0a0a0a` (primary)
- Accent line orange `#ff4d00` à gauche (8px wide)
- Eyebrow (uppercase, accent orange) en haut
- Title (large, white, font Space Grotesk via fetch fonts)
- Subtitle (gray, plus petit)
- Footer : "axelhamilcaro.com" + petit logo si possible

Size : 1200×630.

### Task 5.2 — 10 OG images dynamiques

**Files (create):**
- `app/(site)/opengraph-image.tsx` — home : `eyebrow: "Portfolio", title: "Axel Hamilcaro", subtitle: "Développeur Full-Stack Freelance · Next.js · React · TypeScript"`
- `app/(site)/about/opengraph-image.tsx` — about : `eyebrow: "À propos", title: "Axel Hamilcaro", subtitle: "5 ans freelance · 10+ projets livrés · Touraine, remote France"`
- `app/(site)/services/developpeur-nextjs-freelance/opengraph-image.tsx`
- `app/(site)/services/developpement-saas/opengraph-image.tsx`
- `app/(site)/services/integration-ia-rag/opengraph-image.tsx`
- `app/(site)/portfolio/billetterie/opengraph-image.tsx`
- `app/(site)/portfolio/civitime/opengraph-image.tsx`
- `app/(site)/portfolio/homecafe/opengraph-image.tsx`
- `app/(site)/portfolio/scormpilot/opengraph-image.tsx`
- `app/(blog)/blog/[slug]/opengraph-image.tsx` — dynamic via params, charge le post via `getPostBySlug(slug)` pour récupérer `title`/`description`

Chaque fichier exporte `runtime = "edge"`, `alt`, `contentType`, `size`, `default function Image()`.

### Validation Batch 5
```bash
pnpm lint
pnpm build
# Test OG : http://localhost:3000/opengraph-image, idem pour chaque route
git add ... && git commit -m "feat(seo): add 10 dynamic OG images via next/og"
```

---

## Batch 6 — Blog upgrade + finalisation (~30min)

### Task 6.1 — Blog Article → BlogPosting + cleanup intro

**File:** `app/(blog)/blog/[slug]/page.tsx`

- Remplacer `"@type": "Article"` par `"@type": "BlogPosting"` dans le JSON-LD existant.
- Vérifier que `wordCount`, `articleBody` (excerpt) et `image` sont bien renseignés (selon helper `blog-posting.ts`).
- L'OG dynamique blog est déjà couvert en Batch 5 (`app/(blog)/blog/[slug]/opengraph-image.tsx`).

### Task 6.2 — Sitemap final check

**Modify:** `app/sitemap.ts`

Doit inclure :
- `/`
- `/tree`
- `/blog`
- `/about`
- `/services/developpeur-nextjs-freelance`
- `/services/developpement-saas`
- `/services/integration-ia-rag`
- `/portfolio/billetterie`
- `/portfolio/civitime`
- `/portfolio/homecafe`
- `/portfolio/scormpilot`
- Tous les articles blog (déjà dynamique)

### Task 6.3 — Build final + push

```bash
pnpm lint
pnpm build
# Visite TOUTES les routes (manuel) : home, /about, 3 services, 4 cases, blog index, 1 article
# Run https://search.google.com/test/rich-results sur 2-3 routes en local après deploy
git add ... && git commit -m "feat(seo): blog BlogPosting upgrade + sitemap final"
git push
```

---

## Self-Review

Vérifications après écriture :

**Spec coverage** :
- ✅ Geo Touraine → Batch 1 Task 1.1
- ✅ Cleanup fake testimonials → Batch 1 Task 1.1
- ✅ Person enrichment → Batch 1 Task 1.1
- ✅ Helpers schemas → Batch 1 Task 1.2
- ✅ Page /about → Batch 2 Task 2.2
- ✅ 3 pages services → Batch 3
- ✅ FAQ cases + CreativeWork → Batch 4
- ✅ OG dynamiques → Batch 5
- ✅ CTA reformulés → Batch 1 Task 1.4
- ✅ llms.txt → Batch 1 Task 1.3
- ✅ Section FAQ home → Batch 2 Task 2.1
- ✅ Blog Article → BlogPosting → Batch 6 Task 6.1
- ✅ Sitemap update → Batches 2/3/6

**Placeholder scan** : aucun TBD/TODO non résolu (le seul TODO mentionné est volontaire dans le code).

**Type consistency** : `services-data.ts` type cohérent avec usage dans ServicePageShell. Helpers schemas typés à la création.

---

## Order of execution

```
Batch 1 (parallèle interne possible, agents A/B/C)
  → validation
Batch 2 (parallèle interne, agents A/B)
  → validation
Batch 3 (Task 3.1 d'abord, puis 3.2 parallèle ×3)
  → validation
Batch 4 (parallèle ×4)
  → validation
Batch 5 (parallèle ×10 si template prêt)
  → validation
Batch 6 (séquentiel)
  → push
```
