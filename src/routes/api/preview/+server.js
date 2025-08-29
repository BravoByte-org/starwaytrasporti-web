import { json, redirect } from '@sveltejs/kit';
import { SANITY_TOKEN } from '$env/static/private';
import { getPagePreview } from '$lib/server/sanity/content.js';

export async function POST({ request, cookies, url }) {
	try {
		const { secret, slug, type = 'page', id } = await request.json();

		// Verify the secret token
		if (!secret || secret !== SANITY_TOKEN) {
			return json({ message: 'Invalid token' }, { status: 401 });
		}

		// Set preview mode cookie
		cookies.set('__preview', 'true', {
			path: '/',
			maxAge: 60 * 60 * 24, // 24 hours
			sameSite: 'lax',
			secure: url.protocol === 'https:'
		});

		// For draft content, try to fetch and validate
		if (id) {
			try {
				const previewContent = await getPagePreview(id);
				if (!previewContent) {
					return json({ message: 'Content not found' }, { status: 404 });
				}
			} catch (error) {
				console.error('[Preview] Error fetching content:', error);
				return json({ message: 'Error fetching preview content' }, { status: 500 });
			}
		}

		// Determine redirect URL
		let redirectUrl = '/';

		if (type === 'page') {
			if (slug && slug !== 'home') {
				redirectUrl = `/${slug}`;
			}
		} else if (type === 'location') {
			redirectUrl = slug ? `/locations/${slug}` : '/locations';
		}

		// Add preview query parameter
		const previewUrl = new URL(redirectUrl, url.origin);
		previewUrl.searchParams.set('preview', 'true');
		if (id) previewUrl.searchParams.set('id', id);

		return json({
			message: 'Preview mode enabled',
			redirectUrl: previewUrl.toString()
		});
	} catch (error) {
		console.error('[Preview] Error enabling preview mode:', error);
		return json({ message: 'Internal server error' }, { status: 500 });
	}
}

export async function DELETE({ cookies }) {
	// Clear preview mode
	cookies.delete('__preview', { path: '/' });

	return json({ message: 'Preview mode disabled' });
}
