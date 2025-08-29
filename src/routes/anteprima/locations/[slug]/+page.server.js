/**
 * Anteprima Location Server - Italian Preview Mode
 * Loads location content in preview mode for Italian users
 */

import { error } from '@sveltejs/kit';
import { getLocation, getNavigation } from '$lib/server/sanity/content.js';

export async function load({ params, parent }) {
	// Get preview context from parent layout
	const { preview, locale } = await parent();

	const { slug } = params;

	console.log('[Anteprima Location IT] Caricamento sede:', {
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
			throw error(404, `Sede "${slug}" non trovata in modalità anteprima`);
		}

		console.log('[Anteprima Location IT] Contenuto caricato con successo:', {
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
		console.error('[Anteprima Location IT] Errore nel caricamento del contenuto:', err);

		if (err.status === 404) {
			throw err;
		}

		throw error(500, `Impossibile caricare l'anteprima della sede: ${err.message}`);
	}
}
