import type { LoadEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { fetchPage } from '$util/cms/queries';

function describeLoadError(error: unknown): string {
	if (error instanceof Error) return error.message;
	if (typeof error === 'string') return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}

function pathParamToCmsSlug(pathParam: string | undefined): string {
	const p = (pathParam ?? '').trim();
	if (!p || p === '/') return '/';
	return p.startsWith('/') ? p : `/${p}`;
}

export async function load({ fetch, params }: LoadEvent) {
	const slug = pathParamToCmsSlug(params.slug);

	try {
		const pages = await fetchPage(fetch, slug);

		if (!pages || pages.length === 0) {
			throw error(404, 'Page not found: ' + slug);
		}

		return { page: pages[0] };
	} catch (err) {
		if ((err as { status?: number })?.status === 404) throw err;
		const message = describeLoadError(err);
		console.error(message);
		throw error(500, `Failed to load page data: ${message}`);
	}
}
