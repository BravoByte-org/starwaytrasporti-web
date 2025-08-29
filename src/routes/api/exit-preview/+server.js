import { redirect } from '@sveltejs/kit';

export async function GET({ cookies, url }) {
	// Clear preview mode cookie
	cookies.delete('__preview', { path: '/' });

	// Get redirect URL from query params or default to home
	const redirectTo = url.searchParams.get('redirect') || '/';

	// Remove preview query parameters
	const cleanUrl = new URL(redirectTo, url.origin);
	cleanUrl.searchParams.delete('preview');
	cleanUrl.searchParams.delete('id');
	cleanUrl.searchParams.delete('token');

	throw redirect(307, cleanUrl.toString());
}
