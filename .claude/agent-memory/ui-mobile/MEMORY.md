# UI Mobile Agent Memory

## Project: R² Solutions Website

### Mobile Optimization Patterns

**CSS-Only Responsive Layout** (CRITICAL PATTERN)
- NEVER use JS `useState` + conditional rendering for mobile/desktop differences
- ALWAYS use CSS media queries at 768px breakpoint
- Pattern: Render both versions in DOM, use CSS classes to toggle visibility/layout
- Example: `HeroContentSection` uses `.hero-content-container` with media queries for flexDirection, textAlign, gap

**Touch Event Handler Pattern** (CRITICAL FOR MOBILE)
```tsx
onTouchStart={() => setHovered(true)}
onTouchEnd={(e) => {
  // Don't prevent default - allow native scroll
  setTimeout(() => setHovered(false), 2000);
}}
onTouchCancel={() => setHovered(null)}
style={{
  touchAction: 'pan-y',  // REQUIRED: allows vertical page scroll
  WebkitTapHighlightColor: 'transparent',  // REQUIRED: prevents iOS blue flash
}}
```

**Combined Skyline + How We Think Section** (`/app/page.tsx` line 132-411)
- Desktop: Skyline image sticky, cards 50% width with zigzag (180px spacing), heading sticky
- Mobile fixes (Feb 2026):
  - Cards: `width: 100% !important; max-width: 100% !important; margin-bottom: 48px !important`
  - Section: `height: auto !important` (not 500vh)
  - Sticky elements: `position: static !important` on mobile
  - Safe area insets: `padding-left: max(24px, env(safe-area-inset-left))`
  - Text shadows for readability: `0 2px 20px rgba(0,0,0,0.8)`

**Hero Buttons Contrast** (`/app/page.tsx` line 837-892)
- White bg with R² blue text (#032CC8) = 7.24:1 contrast (WCAG AAA)
- Border: `2px solid rgba(0, 0, 0, 0.1)` for mobile visibility
- Neumorphic shadow with touchAction: 'manipulation' to prevent double-tap zoom

**CSS Overflow Exception** (`/app/globals.css` line 108-123)
- `.mobile-horizontal-scroll` class overrides global `overflow: visible !important`
- Must include `-webkit-overflow-scrolling: touch` for iOS momentum
- `scroll-snap-type: x mandatory` for snap behavior

**Progress Bar Component** (`/components/ui/progress-bar.tsx`)
- GPU compositing fix: `transform: translateZ(0)` + `backfaceVisibility: hidden`
- Prevents flicker on iOS Safari during transitions

### Key Mobile Breakpoints
- Mobile: `<= 768px` (used throughout codebase)
- iPhone SE: 375px (smallest common iOS device)
- iPhone 14/15/16: 390px
- iPhone Pro Max: 430px

### iOS Safari Specific
- Scroll snap works in Safari 15+
- Must use `dvh` or `svh` instead of `vh` for full-height (100vh bug)
- `-webkit-` prefixes needed: `backdrop-filter`, `text-size-adjust`, `overflow-scrolling`
- Safe area insets: `env(safe-area-inset-*)` for notched devices
- `touchAction: 'manipulation'` on buttons prevents double-tap zoom
- `WebkitTapHighlightColor: 'transparent'` removes blue tap flash

### Common Mobile Issues Fixed
1. **Wrong scroll progress calculation** - Must account for card width + gap, not just scrollWidth
2. **Missing initial handleScroll call** - Progress bar starts at 0 until first scroll event
3. **No safe area padding** - Content hidden by notch in landscape mode
4. **All images eager loading** - Wastes bandwidth; only first card should be eager
5. **JS mobile detection in render** (`HeroContentSection`) - Caused hydration error. Fixed by using CSS media queries
6. **Touch preventDefault blocking scroll** (`CombinedSkylineHowWeThinkSection`) - Removed from `onTouchEnd`
7. **Mobile skyline height too tall** - Changed to `min(60vh, 500px)`
8. **Cards too narrow on mobile** (Feb 2026) - Added `max-width: 100% !important` override
9. **Card spacing too large on mobile** (Feb 2026) - Reduced from 180px to 48px
10. **Hero button border too subtle** (Feb 2026) - Changed from 1px to 2px solid

### Interactive Components Touch Handling
- **FounderFlipCard**: onClick toggles flip on mobile
- **HoverAccordion**: onClick expands on mobile, hover on desktop
- **DiagonalCarousel**: Swipe gestures with `drag="x"` and `touchAction: 'pan-y'`
- **BentoCard**: Tap to expand with 2-second timeout
- **How We Think cards**: onTouchStart toggles, no preventDefault

### Testing Checklist
- [ ] iPhone SE (375px), iPhone 14/15/16 (390px), iPhone Pro Max (430px)
- [ ] Landscape mode safe areas, Android Chrome scroll-snap
- [ ] All cards have touchAction: 'pan-y' and no blue tap flash
- [ ] Text readable on images (text-shadow), smooth touch interactions

### Build & Deploy
- Build: `npm run build` (exports to `/out`)
- Deploy: `npx wrangler pages deploy out --project-name r2-solutions --commit-dirty=true`

**Last Updated:** Feb 13, 2026 - Comprehensive mobile audit completed
