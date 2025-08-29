import { getLocale } from '$paraglide/runtime';

export async function load({ cookies, url }) {
	const locale = getLocale();

	// Check if preview mode is enabled
	const previewMode = cookies.get('__preview') === 'true' || url.searchParams.has('preview');

	return {
		locale,
		previewMode
	};
}
