# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

R² Solutions website - a Next.js 16 marketing site for an AI sales operations company. Deployed to Cloudflare Pages as a static export.

## Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Build & Deploy
npm run build            # Build static export to /out directory
npx wrangler pages deploy out --project-name r2-solutions --commit-dirty=true  # Deploy to Cloudflare

# Linting
npm run lint
```

**Critical:** Always deploy the `out` directory, NOT `.next`. The build uses `output: 'export'` for static generation.

## Architecture

### Tech Stack
- **Next.js 16** with App Router, static export (`output: 'export'`)
- **Tailwind CSS 4** + inline styles
- **Framer Motion** for animations
- **Cloudflare Pages** for hosting

### Key Files
- `/app/page.tsx` - Main homepage with all major sections
- `/app/layout.tsx` - Root layout with fonts, meta tags, Beehiiv scripts
- `/components/ui/` - All UI components (60+ files)
- `/components/ui/LiquidGlassHeader.tsx` - Navigation header
- `/Docs/LESSONS.md` - **Critical:** Known issues and their solutions
- `/Docs/PLAN.md` - Active task tracking

### Section Architecture (Homepage)
The homepage (`/app/page.tsx`) is built as stacked sections with CSS sticky positioning for scroll effects. Key sections flow top-to-bottom:
1. Hero with particles
2. "How We Think" (parallax image stack with city background)
3. "What We Do" (bento grid)
4. "Who We Serve" (industries carousel)
5. "Why R²" (diagonal carousel)
6. "How We Deliver" (hover accordion)
7. Founders (flip cards)
8. CTA + Footer

## Critical Rules

### Mobile/Responsive
- **NEVER use JS conditional rendering for responsive layouts** - causes React hydration error #300
- Use CSS media queries or render both versions with CSS visibility control:
```jsx
// Pattern: render both, CSS controls visibility
const [mounted, setMounted] = useState(false);
const [isMobile, setIsMobile] = useState(false);
useEffect(() => { setMounted(true); /* detect mobile */ }, []);
const useDesktopLayout = mounted && !isMobile;
// Render both versions in DOM, use CSS to show/hide
```

### CSS Height
- `height: 100%` requires parent to have explicit `height` (not just `minHeight`)
- For flip cards and absolute-positioned children, always use explicit heights

### Scroll Animations
- Use CSS `position: sticky` instead of JavaScript scroll listeners for smooth 60fps
- Framer Motion's `useScroll`/`useTransform` can cause scroll performance issues
- `whileInView` doesn't work reliably inside sticky or overflow:hidden containers

### Framer Motion + Fixed Positioning
- `position: fixed` breaks inside Framer Motion animated parents (transform creates new containing block)
- Solution: Use React Portal to `document.body`

## Pre-Deployment Checklist

**REQUIRED before every deployment:**

1. **Run ESLint** to check for errors:
   ```bash
   npx eslint app/ components/ --ext .ts,.tsx
   ```

2. **Fix critical errors** before deploying:
   - Unused imports/variables (warnings - can deploy but should clean up)
   - Unescaped entities (`'` → `&apos;`) - fix these
   - React hooks violations - fix these

3. **Build and deploy**:
   ```bash
   npm run build && npx wrangler pages deploy out --project-name r2-solutions --commit-dirty=true
   ```

4. **Verify deployment** - always open the preview URL and check the changes visually

## Deployment

```bash
# Full deployment command (run after linting)
npm run build && npx wrangler pages deploy out --project-name r2-solutions --commit-dirty=true
```

Each deployment generates a unique preview URL (e.g., `https://abc123.r2-solutions.pages.dev`).

## External Integrations

- **Beehiiv newsletter:** Form ID `f50f3b9c-7e15-47ab-bcad-7e9159ca428b`, height 177px
- **Typeform contact:** `https://form.typeform.com/to/XPforiEB`

## Documentation

- `/Docs/LESSONS.md` - Detailed documentation of bugs and fixes (consult before debugging)
- `/Docs/PLAN.md` - Current task list and recent completions
