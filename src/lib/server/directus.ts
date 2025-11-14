import { createDirectus, graphql, authentication, staticToken } from '@directus/sdk';
import { env } from '$env/dynamic/private';

const URL = env.PRIVATE_DIRECTUS_URL || env.DIRECTUS_URL;
const TOKEN = env.PRIVATE_DIRECTUS_TOKEN || env.DIRECTUS_TOKEN;

if (!TOKEN) {
	throw new Error('Please include a token for Directus in the environment variables');
}

if (!URL) {
	throw new Error('Please include a URL for Directus in the environment variables');
}

const _getDirectusInstance = (fetch?: typeof globalThis.fetch) => {
	const options = fetch ? { globals: { fetch } } : {};
	const directus = createDirectus(URL, options)
		.with(authentication('json'))
		.with(graphql())
		.with(staticToken(TOKEN));

	return directus;
};

const getDirectusData = async ({ fetch }: { fetch: typeof globalThis.fetch }, query: string) => {
	const directus = _getDirectusInstance(fetch);
	const response = await directus.query(query);
	return response || null;
};

export { getDirectusData };

