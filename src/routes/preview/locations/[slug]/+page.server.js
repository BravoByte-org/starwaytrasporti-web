/**
 * Preview Location Server - English Preview Mode
 * Loads location content in preview mode for English users
 */

import { error } from '@sveltejs/kit';
import { getLocation, getNavigation } from '$lib/server/sanity/content.js';

export async function load({ params, parent }) {
	// Get preview context from parent layout
	const { preview, locale } = await parent();

	const { slug } = params;

	console.log('[Preview Location EN] Loading location:', {
		slug,
		locale,
		preview
	});

	try {
		// Load location and navigation in preview mode
		const [location, navigation] = await Promise.all([
			getLocation(slug, { preview: true }),
			getNavigation('header', locale, { preview: true })
		]);

		if (!location) {
			throw error(404, `Location "${slug}" not found in preview mode`);
		}

		console.log('[Preview Location EN] Content loaded successfully:', {
			locationName: location.name,
			hasNavigation: !!navigation
		});

		return {
			location,
			navigation: { header: navigation || [] },
			previewInfo: {
				locale,
				slug,
				isLocation: true
			}
		};
	} catch (err) {
		console.error('[Preview Location EN] Error loading content:', err);

		if (err.status === 404) {
			throw err;
		}

		throw error(500, `Failed to load location preview: ${err.message}`);
	}
}
