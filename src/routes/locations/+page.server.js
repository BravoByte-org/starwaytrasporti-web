import { getLocations, getFeaturedLocations, getNavigation } from '$lib/server/sanity/content.js';
import { getLocale } from '$paraglide/runtime';
import { error } from '@sveltejs/kit';

export async function load({ url, cookies }) {
	const locale = getLocale();
	const previewMode = cookies.get('__preview') === 'true' || url.searchParams.has('preview');

	try {
		// Fetch data step by step to isolate any issues
		console.log('[Locations] Starting to load content...');
		console.log('[Locations] Locale:', locale, 'Preview mode:', previewMode);

		const locations = await getLocations({ previewMode });
		console.log('[Locations] Locations loaded:', locations?.length || 0);
		console.log('[Locations] First location:', locations?.[0]?.name);

		const featuredLocations = await getFeaturedLocations({ previewMode });
		console.log('[Locations] Featured locations loaded:', featuredLocations?.length || 0);

		const navigation = await getNavigation('header', locale, { previewMode });
		console.log('[Locations] Navigation loaded:', navigation?.length || 0);

		return {
			locations: locations || [],
			featuredLocations: featuredLocations || [],
			navigation: { header: navigation || [] },
			locale,
			previewMode
		};
	} catch (err) {
		console.error('[Locations] Error loading content:', err);
		if (err instanceof Error) {
			console.error('[Locations] Error details:', err.message, err.stack);
		}
		throw error(500, 'Failed to load locations content');
	}
}
