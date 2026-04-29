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

## Development

### Prerequisites

- Node.js >= 22.13.0
- pnpm >= 9.17.0
- Vercel CLI >= 48.10.2

### Installation

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
