# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website for Axel Hamilcaro, built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4. The project uses Biome for linting/formatting instead of ESLint.

## Development Commands

```bash
pnpm dev        # Start development server on http://localhost:3000
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run Biome linter checks
pnpm format     # Format code with Biome
```

## Project Structure

```
/app
  /_components
    /ui              # Reusable UI components
    /shared
      /layouts       # Navbar, Footer
      /effects       # TronGrid, ScrollIndicator
      /navigation    # TransitionLink, PageTransition
      /seo           # JsonLd
    /home            # Home page-specific components
  /_config           # Configuration files (metadata, viewport, fonts, site)
  /_lib              # App utilities (cn.ts)
  /api               # API routes (controllers)
    /forms           # Forms CRUD
    /leads           # Leads CRUD
    /submit/[slug]   # Public lead submission
    /admin/dashboard # Dashboard stats
  layout.tsx         # Root layout
  page.tsx           # Homepage

/src
  /core
    /errors          # Domain errors (NotFoundError, ValidationError, ConflictError)
  /features
    /auth            # Auth feature
      auth.service.ts      # Admin auth (framework-agnostic)
    /email           # Email feature
      email.service.ts     # Email sending (Resend)
    /forms           # Form feature
      form.controller.ts   # HTTP handling
      form.repository.ts   # CRUD operations
      form.service.ts      # Business logic
      form.schema.ts       # Zod schemas
    /leads           # Lead feature
      lead.controller.ts
      lead.repository.ts
      lead.service.ts
      lead.schema.ts
    /analytics       # Analytics feature
      analytics.controller.ts
      analytics.repository.ts
      analytics.service.ts
  /lib
    http.ts          # HTTP response helpers (NextResponse abstraction)
    /utils
      date.utils.ts   # Date formatting
      slug.utils.ts   # Slug generation/validation
      email.utils.ts  # Email normalization/validation

/drizzle             # Database layer
  schema.ts          # Drizzle schema definitions
  index.ts           # DB connection

/public              # Static assets
```

**Note:** `/app` contains Next.js routes and UI. `/src` contains business logic with Clean Architecture.

## Refactoring Guidelines

### 1. Code Cleanliness

- **NO comments in code**: Code must be self-documenting through explicit names and short functions
- Prioritize clarity over brevity
- Functions should be short and focused on a single responsibility

### 2. Target Component Organization

The goal is to reorganize components into this structure:

```
/components
  /ui              # Shadcn components ONLY (currently in app/_components/ui)
  /shared          # Reusable cross-cutting components
    /layouts       # Shared layouts (Header, Footer, Sidebar, etc.)
    /forms         # Reusable form components
    /cards         # Reusable cards
    /modals        # Reusable modals
  /[feature]       # Feature-specific components
    /home          # Homepage-specific components
    /tree          # Tree page-specific components
```

**Organization rules:**
- `/components/ui`: Reserved for Shadcn components only
- `/components/shared`: Components reused in 2+ different features
- `/components/[feature]`: Components used in only 1 feature/page
- If a component is used 2+ times across features → move to shared
- If a component is used only once → keep in feature folder

### 3. Next.js - Server Components First

**Default to Server Components:**
- Use Server Components by default for all new components
- Only use Client Components (`'use client'`) when strictly necessary:
  - Interactivity (onClick, onChange, useState, etc.)
  - React hooks (useEffect, useContext, etc.)
  - Browser APIs (localStorage, window, etc.)
  - Event listeners
- Explicitly mark all Client Components with `'use client'` at the top of the file

**Example - Current navbar.tsx uses 'use client' (app/_components/navbar.tsx):**
```tsx
'use client';
// Uses useState for mobile menu → correctly marked as client component
```

### 4. Pages as Pure Orchestrators

Pages (`app/*/page.tsx`) must be **orchestrators only**:

**Current good example (app/page.tsx):**
```tsx
export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <TechStack />
      <Footer />
    </main>
  );
}
```

**Page responsibilities:**
- Data fetching (Server Components only)
- Handling params/searchParams
- Composing 1-3 components maximum
- NO complex JSX (50+ lines)
- NO business logic

**Current layout.tsx has too much JSX** - this should be refactored:
- Extract font configuration
- Extract metadata to separate file
- Extract viewport config to separate file
- Keep layout.tsx minimal

### 5. Clean Architecture (Route → Controller → Service → Repository)

```
Route (Next.js) → Controller → Service → Repository → Database
```

**Layer responsibilities:**

| Layer | Location | Responsibility |
|-------|----------|----------------|
| Route | `/app/api/**` | Next.js specific (headers, params extraction) |
| Controller | `/src/features/*/[feature].controller.ts` | Business flow, error handling, response formatting |
| Service | `/src/features/*/[feature].service.ts` | Business logic, validation, orchestration |
| Repository | `/src/features/*/[feature].repository.ts` | CRUD operations only, no business logic |
| Schema | `/src/features/*/[feature].schema.ts` | Zod validation schemas |

