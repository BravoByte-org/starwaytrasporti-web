# StarwayTrasporti.com - Product Spec

> **Milestone:** Baseline MVP  
> **Due Date:** December 6, 2025  
> **Last Updated:** December 22, 2025

---

## Project Overview

StarwayTrasporti.com is an international transportation website for an Italian freight company. The goal is to highlight their services, generate new clients, and provide information for existing clients.

**Tech Stack:** SvelteKit, TailwindCSS, Directus CMS, PostgreSQL, Vercel

---

## Feature Tree

```
📦 StarwayTrasporti.com
├── 🔷 Page Blocks (Epic #4)
│   ├── ✅ Hero Block (#11) ............... DONE (UI only; CMS pending)
│   ├── ✅ Card + CardGroup Block (#12) ... DONE (UI only; CMS pending)
│   ├── ⬜ Rich Text Block (#13) .......... PLANNED
│   ├── ⬜ Markdown Block (#14) ........... PLANNED
│   └── ✅ Stat + StatGroup Block (#15) ... DONE (UI only; CMS pending)
│
├── 🔷 CMS Backend (#2)
│   └── ⬜ Create Directus page blocks .... PLANNED
│
├── 🔷 UX/Performance
│   ├── ⬜ Loading skeletons (#9) ......... PLANNED
│   └── ⬜ Lazy loading (#10) ............. PLANNED
│
├── 🔷 DevOps/CI (#3)
│   └── ⬜ Semantic versioning ............ PLANNED
│
└── 🔷 Developer Tools
    ├── ⬜ GraphiQL client (#8) ........... PLANNED
    └── ⬜ Release-It changelog fix (#7) .. BUG
```

---

## Feature: Hero Block Component

