# R² Website Clean - Deployment Information

## Overview
This is a lean, clean version of the R² Solutions website with only essential files needed for production.

## What Was Included
- **App directory**: All pages (homepage, FAQ, inquiry, solutions, what-we-do, who-we-are)
- **Core components**: Only components directly imported by the app pages
  - particles.tsx
  - neumorphic-button.tsx
  - icon-cloud.tsx
  - bento-grid.tsx
  - diagonal-carousel.tsx
  - founder-flip-card.tsx
  - hover-accordion.tsx
  - LiquidGlassHeader.tsx
  - Container.tsx, Button.tsx
  - PageMetadata.tsx, BreadcrumbSchema.tsx, ContactPageSchema.tsx
  - progress-bar.tsx (dependency of diagonal-carousel)
- **Assets**: Only images, icons, and fonts referenced in the code
- **Config files**: package.json, next.config.ts, wrangler.toml, etc.
- **Documentation**: CLAUDE.md, .claude/ directory

## What Was Excluded
- Unused animation components (scroll-reactive-*, hero-image-transition, etc.)
- Duplicate or unused images
- Unused UI components (60+ components not imported anywhere)

## Build Stats
- **Total size**: 821MB (including node_modules)
- **Build time**: ~2-3 seconds
- **Output**: 170 files in `/out` directory
- **68 new files uploaded** to Cloudflare (102 cached from previous deployment)

## Repository
- **GitHub**: https://github.com/R-Squared-AI/r2-website-clean
- **Branch**: main
- **Commit**: Initial commit with clean build

## Deployment
- **Platform**: Cloudflare Pages
- **Project**: r2-solutions (reused existing project)
- **Live URL**: https://07486083.r2-solutions.pages.dev
- **Deployment time**: ~3 seconds

## Build & Deploy Commands

```bash
# Install dependencies
npm install

# Build static export
npm run build

# Deploy to Cloudflare
npx wrangler pages deploy out --commit-dirty=true
```

## File Structure

```
r2-website-clean/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   ├── faq/
│   ├── inquiry/
│   ├── solutions/
│   ├── what-we-do/
│   └── who-we-are/
├── components/
│   ├── ui/                # Essential UI components only
│   └── layout/            # Layout components
├── lib/                   # Utility functions
├── hooks/                 # React hooks
├── public/                # Static assets (optimized)
│   ├── images/
│   ├── icons/
│   └── fonts/
└── out/                   # Build output (static export)
```

## Key Differences from Original

1. **No unused components**: Removed 50+ unused animation/UI components
2. **Optimized assets**: Only images/icons actually referenced in code
3. **Faster builds**: Reduced compilation time by removing unused dependencies
4. **Same functionality**: All pages and features work identically
5. **Clean git history**: Single commit with all essentials

## TypeScript Fixes Applied
- Fixed `window.gtag` type error in `/app/inquiry/page.tsx` by using `(window as any).gtag`

## Maintenance
To add new components or assets:
1. Add the file to the appropriate directory
2. Import it where needed
3. Build and deploy as usual

The build will fail if you reference a file that doesn't exist, making it easy to catch missing dependencies.

---

**Created**: 2026-02-12
**Build Status**: ✅ Successful
**Deployment Status**: ✅ Live
**Performance**: Same as original (no code changes, just cleanup)
