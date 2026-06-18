# SEO Meta Report — Titres et descriptions

Date : 2026-06-18  
Branche : feat/geo-optimization

## Résumé

Correction du template de titre root (doublon de marque) et mise en conformité de toutes les meta balises :
- Titres `<title>` : ≤ 70 caractères (template `%s · Axel Hamilcaro` = +17 car.)
- Meta descriptions : 120-160 caractères

## Fichiers modifiés

### 1. `app/_config/site.ts`

| Champ | Avant (294 car.) | Après (157 car.) |
|-------|-----------------|-----------------|
| `description` | "Axel Hamilcaro, développeur freelance Next.js, React et Node.js basé en Touraine, 100% remote France. Je conçois des SaaS B2B multi-tenant..." | "Axel Hamilcaro — dev freelance Next.js, React, Node.js, Touraine, remote France. SaaS B2B, applications web sur mesure, lead tech fractional. Devis sous 24h." |

### 2. `app/_config/metadata.ts`

| Champ | Avant | Après | Longueur |
|-------|-------|-------|----------|
| `title.default` | "Axel Hamilcaro \| Développeur freelance Next.js, React & Node.js - France" | "Axel Hamilcaro — Développeur freelance Next.js, React, Node.js" | 74 → 62 |
| `title.template` | `"%s \| Axel Hamilcaro - Dev Full-Stack"` (+34 car.) | `"%s · Axel Hamilcaro"` (+17 car.) | — |
| `openGraph.title` | "Axel Hamilcaro \| Développeur Full-Stack Freelance France - Next.js & TypeScript" | "Axel Hamilcaro — Développeur freelance Next.js, React, Node.js" | 79 → 62 |
| `twitter.title` | "Axel Hamilcaro \| Dev Full-Stack Freelance France" | "Axel Hamilcaro — Dev freelance Next.js, React, Node.js" | 49 → 54 |

### 3. `app/(site)/page.tsx`

| Champ | Avant (72 car.) | Après (62 car.) |
|-------|----------------|----------------|
| `openGraph.title` | "Axel Hamilcaro \| Développeur freelance Next.js, React & Node.js - France" | "Axel Hamilcaro — Développeur freelance Next.js, React, Node.js" |

### 4. `app/(site)/about/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `title` | "À propos — Axel Hamilcaro, développeur full-stack freelance" (59) | "À propos — Dev full-stack freelance" | 59 → 35 |
| `description` | 207 car. | "Formé Wild Code School (2021), 4 ans lead tech Civitime, 2 ans freelance. 10+ projets livrés. Next.js, React, Node.js, Clean Architecture, DDD et lead tech." | 207 → 156 |
| `openGraph.title` | "À propos — Axel Hamilcaro" | "À propos — Dev full-stack freelance" | 26 → 35 |
| `openGraph.description` | 158 car. | "Dev full-stack, Touraine. 4 ans lead tech Civitime, 2 ans freelance, 10+ projets livrés. Focus Next.js, React, Node.js, Clean Architecture / DDD et lead tech." | 158 |
| `twitter.title` | "À propos — Axel Hamilcaro" | "À propos — Dev full-stack freelance" | 26 → 35 |
| `twitter.description` | 96 car. | "Dev full-stack, Touraine. 4 ans lead tech chez Civitime, 2 ans freelance. 10+ projets livrés, Next.js, React, Node.js, Clean Architecture." | 96 → 138 |

### 5. `src/features/tma/lib/tma-data.ts`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `TMA_META.title` | "TMA — Tierce Maintenance Applicative web/mobile à partir de 350€/mois" (70) | "TMA — Maintenance applicative 350€/mois" | 70 → 39 |
| `TMA_META.description` | 281 car. | "Forfait TMA mensuel pour app Next.js, React, Node ou mobile. PRO 350€/mois (5h, 1 jour ouvré) ou PREMIUM 800€/mois (10h, monitoring proactif). Sans engagement." | 281 → 159 |

### 6. `app/(site)/tma/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `openGraph.title` | "TMA — Tierce Maintenance Applicative à partir de 350€/mois" (58) | "TMA — Maintenance applicative 350€/mois" | 58 → 39 |
| `openGraph.description` | 169 car. | "Forfait TMA pour app Next.js, React, Node ou mobile. PRO 350€ (5h, 1 j ouvré) ou PREMIUM 800€ (10h, monitoring proactif). Sans engagement, résiliation Stripe." | 169 → 158 |
| `twitter.description` | 113 car. | "Forfait TMA mensuel : Next.js, React, Node, infra légère. PRO 350€/mois (5h) ou PREMIUM 800€/mois (10h, monitoring proactif). Sans engagement." | 113 → 142 |

