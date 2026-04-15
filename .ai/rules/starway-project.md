# Starway Trasporti — Repo Rules

## Identity

- **Project:** StarwayTrasporti.com
- **Type:** delivery repo (client-specific)
- **Organization:** BravoByte-org
- **Status:** pre-production, first extraction source

## Tech stack

- SvelteKit 2 with Svelte 5 (runes mode)
- Vite
- TypeScript (strict)
- Tailwind CSS v4
- Playwright (E2E tests)
- Vitest with browser mode (unit tests)
- Directus CMS via `@directus/sdk` (GraphQL)
- PostgreSQL (via Directus)
- Vercel (deployment)
- pnpm (package manager)
- Husky + lint-staged (git hooks)
- Conventional commits via commitlint
- release-it (versioning)

## Repo role

This is a **delivery repo**. It should:

- Remain thin — consume shared BravoByte packages
- Contain only client-specific routes, branding, content, and composition
- Flag generic code for extraction rather than accumulating shared logic locally

## Extraction status

This repo is the first migration candidate. Code that is generic should be flagged for extraction to:

- `bravobyte-types` — shared TypeScript types and content contracts
- `bravobyte-frontend-core` — shared SvelteKit utilities, UI primitives, layouts
- `bravobyte-data-core` — Directus integration, content mapping, data access

## Content and localization

- Bilingual: Italian and English audiences
- CMS-driven content via Directus
- Localization patterns should consider future extraction to `bravobyte-frontend-core`
