/**
 * Preview Homepage Server - English Preview Mode
 * Loads homepage content in preview mode for English users
 */

import { getHomepage, getNavigation, getTestimonials } from '$lib/server/sanity/content.js';

export async function load({ parent, url }) {
	// Get preview context from parent layout
	const { preview, locale, documentId } = await parent();

	console.log('[Preview Homepage EN] Loading content:', {
		locale,
		documentId,
		hasDocumentId: !!documentId
	});

	try {
		// Load content in preview mode
		const [homepage, navigation, testimonials] = await Promise.all([
			getHomepage(locale, { preview: true }),
			getNavigation('header', locale, { preview: true }),
			getTestimonials(locale, { preview: true })
		]);

		console.log('[Preview Homepage EN] Content loaded successfully:', {
			hasHomepage: !!homepage,
			hasNavigation: !!navigation,
			testimonialsCount: testimonials?.length || 0
		});

		return {
			homepage,
			navigation: { header: navigation || [] },
			testimonials: testimonials || [],
			previewInfo: {
				locale,
				documentId,
				isHomepage: true
			}
		};
	} catch (error) {
		console.error('[Preview Homepage EN] Error loading content:', error);

		// Return minimal data to prevent crashes
		return {
			homepage: null,
			navigation: { header: [] },
			testimonials: [],
			previewInfo: {
				locale,
				documentId,
				isHomepage: true,
				error: error.message
			}
		};
	}
}
