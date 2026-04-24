# SEO 2026 — Authority Focus Design

**Date** : 2026-04-24
**Auteur** : Axel Hamilcaro (via Claude Code)
**Statut** : Approved — ready for plan
**Scope** : Refonte SEO complète axelhamilcaro.com pour générer plus de leads freelance

---

## 1. Contexte

Le site actuel est déjà bien équipé en SEO de base (metadata global, JsonLd Person + WebSite + ProfessionalService, sitemap dynamique, robots, Vercel Analytics, blog avec generateMetadata + Article schema). Mais il lui manque les leviers 2026 spécifiques :

- Les pages portfolio sont structurellement muettes pour les LLMs (pas de schema CreativeWork ni de FAQ extractible).
- Les CTA sont génériques (`Contact`, `Discuter de ton projet`).
- Pas de pages d'atterrissage par service (long-tail B2B non capturé).
- Pas de page `/about` détaillée pour E-E-A-T (Google January 2026 update renforce le personal brand).
- Pas d'OG images dynamiques par page.
- 4 témoignages sur 5 dans le `AggregateRating` schema sont **inventés** (risque sanction Google fake reviews).
- Discordance géographique critique : site dit "Paris", Malt dit "Tours / 100% remote".

**Objectif business** : générer plus de leads qualifiés (missions freelance) en augmentant la surface SEO, la conversion des visiteurs, et la présence dans les réponses AI (ChatGPT, Perplexity, Google AI Overviews).

---

## 2. Goals & Non-goals

### Goals
- Aligner le positionnement géographique sur la réalité (Touraine, remote France).
- Supprimer le risque E-E-A-T des fake testimonials.
- Créer 3 pages services indexables et optimisées long-tail.
- Créer une page `/about` qui renforce E-E-A-T.
- Restructurer les 4 case studies portfolio pour devenir des "ressources linkables" exploitables par LLMs.
- Ajouter les schemas manquants (CreativeWork, FAQPage, BlogPosting upgrade).
- Générer des OG images dynamiques par page (cases + articles + services + about).
- Reformuler les CTA orientés bénéfice.
- Publier `llms.txt` (signal de légitimité, faible coût).

### Non-goals
- Pas de refonte UI/design générale (le visuel actuel reste).
- Pas de migration framework (Next.js 16 + App Router OK).
- Pas de création de contenu blog supplémentaire (stratégie blog hors scope).
- Pas de campagne backlinks externe (action long terme, hors dev).
- Pas d'A/B testing CTA (on choisit une formulation, on mesure ensuite).

---

## 3. Décisions clés validées

| # | Décision | Choix |
|---|---|---|
| 1 | Géographie | Aligner site sur Malt : "Freelance France, basé en Touraine, 100% remote". Retirer "Paris" du title, description, keywords, JsonLd address, areaServed. |
| 2 | Testimonials | Tous les 5 sont **inventés**. Retirer entièrement le bloc `aggregateRating` + `review` du `ProfessionalService` schema. Garder un emplacement code documenté pour réintégrer de **vrais** testimonials (ex: Bryan Kaneb depuis Malt) quand collectés. |
| 3 | Mix pages services | **AI-aware** : `/services/developpeur-nextjs-freelance`, `/services/developpement-saas`, `/services/integration-ia-rag` |
| 4 | OG images | Génération native via `ImageResponse` de `next/og`. Template commun centralisé dans `src/shared/seo/og-image-template.tsx`. Background noir + accent orange `#ff4d00` + nom signature. |
| 5 | FAQ format | Server-rendered HTML standard (pas accordion JS) pour extraction LLM. Style accordion via CSS uniquement (`<details>` natif). |
| 6 | Pages services pattern | Sections nommées exportées du même fichier (cohérent avec le pattern portfolio existant). Une page service = `Hero` + `Problem` + `Approach` + `Cases` + `Faq` + `Cta`. |

---

## 4. Architecture & file structure

