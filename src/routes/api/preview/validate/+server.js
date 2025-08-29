/**
 * Preview Validation API Endpoint
 * Validates preview tokens for Sanity Studio integration
 */

import { json, error } from '@sveltejs/kit';
import { validatePreviewSecret, createPreviewUrl } from '$lib/server/preview-auth.js';

/**
 * POST /api/preview/validate
 * Validate preview parameters and return preview URL
 */
export async function POST({ request }) {
	try {
		const {
			secret,
			documentId,
			documentType,
			slug,
			locale = 'en',
			isDraft = false
		} = await request.json();

		// Validate required parameters
		if (!secret) {
			throw error(400, 'Preview secret is required');
		}

		if (!documentType) {
			throw error(400, 'Document type is required');
		}

		// Validate preview secret
		const isValidSecret = validatePreviewSecret(secret);

		if (!isValidSecret) {
			throw error(401, 'Invalid preview secret');
		}

		// Generate preview path based on document type
		let previewPath = '';

		switch (documentType) {
			case 'page':
				if (slug) {
					previewPath = `/${slug}`;
				} else {
					previewPath = '/'; // Homepage
				}
				break;

			case 'location':
				if (slug) {
					previewPath = `/locations/${slug}`;
				} else {
					throw error(400, 'Location slug is required');
				}
				break;

			default:
				throw error(400, `Unsupported document type: ${documentType}`);
		}

		// Create preview URL
		const previewUrl = createPreviewUrl(previewPath, locale, {
			documentId,
			isDraft
		});

		return json({
			success: true,
			previewUrl,
			previewPath,
			locale,
			documentType,
			documentId,
			isDraft
		});
	} catch (err) {
		console.error('[Preview Validate API] Error:', err);

		if (err.status) {
			throw err;
		}

		throw error(500, 'Failed to validate preview parameters');
	}
}

/**
 * GET /api/preview/validate
 * Simple health check for preview validation
 */
export async function GET() {
	return json({
		status: 'ok',
		service: 'preview-validation',
		endpoints: {
			validate: 'POST /api/preview/validate',
			auth: '/api/preview/auth'
		}
	});
}
