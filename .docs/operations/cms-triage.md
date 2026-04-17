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
