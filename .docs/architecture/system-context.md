# System Context

## External systems

| System | Role | Connection |
|--------|------|-----------|
| Directus CMS | Multi-site content management | GraphQL API, static token auth, site-scoped via `site_users` junction |
| Directus MCP | AI-assisted schema and content management | `@directus/content-mcp` (stdio), dedicated MCP Agent token |
| PostgreSQL | Database | External, managed independently from Directus |
| Vercel | Hosting, CDN, serverless | SvelteKit adapter-vercel |
| GitHub | Source control, CI/CD | BravoByte-org/starwaytrasporti-web |

## Multi-site CMS model

Starway content exists within BravoByte's shared Directus instance using row-level tenancy. The `sites` collection is the multi-tenant hub. All content collections have a `site` FK linking to the Starway site entry (`key: "starway"`). The Starway App Service user is assigned to the Starway site via `site_users`, so its token only returns Starway content.

### Content collections

| Collection | Purpose | Site relationship |
|-----------|---------|-------------------|
| `pages` | Site pages with taxonomy-driven templates | Direct `site` FK |
| `posts` | Blog/news content (chronological) | Direct `site` FK |
| `articles` | Long-form content tagged with taxonomy terms | Direct `site` FK |
| `taxonomies` | Grouping systems (services, industries, routes) | Direct `site` FK |
| `taxonomy_terms` | Hierarchical nodes within a taxonomy | Inherited through taxonomy |
| `navigation` | Menu definitions (header, footer) | Direct `site` FK |
| `navigation_items` | Individual menu links | Inherited through navigation |

## Environment variables

| Variable | Purpose |
|----------|---------|
| `PRIVATE_DIRECTUS_URL` / `DIRECTUS_URL` | Directus instance URL |
| `PRIVATE_DIRECTUS_TOKEN` / `DIRECTUS_TOKEN` | Static access token (app server-side fetching) |

MCP authentication uses a separate static token configured in `~/.cursor/mcp.json` (user-level, not committed to repos).

## Directus roles and users

| Role | Policy | Users | Access level |
|------|--------|-------|-------------|
| Administrator | Admin Access (built-in) | `admin@bravobyte.co` | Unrestricted system bootstrap |
| Manager | Manager (admin_access) | `arichardson@bravobyte.co`, `mforlani@bravobyte.co` | Full admin for business owners |
| Developer | Developer Access | (none yet) | Schema CRU, content CRUD, files, flows — no user/role/settings mgmt |
| Editor | Starway Content | (none yet) | Per-site content CRU via `site_users` filter — Italian interface |
| App Service | Published Content Reader | Starway App Service (static token) | Read-only published content, site-scoped via `site_users`, API only |
| MCP Agent | Admin Access | Cursor MCP (static token) | AI-assisted operations via Cursor IDE |

## Users

- **Site visitors** — prospective and existing Starway Trasporti clients
- **Content editors** — manage content via Directus admin panel (Italian language interface, Editor role)
- **Developers** — maintain the SvelteKit application (English language interface, Developer role)
- **Managers** — business owners with full admin access (Manager role)
- **MCP Agent** — dedicated Directus user for AI-assisted operations via Cursor IDE
- **Starway App Service** — automated server-side content fetching (App Service role, static token in `.env`)