**Issue:** [#11](https://github.com/BravoByte-org/starwaytrasporti-web/issues/11)  
**Status:** ✅ DONE (UI complete; CMS integration pending #2)  
**Assignee:** @LionOnTheWeb  
**Estimated Effort:** 3

### Description

Create a Hero component that serves as the primary landing section for visitors. Design is subject to stakeholder feedback.

### User Stories

| ID | Story | Status |
|----|-------|--------|
| H1 | As a **visitor**, I want to immediately understand what Starway Trasporti offers so that I can decide if their services meet my needs | ✅ Done |
| H2 | As a **visitor**, I want prominent CTAs so that I can quickly request a quote or learn more | ✅ Done |
| H3 | As a **visitor**, I want to see trust indicators so that I feel confident in the company's reliability | ✅ Done |
| H4 | As a **visitor on mobile**, I want the hero to be readable and fast-loading so that I can browse on any device | ✅ Done |
| H5 | As an **editor**, I want to customize the hero content from the CMS so that I can update messaging without code changes | ⬜ Blocked (#2) |

### Acceptance Criteria

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | **Headline** displays benefit-first messaging | ✅ Done | "Global goods transport, from Italy to the world." |
| 2 | **Sub-headline** reinforces value proposition | ✅ Done | "Reliable. Transparent. Delivered on time." |
| 3 | **Visual** shows full-width fleet image with map overlay | ✅ Done | Using Unsplash placeholders |
| 4 | **Primary CTA** "Get a Quote" is prominent | ✅ Done | Sky blue button |
| 5 | **Secondary CTA** "View Our Fleet" is available | ✅ Done | Ghost button style |
| 6 | **Trust stats row** displays company metrics | ✅ Done | 3 stats with icons |
| 7 | **Responsive** layout works on all breakpoints | ✅ Done | Mobile-first with lg: grid |
| 8 | **Fast load** with compressed/webp images | ✅ Done | Using `?fm=webp` params |
| 9 | **Accessibility** - proper alt text, high contrast | ✅ Done | Alt text present, WCAG contrast |
| 10 | **Build passes** - no linter/compile errors | ✅ Done | Fixed; 20 CSS linter false positives remain (expected) |
| 11 | **CMS Integration** - content editable via Directus | ⬜ Blocked (#2) | Currently hardcoded |
| 12 | **Unit tests** with appropriate coverage | ⬜ Not Started | |

### Implementation Notes

**File:** `src/lib/components/Hero.svelte`

**Completed:**
- Clean, semantic HTML structure
- All visual elements present (headline, sub-headline, CTAs, stats, media)
- Responsive design with Tailwind
- Modern dark theme with gradient overlays
- Accessibility attributes (`aria-hidden` for decorative elements)
- Lazy loading on images
- WebP format for optimized loading
- Tailwind v4 `@reference` directive
- Svelte 5 compatibility

**Pending (blocked by #2):**
- Props interface for CMS data injection
- Fallback/default content handling
- Unit test coverage

---

## Feature: Card + CardGroup Block Components

**Issue:** [#12](https://github.com/BravoByte-org/starwaytrasporti-web/issues/12)  
**Status:** ✅ DONE (UI complete; CMS integration pending #2)  
**Assignee:** @LionOnTheWeb  
**Estimated Effort:** 3

### Description

Provide reusable `Card` and `CardGroup` components to showcase transportation/logistics services. Cards must be generic/reusable (not hard-wired to services), with props flexible enough to swap in CMS data later. Hero layout remains unchanged; services render in a separate section using these cards.

### User Stories

| ID | Story | Status |
|----|-------|--------|
| C1 | As a **visitor**, I want to view services in a clear card grid so I can scan offerings quickly | ✅ Done |
| C2 | As a **mobile visitor**, I want cards to scroll horizontally and stay readable on small screens | ✅ Done |
| C3 | As an **editor**, I want to feed card data from CMS without code changes | ⬜ Blocked (#2) |
| C4 | As a **designer**, I want cards to follow brand and match Hero styling without altering Hero UI | ✅ Done |

### Acceptance Criteria

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | Card exposes props for icon, title, summary, meta, CTA label+href | ✅ Done | `Card.svelte` with typed props |
| 2 | CardGroup renders responsive grid (mobile carousel 1.5 cards + fade, tablet 2-col, desktop 3-col) | ✅ Done | CSS transitions, scroll-snap on mobile |
| 3 | Accessibility: semantic headings, focus/hover states, keyboardable CTAs | ✅ Done | `role="presentation"` on wrappers, link CTAs |
| 4 | Visual consistency with Hero (radius, shadow, typography, color tokens) without changing Hero UI | ✅ Done | Brand colors; Hero unchanged |
| 5 | Mock data fixtures provided and swappable with CMS payload | ✅ Done | `src/lib/mocks/services.ts`, `hero.ts` |
| 6 | Unit tests cover render variants (with/without icon/cta) and basic accessibility | ⬜ Not Started | Future: add Vitest snapshots |

### Implementation Notes

**Files:**
- `src/lib/components/cards/Card.svelte` - Reusable card with typed props
- `src/lib/components/cards/CardGroup.svelte` - Responsive grid with animations
- `src/lib/layouts/ServicesSection.svelte` - Page section wrapper
- `src/lib/mocks/services.ts` - Mock service data
- `src/lib/mocks/hero.ts` - Mock hero data

**Responsive Behavior:**
- Mobile (<768px): Horizontal scroll carousel showing 1.5 cards with right-edge fade
- Tablet (768px-1023px): 2-column grid (even rows)
- Desktop (≥1024px): 3-column max grid

---

## Feature: Stat + StatGroup Block Components

**Issue:** [#15](https://github.com/BravoByte-org/starwaytrasporti-web/issues/15)  
**Status:** ✅ DONE (UI complete; CMS integration pending #2)  
**Assignee:** @LionOnTheWeb  
**Estimated Effort:** 3  
**Branch:** `15-feat-stat-statgroup-block-components`

### Description

Create reusable `Stat` and `StatGroup` components to display key metrics in a card-like layout across all breakpoints. Components are accessible, visually aligned with existing blocks, and ready to swap in CMS-driven data once Directus integration is available. Layout inspired by Bartolini "Our Impact & Achievements" section: icon/eyebrow at top, animated stat value in center, helper text at bottom.

### User Stories

| ID | Story | Status |
|----|-------|--------|
| S1 | As a **visitor**, I want to see stats in clear cards on all breakpoints so I can quickly understand company performance | ✅ Done |
| S2 | As a **visitor**, I want stats grouped logically so I can scan multiple metrics without hunting across the page | ✅ Done |
| S3 | As an **editor**, I want stats to accept CMS or mock data without code changes so content stays fresh | ✅ Done (mocks ready; CMS blocked by #2) |

### Acceptance Criteria

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | `Stat` component accepts icon, optional header/eyebrow, value, label, helper/description, optional delta/trend, prefix/suffix | ✅ Done | Typed props with defaults and aria labels |
| 2 | Three-row layout: top icon/header, middle animated value (on enter viewport), bottom helper text | ✅ Done | Count-up animation with easeOutCubic |
| 3 | `StatGroup` arranges stats responsively (carousel mobile, 2-col tablet, 4-col desktop) | ✅ Done | Matches CardGroup responsive pattern |
| 4 | Visual style matches Hero/Card blocks (radius, typography, color tokens) | ✅ Done | Gradient background, consistent spacing |
| 5 | Accessibility: semantic headings, readable contrast, focus-visible states, aria for helper/tooltips | ✅ Done | aria-label on values, decorative icons hidden |
| 6 | Respects `prefers-reduced-motion` and graceful no-IntersectionObserver fallback | ✅ Done | Immediate final value when motion reduced or IO unavailable |
| 7 | Works with mock data fixtures mirroring planned CMS schema | ✅ Done | `src/lib/mocks/stats.ts` |
| 8 | Unit tests cover render variants (with/without icon/delta) and accessibility | ✅ Done | Vitest tests in `Stat.test.ts` |
| 9 | Example usage wired into `(app)` page using mocks | ✅ Done | Homepage shows Hero → Services → Stats |

### Implementation Notes

**Files:**
- `src/lib/components/stats/Stat.svelte` - Individual stat card with animated value
- `src/lib/components/stats/StatGroup.svelte` - Responsive grid/carousel wrapper
- `src/lib/components/stats/Stat.test.ts` - Unit tests
- `src/lib/mocks/stats.ts` - Mock stat data with typed exports
- `src/lib/index.ts` - Barrel exports for Stat, StatGroup, stats mock

**Data Shape (`StatData` type):**
```ts
type StatData = {
  id: string;
  icon?: string;
  iconLabel?: string;
  header?: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  delta?: { value: string; trend?: 'up' | 'down' | 'neutral'; ariaLabel?: string };
  ariaLabel?: string;
};
```

**Responsive Behavior:**
- Mobile (<768px): Horizontal scroll carousel showing ~1.5 cards with snap + fade edge
- Tablet (768px-1023px): 2-column grid
- Desktop (≥1024px): Flex-wrap 4-column layout, centered, max-width per card

**Animation:**
- Count-up animation (1200ms, easeOutCubic) triggered on viewport entry via IntersectionObserver
- Skips animation if `prefers-reduced-motion: reduce` is set
- Falls back to immediate final value if IntersectionObserver unavailable (SSR-safe)

**Pending (blocked by #2):**
- Props interface for CMS data injection
- Fallback/default content handling when CMS fails

---

## Mock Data Policy (Epic #5 Frontend Blocks)

- All blocks (Hero, Card/CardGroup, Rich Text, Markdown, Stats) must ship with mock fixtures to unblock UI while CMS is pending.
- Fixtures should mirror the planned Directus schema; swapping to live data should be a single adapter change.
- Pages should gracefully fall back to mocks if CMS fetch fails or returns empty.
- Store mocks under `src/lib/mocks/*` and document expected shapes next to components.

---

## Dependencies

```
#11 Hero Block ──depends on──► #2 Directus Page Blocks
#12 Card/CardGroup ──depends on──► #2 Directus Page Blocks
#15 Stat/StatGroup ──depends on──► #2 Directus Page Blocks
#5 Frontend Blocks ──depends on──► #2 Directus Page Blocks
```

---

## Questions for Stakeholders

1. **Images:** Should we proceed with placeholder images, or do we have actual fleet photos available?
2. **Stats:** Are the trust stats accurate? (25 years, 5000+ shipments, 100% tracking)
3. **CTAs:** Where should "Get a Quote" and "View Our Fleet" link to?
4. **Design approval:** Is the current dark theme + sky blue accent aligned with brand guidelines?

---

## Reference

- **Design inspiration:** [bartoliniexpress.com](https://www.bartoliniexpress.com) (services cards, stats section), [trasportiromagna.com](https://trasportiromagna.com)
- **CMS Docs:** [Directus Dynamic Blocks with SvelteKit](https://directus.io/docs/tutorials/getting-started/rendering-dynamic-blocks-using-sveltekit)

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🟡 | In Progress |
| ⬜ | Not Started / Planned |
| 🔴 | Blocked |
| ❌ | Cancelled |
