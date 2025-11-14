import { createDirectus, graphql, authentication, staticToken } from '@directus/sdk';
import { PRIVATE_DIRECTUS_URL, PRIVATE_DIRECTUS_TOKEN } from '$env/static/private';

const DIRECTUS_URL = PRIVATE_DIRECTUS_URL;
const DIRECTUS_TOKEN = PRIVATE_DIRECTUS_TOKEN;

if (!DIRECTUS_TOKEN) {
	throw new Error('Please include a token for Directus in the environment variables');
}

if (!DIRECTUS_URL) {
	throw new Error('Please include a URL for Directus in the environment variables');
}

const _getDirectusInstance = (fetch?: typeof globalThis.fetch) => {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(DIRECTUS_URL, options)
		.with(authentication('json'))
		.with(graphql())
		.with(staticToken(DIRECTUS_TOKEN));

	return directus;
};

const getDirectusData = async ({ fetch }: { fetch: typeof globalThis.fetch }, query: string) => {
	const directus = _getDirectusInstance(fetch);
	const response = await directus.query(query);
	return response || null;
};

export { getDirectusData };