**Framework decoupling:**
- Controllers use `@/src/lib/http` (abstraction over NextResponse)
- Auth service receives `Headers` as parameter (no direct Next.js imports)
- Routes are minimal wrappers (~5 lines max)
- To switch framework: only change routes and `src/lib/http.ts`

**Example route (minimal Next.js code):**
```typescript
// app/api/forms/route.ts
import { headers } from "next/headers";
import * as formController from "@/src/features/forms/form.controller";

export async function GET() {
  return formController.list(await headers());
}

export async function POST(request: Request) {
  return formController.create(await request.json(), await headers());
}
```

**Example controller (framework-agnostic):**
```typescript
// src/features/forms/form.controller.ts
import { json, error } from "@/src/lib/http";
import { authService } from "@/src/features/auth/auth.service";
import { formService } from "./form.service";

export async function list(headers: Headers) {
  const auth = await authService.requireAdmin(headers);
  if (!auth.success) return error(auth.error, auth.status);

  const forms = await formService.list();
  return json(forms);
}
```

### 6. Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `ProductCard.tsx`)
- **Client Components**: Optional `.client.tsx` suffix for clarity
- **Hooks**: `use*.ts` (e.g., `useProductFilters.ts`)
- **Utils/helpers**: `*.util.ts` or `*.helper.ts`
- **Services**: `*.service.ts`
- **Types**: `*.types.ts` or colocated in the file
- **Exports**: Named exports by default, default export only for Next.js pages
- **Barrel exports**: Use `index.ts` for folders with multiple files

### 7. TypeScript Best Practices

- Strict types, no `any`
- Interfaces for component props
- Types for function returns
- Colocate types when specific to a single file
- Use type imports: `import type { Metadata } from "next"`

### 8. Performance Patterns

- **Server Components by default** = fetch closest to data
- **Lazy loading**: Use `dynamic()` for large Client Components
- **Images**: Always use `next/image` with proper `sizes` attribute
- **Suspense boundaries**: For sections that fetch data
- **Parallel fetching**: Use `Promise.all()` for independent fetches

**Example optimized page pattern:**
```tsx
export default async function DashboardPage() {
  const [stats, activity] = await Promise.all([
    fetchStats(),
    fetchRecentActivity(),
  ]);

  return (
    <>
      <DashboardStats data={stats} />
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity data={activity} />
      </Suspense>
    </>
  );
}
```

### 9. Refactoring Priority Order

When refactoring existing code:

1. **Remove all comments** first
2. **Extract complex JSX** from pages into components
3. **Identify and convert** to Server Components where possible
4. **Organize components** (shared vs feature-specific)
5. **Separate concerns** (infrastructure/domain/application if mixed)
6. **Clean imports** and add barrel exports

**When to create a new component:**
- Reused 2+ times → shared
- More than 50 lines of JSX → extract
- Complex or isolable logic → extract
- Needs Suspense or Error boundary → extract

## Configuration Details

### Biome Configuration (biome.json)

- Formatter: 2 spaces, 80 char line width, double quotes, semicolons
- Import organization enabled
- Strict TypeScript rules (no unused variables/imports)
- No console warnings (except console.log allowed)
- Accessibility rules enabled

### Next.js Configuration (next.config.ts)

- React strict mode enabled
- Compression enabled
- View transitions experimental feature enabled
- Security headers configured (DNS prefetch, nosniff, referrer policy)
- Redirects configured:
  - `/linkedin` → LinkedIn profile
  - `/github` → GitHub profile
  - `/malt` → Malt profile
  - `/rdv` → Calendly booking

### Styling

- **Tailwind CSS v4** with `@tailwindcss/postcss`
- Editorial/Magazine theme with single accent color
  - Primary: `#0a0a0a` (black), Background: `#ffffff` (white)
  - Single accent: `#ff4d00` (electric orange)
- **Utility function**: `cn()` in `lib/cn.tsx` for merging Tailwind classes
- **Card system**: `.card`, `.card-accent`, `.badge` utility classes
- **Clean animations**: Fade-in, fade-in-up with Framer Motion

### Fonts

- Geist Sans (primary body text)
- Geist Mono (monospace for code-like elements)
- Space Grotesk (display font for headlines)
- Loaded via `next/font/google` with variable fonts

### Analytics

- Vercel Analytics
- Vercel Speed Insights
- Both integrated in root layout

## Key Architectural Patterns

### Component Composition Pattern

**Current pattern (to maintain):**
- Pages compose high-level sections
- Sections compose smaller components
- UI components are atomic and reusable

