# R² Website - Web Code Executor Memory

## Recent Major Changes (2026-02-12)

### Scroll System Overhaul - Removed ALL Scroll-Locking
Stripped all scroll-locking, sticky animations, parallax effects, and scroll-linked color changes from the entire website. The site now scrolls like a normal webpage - just sections stacked vertically.

**What Was Removed:**
- `HeroImageTransition` component - complex parallax system
- `ScrollLinkedBackground` component - scroll-reactive backgrounds
- `ScrollAnimationProvider` context
- `ParallelogramImageStack` - sticky scroll + parallax
- All scroll-reactive components (scroll-reactive-founders, scroll-fade-image, etc.)
- Framer Motion `AnimatePresence` wrappers from buttons/forms
- Replaced all `motion.*` elements with standard HTML + CSS transitions

**What Was Kept:**
- All content, images, tiles, and cards
- Basic hover effects on cards (accordion expand in "What We Do")
- Simple carousel with prev/next buttons ("Why R²")
- Hover accordion ("How We Deliver")
- Founder flip cards (simple hover flip, no scroll-linking)
- Typeform and Beehiiv integrations

**How Sections Now Work:**
1. **Hero** - Simple full-height section with dark background + particles + content
2. **City Skyline** - Static image section with overlay text (no parallax)
3. **How We Think** - 3 cards in a row (desktop) or stacked (mobile), white background
4. **What We Do** - Bento grid with accordion columns (kept as-is)
5. **Who We Serve** - Simple grid of industry cards
6. **Why R²** - Simple carousel with buttons
7. **How We Deliver** - Hover accordion (kept as-is)
8. **Founders** - Simple flex layout with 3 flip cards
9. **CTA** - Standard section
10. **Footer** - Standard footer with icon cloud

## Deployment Info
- **Command:** `npx wrangler pages deploy out --project-name r2-solutions --commit-dirty=true`
- **Latest URL:** https://0e166052.r2-solutions.pages.dev
- **Deploy:** `out` directory, NOT `.next`

## CSS Architecture
- Uses CSS `position: sticky` sparingly (only for header)
- No `overflow:hidden` on parent containers (breaks sticky)
- Mobile: CSS media queries, NOT JS conditional rendering
- Pattern: Render both versions, CSS controls visibility with `display: none`

## Key Files
- `/app/page.tsx` - Main homepage (all sections in one file)
- `/app/globals.css` - Global styles, sticky positioning rules
- `/components/ui/LiquidGlassHeader.tsx` - Navigation
- `/components/ui/diagonal-carousel.tsx` - Why R² carousel
- `/components/ui/hover-accordion.tsx` - How We Deliver
- `/components/ui/founder-flip-card.tsx` - Founder cards

## Critical Rules
1. `height: 100%` only works if parent has explicit `height`
2. Use CSS media queries for responsive, NOT JS conditional rendering
3. Keep hover effects simple - CSS transitions only
4. No scroll-locking or sticky scroll containers
5. Sections stack vertically, scroll naturally
