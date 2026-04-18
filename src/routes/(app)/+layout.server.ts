import type { LoadEvent } from '@sveltejs/kit';

import { requestDirectus, readItems } from '$lib/server/directus';
import { fetchNavigation } from '$util/cms/queries';

function describeLoadError(error: unknown): string {
	if (error instanceof Error) return error.message;
	if (typeof error === 'string') return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}

export async function load({ fetch }: LoadEvent) {
	try {
		const [sites, navigation] = await Promise.all([
			requestDirectus<Record<string, unknown>[]>(
				readItems('sites', {
					filter: { key: { _eq: 'starway' } },
					fields: ['title', 'description', 'logo', 'favicon', 'social_links'],
					limit: 1
				}),
				fetch
			),
			fetchNavigation(fetch, 'header')
		]);
		return { site: sites[0] ?? null, navigation };
	} catch (error) {
		console.warn(`Failed to load layout CMS data: ${describeLoadError(error)}`);
		return { site: null, navigation: [] };
	}
}
