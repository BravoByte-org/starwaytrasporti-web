import type { LoadEvent } from "@sveltejs/kit";

import { error } from "@sveltejs/kit";
import { fetchPage } from "$util/cms/queries";

export async function load({ fetch, params }: LoadEvent) {
	try {
		const pages = await fetchPage(fetch, params.slug!);

		if (!pages || pages.length === 0) {
			throw error(404, "Page not found: " + params.slug);
		}

		return { page: pages[0] };
	} catch (err) {
		if ((err as { status?: number })?.status === 404) throw err;
		console.error(err);
		throw error(500, "Failed to load page data: " + err);
	}
}