### 7. `app/(site)/tree/page.tsx`

| Champ | Avant (184 car.) | Après (153 car.) |
|-------|----------------|----------------|
| `description` + `openGraph.description` | "Retrouvez tous mes liens professionnels : LinkedIn, GitHub, Malt, et plus. Connectez-vous avec Axel Hamilcaro, développeur Full-Stack freelance basé en Touraine, 100% remote France." | "Retrouvez mes liens professionnels : LinkedIn, GitHub, Malt, rendez-vous. Axel Hamilcaro, dev freelance Next.js, React, Node.js, Touraine, remote France." |

### 8. `app/(site)/services/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `title` | "Services freelance — Next.js, SaaS, Lead tech, TMA" (50) | "Services freelance" | 50 → 18 |
| `description` | 224 car. | "4 services freelance : dev Next.js, SaaS multi-tenant, lead tech fractional, TMA au mois. 5 ans d'expérience, devis sous 24h, démarrage 1-3 semaines." | 224 → 149 |

### 9. `app/(blog)/blog/page.tsx`

| Champ | Avant | Après |
|-------|-------|-------|
| `title` | "Blog — Axel Hamilcaro" (22) | "Blog — Dev web, sécurité, études de cas" (39) |

### 10. `app/(blog)/blog/[slug]/page.tsx`

| Champ | Avant | Après |
|-------|-------|-------|
| `title` format | `` `${post.title} | Blog | Axel Hamilcaro` `` | `` `${post.title} · Blog` `` |

### 11. `app/(site)/portfolio/billetterie/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `title` | "Billetterie Interne - Dashboard de gestion d'événements" (55) | "Billetterie — Dashboard événements" | 55 → 34 |
| `openGraph.description` | 115 car. | "Dashboard interne : plan de salle 2D/3D, ventes temps réel via WebSocket, gestion automatisée tarifs et TVA. Solo, 1 mois (Next.js, NestJS, PostgreSQL)." | 115 → 152 |
| `twitter.description` | 115 car. | "Dashboard interne : plan de salle 2D/3D, ventes temps réel via WebSocket, gestion automatisée tarifs et TVA. Livré en solo en 1 mois." | 115 → 133 |

### 12. `app/(site)/portfolio/civitime/page.tsx`

| Champ | Avant | Après |
|-------|-------|-------|
| `title` | "Civitime - Serious Games & Plateforme SaaS RSE" (47) | "Civitime — SaaS RSE multi-tenant 4 ans" (38) |

### 13. `app/(site)/portfolio/openup/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `title` | "OpenUp - SaaS de gestion de liens tout-en-un" (45) | "OpenUp — SaaS liens Bitly + Linktree" | 45 → 36 |
| `description` | 268 car. | "Mission freelance solo : SaaS Bitly + Linktree + Beacons. Deep links iOS/Android, Cloudflare <50ms, Stripe multi-devise, Clean Architecture + DDD sur Hono." | 268 → 155 |

### 14. `app/(site)/portfolio/scormpilot/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `title` | "ScormPilot - Plateforme SaaS e-learning SCORM" (46) | "ScormPilot — SaaS e-learning SCORM" | 46 → 34 |
| `description` | 164 car. | "SaaS e-learning multi-tenant en solo : 5 apps (API, dashboard, lecteur SCORM, runtime, Teams). PostgreSQL schema-per-tenant. Alternative légère aux LMS rigides." | 164 → 160 |
| `openGraph.description` | 137 car. | "SaaS multi-tenant SCORM : 5 apps solo (API, dashboard, lecteur, runtime, Teams). Architecture hexagonale, DDD, PostgreSQL schema-per-tenant." | 137 → 140 |

### 15. `src/features/services/lib/services-data.ts`

