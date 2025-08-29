/**
 * Anteprima Homepage Server - Italian Preview Mode
 * Loads homepage content in preview mode for Italian users
 */

import { getHomepage, getNavigation, getTestimonials } from '$lib/server/sanity/content.js';

export async function load({ parent, url }) {
	// Get preview context from parent layout
	const { preview, locale, documentId } = await parent();

	console.log('[Anteprima Homepage IT] Caricamento contenuto:', {
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

		console.log('[Anteprima Homepage IT] Contenuto caricato con successo:', {
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
		console.error('[Anteprima Homepage IT] Errore nel caricamento del contenuto:', error);

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