### 4.1 Direction d'imports

Respecte la règle stricte du CLAUDE.md projet : `app → features → entities → shared → backend`.

```
app/(site)/services/[slug]/page.tsx
  → src/features/services/components/*
  → src/features/services/lib/services-data.ts
  → src/shared/seo/schemas/*
  → src/shared/ui/*
```

### 4.2 Fichiers à créer

```
app/
├── (site)/
│   ├── about/page.tsx                                  # Page E-E-A-T
│   ├── about/opengraph-image.tsx                       # OG dynamique about
│   ├── opengraph-image.tsx                             # OG dynamique home
│   ├── portfolio/billetterie/opengraph-image.tsx       # OG par case
│   ├── portfolio/civitime/opengraph-image.tsx
│   ├── portfolio/homecafe/opengraph-image.tsx
│   ├── portfolio/scormpilot/opengraph-image.tsx
│   └── services/
│       ├── developpeur-nextjs-freelance/page.tsx
│       ├── developpeur-nextjs-freelance/opengraph-image.tsx
│       ├── developpement-saas/page.tsx
│       ├── developpement-saas/opengraph-image.tsx
│       ├── integration-ia-rag/page.tsx
│       └── integration-ia-rag/opengraph-image.tsx
├── (blog)/blog/[slug]/opengraph-image.tsx              # OG dynamique article

public/llms.txt

src/
├── features/
│   ├── about/
│   │   └── components/
│   │       ├── about-hero.tsx                          # Photo + headline + key signals
│   │       ├── about-story.tsx                         # Bio narrative (parcours)
│   │       ├── about-values.tsx                        # 3-4 valeurs / méthode
│   │       ├── about-credentials.tsx                   # Formations, stack, certifs
│   │       ├── about-proof.tsx                         # Stats agrégées (clients, années, projets)
│   │       └── about-cta.tsx                           # CTA conversion
│   └── services/
│       ├── components/
│       │   ├── service-hero.tsx
│       │   ├── service-problem.tsx
│       │   ├── service-approach.tsx
│       │   ├── service-cases.tsx                       # Liens vers case studies pertinents
│       │   ├── service-faq.tsx
│       │   ├── service-cta.tsx
│       │   └── service-page-shell.tsx                  # Compose les sections, prend service config en prop
│       └── lib/
│           └── services-data.ts                        # Source unique des 3 services (slug, hero, faq, schema, cases liés)
└── shared/
    └── seo/
        ├── og-image-template.tsx                       # Template ImageResponse partagé
        └── schemas/
            ├── faq-page.ts                             # Helper FAQPage schema
            ├── creative-work.ts                        # Helper CreativeWork schema (cases)
            ├── service-schema.ts                       # Helper Service schema (pages services)
            └── blog-posting.ts                         # Helper BlogPosting (upgrade Article)

src/features/home/components/home-faq.tsx               # Section FAQ home (qualification prospects)
src/features/portfolio-billetterie/components/billetterie-faq.tsx
src/features/portfolio-civitime/components/civitime-faq.tsx
src/features/portfolio-homecafe/components/homecafe-faq.tsx
src/features/portfolio-scormpilot/components/scormpilot-faq.tsx
```

### 4.3 Fichiers à modifier

```
app/_config/metadata.ts                                 # Retirer "Paris", ajouter Touraine + remote France
app/_config/site.ts                                     # Description sans "Paris"
src/shared/seo/json-ld.tsx                              # Retirer fake testimonials, geo Touraine, enrichir knowsAbout
app/(site)/page.tsx                                     # Ajouter <HomeFaq /> avant Footer
app/(site)/portfolio/billetterie/page.tsx               # Ajouter <BilletterieFaq /> + JsonLd CreativeWork+FAQPage
app/(site)/portfolio/civitime/page.tsx                  # idem
app/(site)/portfolio/homecafe/page.tsx                  # idem
app/(site)/portfolio/scormpilot/page.tsx                # idem
app/(blog)/blog/[slug]/page.tsx                         # Article → BlogPosting schema
app/sitemap.ts                                          # Ajouter /about + 3 pages services
app/robots.ts                                           # Pas de changement
src/shared/layouts/navbar.tsx (ou wherever)             # CTA "Contact" → "Audit gratuit 30min"
src/features/home/components/hero/hero-left.tsx         # CTA "Discuter de ton projet" → "Lancer mon projet sous 24h"
src/features/home/components/footer.tsx                 # CTA "Email" + "Calendly" reformulés
```

