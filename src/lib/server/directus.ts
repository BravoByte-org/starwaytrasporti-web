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

const URL = env.PRIVATE_DIRECTUS_URL || env.DIRECTUS_URL;
const TOKEN = env.PRIVATE_DIRECTUS_TOKEN || env.DIRECTUS_TOKEN;

if (!TOKEN) {
	throw new Error('Please include a token for Directus in the environment variables');
}

if (!URL) {
	throw new Error('Please include a URL for Directus in the environment variables');
}

const getDirectusClient = (fetch?: typeof globalThis.fetch) => {
	const options = fetch ? { globals: { fetch } } : {};
	return createDirectus<Schema>(URL, options).with(rest()).with(staticToken(TOKEN));
};

export { getDirectusClient, readItems, readSingleton };
