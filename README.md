# axelhamilcaro.com

Portfolio et site personnel d'Axel Hamilcaro, développeur web fullstack freelance.

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Biome, Drizzle + PostgreSQL (Neon), better-auth (GitHub), Resend.

## Développement

```bash
pnpm dev        # serveur de dev sur http://localhost:3000
pnpm build      # build de production
pnpm start      # serveur de production
pnpm lint       # Biome (lint)
pnpm format     # Biome (format)
```

## Architecture

Direction d'imports stricte `app → features → entities → shared → backend` : une strate n'importe que d'une strate inférieure, aucun import latéral entre features. Chaque page compose des sections, le backend suit une Clean Architecture (controller → service → repository).

Le détail des conventions, de la structure et des patterns est dans [CLAUDE.md](./CLAUDE.md).

## SEO / GEO

Metadata et images Open Graph dynamiques par page, données structurées schema.org (Person, WebSite, ProfessionalService, BlogPosting, FAQPage…), `public/llms.txt` + `public/llms-full.txt` pour les IA, indexation instantanée via IndexNow au déploiement.

## Déploiement

Hébergé sur Vercel, base de données Neon. Chaque déploiement Production déclenche la soumission IndexNow des URLs de blog ajoutées ou modifiées (`.github/workflows/indexnow.yml`).