---

## 5. Components — détails

### 5.1 Geo correction (priorité 0, à faire en premier)

**Fichiers** : `app/_config/metadata.ts`, `app/_config/site.ts`, `src/shared/seo/json-ld.tsx`

**Changements** :

| Champ | Avant | Après |
|---|---|---|
| `metadata.title.default` | `Axel Hamilcaro \| Développeur Full-Stack Freelance Paris - TypeScript & React` | `Axel Hamilcaro \| Développeur Full-Stack Freelance France - Next.js & TypeScript` |
| `metadata.title.template` | `%s \| Axel Hamilcaro - Dev Full-Stack` | (inchangé) |
| `metadata.keywords` | inclut `développeur freelance Paris`, `développeur web Paris`, `Paris`, `Île-de-France` | Retirer `Paris` et `Île-de-France`. Ajouter `développeur freelance France`, `développeur freelance remote`, `freelance Touraine`, `Next.js freelance`, `intégration IA freelance`. |
| `siteConfig.description` | `...freelance à Paris...` | `...freelance basé en Touraine, intervient à 100% en remote sur la France...` |
| `personSchema.address` | `Paris` | `Tours, FR` (PostalAddress.addressLocality: "Tours") |
| `professionalServiceSchema.areaServed` | `[France, Paris]` | `[{"@type": "Country", "name": "France"}]` (retirer City Paris) |

### 5.2 Testimonials cleanup (priorité 0)

**Fichier** : `src/shared/seo/json-ld.tsx`

- Retirer entièrement la const `testimonials` (lignes 7-43).
- Retirer le calcul `averageRating`.
- Retirer les blocs `aggregateRating` et `review` du `professionalServiceSchema`.
- Ajouter un commentaire `// TODO: réintégrer aggregateRating + review quand >= 3 vrais témoignages collectés (Malt, email écrit, LinkedIn recommandation)`.

**Action user (hors dev, à faire en parallèle)** : demander à 3-5 vrais clients (Bryan Kaneb confirmé, + Léo ScormPilot, Anthony Civitime si réels) de poster une recommandation Malt OU d'écrire un email signé qu'on archive en preuve.

### 5.3 JsonLd enrichment

**Fichier** : `src/shared/seo/json-ld.tsx`

Enrichir `personSchema` :

```typescript
{
  // ... existant
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Wild Code School"
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Concepteur Développeur d'applications Web & Mobile (Bac+3/4)",
      credentialCategory: "degree"
    }
  ],
  knowsAbout: [
    // existant + ajouts :
    "React Native",
    "Expo",
    "NestJS",
    "Fastify",
    "RAG (Retrieval Augmented Generation)",
    "Vercel AI SDK",
    "Multi-tenancy SaaS",
    "Event Sourcing",
    "CQRS",
    "Turborepo",
    "Cloudflare R2"
  ],
  workLocation: {
    "@type": "Place",
    name: "Remote (France)"
  }
}
```

### 5.4 Page /about

**Route** : `app/(site)/about/page.tsx`

