import { getLocation, getSiteNavigation } from '$lib/server/sanity/content.js';
import { getLocale } from '$paraglide/runtime';
import { error } from '@sveltejs/kit';

export async function load({ params, url, cookies }) {
	const { slug } = params;
	const locale = getLocale();
	const previewMode = cookies.get('__preview') === 'true' || url.searchParams.has('preview');

	try {
		// Fetch location and navigation in parallel
		const [location, navigation] = await Promise.all([
			getLocation(slug, { previewMode }),
			getSiteNavigation(locale, { previewMode })
		]);

		// Check if location exists
		if (!location) {
			throw error(404, 'Location not found');
		}

		// Check if location is active
		if (location.active === false && !previewMode) {
			throw error(404, 'Location not available');
		}

		return {
			location,
			navigation,
			locale,
			previewMode
		};
	} catch (err) {
		if (err.status === 404) {
			throw err;
		}
		console.error('[Location Detail] Error loading content:', err);
		throw error(500, 'Failed to load location content');
	}
}
