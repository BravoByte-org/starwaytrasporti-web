import type { LoadEvent } from '@sveltejs/kit';

import { getDirectusData } from '$lib/server/directus';
import { HERO_BLOCK_QUERY, SERVICES_BLOCK_QUERY, STATS_BLOCK_QUERY } from '$util/cms/queries';
import { adaptHero, adaptServices, adaptStats } from '$util/cms/adapters';

/**
 * Fetch a CMS block with error handling.
 * Returns null on error (adapter will fall back to mocks).
 */
async function fetchBlock<T>(
	fetch: typeof globalThis.fetch,
	query: string,
	blockName: string
): Promise<T | null> {
	try {
		const response = await getDirectusData({ fetch }, query);
		return response as T;
	} catch (error) {
		console.warn(`[CMS] Failed to fetch ${blockName}:`, error);
		return null;
	}
}

export async function load({ fetch }: LoadEvent) {
	// Fetch all blocks in parallel for performance
	const [heroResponse, servicesResponse, statsResponse] = await Promise.allSettled([
		fetchBlock<{ block_hero: unknown[] }>(fetch, HERO_BLOCK_QUERY, 'block_hero'),
		fetchBlock<{ block_services: unknown[] }>(fetch, SERVICES_BLOCK_QUERY, 'block_services'),
		fetchBlock<{ block_stats: unknown[] }>(fetch, STATS_BLOCK_QUERY, 'block_stats')
	]);

	// Extract data or null for each block
	const heroData =
		heroResponse.status === 'fulfilled' && heroResponse.value?.block_hero?.[0]
			? heroResponse.value.block_hero[0]
			: null;

	const servicesData =
		servicesResponse.status === 'fulfilled' && servicesResponse.value?.block_services?.[0]
			? servicesResponse.value.block_services[0]
			: null;

	const statsData =
		statsResponse.status === 'fulfilled' && statsResponse.value?.block_stats?.[0]
			? statsResponse.value.block_stats[0]
			: null;

	// Transform CMS data to component props (adapters handle fallbacks)
	return {
		hero: adaptHero(heroData as Parameters<typeof adaptHero>[0]),
		services: adaptServices(servicesData as Parameters<typeof adaptServices>[0]),
		stats: adaptStats(statsData as Parameters<typeof adaptStats>[0])
	};
}
