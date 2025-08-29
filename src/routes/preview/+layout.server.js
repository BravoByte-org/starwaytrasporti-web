/**
 * Preview Layout Server - English Preview Mode
 * Handles authentication and preview mode setup for English users
 */

import { handlePreviewAuth } from '$lib/server/preview-auth.js';

export async function load(event) {
	// Handle preview authentication with enhanced security
	const previewData = await handlePreviewAuth(event, 'en');
	
	return {
		...previewData,
		previewMode: 'english'
	};
}
