#!/usr/bin/env node
/**
 * Starway — Directus Live Preview permissions seed (idempotent)
 * ──────────────────────────────────────────────────────────────────────
 *
 * Provisions the Directus side of the ADR-008 Live Preview + Visual
 * Editor rollout. Safe to re-run: every step uses a "fetch, then create
 * if missing, else patch" pattern so partial failures don't leave the
 * instance half-migrated.
 *
 * What it does
 * ──────────────
 *   1. Find-or-create the "Preview" policy (no app/admin access — API
 *      token only, never logs into Data Studio)
 *   2. Find-or-create the "Starway Preview Service" role attached to
 *      that policy
 *   3. Find-or-create the "Starway Preview Service" user with a static
 *      token (`starway_<uuid>`); prints the token on first creation so
 *      it can be copied into Vercel as `DIRECTUS_PREVIEW_TOKEN`
 *   4. Backfill `read` permissions (`fields: ['*']`, `permissions: {}`
 *      — no status filter, so drafts are readable) on every collection
 *      the Starway frontend renders
 *
 * What it does NOT do (manual steps that follow this script)
 * ──────────────────────────────────────────────────────────
 *   • Directus Studio → Data Model → `pages` → Preview URL
 *   • Directus Studio → Settings → Visual Editor → allowed origins
 *   • Directus container env: CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC
 *   • Vercel project env vars (DIRECTUS_PREVIEW_TOKEN, PUBLIC_DIRECTUS_URL)
 *     scoped to Preview only
 *
 * The Directus MCP wrapper blocks role/permission CRUD and the Vercel
 * MCP exposes no env-var CRUD, so those four steps require admin UIs.
 * See `bravobyte/.ai/playbooks/directus-preview-setup.md`.
 *
 * How to run
 * ──────────────
 *   DIRECTUS_ADMIN_TOKEN=<admin_token> \
 *     node scripts/directus/seed-preview-permissions.mjs
 *
 * Flags
 * ──────────────
 *   --dry-run   Log every POST/PATCH without executing
 *
 * Environment
 * ──────────────
 *   DIRECTUS_URL           defaults to https://cms.bravobyte.co
 *   DIRECTUS_ADMIN_TOKEN   required; must be a system-admin token
 *
 * Exit codes
 * ──────────────
 *   0  success (idempotent no-op is still 0)
 *   1  missing token / fatal config error
 *   2  Directus API error (inspect stderr for the HTTP payload)
 */

import { randomUUID } from 'node:crypto';
import process from 'node:process';

const ARGS = new Set(process.argv.slice(2));
const DRY_RUN = ARGS.has('--dry-run');

const DIRECTUS_URL = (process.env.DIRECTUS_URL ?? 'https://cms.bravobyte.co').replace(/\/$/, '');
const ADMIN_TOKEN = process.env.DIRECTUS_ADMIN_TOKEN;

if (!ADMIN_TOKEN) {
	console.error(
		'\n✗ DIRECTUS_ADMIN_TOKEN is required.\n  Export it first:\n  DIRECTUS_ADMIN_TOKEN=… node scripts/directus/seed-preview-permissions.mjs\n'
	);
	process.exit(1);
}

const POLICY_NAME = 'Preview';
const ROLE_NAME = 'Starway Preview Service';
const USER_FIRST_NAME = 'Starway Preview';
const USER_LAST_NAME = 'Service';
const USER_EMAIL = 'starway-preview@bravobyte.co';

/**
 * Every collection the Starway frontend reads in preview mode.
 * Source of truth: `src/lib/util/cms/queries.ts` PAGE_BLOCK_FIELDS plus
 * the layout-level `sites` / `navigation` / `navigation_items` reads,
 * cross-referenced with the ADR-008 collection list.
 *
 * `permissions: {}` (no filter) is intentional on every row:
 *   - The token is server-side-only and routed through the
 *     `STARWAY_SITE_FILTER` site-key gate inside the query helpers.
 *   - The Preview role MUST read drafts, so we never apply a status
 *     filter (the production App Service policy keeps `status: published`).
 */
