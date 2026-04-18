import type { LoadEvent } from '@sveltejs/kit';

import { error } from '@sveltejs/kit';
import { fetchHomepage } from '$util/cms/queries';

function describeLoadError(error: unknown): string {
	if (error instanceof Error) return error.message;
	if (typeof error === 'string') return error;
	try {
		return JSON.stringify(error);
	} catch {
		return String(error);
	}
}

export async function load({ fetch }: LoadEvent) {
	try {
		const pages = await fetchHomepage(fetch);
		return { pages };
	} catch (err) {
		const message = describeLoadError(err);
		console.error(message);
		throw error(500, `Failed to load homepage data: ${message}`);
	}
}
