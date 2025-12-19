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
      button.tsx
      heading1.tsx
      heading2.tsx
      paragraphe.tsx
      link-card.tsx
    /shared
      /layouts       # Navbar, Footer
      /effects       # TronGrid, ScrollIndicator
      /navigation    # TransitionLink, PageTransition
      /seo          # JsonLd
    /home            # Home page-specific components
      hero.tsx
      what-i-do.tsx
      tech-stack.tsx
      terminal.tsx
      services.tsx
  /_config          # Configuration files
    metadata.ts     # SEO metadata
    viewport.ts     # Viewport config
    fonts.ts        # Font setup
    site.ts         # Site constants
  /_lib
    cn.ts           # Utility for merging Tailwind classes
  /tree             # /tree page
  layout.tsx        # Root layout (40 lines - streamlined!)
  page.tsx          # Homepage (orchestrator pattern)
  global.css        # Global styles
  robots.ts         # Robots.txt generator
  sitemap.ts        # Sitemap generator

/public             # Static assets (images, favicon, manifest.json)
```

**Note:** All Next.js-related files (config, lib, components) are in `/app`. The `_` prefix prevents Next.js from treating them as routes.

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

### 5. Target Clean Architecture/DDD Structure

Create this structure for business logic:

```
/src
  /domain          # Entities, value objects, business types
  /application     # Use cases, application services
  /infrastructure  # API calls, external services
  /lib             # Utilities, helpers, constants
```

**Dependency rules:**
- UI components import from `application` or `domain`, NEVER from `infrastructure`
- API calls belong in `infrastructure`
- Business logic belongs in `domain`
- Use cases orchestrate in `application`

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
- Custom color scheme: Catppuccin-inspired with accent colors
  - `accent-blue`, `accent-mauve`, `accent-teal`, `accent-peach`
  - Light/dark mode support via `prefers-color-scheme`
- **Utility function**: `cn()` in `lib/cn.tsx` for merging Tailwind classes
- **Glassmorphism effects**: Used throughout (`.glass-card`, `.glow-border`)
- **TRON grid effect**: Background animation (TronGrid component)

### Fonts

- Geist Sans (primary)
- Geist Mono (monospace for code-like elements)
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

## Important Notes

- **No /components directory exists yet** - currently all components are in `/app/_components`
- **No domain/application/infrastructure structure** - to be created during refactoring
- **No Shadcn components yet** - the `/ui` folder contains custom UI components
- **Server/Client Component split** is not yet optimized - many components could be Server Components
- **Layout.tsx is too large** - metadata and config should be extracted

## Refactoring Status

✅ **Completed:**
- All comments removed - code is self-documenting
- Components organized by feature/shared pattern
- Metadata and configuration extracted to /src/config
- layout.tsx reduced from 157 to 40 lines
- All imports updated and working
- Build successful

**Note:** This is a portfolio site with no complex business logic, so Clean Architecture layers (domain/application/infrastructure) are not needed.