**Example from homepage:**
```
Home Page
  ├─ Hero (section)
  │   ├─ Heading1 (ui)
  │   ├─ Heading2 (ui)
  │   ├─ Paragraphe (ui)
  │   └─ Button (ui)
  ├─ WhatIDo (section)
  ├─ TechStack (section)
  └─ Footer (layout)
```

### Metadata & SEO Pattern

Extensive SEO optimization in layout.tsx:
- Structured metadata with keywords
- OpenGraph tags
- Twitter cards
- JSON-LD structured data (JsonLd component)
- Viewport configuration
- Manifest for PWA

### Animation Pattern

- CSS animations defined in global.css
- Staggered fade-in animations with `animationDelay`
- Hover effects with Tailwind utilities
- View transitions enabled (Next.js experimental)

## Backend Architecture

### Zod v4 Conventions

```typescript
import { z } from "zod";

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

### Domain Errors

```typescript
import { NotFoundError, ValidationError, ConflictError } from "@/src/core/errors/domain.error";

throw new NotFoundError("Formulaire", id);
throw new ValidationError("Ce formulaire n'est plus actif");
throw new ConflictError("Un formulaire avec ce slug existe déjà");
```

### Repository Pattern

```typescript
export const formRepository = {
  async findById(id: string): Promise<Form | null> { ... },
  async create(data: FormInsert): Promise<Form> { ... },
  async update(id: string, data: Partial<FormInsert>): Promise<Form> { ... },
  async delete(id: string): Promise<void> { ... },
};
```

### Service Pattern

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

### API Route Pattern (Controller)

```typescript
export async function POST(request: Request) {
  const authResult = await requireAdminAuth();
  if (!authResult.success) return authResult.response;

  try {
    const body = await request.json();
    const result = await formService.create(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    if (error instanceof ConflictError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
```

## Important Notes

- Components are in `/app/_components` (UI layer)
- Business logic is in `/src/features` (Clean Architecture)
- No Shadcn components yet - `/ui` contains custom components
- Database: Drizzle ORM with PostgreSQL (Neon)
- Auth: NextAuth.js with GitHub provider

## Atomic Design

### Structure des composants

```
/components
├── /atoms/          # Éléments UI basiques (barrel export → shadcn + typography)
├── /molecules/      # Combinaisons d'atoms (LinkCard, FormField)
├── /organisms/      # Sections complexes (Navbar, Footer, Sidebar)
├── /templates/      # Layouts de pages (SiteLayout, AdminLayout)
└── /effects/        # Wrappers d'animation (Reveal, Tilt, Magnetic)

/lib/animations/     # Configs Framer Motion partagées
├── spring-configs.ts    # { gentle, snappy, bouncy }
├── easing.ts           # { expoOut, easeOut, spring }
├── variants.ts         # fadeUp, scaleIn, staggerContainer
└── index.ts
```

### Pattern d'import

```typescript
import { Button, Badge, Heading1, Paragraph } from "@/components/atoms";
import { LinkCard, PortfolioButton } from "@/components/molecules";
import { Navbar, Footer, Sidebar } from "@/components/organisms";
import { SiteLayout, AdminLayout } from "@/components/templates";
import { RevealContainer, TiltCard, MagneticWrapper } from "@/components/effects";
import { springConfigs, fadeUp, staggerContainer } from "@/lib/animations";
```

### Principes

1. **Atoms**: Ne jamais modifier les composants shadcn directement. Utiliser les barrel exports.
2. **Molecules**: Combinaisons de 2-3 atoms avec une logique simple.
3. **Organisms**: Sections complètes avec état et logique métier.
4. **Templates**: Layouts Next.js réutilisables.
5. **Effects**: Wrappers Framer Motion pour animations déclaratives.

### Standards d'animation

```typescript
import { springConfigs, easing, fadeUp } from "@/lib/animations";

const gentleTransition = { type: "spring", ...springConfigs.gentle };
const snappyTransition = { type: "spring", ...springConfigs.snappy };

<motion.div
  variants={fadeUp}
  initial="hidden"
  animate="show"
  transition={{ ease: easing.expoOut }}
/>
```

**Règles:**
- Utiliser les configs partagées de `/lib/animations/`
- Toujours supporter `prefers-reduced-motion` (Framer Motion le gère)
- `springConfigs.gentle` pour animations subtiles
- `springConfigs.snappy` pour éléments interactifs
- `springConfigs.bouncy` pour feedback utilisateur

## Refactoring Status

✅ **Completed:**
- Clean Architecture: Route → Controller → Service → Repository
- Framework decoupling: Controllers don't import Next.js
- Feature-based structure: `/src/features/{auth,email,forms,leads,analytics}`
- HTTP abstraction: `src/lib/http.ts` wraps NextResponse
- Auth service receives Headers as parameter
- Routes are minimal (~5 lines)
- Atomic Design: Barrel exports pour atoms, molecules, organisms, templates, effects
- Animations partagées: `/lib/animations/` avec spring configs et variants
- Build successful
