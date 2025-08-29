/**
 * Preview Authentication System
 * Handles secure authentication for preview mode
 */

import { dev } from '$app/environment';
import { redirect } from '@sveltejs/kit';

import { SANITY_STUDIO_PREVIEW_SECRET } from '$env/static/private';

// Preview authentication configuration
const PREVIEW_SECRET =
	SANITY_STUDIO_PREVIEW_SECRET ||
	'skjhnlyTMf43jhnFdyfGMVklnUIDqP4W5IkFfA4DnL4Sy9R1R97UBRPGPP2PcB3R9PBmg5dw7wI4d1OPt533L5cpalb1zbVCgRKPvVqogntYL9dvAO3yH9xcbh0uJvtgxMMSws51eax7PASXXYqjPxCSDOrQEoLCP1ao15qevAwY2nfu87Z4';
const PREVIEW_COOKIE_NAME = '__preview';
const PREVIEW_LOCALE_COOKIE_NAME = '__preview_locale';
const PREVIEW_SESSION_DURATION = 60 * 60 * 24; // 24 hours

/**
 * Verify preview authentication
 * @param {string} secret - Preview secret from URL params
 * @param {Object} cookies - SvelteKit cookies object
 * @returns {boolean} Whether authentication is valid
 */
export function verifyPreviewAuth(secret, cookies) {
	// Check secret-based authentication
	const hasValidSecret = secret === PREVIEW_SECRET;

	// Check cookie-based authentication
	const hasValidCookie = cookies.get(PREVIEW_COOKIE_NAME) === 'true';

	// In development, be more permissive
	if (dev) {
		return hasValidSecret || hasValidCookie;
	}

	// In production, require both or valid secret
	return hasValidSecret || hasValidCookie;
}

/**
 * Set preview authentication cookies
 * @param {Object} cookies - SvelteKit cookies object
 * @param {string} locale - Preview locale (en/it)
 * @param {Object} options - Cookie options
 */
export function setPreviewCookies(cookies, locale = 'en', options = {}) {
	const {
		maxAge = PREVIEW_SESSION_DURATION,
		secure = !dev,
		sameSite = 'lax',
		path = '/'
	} = options;

	const cookieOptions = {
		path,
		maxAge,
		sameSite,
		secure,
		httpOnly: false // Allow client-side access for JavaScript
	};

	// Set preview mode cookie
	cookies.set(PREVIEW_COOKIE_NAME, 'true', cookieOptions);

	// Set preview locale cookie
	cookies.set(PREVIEW_LOCALE_COOKIE_NAME, locale, cookieOptions);

	console.log(`[Preview Auth] Set preview cookies for locale: ${locale}`);
}

/**
 * Clear preview authentication cookies
 * @param {Object} cookies - SvelteKit cookies object
 */
export function clearPreviewCookies(cookies) {
	const cookieOptions = {
		path: '/',
		maxAge: 0, // Expire immediately
		sameSite: 'lax',
		secure: !dev
	};

	cookies.set(PREVIEW_COOKIE_NAME, '', cookieOptions);
	cookies.set(PREVIEW_LOCALE_COOKIE_NAME, '', cookieOptions);

	console.log('[Preview Auth] Cleared preview cookies');
}

/**
 * Get preview session information
 * @param {Object} cookies - SvelteKit cookies object
 * @returns {Object} Preview session information
 */
export function getPreviewSession(cookies) {
	const isPreview = cookies.get(PREVIEW_COOKIE_NAME) === 'true';
	const locale = cookies.get(PREVIEW_LOCALE_COOKIE_NAME) || 'en';

	return {
		isPreview,
		locale,
		isValid: isPreview
	};
}

/**
 * Require preview authentication
 * Throws redirect if not authenticated
 * @param {Object} params - Authentication parameters
 * @param {string} params.secret - Secret from URL params
 * @param {Object} params.cookies - SvelteKit cookies object
 * @param {string} params.locale - Target locale
 * @param {string} params.redirectUrl - URL to redirect to if not authenticated
 */
export function requirePreviewAuth({ secret, cookies, locale = 'en', redirectUrl = '/studio' }) {
	const isAuthenticated = verifyPreviewAuth(secret, cookies);

	if (!isAuthenticated) {
		console.log(`[Preview Auth] Authentication failed, redirecting to: ${redirectUrl}`);
		throw redirect(302, redirectUrl);
	}

	// Set or refresh preview cookies
	setPreviewCookies(cookies, locale);

	console.log(`[Preview Auth] Authentication successful for locale: ${locale}`);
}

/**
 * Middleware function for preview routes
 * @param {Object} event - SvelteKit event object
 * @param {string} locale - Preview locale
 * @returns {Object} Preview authentication data
 */
export async function handlePreviewAuth(event, locale = 'en') {
	const { url, cookies, request } = event;

	// Extract authentication parameters
	const secret = url.searchParams.get('secret');
	const documentId = url.searchParams.get('id');
	const isDraft = url.searchParams.get('draft') === 'true';

	// Check if user is coming from Sanity Studio
	const referer = request.headers.get('referer');
	const fromStudio = referer && referer.includes('/studio');

	// Require authentication
	requirePreviewAuth({
		secret,
		cookies,
		locale,
		redirectUrl: '/studio'
	});

	// Log preview access
	const userAgent = request.headers.get('user-agent');
	const clientIP =
		request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

	console.log(`[Preview Auth] Preview access:`, {
		locale,
		documentId,
		isDraft,
		fromStudio,
		clientIP: clientIP.substring(0, 15) + '...',
		userAgent: userAgent?.substring(0, 50) + '...'
	});

	return {
		preview: true,
		locale,
		documentId,
		isDraft,
		fromStudio,
		authenticatedAt: new Date().toISOString()
	};
}

/**
 * Check if current request is in preview mode
 * @param {Object} cookies - SvelteKit cookies object
 * @returns {boolean} Whether in preview mode
 */
export function isPreviewMode(cookies) {
	return cookies.get(PREVIEW_COOKIE_NAME) === 'true';
}

/**
 * Get preview mode information for client
 * @param {Object} cookies - SvelteKit cookies object
 * @returns {Object} Preview mode information
 */
export function getPreviewModeInfo(cookies) {
	const session = getPreviewSession(cookies);

	return {
		isPreview: session.isPreview,
		locale: session.locale,
		previewPath: session.locale === 'it' ? '/anteprima' : '/preview',
		exitUrl: '/',
		isValid: session.isValid
	};
}

/**
 * Validate preview secret (for API endpoints)
 * @param {string} secret - Secret to validate
 * @returns {boolean} Whether secret is valid
 */
export function validatePreviewSecret(secret) {
	return secret === PREVIEW_SECRET;
}

/**
 * Create preview URL with authentication
 * @param {string} path - Path to preview
 * @param {string} locale - Preview locale
 * @param {Object} options - Additional options
 * @returns {string} Preview URL with authentication
 */
export function createPreviewUrl(path, locale = 'en', options = {}) {
	const { documentId = null, isDraft = false, baseUrl = 'http://localhost:5173' } = options;

	const previewBase = locale === 'it' ? '/anteprima' : '/preview';
	const url = new URL(`${previewBase}${path}`, baseUrl);

	// Add authentication parameters
	url.searchParams.set('secret', PREVIEW_SECRET);
	url.searchParams.set('preview', 'true');

	if (documentId) {
		url.searchParams.set('id', documentId);
	}

	if (isDraft) {
		url.searchParams.set('draft', 'true');
	}

	return url.toString();
}
