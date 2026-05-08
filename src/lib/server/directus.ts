import { createDirectus, rest, staticToken, readItems, readSingleton } from '@directus/sdk';
import { env } from '$env/dynamic/private';

type Schema = {
	sites: Record<string, unknown>[];
	site_users: Record<string, unknown>[];
	pages: Record<string, unknown>[];
	page_blocks: Record<string, unknown>[];
	posts: Record<string, unknown>[];
	articles: Record<string, unknown>[];
	taxonomies: Record<string, unknown>[];
	taxonomy_terms: Record<string, unknown>[];
	article_terms: Record<string, unknown>[];
	navigation: Record<string, unknown>[];
	navigation_items: Record<string, unknown>[];
	block_hero: Record<string, unknown>[];
	block_rich_text: Record<string, unknown>[];
	block_stats: Record<string, unknown>[];
	block_card_group: Record<string, unknown>[];
	block_team: Record<string, unknown>[];
	block_timeline: Record<string, unknown>[];
	block_cta: Record<string, unknown>[];
	block_image_gallery: Record<string, unknown>[];
	starway_team_members: Record<string, unknown>[];
};

const URL = env.DIRECTUS_URL || env.PRIVATE_DIRECTUS_URL;
const TOKEN = env.DIRECTUS_TOKEN || env.PRIVATE_DIRECTUS_TOKEN;
const PREVIEW_TOKEN = env.DIRECTUS_PREVIEW_TOKEN;

if (!URL) {
	throw new Error('Please include a URL for Directus in the environment variables');
}

const createDirectusClient = (fetch?: typeof globalThis.fetch, token?: string) => {
	const options = fetch ? { globals: { fetch } } : {};
	const client = createDirectus<Schema>(URL, options).with(rest());
	return token ? client.with(staticToken(token)) : client;
};

const getDirectusClient = (fetch?: typeof globalThis.fetch) => createDirectusClient(fetch, TOKEN);

/*
 * Preview client uses a separate static token bound to a Directus role that
 * can read drafts. We fail loudly on missing token rather than falling back
 * to the unauthenticated path (which would silently surface published-only
 * content) — a misconfigured preview deploy must be obvious.
 */
const getPreviewDirectusClient = (fetch?: typeof globalThis.fetch) => {
	if (!PREVIEW_TOKEN) {
		throw new Error('DIRECTUS_PREVIEW_TOKEN is not set');
	}
	return createDirectusClient(fetch, PREVIEW_TOKEN);
};

type DirectusRequest = Parameters<ReturnType<typeof createDirectusClient>['request']>[0];

function isRejectedTokenError(error: unknown): boolean {
	const message = error instanceof Error ? error.message : JSON.stringify(error);
	return /invalid user|invalid credentials|invalid token/i.test(message);
}

async function requestDirectus<T>(
	request: DirectusRequest,
	fetch?: typeof globalThis.fetch
): Promise<T> {
	try {
		return (await getDirectusClient(fetch).request(request)) as T;
	} catch (error) {
		if (!TOKEN || !isRejectedTokenError(error)) throw error;

		console.warn('Directus token was rejected, retrying request without authentication');
		return (await createDirectusClient(fetch).request(request)) as T;
	}
}

/*
 * Preview-aware request helper. Routes through the preview client when
 * `preview` is true; behaves identically to `requestDirectus` otherwise.
 * Preview requests intentionally do not retry-without-auth — a rejected
 * preview token must surface as an error rather than fall back to
 * published-only data.
 */
async function requestDirectusPreview<T>(
	request: DirectusRequest,
	fetch?: typeof globalThis.fetch,
	options: { preview?: boolean } = {}
): Promise<T> {
	if (!options.preview) return requestDirectus<T>(request, fetch);
	return (await getPreviewDirectusClient(fetch).request(request)) as T;
}

export {
	getDirectusClient,
	getPreviewDirectusClient,
	requestDirectus,
	requestDirectusPreview,
	readItems,
	readSingleton
};
