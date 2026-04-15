# Coding Standards

## Language

- TypeScript strict mode for all `.ts` files
- Svelte 5 runes mode for all `.svelte` files

## Style

- Tailwind CSS v4 for styling
- PostCSS / Sass available via vitePreprocess
- SCSS include path: `src/lib/styles`

## Formatting

- Prettier for code formatting (config: `.prettierrc`)
- ESLint for linting (config: `eslint.config.js`)
- Stylelint for CSS/SCSS linting

## Testing

- Unit tests: Vitest with browser mode, config at `.config/vitest.config.ts`
- E2E tests: Playwright, config at `.config/playwright.config.ts`
- Test files: co-located with source, suffix `.spec.ts`

## Git

- Conventional commits enforced via commitlint (config: `.config/commitlint.config.ts`)
- Husky pre-commit hooks run lint-staged
- Releases via release-it (config: `.config/release-it.config.ts`)

## File naming

- Components: kebab-case (e.g. `service-card.svelte`)
- Utilities: kebab-case (e.g. `content-mapper.ts`)
- Types: PascalCase for names, kebab-case for files
- Routes: follow SvelteKit conventions (`+page.svelte`, `+page.server.ts`)