**Composition** :
```tsx
export default function AboutPage() {
  return (
    <main>
      <AboutHero />          {/* Photo + headline "10+ projets livrés en autonomie" + 3 KPI */}
      <AboutStory />         {/* 3-4 paragraphes : parcours Wild Code School → freelance → focus IA */}
      <AboutValues />        {/* 3-4 valeurs : code propre, vision produit, livraison fiable, communication */}
      <AboutCredentials />   {/* Formations, stack, certifs, années d'expérience */}
      <AboutProof />         {/* Stats agrégées : 4 ans Civitime, 5 apps en solo ScormPilot, 545+ tests HomeCafe */}
      <AboutCta />           {/* CTA conversion : "Discutons de votre projet" + Calendly */}
    </main>
  );
}
```

**Metadata** :
```typescript
export const metadata: Metadata = {
  title: "À propos — Axel Hamilcaro, développeur full-stack freelance",
  description: "Développeur full-stack freelance depuis 2021. Formé à la Wild Code School, lead technique 4 ans chez Civitime, 10+ projets livrés en autonomie. Focus Next.js, React, Node.js, intégration IA.",
  alternates: { canonical: "https://axelhamilcaro.com/about" },
  openGraph: { /* ... */ }
};
```

**JsonLd page** : injecter un `AboutPage` schema en plus du Person global.

**Input user requis** :
- Bio narrative (3-4 paragraphes) → je propose draft basé sur Malt, tu édites.
- 3-4 valeurs personnelles avec une phrase chacune.

### 5.5 Pages /services/[slug]

**Pattern** : 3 routes statiques (pas de `[slug]` dynamique — chaque service a sa page propre pour permettre customisation totale du contenu et des métadonnées). La donnée commune (FAQ, schemas) vit dans `services-data.ts`.

**Structure d'une page service** (ex: `app/(site)/services/developpeur-nextjs-freelance/page.tsx`) :

```tsx
import { servicesData } from "@/src/features/services/lib/services-data";
import { ServicePageShell } from "@/src/features/services/components/service-page-shell";

const data = servicesData["developpeur-nextjs-freelance"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: `https://axelhamilcaro.com/services/${data.slug}` },
  openGraph: {
    title: data.metaTitle,
    description: data.metaDescription,
    url: `https://axelhamilcaro.com/services/${data.slug}`,
    images: [`/services/${data.slug}/opengraph-image`]
  }
};

export default function NextJsServicePage() {
  return <ServicePageShell data={data} />;
}
```

**`services-data.ts`** : source unique typée

```typescript
export type ServiceData = {
  slug: "developpeur-nextjs-freelance" | "developpement-saas" | "integration-ia-rag";
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: { label: string; href: string };
  };
  problem: { title: string; bullets: string[] };
  approach: { title: string; steps: { title: string; body: string }[] };
  relatedCases: ("billetterie" | "civitime" | "homecafe" | "scormpilot")[];
  faq: { question: string; answer: string }[];
  schema: {
    serviceType: string;
    description: string;
    offers: { name: string; description: string }[];
  };
};

export const servicesData: Record<string, ServiceData> = {
  "developpeur-nextjs-freelance": { /* ... */ },
  "developpement-saas": { /* ... */ },
  "integration-ia-rag": { /* ... */ }
};
```

**JsonLd injecté par chaque page service** : `Service` schema + `FAQPage` schema (2 blocs).

**Input user requis** :
- Pour chaque des 3 services : 1 promesse forte (hero), 3 problèmes clients (problem.bullets), 4 étapes méthode (approach.steps), 4-6 questions FAQ.
- Je propose des drafts basés sur la bio Malt + les case studies, tu édites/valides.

### 5.6 Restructuration case studies

**Pour chaque page** `app/(site)/portfolio/{billetterie,civitime,homecafe,scormpilot}/page.tsx` :

1. **Ajouter une section FAQ visible** (composant `<{Case}Faq />`) — 3-4 questions (ex: "Quel était le challenge technique principal ?", "Combien de temps pour livrer ?", "Quels tradeoffs as-tu fait ?", "Quel résultat business ?").
2. **Injecter 2 schemas JSON-LD** :
   - `CreativeWork` (ou `SoftwareApplication` si app livrée) avec `author`, `dateCreated`, `keywords`, `description`, `image`, `mainEntity`.
   - `FAQPage` avec les 3-4 questions/réponses extraites.
3. **Vérifier que l'intro de chaque case (Hero) est formulée comme "réponse directe à une question implicite"** — ex: "Civitime est une plateforme RSE B Corp dont j'ai été lead technique pendant 4 ans...". Si l'intro actuelle est trop poétique, la reformuler factuelle.

**Helper `creative-work.ts`** :

```typescript
export type CaseData = {
  name: string;
  description: string;
  dateCreated: string;
  keywords: string[];
  image: string;
  applicationCategory?: string;
};

