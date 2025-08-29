/**
 * Anteprima Layout Server - Italian Preview Mode
 * Handles authentication and preview mode setup for Italian users
 */

import { handlePreviewAuth } from '$lib/server/preview-auth.js';

export async function load(event) {
	// Handle preview authentication with enhanced security
	const previewData = await handlePreviewAuth(event, 'it');
	
	return {
		...previewData,
		previewMode: 'italian'
	};
}