const PREVIEW_COLLECTIONS = [
	// Page + M2A junction
	'pages',
	'page_blocks',

	// Block parents
	'block_hero',
	'block_rich_text',
	'block_stats',
	'block_card_group',
	'block_team',
	'block_timeline',
	'block_cta',
	'block_image_gallery',

	// Block children (reached via their site-scoped block parent)
	'block_stat_items',
	'block_card_items',
	'block_team_members',
	'block_timeline_items',
	'block_gallery_items',

	// Site / navigation
	'sites',
	'navigation',
	'navigation_items',

	// Other site-scoped content
	'starway_team_members',
	'articles',
	'taxonomies',
	'taxonomy_terms',
	'article_terms'
];

// ──────────────────────────────────────────────────────────────────────
//  HTTP helper
// ──────────────────────────────────────────────────────────────────────

async function api(method, path, body) {
	if (DRY_RUN && method !== 'GET') {
		console.log(`  [dry-run] ${method} ${path}`, body ? JSON.stringify(body).slice(0, 200) : '');
		// Return a stub entity with a real UUID so downstream callers
		// (`r.data.id`) walk through every step during a dry-run. See the
		// matching note in `dolcevitact-web/scripts/directus/migrate.mjs`.
		return { data: { id: randomUUID(), token: `starway_dryrun_${randomUUID().replace(/-/g, '')}` } };
	}

	const res = await fetch(`${DIRECTUS_URL}${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${ADMIN_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : undefined
	});

	const text = await res.text();
	const json = text ? JSON.parse(text) : null;

	if (!res.ok) {
		const message = json?.errors?.[0]?.message ?? text;
		const err = new Error(`${method} ${path} → ${res.status}: ${message}`);
		err.status = res.status;
		err.payload = json;
		throw err;
	}

	return json;
}

// ──────────────────────────────────────────────────────────────────────
//  Idempotent upserters
// ──────────────────────────────────────────────────────────────────────

const SYSTEM_COLLECTION_ENDPOINTS = {
	directus_users: '/users',
	directus_roles: '/roles',
	directus_policies: '/policies',
	directus_permissions: '/permissions'
};

async function findOne(collection, filter, fields = ['id']) {
	const qs = new URLSearchParams({
		filter: JSON.stringify(filter),
		fields: fields.join(','),
		limit: '1'
	});
	const base = SYSTEM_COLLECTION_ENDPOINTS[collection] ?? `/items/${collection}`;
	const r = await api('GET', `${base}?${qs}`);
	return r.data?.[0] ?? null;
}

async function findPolicyByName(name) {
	const r = await api(
		'GET',
		`/policies?filter[name][_eq]=${encodeURIComponent(name)}&fields=id,name&limit=1`
	);
	return r.data?.[0] ?? null;
}

async function findRoleByName(name) {
	const r = await api(
		'GET',
		`/roles?filter[name][_eq]=${encodeURIComponent(name)}&fields=id,name&limit=1`
	);
	return r.data?.[0] ?? null;
}

async function ensurePermission({ policy, collection, action, fields, permissions }) {
	const existing = await findOne(
		'directus_permissions',
		{ policy: { _eq: policy }, collection: { _eq: collection }, action: { _eq: action } },
		['id']
	);
	if (existing) return;
	console.log(`    + perm ${action} ${collection} on policy ${policy.slice(0, 8)}…`);
	await api('POST', '/permissions', { policy, collection, action, fields, permissions });
}

// ──────────────────────────────────────────────────────────────────────
//  Identity bootstrap
// ──────────────────────────────────────────────────────────────────────

async function ensurePreviewPolicy() {
	const existing = await findPolicyByName(POLICY_NAME);
	if (existing) {
		console.log(`  ≡ policy "${POLICY_NAME}" exists (${existing.id})`);
		return existing.id;
	}
	console.log(`  + creating policy "${POLICY_NAME}"`);
	const r = await api('POST', '/policies', {
		name: POLICY_NAME,
		icon: 'visibility',
		description:
			'Reads drafts for the Live Preview / Visual Editor iframe. API-only — no Data Studio login.',
		// API-only service policy. Live Preview tokens are static and
		// server-side; they must not double as Data Studio sessions.
		app_access: false,
		admin_access: false
	});
	return r.data.id;
}

async function ensurePreviewRole(policyId) {
	const existing = await findRoleByName(ROLE_NAME);
	if (existing) {
		console.log(`  ≡ role "${ROLE_NAME}" exists (${existing.id})`);
		// Idempotently ensure the policy is attached.
		await api('PATCH', `/roles/${existing.id}`, {
			policies: [{ policy: policyId }]
		}).catch(() => {});
		return existing.id;
	}
	console.log(`  + creating role "${ROLE_NAME}"`);
	const r = await api('POST', '/roles', {
		name: ROLE_NAME,
		icon: 'visibility',
		description: 'Service role for the Starway Live Preview / Visual Editor token.',
		policies: [{ policy: policyId }]
	});
	return r.data.id;
}

async function ensurePreviewUser(roleId) {
	const existing = await findOne('directus_users', { email: { _eq: USER_EMAIL } }, ['id', 'token']);
	if (existing) {
		console.log(`  ≡ "${ROLE_NAME}" user exists (${existing.id})`);
		return { userId: existing.id, token: existing.token, created: false };
	}

	const token = `starway_${randomUUID().replace(/-/g, '')}`;
	console.log(`  + creating "${ROLE_NAME}" user + static token`);
	const r = await api('POST', '/users', {
		first_name: USER_FIRST_NAME,
		last_name: USER_LAST_NAME,
		email: USER_EMAIL,
		role: roleId,
		status: 'active',
		token,
		description: 'Static token for ADR-008 Live Preview / Visual Editor (Vercel Preview scope only).'
	});
	return { userId: r.data.id, token, created: true };
}

// ──────────────────────────────────────────────────────────────────────
//  Permissions
// ──────────────────────────────────────────────────────────────────────

async function backfillPreviewPermissions(policyId) {
	for (const collection of PREVIEW_COLLECTIONS) {
		await ensurePermission({
			policy: policyId,
			collection,
			action: 'read',
			fields: ['*'],
			permissions: {}
		});
	}
}

// ──────────────────────────────────────────────────────────────────────
//  Main
// ──────────────────────────────────────────────────────────────────────

async function main() {
	console.log(`\nStarway — Directus Live Preview permissions seed (${DIRECTUS_URL})`);
	console.log(`  mode: ${DRY_RUN ? 'DRY RUN' : 'APPLY'}\n`);

	console.log('[1/4] Ensure "Preview" policy');
	const policyId = await ensurePreviewPolicy();

	console.log('[2/4] Ensure "Starway Preview Service" role');
	const roleId = await ensurePreviewRole(policyId);

	console.log('[3/4] Ensure "Starway Preview Service" user + static token');
	const { token, created } = await ensurePreviewUser(roleId);

	console.log('[4/4] Backfill read permissions on preview collections');
	await backfillPreviewPermissions(policyId);

	if (created && !DRY_RUN) {
		console.log('\n  ─────────────────────────────────────────────────');
		console.log('   New Starway Preview Service token (copy to Vercel');
		console.log('   Preview-scoped env as DIRECTUS_PREVIEW_TOKEN):');
		console.log(`     ${token}`);
		console.log('  ─────────────────────────────────────────────────\n');
	} else if (!DRY_RUN) {
		console.log(
			'\n  Note: token was not regenerated. If you need to rotate it, delete'
		);
		console.log(`  the "${ROLE_NAME}" user in Directus admin and re-run.\n`);
	}

	console.log('✓ seed complete\n');
	console.log('Next manual steps (cannot be scripted):');
	console.log('  1. Directus → Data Model → pages → Preview URL:');
	console.log('       https://www.preview.starwaytrasporti.com/{slug}?preview=true');
	console.log('  2. Directus → Settings → Visual Editor → Add URL:');
	console.log('       https://www.preview.starwaytrasporti.com');
	console.log('  3. Directus container env (host admin, NOT Vercel):');
	console.log('       CONTENT_SECURITY_POLICY_DIRECTIVES__FRAME_SRC=https://www.preview.starwaytrasporti.com');
	console.log('  4. Vercel → starwaytrasporti-web → Env Vars (Preview scope only):');
	console.log('       DIRECTUS_PREVIEW_TOKEN  = <token printed above>');
	console.log('       PUBLIC_DIRECTUS_URL     = https://cms.bravobyte.co\n');
}

main().catch((err) => {
	console.error('\n✗ seed failed:', err.message);
	if (err.payload) console.error(JSON.stringify(err.payload, null, 2));
	process.exit(2);
});