export function buildCreativeWorkSchema(data: CaseData) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.name,
    description: data.description,
    dateCreated: data.dateCreated,
    keywords: data.keywords.join(", "),
    image: data.image,
    creator: {
      "@type": "Person",
      name: "Axel Hamilcaro",
      url: "https://axelhamilcaro.com"
    },
    inLanguage: "fr-FR"
  };
}
```

**Input user requis** : 3-4 questions/réponses par case study (4 cases × 4 = max 16 Q/R). Je propose drafts à partir des contenus existants, tu édites.

### 5.7 OG images dynamiques

**Template centralisé** : `src/shared/seo/og-image-template.tsx`

```typescript
import { ImageResponse } from "next/og";

export type OgImageProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;        // ex: "Case Study", "Service", "Article"
};

export const OG_SIZE = { width: 1200, height: 630 };

export function renderOgImage({ title, subtitle, eyebrow }: OgImageProps) {
  return new ImageResponse(
    (
      <div style={{ /* layout : background noir, accent orange #ff4d00, nom "axelhamilcaro.com" en bas, eyebrow en haut, title centre, subtitle sous title */ }}>
        {/* ... */}
      </div>
    ),
    OG_SIZE
  );
}
```

**Usage par route** (ex: `app/(site)/portfolio/billetterie/opengraph-image.tsx`) :

```typescript
import { renderOgImage } from "@/src/shared/seo/og-image-template";

export const runtime = "edge";
export const alt = "Billetterie — Case study Axel Hamilcaro";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function Image() {
  return renderOgImage({
    eyebrow: "Case study",
    title: "Billetterie événementielle",
    subtitle: "Plan 2D/3D + WebSocket temps réel — solo en 1 mois"
  });
}
```

**Routes concernées** : home, about, 4 portfolio cases, 3 services, blog [slug]. Total = **10 OG images dynamiques**.

### 5.8 CTA reformulation

| Emplacement | Avant | Après (proposition) |
|---|---|---|
| Navbar desktop | `Contact` | `Audit gratuit 30min` |
| Navbar mobile | `Prendre rendez-vous` | `Audit gratuit 30min` |
| Hero (`hero-left.tsx`) | `Discuter de ton projet` | `Lancer mon projet sous 24h` |
| Footer Email | `Email` + `Réponse rapide` | `Écrire en 3 lignes` + `Réponse sous 1h en journée` |
| Footer Calendly | `Calendly` + `15-20 min` | `Réserver mon audit` + `30 min, sans engagement` |

**Validation user requise** : valider/ajuster chaque label avant impl.

### 5.9 llms.txt

**Fichier** : `public/llms.txt`

Format markdown documenté par Vercel/Anthropic :

```markdown
# Axel Hamilcaro — Développeur Full-Stack Freelance

> Développeur full-stack freelance basé en Touraine, 100% remote France.
> Spécialisé Next.js, React, Node.js, TypeScript, intégration IA (RAG, Vercel AI SDK).
> 10+ projets livrés en autonomie depuis 2021. TJM 450€.

## Pages principales

