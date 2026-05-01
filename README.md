# StarwayTrasporti

StarwayTrasporti.com is an international transportation website that serves to highlight an exceptional service, generate new clients, and help existing clients find the information they need.

Keep an eye out for updates on [https://starwaytrasporti.com](https://starwaytrasporti.com).

## Tech Stack

- SvelteKit - Frontend Framework
- TailwindCSS - CSS Styling Library
- Vite - App Bundler/Compiler
- Vitest - Unit Testing Library
- Playwright - E2E Testing Library
- Mdsvex - Markdown to HTML Converter
- Directus - CMS
- PostgreSQL - Database
- Vercel - Deployment & HostingPlatform

## Design system & spec

The **1970s retro** brand palette ([SchemeColor — 70s Retro](https://www.schemecolor.com/70s-retro.php)),
`--sw-*` design tokens, typography (**Bebas Neue** + **Source Sans 3**), and the BravoByte **`--bb-*`**
bridge for `@bravobyte-org/frontend-core` are documented in [`spec.md`](./spec.md). Authoritative
decision record: [`bravobyte`](https://github.com/BravoByte-org/bravobyte) [ADR-007 — Starway design system](https://github.com/BravoByte-org/bravobyte/blob/main/.docs/adrs/adr-007-starway-design-system-70s-palette.md).

## Development

### Prerequisites

- Node.js >= 22.13.0
- pnpm >= 9.17.0
- Vercel CLI >= 48.10.2

### Installation

[`@bravobyte-org/frontend-core`](https://github.com/BravoByte-org/bravobyte/tree/main/packages/frontend-core) is installed from **GitHub Packages**. Set **`NODE_AUTH_TOKEN`** locally and in CI to a PAT with **`read:packages`** (see [`.npmrc`](./.npmrc)).

```bash
pnpm install
```

## Release process

This repo follows the BravoByte org-wide Changesets release loop, which
replaces the previous `release-it` flow. Every PR that ships a user-visible
change runs `pnpm changeset` before merging; merging to `main` opens a
`release/v<version>` PR titled `release: starwaytrasporti.com@<version>`.
Merging that PR tags the version, creates a GitHub Release, and promotes the
build to Vercel production.

Full playbook:
[`bravobyte/.ai/playbooks/release-flow.md`](https://github.com/BravoByte-org/bravobyte/blob/main/.ai/playbooks/release-flow.md).
Rationale:
[ADR-006](https://github.com/BravoByte-org/bravobyte/blob/main/.docs/adrs/adr-006-org-release-standardization.md).
