import type { LoadEvent } from '@sveltejs/kit';

import { getDirectusClient, readItems } from '$lib/server/directus';
import { fetchNavigation } from '$util/cms/queries';

export async function load({ fetch }: LoadEvent) {
	const client = getDirectusClient(fetch);

	try {
		const [sites, navigation] = await Promise.all([
			client.request(
				readItems('sites', {
					filter: { key: { _eq: 'starway' } },
					fields: ['title', 'description', 'logo', 'favicon', 'social_links'],
					limit: 1
				})
			),
			fetchNavigation(fetch, 'header')
		]);
		return { site: sites[0] ?? null, navigation };
	} catch {
		return { site: null, navigation: [] };
	}
}