- [Accueil](https://axelhamilcaro.com): vue d'ensemble services, case studies, témoignages
- [À propos](https://axelhamilcaro.com/about): parcours, valeurs, crédentiels
- [Blog](https://axelhamilcaro.com/blog): articles techniques

## Services

- [Développeur Next.js freelance](https://axelhamilcaro.com/services/developpeur-nextjs-freelance)
- [Développement SaaS](https://axelhamilcaro.com/services/developpement-saas)
- [Intégration IA / RAG](https://axelhamilcaro.com/services/integration-ia-rag)

## Case studies

- [ScormPilot](https://axelhamilcaro.com/portfolio/scormpilot): SaaS e-learning multi-tenant, 5 apps en solo
- [HomeCafé](https://axelhamilcaro.com/portfolio/homecafe): app web + mobile native, 70+ parcours, 545+ tests
- [Civitime](https://axelhamilcaro.com/portfolio/civitime): plateforme RSE, lead tech 4 ans, IA RAG
- [Billetterie](https://axelhamilcaro.com/portfolio/billetterie): plan 2D/3D + WebSocket, solo en 1 mois

## Contact

- Email: contact@axelhamilcaro.com
- Calendly: https://calendly.com/axel-hamilcaro-pro/appel-decouverte
- Malt: https://www.malt.fr/profile/axelhamilcaro
- LinkedIn: https://www.linkedin.com/in/axelhamilcaro/
```

### 5.10 Section FAQ home

**Fichier** : `src/features/home/components/home-faq.tsx`

Position : entre `<Testimonials />` et `<Footer />` dans `app/(site)/page.tsx`.

5 questions de qualification prospects :

1. Quels types de projets prends-tu ?
2. Quels sont tes délais ?
3. Quel est ton TJM / mode de facturation ?
4. Travailles-tu en remote ou sur site ?
5. Comment se passe le premier contact ?

**Format HTML** : `<dl>` avec `<dt>` (question) + `<dd>` (réponse) — sémantique correcte pour LLMs. Style accordion via `<details>` natif si on veut UX accordéon.

**Inject `FAQPage` schema** dans la page home (en plus des schemas existants).

---

## 6. Schemas reference (synthèse)

Schemas injectés après refonte :

| Page | Schemas injectés |
|---|---|
| `/` (home) | Person, WebSite, ProfessionalService (sans review), BreadcrumbList, **FAQPage** (nouveau) |
| `/about` | Person (global), **AboutPage** (nouveau) |
| `/services/*` (×3) | Person (global), **Service** + **FAQPage** (nouveaux) |
| `/portfolio/*` (×4) | Person (global), **CreativeWork** + **FAQPage** (nouveaux) |
| `/blog` | Person (global), CollectionPage (existe ?) |
| `/blog/[slug]` | Person (global), **BlogPosting** (upgrade Article), BreadcrumbList |

---

## 7. Implementation order

Respecte les dépendances et minimise le risque (geo correction d'abord car affecte tout le SEO).

1. **Geo + testimonials cleanup** (1h) — chirurgical, débloque le reste
2. **JsonLd enrichment** (30min) — ajoute knowsAbout, hasCredential, alumniOf
3. **Helpers schemas** (`faq-page.ts`, `creative-work.ts`, `service-schema.ts`, `blog-posting.ts`) (1h)
4. **OG image template + 1 OG (home)** (1h) — valide le design avant de dupliquer
5. **CTA reformulation** (30min) — valider labels avec user d'abord
6. **`llms.txt`** (15min)
7. **Section FAQ home + schema** (45min)
8. **4 FAQ portfolio + 4 CreativeWork** (3h) — y compris collecte questions/réponses avec user
9. **9 OG images restantes** (1h) — dupliquer le pattern home
10. **Page /about complète + schema + OG** (3h) — y compris collecte bio avec user
11. **3 pages services complètes** (6h) — y compris services-data.ts + collecte content avec user
12. **Blog : Article → BlogPosting + OG dynamique** (45min)
13. **Sitemap update** (15min)

**Total estimé** : ~18h dev + ~5h collecte content avec user.

---

## 8. Success criteria

### Vérifications techniques (immédiates)
- `pnpm build` passe sans erreur.
- Toutes les nouvelles routes répondent en 200.
- Validateur Schema.org Google (https://validator.schema.org/) : 0 erreur sur toutes les nouvelles structures.
- Rich Results Test Google : pages services et cases triggent les rich results FAQ + Service.
- Lighthouse SEO score = 100 sur toutes les nouvelles pages.
- INP < 200ms, LCP < 2.5s, CLS < 0.1 (Core Web Vitals 2026).

### Vérifications de cohérence (à valider par user)
- Aucune mention "Paris" hors contexte historique dans le site.
- Aucun fake testimonial subsiste.
- Tous les CTA sont reformulés bénéfice.
- `llms.txt` accessible publiquement à `/llms.txt`.
- Toutes les OG images générées s'affichent correctement (test sur https://www.opengraph.xyz/).

### Métriques business (à mesurer après publication, 4-6 semaines)
- Apparitions dans Google Search Console pour "freelance Next.js [ville]", "intégration IA freelance", "développement SaaS Next.js".
- Citations dans réponses ChatGPT / Perplexity quand on demande "développeur Next.js freelance France".
- Augmentation du nombre d'événements `cta_click` sur les nouveaux CTA via Vercel Analytics.
- Augmentation du nombre de leads entrants (Calendly bookings + emails reçus).

---

## 9. Risques & mitigations

| Risque | Probabilité | Impact | Mitigation |
|---|---|---|---|
| Pages services vides de contenu (user trop occupé pour fournir bio/FAQ) | Medium | High | Je propose des drafts complets à partir de Malt + cases existants, user édite uniquement. |
| OG ImageResponse échoue en edge runtime | Low | Medium | Tester home en premier, fallback `public/og-image.png` si bug. |
| Retrait fake testimonials = perte temporaire des étoiles SERP | High | Low | Acceptable : risque sanction Google >> bénéfice court terme. Réintégrer dès qu'on a 3 vrais. |
| URL `/services/integration-ia-rag` peu cherchée | Medium | Medium | Si zéro impression après 6 semaines, A/B avec `/services/integration-ia` (sans rag) ou `/services/integration-chatgpt-claude`. |
| Build time augmente (10 OG images dynamiques) | Low | Low | OG dynamiques sont à la demande (edge), pas au build. |

---

## 10. Inputs user — checklist collecte content

À collecter pendant l'implémentation (je propose drafts, user valide/édite) :

- [ ] **Bio /about** : 3-4 paragraphes (parcours Wild Code School → Civitime → freelance focus IA)
- [ ] **3-4 valeurs personnelles** : une phrase par valeur
- [ ] **5 FAQ home** (questions qualification prospect) : Q + A
- [ ] **3-4 FAQ par case study** (×4 cases = max 16 Q/A)
- [ ] **3 services × 4-6 FAQ** = max 18 Q/A
- [ ] **3 services** : promesse hero + 3 problèmes + 4 étapes méthode
- [ ] **CTA labels** : valider/ajuster les 5 propositions section 5.8
- [ ] **Photo /about** : confirmer si on utilise `/profil_pp.jpeg` existant ou nouvelle
- [ ] **Stats agrégées /about** : combien de clients servis depuis 2021 ? combien de projets livrés ? (pour AboutProof)

---

## 11. Hors scope (post-publication)

- Demander recommandations Malt à 3-5 vrais clients (Bryan + autres).
- Réintégrer `aggregateRating` + `review` dans json-ld quand >= 3 vrais témoignages.
- Backlinks externes (interventions podcasts dev, articles invités).
- Stratégie blog dédiée (calendrier éditorial, sujets long-tail B2B).
- Suivi Google Search Console mensuel.
- A/B testing CTA via Vercel Analytics + variants si trafic le permet.