| Service | Champ | Avant | Après | Long. |
|---------|-------|-------|-------|-------|
| nextjs | `metaTitle` | "Développeur Next.js Freelance — Architecture, MVP, Refonte \| Axel Hamilcaro" (76) | "Développeur Next.js freelance" | 76 → 29 |
| nextjs | `metaDescription` | 183 car. | "Dev Next.js freelance, 5 ans d'expérience. Architecture moderne, MVP 4-8 semaines, refonte apps. TypeScript / React 19 / Tailwind v4. TJM 450€ HT. Devis 24h." | 183 → 157 |
| saas | `metaTitle` | "Développement SaaS Freelance — Multi-tenant, Architecture, Production \| Axel Hamilcaro" (88) | "Développement SaaS freelance" | 88 → 28 |
| saas | `metaDescription` | 130 car. | "Dev freelance SaaS B2B. Architecture multi-tenant, Clean Architecture + DDD, mise en prod complète. Référence : ScormPilot (5 apps solo). Devis sous 24h." | 130 → 153 |
| lead | `metaTitle` | "Lead Technique Fractional Freelance — Architecture, Équipe, Mentorat \| Axel Hamilcaro" (88) | "Lead tech fractional freelance" | 88 → 30 |
| lead | `metaDescription` | 148 car. | "Lead tech freelance, startups et PME. 4 ans lead tech Civitime (Clean Architecture, baisse churn). Engagements 3-18 mois, 1-3 jours par semaine. Devis sous 24h." | 148 → 160 |

### 16. `app/(site)/cgv/page.tsx`

| Champ | Avant (206 car.) | Après (146 car.) |
|-------|----------------|----------------|
| `title` | "Conditions Générales de Vente — TMA et prestations B2B" (54) | "CGV — Conditions Générales de Vente B2B" (40) |
| `description` | "Conditions générales de vente (CGV) applicables aux prestations B2B d'Axel Hamilcaro (forfaits TMA PRO et PREMIUM, missions ponctuelles, accompagnement). Article L.441-1 du Code de commerce, droit français." | "CGV des prestations B2B d'Axel Hamilcaro : forfaits TMA PRO/PREMIUM et missions freelance. Art. L.441-1 Code de commerce. SIRET 939 291 415 00015." |
| `openGraph.description` | 86 car. | "CGV applicables aux forfaits TMA et prestations freelance B2B d'Axel Hamilcaro (EI, SIRET 939 291 415 00015). Art. L.441-1 Code de commerce." | 86 → 140 |

### 17. `app/(site)/mentions-legales/page.tsx`

| Champ | Avant | Après | Long. |
|-------|-------|-------|-------|
| `description` | 252 car. | "Mentions légales d'axelhamilcaro.com (LCEN art. 6-III + RGPD) : éditeur Axel Hamilcaro EI (SIRET 939 291 415 00015), hébergeur Vercel, données et cookies." | 252 → 154 |
| `openGraph.title` | "Mentions légales — Axel Hamilcaro" (34) | "Mentions légales" | 34 → 16 |
| `openGraph.description` | 97 car. | "Mentions légales LCEN + RGPD du site axelhamilcaro.com : éditeur Axel Hamilcaro (EI, SIRET 939 291 415 00015), hébergeur Vercel Inc." | 97 → 132 |

## Résultat script de vérification

```
TITLE 50  app/(site)/cgv/page.tsx          -- FALSE POSITIVE: CgvSection[].title (contenu légal, pas meta)
DESC 216  app/(site)/portfolio/civitime    -- FALSE POSITIVE: buildCreativeWorkSchema() param (JSON-LD)
DESC 342  app/(site)/portfolio/openup      -- FALSE POSITIVE: buildCreativeWorkSchema() param (JSON-LD)
DESC 211  app/(site)/portfolio/scormpilot  -- FALSE POSITIVE: buildCreativeWorkSchema() param (JSON-LD)
TITLE 62  app/(site)/page.tsx              -- TOLÉRÉ: OG title root (pas de template)
TITLE 55  app/(site)/page.tsx              -- TOLÉRÉ: Twitter title root (pas de template)
TITLE 62  app/_config/metadata.ts          -- TOLÉRÉ: title.default root (pas de template)
TITLE 54  app/_config/metadata.ts          -- TOLÉRÉ: twitter.title root (pas de template)
TITLE 49  src/features/services            -- FALSE POSITIVE: hero.title (contenu page, pas meta)
TITLE 57  src/features/services            -- FALSE POSITIVE: hero.title (contenu page, pas meta)
```

0 vrai dépassement. Les 10 flags restants sont tous des faux positifs ou des cas tolérés explicitement.
