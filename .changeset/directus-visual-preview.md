---
'starwaytrasporti.com': minor
---

feat: integrate Directus Live Preview and Visual Editor.

Wires `https://www.preview.starwaytrasporti.com` against Directus Studio so
editors and admins can:

- Live-preview draft pages (`?preview=true` toggles the draft-aware fetch
  path through a new `getPreviewDirectusClient` and `requestDirectusPreview`
  in `src/lib/server/directus.ts`).
- Click-to-edit individual blocks via `data-directus` attributes emitted by
  `BlockRenderer` through the new shared `PreviewBlockWrapper` component
  from `@bravobyte-org/frontend-core`.
- Save changes in Directus and see them reflected without a hard reload —
  `PreviewVisualEditing` mounts the `@directus/visual-editing` client and
  calls `invalidateAll()` on save.

Operational additions:

- `src/hooks.server.js` migrated to TypeScript and now sets
  `Content-Security-Policy: frame-ancestors` (so Directus can iframe the
  preview deployment) and `X-Robots-Tag: noindex, nofollow` (so search
  engines never index preview content) — both scoped to hostnames listed
  in the new optional `PREVIEW_HOSTS` env var.
- New env var `DIRECTUS_PREVIEW_TOKEN` (Vercel Preview environment only)
  bound to a Directus "Preview" role that can read drafts.

Bumps `@bravobyte-org/frontend-core` to `^1.3.0` for the new
`PreviewVisualEditing` and `PreviewBlockWrapper` exports. Adds
`@directus/visual-editing` as a runtime dependency to satisfy the
optional peer dep declared by `frontend-core@1.3.0`.

Manual configuration required before this works end-to-end — see
`bravobyte/.ai/playbooks/directus-preview-setup.md` for the full rollout:

1. Create a Directus "Preview" role + service-account user, grant `read`
   on every collection the frontend renders, **remove** the published-only
   status filter on each, then generate a static token and add it to
   Vercel Preview env as `DIRECTUS_PREVIEW_TOKEN`.
2. Set the `pages` collection Preview URL to
   `https://www.preview.starwaytrasporti.com/{slug}?preview=true` and add
   the same hostname under Settings → Visual Editor.
3. On the Directus host, set
   `CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC=https://www.preview.starwaytrasporti.com`.
