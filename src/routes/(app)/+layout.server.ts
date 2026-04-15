import type { LoadEvent } from '@sveltejs/kit';

import { getDirectusClient, readItems } from '$lib/server/directus';

export async function load({ fetch }: LoadEvent) {
	const client = getDirectusClient(fetch);

	try {
		const sites = await client.request(
			readItems('sites', {
				filter: { key: { _eq: 'starway' } },
				fields: ['title', 'description', 'logo', 'favicon', 'social_links'],
				limit: 1
			})
		);
		return { site: sites[0] ?? null };
	} catch {
		return { site: null };
	}
}
