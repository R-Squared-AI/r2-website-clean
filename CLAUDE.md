# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

R² Solutions marketing website — a Next.js 16 static site for an AI sales operations company. This is the **clean production version** (lean subset of the full `r2-solutions` repo). Deployed to Cloudflare Pages.

## Commands

```bash
npm run dev                # Dev server at localhost:3000
npm run build              # Static export to /out (NOT .next)
npm run lint               # ESLint
npm run deploy             # Build + deploy to Cloudflare Pages
```

Deploy manually: `npx wrangler pages deploy out --project-name r2-solutions --commit-dirty=true`

Before deploying, lint first: `npx eslint app/ components/ --ext .ts,.tsx` — fix unescaped entities (`'` → `&apos;`) and hooks violations.

Each deployment generates a preview URL (`https://<hash>.r2-solutions.pages.dev`).

## Architecture

**Stack:** Next.js 16 (App Router, `output: 'export'`), React 19, TypeScript (strict), Tailwind CSS 4, Framer Motion 11, Cloudflare Pages.

**Path alias:** `@/*` → `./` (tsconfig paths)

### Homepage (`/app/page.tsx`)

The entire homepage is a single `'use client'` component with inline section functions. Sections are stacked vertically — some use CSS `position: sticky` for scroll effects. Sections use `data-header-theme="light"|"dark"` to signal the LiquidGlassHeader to switch text color.

Sections in order:
1. **Hero** — dark bg (#0A0A0F), Particles component, two CTA buttons
2. **How We Think** — city skyline bg image, 3 stacked pull-up cards with sticky positioning
3. **What We Do** — BentoGrid with 6 service cards
4. **Who We Serve** — industry carousel (3 industries: PE, Insurance, Manufacturing)
5. **Why R²** — DiagonalCarousel with 45° rotateY + ProgressBar
6. **How We Deliver** — HoverAccordion (desktop: hover, mobile: tap)
7. **Founders** — 3 FounderFlipCard components (hover/tap to flip)
8. **CTA + Footer** — Beehiiv newsletter embed + IconCloud (Three.js 3D sphere)

### Key Components

- **LiquidGlassHeader** (92KB) — navigation with glass morphism via SVG displacement maps and Snell's law refraction physics. Don't modify the math unless you understand optical physics.
- **ConditionalHeader** — thin wrapper that renders LiquidGlassHeader; imported in root layout.
- **lib/liquid-glass.ts** + **lib/background-sampler.ts** — canvas-based math for the glass effect.
- **hooks/useGPUScroll.ts** — GPU-accelerated scroll detection hook.
- **lib/utils.ts** — `cn()` function (clsx + tailwind-merge).

### Integrations

- **Beehiiv newsletter:** Form ID `f50f3b9c-7e15-47ab-bcad-7e9159ca428b` (177px height). Desktop version has `data-test-id="beehiiv-embed"`; portaled mobile version must NOT have this attribute or embed.js breaks.
- **Typeform contact:** `https://form.typeform.com/to/XPforiEB`

### Layout (`/app/layout.tsx`)

Root layout exports `viewport` config with `viewportFit: 'cover'` for iOS notch/Dynamic Island support and `themeColor: '#0A0A0A'`. Custom fonts loaded: R2Font, R2FontBold, Roboto Mono, Inter. Lenis smooth scroll is intentionally disabled (breaks `position: sticky`).

## Critical Rules

### 1. No JS Mobile Detection in Render
Causes React hydration error #300. Render both versions in DOM, use CSS media queries (breakpoint: 768px):
```tsx
<style dangerouslySetInnerHTML={{__html: `
  .mobile-only { display: none; }
  .desktop-only { display: block; }
  @media (max-width: 768px) {
    .mobile-only { display: block; }
    .desktop-only { display: none; }
  }
`}} />
```

### 2. CSS Height
`height: 100%` only works if parent has explicit `height` (not `minHeight`). For flip cards and absolute-positioned children, use explicit heights.

### 3. Framer Motion + Fixed/Sticky
- `position: fixed` breaks inside animated parents (transform creates new containing block) — use React Portal to `document.body`.
- Never apply `transform`, `filter`, `contain`, or `perspective` to ancestors of sticky elements.
- `whileInView` is unreliable inside sticky or `overflow: hidden` containers.

### 4. Touch Interactions
All interactive cards must include `touchAction: 'pan-y'` to allow vertical page scrolling. Use native touch handlers (onTouchStart/End/Cancel) instead of Framer Motion `whileHover` on mobile — the latter causes stuck hover states on touch devices.
