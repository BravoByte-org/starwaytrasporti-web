/**
 * Preview Authentication API Endpoint
 * Provides authentication services for preview mode
 */

import { json, error } from '@sveltejs/kit';
import {
	validatePreviewSecret,
	setPreviewCookies,
	clearPreviewCookies,
	getPreviewSession
} from '$lib/server/preview-auth.js';

/**
 * POST /api/preview/auth
 * Authenticate preview mode
 */
export async function POST({ request, cookies }) {
	try {
		const { secret, locale = 'en', action = 'login' } = await request.json();

		if (action === 'logout') {
			clearPreviewCookies(cookies);
			return json({
				success: true,
				message: 'Preview session cleared',
				action: 'logout'
			});
		}

		if (!secret) {
			throw error(400, 'Preview secret is required');
		}

		const isValidSecret = validatePreviewSecret(secret);

		if (!isValidSecret) {
			throw error(401, 'Invalid preview secret');
		}

		// Set preview cookies
		setPreviewCookies(cookies, locale);

		return json({
			success: true,
			message: 'Preview authentication successful',
			locale,
			previewPath: locale === 'it' ? '/anteprima' : '/preview'
		});
	} catch (err) {
		console.error('[Preview Auth API] Error:', err);

		if (err.status) {
			throw err;
		}

		throw error(500, 'Internal server error');
	}
}

/**
 * GET /api/preview/auth
 * Check preview authentication status
 */
export async function GET({ cookies }) {
	try {
		const session = getPreviewSession(cookies);

		return json({
			isAuthenticated: session.isValid,
			locale: session.locale,
			previewPath: session.locale === 'it' ? '/anteprima' : '/preview',
			session: session.isValid
				? {
						locale: session.locale,
						isPreview: session.isPreview
					}
				: null
		});
	} catch (err) {
		console.error('[Preview Auth API] Status check error:', err);
		throw error(500, 'Failed to check authentication status');
	}
}

/**
 * DELETE /api/preview/auth
 * Clear preview authentication
 */
export async function DELETE({ cookies }) {
	try {
		clearPreviewCookies(cookies);

		return json({
			success: true,
			message: 'Preview authentication cleared'
		});
	} catch (err) {
		console.error('[Preview Auth API] Logout error:', err);
		throw error(500, 'Failed to clear authentication');
	}
}
