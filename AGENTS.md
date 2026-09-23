# AGENTS.md — BravoByte AI operating context

## Source of truth
Canonical personas/rules/playbooks/glossary live in `bravobyte-ai` (self-hosted Gitea: `BravoByte-Org/bravobyte-ai` — not GitHub).
This file is a working summary kept in sync with it. If this file and
`bravobyte-ai` disagree, `bravobyte-ai` wins — treat this as a cache, not
an override.

## Repo role (Rule Zero — where does new code/content go)
| Repo | Owns |
|------|------|
| `bravobyte-types` | Shared TS types, DTOs, enums, content contracts |
| `bravobyte-frontend-core` (`bravobyte` monorepo, `packages/frontend-core`) | SvelteKit utilities, UI primitives, layouts, SEO, i18n |
| `bravobyte-data-core` | Directus integration, data access, content mapping, ORM |
| `bravobyte-platform` (`bravobyte` monorepo, `platform/`) | Reusable workflows, composite actions, CI/CD, scaffolding |
| `bravobyte-ai` | Personas, rules, playbooks, templates, AI workflow docs |
| Delivery repos (this repo, `dolcevitact-web`, ...) | Client-specific routes, branding, content, composition |

Before writing code, name the correct owning repo and why. If unclear, ask
or escalate rather than guessing.

## Personas / workflow loop
Strategize (Lina) → Architect (Orion) → Verify plan → Build (Forge) →
Verify code (Iris) → Capture and catalog (Atlas) → Update status.
- **Lina** (strategist) — business goals, scoping, stories, acceptance criteria
- **Orion** (architect) — technical design, repo placement, module boundaries, contracts
- **Forge** (builder) — implementation of approved work; branch off `next` (never `main`), syncing `next` ← `main` first if a hotfix landed on `main`
- **Iris** (verifier) — quality gate, reviews, boundary protection
- **Atlas** (librarian) — institutional memory, ADRs, catalogs, playbooks

## Key rules (summary — see "Where to read more" for full text)
- **Branching:** this is a delivery repo — branch off `next`, never `main`. Sync `next` ← `main` first if a hotfix landed directly on `main`.
- **Merge:** squash-merge, one PR = one story.
- **Reusability:** generalize into the owning shared repo (see Rule Zero table) rather than duplicating logic here. If a rule or playbook is general enough to apply across BravoByte projects, extract it to `bravobyte-ai/` rather than duplicating it in this repo's `.ai/`.
- **npm scope:** shared package dependencies use `@bravobyte-org/*` (matches the `BravoByte-org` GitHub org).
- **Placeholder content:** AI-generated text in the target language, HTML for Directus rich-text, placehold.co for images, placeholdervideo.dev for video — never ship real client content as a placeholder.
- **Directus collections:** every new collection ships permissions + `meta.display_template` + field-level `display_options.template` + locale translations together.
- **Documentation locations:** ADRs → `.docs/adrs/`, architecture → `.docs/architecture/`, delivery notes → `.docs/delivery/`, AI rules/playbooks → canonical in `bravobyte-ai`.

## Where to read more
| Topic | Local copy (if present) | Canonical |
|-------|--------------------------|-----------|
| Full persona definitions | none locally — uses workspace defaults | `bravobyte-ai/commands/<name>.md` |
| Full rule text | `.ai/rules/` — `starway-project`, `coding-standards`, plus `starway-context`, `directus`, `sveltekit`, `dependency-versions` (the last four arrive when `chore/remove-cursor` merges; they were Cursor rules) | `bravobyte-ai/rules/<name>.md` |
| Playbooks | none locally yet | `bravobyte-ai/playbooks/<name>.md` |
| Glossary | none locally | `bravobyte-ai/glossary.md` |

## This repo

This is a delivery repo (`starwaytrasporti-web`). It intentionally does not
keep a full local mirror of the shared `.ai/rules`/`.ai/playbooks`/`.ai/commands`
— see the summary above for the operative rules. This repo does carry two
repo-specific rule files worth knowing about directly:
- `.ai/rules/starway-project.md` — project identity and repo-specific context
- `.ai/rules/coding-standards.md` — repo-specific coding standards (e.g. TypeScript strict mode)
