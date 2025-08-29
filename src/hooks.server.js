import { sequence } from '@sveltejs/kit/hooks';
import * as auth from '$lib/server/auth';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getPreviewModeInfo, isPreviewMode } from '$lib/server/preview-auth.js';

const handleParaglide = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});

const handleAuth = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

const handlePreview = async ({ event, resolve }) => {
	// Detect preview mode and add to locals
	const previewMode = isPreviewMode(event.cookies);
	const previewInfo = getPreviewModeInfo(event.cookies);
	
	// Add preview information to event locals
	event.locals.preview = previewMode;
	event.locals.previewInfo = previewInfo;
	
	// Add preview headers for debugging
	if (previewMode) {
		console.log(`[Preview Middleware] Request in preview mode:`, {
			url: event.url.pathname,
			locale: previewInfo.locale,
			userAgent: event.request.headers.get('user-agent')?.substring(0, 50)
		});
	}
	
	return resolve(event, {
		transformPageChunk: ({ html }) => {
			// Add preview meta tags to all pages in preview mode
			if (previewMode) {
				const previewMeta = `
					<meta name="preview-mode" content="true">
					<meta name="preview-locale" content="${previewInfo.locale}">
					<meta name="robots" content="noindex, nofollow">
				`;
				return html.replace('</head>', `${previewMeta}</head>`);
			}
			return html;
		}
	});
};

export const handle = sequence(handleParaglide, handleAuth, handlePreview);
