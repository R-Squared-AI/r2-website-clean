# R2 Solutions - Debugging Memory

## Project Structure
- `/app/page.tsx` - Main homepage, ~1155 lines, contains all major section components inline
- `/app/globals.css` - Global CSS with sticky positioning fix (overflow: visible !important on all elements)
- `/components/ui/progress-bar.tsx` - Simple dot-style progress bar for mobile carousels
- `/components/ui/scroll-linked-background.tsx` - Fixed background that transitions color on scroll
- `/Docs/LESSONS.md` - Comprehensive bug/fix documentation (ALWAYS check first)
- `/Docs/PLAN.md` - Active task tracking

## CSS Architecture Gotchas
- **Global overflow rule** at globals.css:93-95: `html, html *, body, body * { overflow: visible !important }` - required for sticky positioning
- **Exception list** at globals.css:98-106: `.overflow-hidden`, `.carousel-container`, `.mobile-horizontal-scroll`, `[style*="overflow: hidden"]`, `header`, `footer` get `overflow: hidden !important`
- `.mobile-horizontal-scroll` then overrides to `overflow-x: auto !important` at line 109-113
- Specificity: class selector (0,0,1,0) beats `body *` (0,0,0,1) even with !important on both
- The `[style*="overflow: hidden"]` attribute selector catches React inline styles

## Mobile Scroll Patterns
- Horizontal scroll cards use: `flex: '0 0 80vw'`, `scrollSnapType: 'x mandatory'`, `scrollSnapAlign: 'center'`
- Card width calculation for scroll tracking: `container.offsetWidth * 0.8 + 16` (80vw + gap)
- `MOBILE_CARD_COUNT` constant extracted above WhatWeDoAnimated to avoid hardcoded magic numbers
- `WebkitOverflowScrolling: 'touch'` for iOS momentum scrolling

## Hydration Pattern (established)
- All responsive components use `useState(false)` for isMobile, set in useEffect
- Server renders desktop branch, client may switch to mobile after hydration
- Brief flash on mobile is accepted tradeoff vs hydration error #300
- LESSONS.md documents CSS media query pattern as preferred alternative

## ESLint Status (as of 2026-02-11)
- Pre-existing errors: `react-hooks/set-state-in-effect` for setMounted/setIsHovered in effects
- Pre-existing: unescaped entities in text content
- Pre-existing warnings: `@next/next/no-img-element` throughout
- None of these are caused by recent mobile changes

## Section Background Colors (load-bearing)
- **ParallelogramImageStack** (`/components/ui/parallelogram-image-stack.tsx`): Section wrapper MUST have `background: '#0a0a0f'` on both mobile and desktop branches. Without it, the body's white background bleeds through between the hero and the sticky city image.
- **ScrollLinkedBackground is NOT used** on the homepage (commented out at page.tsx:395). Each section manages its own background. Do not adjust `defaultColorStops` to fix homepage color issues.
- **html/body background** is `#ffffff` (globals.css lines 45, 62). Any section without an explicit background will show white.

## WhatWeDoAnimated Desktop/Mobile Logic
- `isMobile` defaults to `false` (server renders desktop grid)
- Desktop shows 3-column CSS grid with AccordionColumn (left), BentoCard (middle), AccordionColumn (right)
- Mobile shows horizontal scrolling cards with ProgressBar
- Conditional is at `{isMobile ? (mobile) : (desktop)}` -- this is the established hydration-safe pattern

## Framer Motion Transform Collision (recurring pattern)
- Framer Motion `animate={{ y: 0 }}` generates a `transform` style that OVERWRITES any CSS `transform` on the same element
- This breaks `left: 50%; transform: translateX(-50%)` centering -- the translateX gets replaced by Framer's translateY
- **Fix pattern:** Wrap `motion.div` in a static `<div>` that uses flexbox centering (`display: flex; justifyContent: center; left: 0; right: 0`) instead of transform-based centering
- Add `pointerEvents: 'none'` on outer div, `pointerEvents: 'auto'` on inner motion.div
- Applied to: ExpandableEmailSignup mobile portal (page.tsx ~line 240), and previously to arrow indicators

## DiagonalCarousel Overflow Fix (2026-02-12)
- The global `overflow: visible !important` rule on `body *` was overriding inline `overflow: hidden` on the card container and image panel
- The `[style*="overflow: hidden"]` attribute selector in the exception list has sufficient specificity, but GPU-composited Framer Motion children (with `willChange: 'transform'` and scale animations) can escape the parent's overflow clip
- **Fix:** Add `className="carousel-container"` to both the outer card div and the image panel div, plus `isolation: 'isolate'` on the outer card to force a proper stacking context
- **Pattern:** Any component that needs `overflow: hidden` to clip content MUST use the `carousel-container` class (or another exception class from globals.css) -- do NOT rely solely on inline styles

## ExpandableEmailSignup Layout Shift (2026-02-13)
- **Root cause:** Container used `minWidth: isExpanded ? '550px' : undefined` and `minHeight: isExpanded ? '280px' : undefined`, causing the container to grow from button size (~200×50px) to form size (550×280px) when clicked
- **Layout impact:** Container is `position: relative` in normal document flow, so size change forced surrounding flex items (the "Get In Touch" button and hero text) to reflow, creating the "shove up" glitch
- **Fix:** Remove all `minWidth`/`minHeight` from container. Let button remain in normal flow to preserve space. Form overlays via `position: absolute` without affecting layout.
- **Key principle:** For expand-in-place transitions, the container must maintain its initial size. Expanded content should overlay absolutely positioned outside the container's layout box to prevent ANY layout shift.
- **Pattern:** Button stays in flow (opacity: 0 when expanded), form/skeleton use `position: absolute; top: 0; left: 0` to overlay exactly on button position

## ExpandableEmailSignup iframe Loading Glitch (2026-02-13)
- **Root causes identified:** Five distinct issues causing "gray box, glitchy" appearance
  1. **Gray box:** Beehiiv iframe document has white/gray background that shows before form content renders (setting `backgroundColor: 'transparent'` on iframe element doesn't affect the loaded document)
  2. **Skeleton → iframe gap:** Skeleton instantly unmounts when `iframeLoaded = true`, but iframe takes 0.4s to fade in, creating a visible flash
  3. **iframe onLoad too early:** Fires when HTML loads, but Beehiiv's heavy JavaScript (Stimulus, Flatpickr, PerimeterX, GTM) renders form content 100-500ms later
  4. **No preloading:** iframe created only on click, so entire network round-trip (DNS, TCP, fetch) happens while user watches
  5. **Scale transform:** `scale(0.98)` → `scale(1)` creates "pop-in" effect that draws attention to the transition
- **Comprehensive fix applied:**
  1. Preload iframe off-screen on page load (position: absolute, left: -9999px) — eliminates network delay
  2. Add 350ms delay after onLoad before showing iframe — lets Beehiiv JS finish rendering
  3. Smooth crossfade: skeleton fades out with 0.4s transition, iframe starts fading in 150ms before skeleton finishes — no gap
  4. Changed skeleton from shimmer to white background with subtle loading bars — matches Beehiiv form background
  5. Removed scale transform — only opacity fade for seamless appearance
- **Key pattern:** For third-party iframe embeds with JavaScript content, `onLoad` is NOT sufficient. Add 300-500ms delay + crossfade skeleton for smooth UX.

## See Also
- `/Docs/LESSONS.md` - 17 documented lessons with code examples
- `CLAUDE.md` at project root - authoritative project rules
