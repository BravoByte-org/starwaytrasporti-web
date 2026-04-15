# Starway Extraction Strategy

Starway Trasporti is the first BravoByte delivery repo and the first extraction source for shared business-core modules. Because it is pre-production, this is the ideal window for architectural refactoring.

---

## Objective

Get Starway MVP pre-production ready as quickly as possible while extracting only the pieces that are already clearly reusable.

**Key principle:** Starway MVP readiness remains the shipping priority. Shared repo extraction must accelerate the business, not stall delivery.

---

## Approach

Incremental extraction, not a big-bang rewrite.

1. Audit Starway for extractable seams
2. Extract the lowest-risk shared pieces first
3. Refactor Starway to consume those packages
4. Only after boundaries are clear, extract deeper layers

---

## Step 1: Audit extractable seams

Examine the Starway codebase for:

| Seam | Location | Target repo |
|------|----------|-------------|
| Generic SvelteKit utilities | `src/lib/` | `bravobyte-frontend-core` |
| Shared UI primitives | `src/lib/components/` | `bravobyte-frontend-core` |
| Layout patterns | `src/lib/layouts/` | `bravobyte-frontend-core` |
| Content blocks | `src/lib/components/` | `bravobyte-frontend-core` |
| Directus client factory | `src/lib/server/directus.ts` | `bravobyte-data-core` |
| GraphQL query patterns | `src/lib/util/cms/queries.ts` | `bravobyte-data-core` |
| Content type definitions | inline types | `bravobyte-types` |
| SEO helpers | (if present) | `bravobyte-frontend-core` |
| i18n patterns | (if present) | `bravobyte-frontend-core` |
| CI conventions | `.github/workflows/` | `bravobyte-platform` |

---

## Step 2: Extraction order

### First wave — lowest risk

| Repo | What to extract | Why first |
|------|----------------|-----------|
| `bravobyte-ai` | Personas, rules, playbooks, templates | No runtime dependencies, already defined |
| `bravobyte-platform` | CI workflows, composite actions | Operational, no app coupling |
| `bravobyte-types` | Shared TypeScript types, content contracts | Pure types, no runtime logic |

### Second wave — frontend extraction

| Repo | What to extract | Why second |
|------|----------------|------------|
| `bravobyte-frontend-core` | Generic utilities, layout patterns, reusable components, shared style foundations | Requires type contracts to be stable first |

Refactor Starway to consume `@bravobyte/frontend-core` after extraction.

### Third wave — data extraction

| Repo | What to extract | Why third |
|------|----------------|-----------|
| `bravobyte-data-core` | Directus integration helpers, content mapping, query patterns | Content/data boundary needs to be clearer first; CMS work is still in progress |

Refactor Starway to consume `@bravobyte/data-core` after extraction.

---

## Guidance

- Do not pause Starway delivery for perfect architecture
- Extract the highest-confidence shared layers first
- Only move code into shared repos when the abstraction is real and stable
- Do not over-fit shared repos to Starway's specific needs — keep them generic
- When in doubt, keep code in Starway and flag for later extraction
- Each extraction should include an ADR documenting the decision

---

## Current extraction candidates

Based on audit of the existing codebase:

### `src/lib/server/directus.ts`

- Directus client factory using `@directus/sdk` with GraphQL transport
- Authenticated via static token
- Generic enough to extract, but wait until data layer boundary is clearer
- **Classification:** shared-candidate
- **Timing:** extract later (third wave)

### `src/lib/util/cms/queries.ts`

- GraphQL query strings for pages and global content
- Currently untyped string templates
- Extraction should include typed query helpers
- **Classification:** shared-candidate
- **Timing:** extract later (third wave)

### Content type definitions (inline)

- Page, global content, and CMS collection types
- Currently implicit in query responses
- Should be formalized and extracted to `bravobyte-types`
- **Classification:** shared-core
- **Timing:** extract soon (first wave)

### Issue templates (`.github/ISSUE_TEMPLATE/`)

- 10 issue templates already defined (feature, bug, task, chore, etc.)
- Generic enough to move to org `.github` repo
- **Classification:** shared-core
- **Timing:** extract when `.github` org repo is set up
