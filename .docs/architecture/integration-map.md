# Integration Map

## Current integrations

| Integration | Status | Location in codebase |
|-------------|--------|---------------------|
| Directus CMS (REST) | Active | `src/lib/server/directus.ts` |
| Directus queries (SDK) | Active | `src/lib/util/cms/queries.ts` |
| Directus MCP (AI-assisted) | Active | `~/.cursor/mcp.json` (user-level) |
| Directus multi-site CMS | Active | `sites` collection (key: `starway`), `site_users` junction |
| Vercel deployment | Active | `vercel.json`, `svelte.config.js` |

## Content collections (multi-site)

| Collection | Purpose | Status |
|-----------|---------|--------|
| `sites` | Multi-tenant hub | Active |
| `pages` | Site pages with taxonomy templates | Active (schema ready) |
| `posts` | Blog/news content | Active (schema ready) |
| `articles` | Taxonomy-tagged long-form content | Active (schema ready) |
| `taxonomies` | Content grouping systems | Active (schema ready) |
| `taxonomy_terms` | Hierarchical taxonomy nodes | Active (schema ready) |
| `navigation` / `navigation_items` | Site menus | Active (schema ready) |

## Planned shared package consumption

| Package | Status | Will replace |
|---------|--------|-------------|
| `@bravobyte/types` | Created (git URL) | Inline type definitions |
| `@bravobyte/frontend-core` | Not yet created | Generic utilities, UI primitives |
| `@bravobyte/data-core` | Not yet created | `src/lib/server/directus.ts`, query patterns |

## Core repos (Wave 1)

| Repo | Purpose | Status |
|------|---------|--------|
| `bravobyte-ai` | AI workflow infrastructure (personas, rules, playbooks, templates) | Populated |
| `bravobyte-platform` | Issue templates, future CI/CD workflows | Populated |
| `bravobyte-types` | Shared TypeScript types and content contracts | Populated |

## CI/CD

| Tool | Status | Notes |
|------|--------|-------|
| GitHub Actions | Planned | Will use reusable workflows from `bravobyte-platform` |
| Vercel | Active | Auto-deploy from main branch |
