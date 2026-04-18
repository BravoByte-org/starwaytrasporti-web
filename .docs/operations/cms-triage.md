# Starway Directus — CMS triage (Apr 2026)

Operational backlog for the shared BravoByte Directus instance as it applies to **Starway Trasporti**. GitHub issues track execution; this file is the index.

**Delivery PR (blocks + nav + docs):** https://github.com/BravoByte-org/starwaytrasporti-web/pull/37 → `next`

| # | Topic | Issue |
|---|--------|--------|
| Site renders no block body | REST loaders omitted M2A `blocks`; homepage did not use `BlockRenderer` | https://github.com/BravoByte-org/starwaytrasporti-web/issues/36 |
| Admin “Blocks” panel broken | M2A relationship or role permissions in Directus | https://github.com/BravoByte-org/starwaytrasporti-web/issues/32 |
| Empty taxonomies / term pages | Seed data + wire `template_type`, `taxonomy_context`, `term` | https://github.com/BravoByte-org/starwaytrasporti-web/issues/33 |
| Editor guide: Pages vs Posts vs Articles | Documentation + optional sample records | https://github.com/BravoByte-org/starwaytrasporti-web/issues/34 |
| UUID-only relation pickers | Display templates / translations on relational fields | https://github.com/BravoByte-org/starwaytrasporti-web/issues/35 |

---

## Pages vs Posts vs Articles (editor cheat sheet)

| Type | Use for | Typical URL / entry | Taxonomy |
|------|---------|---------------------|----------|
| **Pages** | Site structure, marketing sections, landing experiences, block-based layouts | One row per URL (`slug` often starts with `/`); `template_type` drives rendering (`homepage`, `taxonomy_landing`, `taxonomy_term_page`, etc.) | Optional: `taxonomy_context` + `term` for taxonomy-driven templates |
| **Posts** | Short, date-driven updates (news, announcements) if you enable that channel | Usually list + detail routes from `slug` / `published_at` | Optional; often category-like tags if you add them later |
| **Articles** | Longer editorial or blog content you want in taxonomy-driven hubs | Body + metadata; linked to many terms via **`article_terms`** | **Primary** place for `article_terms` junction |

**Rule of thumb for Starway today:** build the visible marketing site in **Pages** + blocks; use **Articles** when content should appear under taxonomy hubs; use **Posts** only if you introduce a dated “news” channel and train editors on that distinction.

Deeper architecture (hierarchy, landing vs term pages, query rules) lives in the BravoByte workspace: `../.docs/architecture/taxonomy-architecture.md` (relative to this repo in the monorepo-style checkout).

## Apr 2026 route fix notes

- Non-homepage `404`s were caused by a slug mismatch: the app normalized route params to leading-slash values like `/chi-siamo`, while most Directus `pages.slug` values were stored without the leading slash.
- Starway pages have now been standardized to use canonical leading-slash slugs (homepage stays `/`).
- The Starway `services` taxonomy was seeded and wired to the existing `Cosa Facciamo` landing / term pages:
  - `/cosa-facciamo` → `taxonomy_landing` + `taxonomy_context = services`
  - `/cosa-facciamo/la-nostra-flotta` → `taxonomy_term_page` + `term = la-nostra-flotta`
  - `/cosa-facciamo/magazzino` → `taxonomy_term_page` + `term = magazzino`
  - `/cosa-facciamo/stoccaggio` → `taxonomy_term_page` + `term = stoccaggio`
- The frontend query layer also keeps a compatibility fallback for legacy non-leading-slash records while the CMS data stays consistent.

## Apr 19 2026 — Published Content Reader policy backfill

The Vercel preview started returning SSR `500`s with a `FORBIDDEN — You don't have permission to access collection "pages"` payload. Triage (full audit captured in PR #37 conversation) showed two compounding issues:

1. The Vercel `DIRECTUS_TOKEN` env var was a stale token that Directus rejected as "Invalid user". The app's anonymous-retry fallback then issued an unauthenticated request, which surfaced as the `FORBIDDEN` payload because the **Public** role has no read on `pages`.
2. Even with a valid Starway App Service token, the **Published Content Reader** policy had never been granted read on `page_blocks` or any `block_*` collection (or on `starway_team_members`). Pages would resolve, but `blocks` deep queries returned empty, leaving the page body blank.

Fix applied (Cursor MCP admin token, see [`bravobyte-ai/rules/directus-collection-permissions.md`](../../../bravobyte-ai/rules/directus-collection-permissions.md) for the canonical recipe):

- Added `read` perms on the Published Content Reader policy (`28c1faaf-d786-4dc6-9899-41afc11f50c6`) for: `page_blocks`, `block_hero`, `block_rich_text`, `block_stats`, `block_stat_items`, `block_card_group`, `block_card_items`, `block_team`, `block_timeline`, `block_timeline_items`, `block_cta`, `block_image_gallery`, `block_gallery_items`, `starway_team_members`.
- Block parents and child items use `permissions: null` (no filter) — they have no `site` FK and are only ever reached via the site-scoped `pages` query, so tenancy is enforced at the parent level.
- `starway_team_members` is filtered by `site.users.directus_users_id._eq.$CURRENT_USER` matching the existing convention on `pages`/`posts`/`articles`.
- Verified end-to-end with the App Service token: `/items/pages` returns rows, deep `blocks.item.*` resolves, `/items/starway_team_members` returns `200` (currently `[]` because no rows are seeded yet — not a perms problem).

**User action still required to unblock the Vercel preview:** the project's `DIRECTUS_TOKEN` (and `PRIVATE_DIRECTUS_TOKEN`, if set) in the Vercel `starwaytrasporti-web` project env must be replaced with the current valid Starway App Service token (the same value used in this repo's local `.env`). Once that env var is updated and the preview is redeployed, the `FORBIDDEN` chain will be gone and pages should render. ADR-002's "operational checklist when creating a new content collection" section now points at the rule above so this class of outage stops recurring.
