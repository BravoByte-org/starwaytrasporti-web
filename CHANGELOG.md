# Changelog

## Unreleased

### Fixed

- Load page builder blocks from Directus REST (M2A `blocks` graph) so inner pages and the homepage render block content, not only layout chrome ([#36](https://github.com/BravoByte-org/starwaytrasporti-web/issues/36)).
- Normalize `[...slug]` path params to CMS slugs with a leading `/` when matching `pages.slug`.

### Added

- Block components, catch-all routing, main navigation, and CMS triage index (`.docs/operations/cms-triage.md`).