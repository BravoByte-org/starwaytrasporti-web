# StarwayTrasporti.com - Product Spec

> **Milestone:** Baseline MVP  
> **Due Date:** December 6, 2025  
> **Last Updated:** December 5, 2025

---

## Project Overview

StarwayTrasporti.com is an international transportation website for an Italian freight company. The goal is to highlight their services, generate new clients, and provide information for existing clients.

**Tech Stack:** SvelteKit, TailwindCSS, Directus CMS, PostgreSQL, Vercel

---

## Feature Tree

```
📦 StarwayTrasporti.com
├── 🔷 Page Blocks (Epic #4)
│   ├── ✅ Hero Block (#11) ............... IN PROGRESS
│   ├── ⬜ Card + CardGroup Block (#12) ... PLANNED
│   ├── ⬜ Rich Text Block (#13) .......... PLANNED
│   ├── ⬜ Markdown Block (#14) ........... PLANNED
│   └── ⬜ Stat + StatGroup Block (#15) ... PLANNED
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
**Status:** 🟡 IN PROGRESS  
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
| H5 | As an **editor**, I want to customize the hero content from the CMS so that I can update messaging without code changes | ⬜ Not Started |

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
| 11 | **CMS Integration** - content editable via Directus | ⬜ Not Started | Currently hardcoded |
| 12 | **Unit tests** with appropriate coverage | ⬜ Not Started | |

### ✅ Build Errors Fixed (Dec 5, 2025)

**Resolved:**
- ✅ `@import "@tailwindcss"` → `@reference "../../app.css"` (Tailwind v4 syntax)
- ✅ Redundant `focus-visible:outline` classes removed
- ✅ `bg-gradient-to-r` → `bg-linear-to-r` (TW4 naming)
- ✅ `bg-gradient-to-t` → `bg-linear-to-t` (TW4 naming)
- ✅ `lg:h-[28rem]` → `lg:h-112` (standard utility)
- ✅ Self-closing HTML tags → proper open/close tags (Svelte 5)

**Note:** 20 CSS linter warnings for `@reference`/`@apply` are false positives (linter doesn't understand Tailwind)

### Current Implementation Analysis

**File:** `src/lib/components/Hero.svelte`

**What's Done:**
- ✅ Clean, semantic HTML structure
- ✅ All visual elements present (headline, sub-headline, CTAs, stats, media)
- ✅ Responsive design with Tailwind
- ✅ Modern dark theme with gradient overlays
- ✅ Accessibility attributes (`aria-hidden` for decorative elements)
- ✅ Lazy loading on images
- ✅ WebP format for optimized loading

**What's Fixed:**
- ✅ Tailwind v4 `@reference` directive now used correctly
- ✅ CSS class conflicts resolved
- ✅ Svelte 5 self-closing tag warnings resolved

**What's Missing:**
- ⬜ Props interface for CMS data injection
- ⬜ Fallback/default content handling
- ⬜ Unit test coverage
- ⬜ Replace placeholder images with actual fleet photos

### Proposed Stories to Complete

#### Story H5: CMS Integration

**Tasks:**
1. Define TypeScript interface for hero content structure
2. Add `$props()` to accept content from parent/CMS
3. Update `+page.server.ts` to fetch hero block data from Directus
4. Add fallback defaults for missing CMS data
5. Wire up CMS data to Hero component

**Blocked by:** Issue #2 (Create Directus page blocks)

---

## Dependencies

```
#11 Hero Block ──depends on──► #2 Directus Page Blocks
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

- **Design inspiration:** [bartoliniexpress.com](https://www.bartoliniexpress.com)
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
