import {
	getHomepage,
	getSiteNavigation,
	getFeaturedTestimonials,
	getPagePreview
} from '$lib/server/sanity/content.js';
import { getLocale } from '$paraglide/runtime';
import { error } from '@sveltejs/kit';

export async function load({ url, cookies }) {
	const locale = getLocale();
	const previewMode = cookies.get('__preview') === 'true' || url.searchParams.has('preview');
	const previewId = url.searchParams.get('id');

	try {
		let homepage;

		// If in preview mode with a specific ID, try to get preview content
		if (previewMode && previewId) {
			try {
				homepage = await getPagePreview(previewId);
				console.log('[Homepage] Loaded preview content for ID:', previewId);
			} catch (previewError) {
				console.warn(
					'[Homepage] Preview content not found, falling back to published:',
					previewError.message
				);
				homepage = await getHomepage(locale, { previewMode });
			}
		} else {
			homepage = await getHomepage(locale, { previewMode });
		}

		// Fetch additional data in parallel
		const [navigation, testimonials] = await Promise.all([
			getSiteNavigation(locale, { previewMode }),
			getFeaturedTestimonials(locale, { previewMode })
		]);

		// Check if homepage exists
		if (!homepage) {
			throw error(404, 'Homepage not found');
		}

		return {
			homepage,
			navigation,
			testimonials,
			locale,
			previewMode,
			previewId
		};
	} catch (err) {
		console.error('[Homepage] Error loading content:', err);
		throw error(500, 'Failed to load homepage content');
	}
}
