import { getDirectusClient, readItems } from '$lib/server/directus';

export async function fetchHomepage(fetch: typeof globalThis.fetch) {
	const client = getDirectusClient(fetch);
	return client.request(
		readItems('pages', {
			filter: { slug: { _eq: '/' } },
			fields: ['id', 'slug', 'status', 'title', 'template_type', 'site']
		})
	);
}

export async function fetchPage(fetch: typeof globalThis.fetch, slug: string) {
	const client = getDirectusClient(fetch);
	return client.request(
		readItems('pages', {
			filter: { slug: { _eq: slug } },
			fields: [
				'id',
				'slug',
				'status',
				'title',
				'template_type',
				'seo_title',
				'seo_description',
				'featured_image',
				'taxonomy_context.*',
				'term.*',
				'site.name',
				'site.key'
			]
		})
	);
}
