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

## Apr 20 2026 — `pages.blocks` M2A schema repair + Editor policy backfill (#32, unblocks #36)

Apr 19's read-perm backfill fixed the App Service / SSR side, but issue #32 ("Pages Blocks panel errors in Directus admin") was still live. Lion (Manager, `admin_access: true`) was getting "The relationship is not configured properly or you don't have permission to access it" on the Blocks panel — and #36 was still showing empty page bodies because no blocks could be authored.

Admin-token audit identified two compounding issues:

1. **M2A schema metadata was incomplete on `page_blocks`.** The junction had only one row in `directus_relations` (`page_blocks.pages_id` → `pages`). The polymorphic side that ties `page_blocks.collection` + `page_blocks.item` to the 8 allowed block collections was missing entirely. Directus renders the "relationship not configured" error any time it can't resolve the polymorphic side — even for admins, which is exactly the symptom Lion saw.
2. **Starway Content (Editor) policy had no write perms on the block layer.** It had `create/read/update` on `pages`, but zero entries for `page_blocks`, any `block_*` collection (parents or child items), or `starway_team_members`. So even after fix 1, the first real Editor user we provision (Martina) would re-hit a similar UX bug.

Fix applied (admin-token, two batched migrations; canonical recipes live in [`bravobyte-ai/rules/directus-collection-permissions.md`](../../../bravobyte-ai/rules/directus-collection-permissions.md)):

- **`POST /relations`** — seeded the missing polymorphic row: `collection=page_blocks`, `field=item`, `related_collection=null`, `meta.one_collection_field=collection`, `meta.one_allowed_collections=[block_hero, block_rich_text, block_stats, block_card_group, block_team, block_timeline, block_cta, block_image_gallery]`, `meta.junction_field=pages_id`, `meta.sort_field=sort` (relation id `23`).
- **`POST /permissions` (×42 rows)** — backfilled `Starway Content` policy (`17670798-5098-4f9b-9069-4bf3b5046a23`) with `read`/`create`/`update` (no `delete`, per ADR-002) on:
  - `page_blocks` — `permissions: {}` (see M2A junction quirk below)
  - 8 block parents: `block_hero`, `block_rich_text`, `block_stats`, `block_card_group`, `block_team`, `block_timeline`, `block_cta`, `block_image_gallery` — `permissions: {}`
  - 4 block children: `block_stat_items`, `block_card_items`, `block_timeline_items`, `block_gallery_items` — `permissions: {}`
  - `starway_team_members` — site-scoped via `site.users.directus_users_id._eq.$CURRENT_USER`

**M2A junction filter quirk discovered during verification.** The first attempt put a `pages_id.site...` relational filter on `page_blocks` (matching the parent-FK pattern from the rule's filter table). Editor reads then returned `INVALID_QUERY: "You have to provide a collection scope when sorting or filtering on a many-to-any item"`. Directus's policy enforcer can't traverse through M2A `item` columns for non-admin callers, so the only working pattern is `permissions: {}` on the junction with tenant gating delegated to the parent's `read` perm. This is now codified in the rule as a hard requirement, with the trade-off (single-tenant safe; multi-tenant deployments need a different mitigation) called out explicitly.

Verification:

- **Schema fix:** `GET /relations/page_blocks` returns both rows (`pages_id` + `item` with `one_allowed_collections` populated).
- **Synthetic Editor probe:** provisioned a temp user (Editor role + linked to Starway via `site_users`), generated a static token, and round-tripped:
  - `GET /items/page_blocks?limit=2` → `200` (n=2)
  - `POST /items/block_hero` → `200` (id returned)
  - `POST /items/page_blocks` with the new hero referenced via M2A → `200` (id=3)
  - `PATCH /items/page_blocks/3` → `200`
  - Cleanup: `DELETE` junction + hero + temp user + `site_users` link, all `204`.
- **App Service regression check:** `/items/pages?fields=*,blocks.*` still returns `200` with deep block resolution — Apr 19's read-perm work is intact.
- **Vercel preview regression check:** `/chi-siamo` returns `HTTP 200` SSR with full site/navigation payload and `blocks: []` (still empty, awaiting content seeding by Lion). No `FORBIDDEN`, no `500`.

**Out-of-band actions still owned by Lion (Manager session, not part of any PR diff):**

1. Re-open Pages → Blocks for any Starway page and confirm the panel now lists the 8 allowed block types instead of the "relationship not configured" error.
2. Seed initial block content per the earlier-chat content brief — this is what flips #36's "still empty" symptom on the live preview.

**Post-fix gotcha (caught during local dev verification):** the deep `pages.blocks.item:<collection>.*` query started returning `INTERNAL_SERVER_ERROR` (with the opaque "An unexpected error occurred." payload) immediately after the M2A relation row was added. Bisecting with the admin token surfaced the real Postgres error: `invalid input syntax for type uuid: ""`. There were two pre-existing `page_blocks` rows on the homepage (`id=1` with `item=""`, `id=2` with `item=null`) that had been created **before** the polymorphic relation existed — Directus had no schema enforcement for `page_blocks.item` at the time, so any string was accepted. Once the relation declared `item` must resolve to a UUID FK in the allowed block collections, Postgres refused to cast `""` and the entire deep query 500'd. **Resolution:** `DELETE /items/page_blocks/1` and `DELETE /items/page_blocks/2`. Homepage deep query immediately returned HTTP 200 with `blocks: []` again. **Lesson:** when seeding an M2A relation onto an existing junction with prior data, audit the junction for orphan/null/empty `item` values **first** (`GET /items/<junction>?filter[item][_in]=null&filter[item][_in]=`) and clean them up in the same maintenance window, otherwise every consumer of the deep query starts seeing 500s with no useful error message until you bisect with admin perms.

**Codified into shared docs (see this PR + the `bravobyte-ai` PR):**

- `bravobyte-ai/rules/directus-collection-permissions.md` — new "M2A relations require both sides" section with the canonical `POST /relations` payload, the M2A junction filter quirk, the orphan-row pre-flight requirement, and an Editor synthetic-probe verification recipe.
- `bravobyte-ai/playbooks/new-feature.md` — Build step now requires running `GET /relations/<junction>` to confirm both sides exist before claiming any M2A schema migration done.
- `.docs/adrs/adr-002-directus-access-control-design.md` — operational checklist gains an explicit step 0 for M2A relations and updates the negative-consequences count to four outages.
