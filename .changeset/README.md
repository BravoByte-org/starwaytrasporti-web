# Changesets (`starwaytrasporti-web`)

## How releases work

This repo follows the BravoByte org-wide release loop (see
[**release flow playbook**](https://github.com/BravoByte-org/bravobyte/blob/main/.ai/playbooks/release-flow.md)
in the monorepo). It supersedes the previous `release-it` flow.

1. Run **`pnpm changeset`** as part of any PR that ships a user-visible change.
2. Commit the generated **`.changeset/<slug>.md`** alongside the code.
3. Merge to **`main`** → **[`release.yml`](../.github/workflows/release.yml)**
   opens or updates **`release/v<version>`** with title
   **`release: starwaytrasporti.com@<version>`**.
4. Merge that release PR → tag **`v<version>`**, GitHub Release with the
   matching changelog, and `vercel deploy --prebuilt --prod` promotes the
   build to production.

Do **not** hand-edit **`version`** in **`package.json`** or
**`CHANGELOG.md`** — Changesets owns those on **`main`** via the release PR.

## Command

```bash
pnpm changeset
```

## Skipping (when appropriate)

Add the **`skip-changeset`** label on the PR when the change is intentionally
release-irrelevant (typo in a comment, internal refactor with no behavior
change). [`changeset-check.yml`](../.github/workflows/changeset-check.yml)
gates merges otherwise.
