import type { LoadEvent } from "@sveltejs/kit";

import { error } from "@sveltejs/kit";
import { fetchHomepage } from "$util/cms/queries";

export async function load({ fetch }: LoadEvent) {
	try {
		const pages = await fetchHomepage(fetch);
		return { pages };
	} catch (err) {
		console.error(err);
		throw error(500, "Failed to load homepage data: " + err);
	}
}

