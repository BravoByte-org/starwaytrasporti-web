# StarwayTrasporti.com - Product Spec

> **Milestone:** Baseline MVP  
> **Due Date:** December 6, 2025  
> **Last Updated:** April 21, 2026

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
├── 🔷 CMS Integration (Epic #2)
│   ├── ✅ Directus client setup .......... DONE
│   └── 🟡 Link block data to app ......... IN PROGRESS (planning)
│       ├── ⬜ Hero data adapter
│       ├── ⬜ Services data adapter
│       └── ⬜ Stats data adapter
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

## Feature: CMS Data Integration (No UI Changes)

**Issue:** Part of Epic #2  
**Status:** 🟡 IN PROGRESS (planning)  
**Assignee:** TBD  
**Estimated Effort:** 3

### Description

Link existing Directus CMS data models to the frontend application. Components remain unchanged; only data fetching and transformation logic is added. Pages gracefully fall back to mock data when CMS is unavailable or returns empty.

Recent note: Starway CMS page routing now expects canonical leading-slash `pages.slug` values (for example `/chi-siamo`). In April 2026, the delivery app and Directus data were aligned to remove non-homepage `404`s, and the `Cosa Facciamo` taxonomy landing / term pages were wired to seeded taxonomy records. On April 18, 2026, the SSR runtime was hardened to prefer `DIRECTUS_*` env vars over `PRIVATE_DIRECTUS_*`, retry anonymously when a stale token is rejected, and remove Svelte 5 `state_referenced_locally` warnings from route and block components. On April 19, 2026, the **Published Content Reader** policy in Directus was backfilled with read perms for `page_blocks`, every `block_*` collection (parents and child items), and `starway_team_members` — these had never been granted to the App Service role, which combined with a stale Vercel `DIRECTUS_TOKEN` produced the FORBIDDEN 500 chain on the preview. ADR-002 now ships with an operational checklist pointing at the canonical [`bravobyte-ai/rules/directus-collection-permissions.md`](../../../bravobyte-ai/rules/directus-collection-permissions.md) so future collections can't recreate this gap. On April 20, 2026, issue #32 (Pages Blocks panel error in Directus admin) was resolved by repairing the `pages.blocks` M2A schema relation (the polymorphic `field=item` row was missing from `directus_relations`, breaking the authoring panel for every role including admins) and backfilling the **Starway Content** editor policy with `read`/`create`/`update` on `page_blocks`, all `block_*` collections, and `starway_team_members` — this also unblocks #36 once Lion seeds initial block content on the Starway pages. Full triage notes live in `.docs/operations/cms-triage.md`. On April 20, 2026 (evening), the 16 Starway `block_hero.image` fields were populated with `placehold.co` 1600×900 navy/white webp placeholders via `POST /files/import`, a new `PUBLIC_DIRECTUS_URL` env var was added for building `/assets/<uuid>` URLs in the browser, and the `MainNav` was refactored into a responsive desktop + mobile (hamburger → slide-in panel + accordion) view with em-based `@custom-media --sm..--2xl` breakpoints declared in `app.css`. On April 21, 2026, the still-invisible placeholder images were traced to the `Public` policy having no read permission on `directus_files` — the SSR token let the loader fetch UUIDs but the browser's anonymous `GET /assets/<uuid>` returned `403`. Fixed by creating a dedicated `Public Assets` folder in Directus, moving all 16 hero files + 4 new homepage card images into it, and granting the `Public` policy a single folder-scoped `read` permission. `CardGroupBlock.svelte` was extended to render `item.image` as a background layer with a gradient overlay so the homepage's four navigation cards render with imagery. The new pattern is codified in [`bravobyte-ai/rules/directus-collection-permissions.md`](../../bravobyte-ai/rules/directus-collection-permissions.md) ("Public (anonymous) file access") and cross-referenced from [`bravobyte-ai/rules/placeholder-content.md`](../../bravobyte-ai/rules/placeholder-content.md) so every future Directus image placeholder lands in the Public Assets folder by default.

### User Stories

| ID | Story | Status |
|----|-------|--------|
| D1 | As an **editor**, I want Hero content (headline, CTAs, images) to come from Directus so I can update messaging without deployments | ⬜ Planned |
| D2 | As an **editor**, I want Services cards to come from Directus so I can add/remove/reorder services | ⬜ Planned |
| D3 | As an **editor**, I want Stats to come from Directus so I can update metrics quarterly | ⬜ Planned |
| D4 | As a **visitor**, I want the site to still work if the CMS is down, showing fallback content | ⬜ Planned |

### Acceptance Criteria

| # | Criterion | Status | Notes |
|---|-----------|--------|-------|
| 1 | GraphQL query fetches Hero block data from Directus | ⬜ Planned | `HERO_BLOCK_QUERY` |
| 2 | GraphQL query fetches Services block data from Directus | ⬜ Planned | `SERVICES_BLOCK_QUERY` |
| 3 | GraphQL query fetches Stats block data from Directus | ⬜ Planned | `STATS_BLOCK_QUERY` |
| 4 | Adapter transforms CMS Hero response → `HeroContent` type | ⬜ Planned | Handle nulls/defaults |
| 5 | Adapter transforms CMS Services response → `Service[]` type | ⬜ Planned | Map CMS fields to component props |
| 6 | Adapter transforms CMS Stats response → `StatData[]` type | ⬜ Planned | Parse numeric values, handle optionals |
| 7 | Homepage server loader fetches all 3 block types | ⬜ Planned | Parallel fetches for performance |
| 8 | Graceful fallback to mock data on CMS error/empty | ⬜ Planned | Try/catch with console warning |
| 9 | No UI component changes | ⬜ Planned | Props stay identical |
| 10 | Build passes with CMS integration | ⬜ Planned | No type errors |

### Implementation Plan

#### 1. GraphQL Queries (`src/lib/util/cms/queries.ts`)

Add queries for each block type. Expected Directus collections:
- `hero_blocks` - Single hero per page
- `service_cards` - Collection of services
- `stat_items` - Collection of stats

```graphql
# Hero Block
query {
  hero_blocks(filter: { page: { slug: { _eq: "/" } } }) {
    id
    eyebrow
    headline
    sub_headline
    primary_cta_label
    primary_cta_href
    secondary_cta_label
    secondary_cta_href
    trust_stats
    fleet_image { id, filename_disk }
    fleet_image_alt
    map_overlay { id, filename_disk }
  }
}

# Services Block
query {
  service_cards(filter: { status: { _eq: "published" } }, sort: ["sort"]) {
    id
    title
    summary
    icon
    meta
    category
    cta_label
    cta_href
    tone
  }
}

# Stats Block
query {
  stat_items(filter: { status: { _eq: "published" } }, sort: ["sort"]) {
    id
    icon
    icon_label
    header
    value
    prefix
    suffix
    label
    description
    delta_value
    delta_trend
  }
}
```

#### 2. Data Adapters (`src/lib/util/cms/adapters.ts`)

Transform CMS responses to match component prop types:

| CMS Collection | Adapter Function | Output Type |
|----------------|------------------|-------------|
| `hero_blocks` | `adaptHero(cms) → HeroContent` | `HeroContent` |
| `service_cards` | `adaptServices(cms) → Service[]` | `Service[]` |
| `stat_items` | `adaptStats(cms) → StatData[]` | `StatData[]` |

Adapters handle:
- Field name mapping (snake_case → camelCase)
- Nested object construction (CTAs, media, delta)
- Image URL building from Directus assets
- Null/undefined fallbacks to mock defaults
- Type coercion (string → number for stat values)

#### 3. Page Server Loader (`src/routes/(app)/+page.server.ts`)

```ts
export async function load({ fetch }) {
  const [heroData, servicesData, statsData] = await Promise.allSettled([
    fetchHeroBlock(fetch),
    fetchServicesBlock(fetch),
    fetchStatsBlock(fetch)
  ]);

  return {
    hero: heroData.status === 'fulfilled' ? heroData.value : heroMock,
    services: servicesData.status === 'fulfilled' ? servicesData.value : servicesMock,
    stats: statsData.status === 'fulfilled' ? statsData.value : stats
  };
}
```

#### 4. Pass Data to Components (`src/routes/(app)/+page.svelte`)

```svelte
<script>
  let { data } = $props();
</script>

<Hero content={data.hero} />
<ServicesSection items={data.services} />
<StatGroup stats={data.stats} />
```

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/lib/util/cms/queries.ts` | Modify | Add HERO, SERVICES, STATS queries |
| `src/lib/util/cms/adapters.ts` | Create | CMS → component type transformers |
| `src/routes/(app)/+page.server.ts` | Modify | Fetch CMS data, fallback to mocks |
| `src/routes/(app)/+page.svelte` | Modify | Pass CMS data to components via props |
| `src/lib/components/Hero.svelte` | Modify | Accept `content` prop (optional, keep hardcoded as fallback) |

### Data Shape Mapping

#### Hero Block

| CMS Field | Component Prop | Notes |
|-----------|----------------|-------|
| `eyebrow` | `content.eyebrow` | |
| `headline` | `content.headline` | |
| `sub_headline` | `content.subHeadline` | camelCase |
| `primary_cta_label` | `content.primaryCta.label` | Nested |
| `primary_cta_href` | `content.primaryCta.href` | |
| `secondary_cta_label` | `content.secondaryCta.label` | |
| `secondary_cta_href` | `content.secondaryCta.href` | |
| `trust_stats` | `content.trustStats` | JSON array |
| `fleet_image` | `content.media.fleetImage` | Build URL from asset ID |
| `fleet_image_alt` | `content.media.fleetAlt` | |
| `map_overlay` | `content.media.mapOverlay` | Build URL from asset ID |

#### Services Block

| CMS Field | Component Prop | Notes |
|-----------|----------------|-------|
| `id` | `id` | |
| `title` | `title` | |
| `summary` | `summary` | |
| `icon` | `icon` | Emoji string |
| `meta` | `meta` | |
| `category` | `category` | |
| `cta_label` | `cta.label` | Nested |
| `cta_href` | `cta.href` | |
| `tone` | `tone` | 'sunset' | 'seafoam' | 'violet' |

#### Stats Block

| CMS Field | Component Prop | Notes |
|-----------|----------------|-------|
| `id` | `id` | |
| `icon` | `icon` | Emoji string |
| `icon_label` | `iconLabel` | camelCase |
| `header` | `header` | Optional |
| `value` | `value` | Parse to number if numeric |
| `prefix` | `prefix` | Optional |
| `suffix` | `suffix` | Optional |
| `label` | `label` | |
| `description` | `description` | |
| `delta_value` | `delta.value` | Nested, optional |
| `delta_trend` | `delta.trend` | 'up' | 'down' | 'neutral' |

---

## Feature: Hero Block Component

**Issue:** [#11](https://github.com/BravoByte-org/starwaytrasporti-web/issues/11)  
**Status:** ✅ DONE (UI complete; CMS integration pending)  
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
| H5 | As an **editor**, I want to customize the hero content from the CMS so that I can update messaging without code changes | ⬜ Blocked (CMS Integration) |

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
| 10 | **Build passes** - no linter/compile errors | ✅ Done | |
| 11 | **CMS Integration** - content editable via Directus | ⬜ Blocked | See CMS Integration feature |

---

## Feature: Card + CardGroup Block Components

**Issue:** [#12](https://github.com/BravoByte-org/starwaytrasporti-web/issues/12)  
**Status:** ✅ DONE (UI complete; CMS integration pending)  
**Assignee:** @LionOnTheWeb  
**Estimated Effort:** 3

### Description

Provide reusable `Card` and `CardGroup` components to showcase transportation/logistics services.

### Acceptance Criteria

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Card exposes props for icon, title, summary, meta, CTA | ✅ Done |
| 2 | CardGroup renders responsive grid | ✅ Done |
| 3 | Accessibility: semantic headings, focus states | ✅ Done |
| 4 | Visual consistency with Hero | ✅ Done |
| 5 | Mock data fixtures provided | ✅ Done |

---

## Feature: Stat + StatGroup Block Components

**Issue:** [#15](https://github.com/BravoByte-org/starwaytrasporti-web/issues/15)  
**Status:** ✅ DONE (UI complete; CMS integration pending)  
**Assignee:** @LionOnTheWeb  
**Estimated Effort:** 3

### Description

Reusable `Stat` and `StatGroup` components for displaying key metrics with animated count-up values.

### Acceptance Criteria

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Stat accepts icon, value, label, description, delta | ✅ Done |
| 2 | Three-row layout with animated value | ✅ Done |
| 3 | StatGroup responsive grid | ✅ Done |
| 4 | Visual consistency with Hero/Card | ✅ Done |
| 5 | Accessibility + reduced motion support | ✅ Done |
| 6 | Mock data fixtures provided | ✅ Done |
| 7 | Unit tests | ✅ Done |

---

## Shared-Candidate Flags

Pieces built client-local in this repo that should be promoted to
`bravobyte-frontend-core` once a second client proves the shape (per
[`bravobyte-ai/rules/reusability.md`](../bravobyte-ai/rules/reusability.md)):

| Artifact | Location | Extract when |
|----------|----------|--------------|
| `resolveAssetUrl(file)` helper | `src/lib/util/cms/assets.ts` | A second client consumes Directus Files via `/assets/<uuid>` |
| `@custom-media --sm..--2xl` breakpoint mixin | `src/app.css` | Any other client app needs a shared breakpoint scale |
| `HamburgerButton.svelte` primitive | `src/lib/components/navigation/HamburgerButton.svelte` | A second client ships a responsive nav |
| Responsive `MainNav` pattern (desktop + off-canvas mobile panel + accordion) | `src/lib/components/navigation/MainNav.svelte` | A second client adopts the same IA shape |
| Image-backed `CardGroupBlock` variant (bg image + gradient overlay, white text fallback) | `src/lib/components/blocks/CardGroupBlock.svelte` | A second client's card-group block surfaces file references |

---

## Mock Data Policy

- All blocks ship with mock fixtures to unblock UI while CMS is pending.
- Fixtures mirror the planned Directus schema.
- Pages gracefully fall back to mocks if CMS fetch fails or returns empty.
- Store mocks under `src/lib/mocks/*`.

---

## Dependencies

```
CMS Integration ──depends on──► Directus data models (now available ✅)
#11 Hero Block ──depends on──► CMS Integration
#12 Card/CardGroup ──depends on──► CMS Integration
#15 Stat/StatGroup ──depends on──► CMS Integration
```

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Done |
| 🟡 | In Progress |
| ⬜ | Not Started / Planned |
| 🔴 | Blocked |
| ❌ | Cancelled |
