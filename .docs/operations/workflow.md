# Development Workflow

## Branch Strategy

| Branch | Environment | Vercel deployment | Purpose |
|--------|------------|-------------------|---------|
| `dev` | Local only | None | Playground for experimental/WIP features; multiple branches merge here for local testing |
| `next` | Staging | Preview (`*-git-next-*.vercel.app`) | Integration branch; PRs from feature branches target here; QA before release |
| `main` | Production | Production (`starwaytrasporti.com`) | Only accepts merges from `next` via release process |

### Branch rules

- **Feature branches** branch from `next`, PR back to `next`
- **`dev`** is a playground — never deploy, never release from, never merge to `main`
- **`next`** is the staging/preview gate — all code must pass QA here before release
- **`main`** is production — only release merges land here

### Branch naming conventions

Use the commit type prefix matching the issue:

```
feat/12-card-components
fix/42-nav-overflow
chore/update-dependencies
```

---

## CMS triage index

Open Directus / content-model follow-ups for Starway are tracked in [cms-triage.md](./cms-triage.md) and linked GitHub issues.

---

## Pull Request Process

1. Create a feature branch from `next`
2. Develop and commit using conventional commit messages (WIP commits on the branch are fine)
3. Open a PR targeting `next` — **one PR per story/issue** when possible; **PR title** should read like the eventual squash commit (conventional format)
4. Keep the branch current with `git fetch origin && git rebase origin/next` (or merge `next`) before final review
5. Merge using **Squash and merge** so `next` stays **one commit per PR** with a clean message (org default; see [BravoByte git history playbook](https://github.com/BravoByte-org/bravobyte-ai/blob/main/playbooks/git-history-and-merge-policy.md))
6. After merge, **delete the branch** or branch fresh from `next` for the next story (avoids duplicate conflicts after squash)
7. Vercel does NOT deploy feature branches (disabled in `vercel.json`)
8. Once merged to `next`, Vercel deploys a preview automatically
9. QA on the preview URL
10. When ready, follow the release process below

### Optional: squash locally before merge

If you prefer one commit on the remote branch before review (instead of relying on GitHub squash only), use `git rebase -i origin/next` or `git reset --soft origin/next` then a single commit; push with `git push --force-with-lease`. Full guidance: [git-history-and-merge-policy](https://github.com/BravoByte-org/bravobyte-ai/blob/main/playbooks/git-history-and-merge-policy.md).

---

## Release Process

Releases are run locally from the `next` branch using `release-it`. No GitHub Actions are involved.

### Prerequisites

- You are on the `next` branch with a clean working directory
- `RELEASEIT_GITHUB_TOKEN` is set in your `.env` (PAT with repo access)

### Steps

```bash
git checkout next
git pull origin next
pnpm release
```

`release-it` will:
1. Analyze commits since last tag to determine version bump (major/minor/patch)
2. Prompt for confirmation (interactive mode)
3. Update `package.json` version
4. Generate a CHANGELOG.md entry
5. Create a git commit and tag (`v{version}`)
6. Push commit and tag to origin
7. Create a GitHub release

### After release

Merge `next` into `main` to trigger the production deployment:

```bash
git checkout main
git merge next
git push origin main
```

Or open a PR from `next` to `main` for a documented merge.

---

## Vercel Deployment

### Configuration

Deployments are controlled by `vercel.json`:

- **`main`**: Production deployment to `starwaytrasporti.com`
- **`next`**: Preview deployment (staging URL)
- **All other branches**: Disabled (including `dev`, feature branches, chore branches)

### Environment variables

Set via Vercel dashboard (Settings > Environment Variables):

| Variable | Production | Preview | Development |
|----------|-----------|---------|-------------|
| `DIRECTUS_URL` | Set | Set | N/A (local `.env`) |
| `DIRECTUS_TOKEN` | Set | Set | N/A (local `.env`) |
| `PRIVATE_DIRECTUS_URL` | Set | Set | N/A (local `.env`) |
| `PRIVATE_DIRECTUS_TOKEN` | Set | Set | N/A (local `.env`) |

---

## API Transport

The project uses Directus REST API via `@directus/sdk` with the `rest()` transport. GraphQL was removed in favor of REST because:

- Directus permission filters (`site.site_users.directus_users_id._eq.$CURRENT_USER`) are REST-native
- The SDK's REST transport has better TypeScript support
- REST eliminates the GraphQL validation bugs that affected the previous setup
- REST endpoints are easier to debug (curl, Bruno, browser)

### Data fetching pattern

```typescript
import { getDirectusClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';

export async function load({ fetch }) {
    const client = getDirectusClient(fetch);
    const pages = await client.request(
        readItems('pages', {
            filter: { status: { _eq: 'published' } },
            fields: ['id', 'title', 'slug', 'site.name']
        })
    );
    return { pages };
}
```

---

## Commit Conventions

Enforced by commitlint + husky pre-commit hooks.

### Allowed types

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`, `ci`

### Format

```
type: description in sentence case

feat: Add taxonomy landing page template
fix: Resolve navigation item ordering
chore: Update dependencies
```

---

## Local Development

```bash
nvm use                  # Uses .nvmrc (Node 22)
pnpm install             # Install dependencies
cp .env.example .env     # Create local env (fill in tokens)
pnpm dev                 # Start dev server
```
