# Starway Trasporti — Architecture

## System overview

Starway is a SvelteKit application deployed to Vercel, consuming content from a Directus CMS backed by PostgreSQL.

## Architecture layers

```
┌─────────────────────────────────┐
│   Vercel (hosting/CDN)          │
├─────────────────────────────────┤
│   SvelteKit App                 │
│   ├── Routes / Pages            │
│   ├── Components                │
│   ├── Server-side data loading  │
│   └── Static assets             │
├─────────────────────────────────┤
│   Directus CMS (GraphQL API)    │
├─────────────────────────────────┤
│   PostgreSQL                    │
└─────────────────────────────────┘
```

## Data flow

1. SvelteKit `+page.server.ts` / `+layout.server.ts` runs on the server
2. Server code calls Directus GraphQL API via `src/lib/server/directus.ts`
3. Directus returns content from PostgreSQL
4. SvelteKit renders the page with the data
5. Vercel serves the result

## Shared package consumption (planned)

Once BravoByte core repos are populated, Starway will consume:

- `@bravobyte/types` — shared type definitions
- `@bravobyte/frontend-core` — shared UI primitives, layouts, utilities
- `@bravobyte/data-core` — Directus integration, content mapping

## Extraction candidates

See `.cursor/rules/directus.mdc` for the current extraction analysis.
