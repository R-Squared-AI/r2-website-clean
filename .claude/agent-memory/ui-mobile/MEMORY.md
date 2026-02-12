# UI Mobile Agent Memory

## Project: R² Solutions Website

### Mobile Optimization Patterns

**Horizontal Scroll Cards** (`/app/page.tsx` line 766-814)
- Pattern: 80vw card width + 16px gap with scroll-snap
- Progress tracking: Calculate index from `containerWidth * 0.8 + 16` (not `scrollWidth / count`)
- Safe areas: Use `max(8vw, env(safe-area-inset-left))` for landscape notch
- Images: First card `loading="eager"`, rest `loading="lazy"`

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

### Common Mobile Issues Fixed
1. **Wrong scroll progress calculation** - Must account for card width + gap, not just scrollWidth
2. **Missing initial handleScroll call** - Progress bar starts at 0 until first scroll event
3. **No safe area padding** - Content hidden by notch in landscape mode
4. **All images eager loading** - Wastes bandwidth; only first card should be eager

### Testing Checklist for Mobile Features
- [ ] iPhone SE (375px) - smallest viewport
- [ ] iPhone 14/15/16 standard (390px)
- [ ] iPhone Pro Max (430px) - largest standard phone
- [ ] Landscape mode - safe areas don't hide content
- [ ] Android Chrome - scroll snap behavior
- [ ] Touch interactions - swipe/momentum feel smooth
