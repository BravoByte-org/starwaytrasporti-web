import type { LoadEvent } from "@sveltejs/kit";

import { error } from "@sveltejs/kit";
import { getDirectusData } from "$lib/server/directus";
import { PAGE_QUERY } from "$util/cms/queries";

export async function load({ fetch, params }: LoadEvent) {
	
	let response = null;

	try {
		response = await getDirectusData({fetch}, PAGE_QUERY(params.slug));
	} catch (err) {
		console.error(err);
		throw error(500, "Failed to load page data: " + err);
	}

	if (!response?.data?.page || !response?.page) {
		console.error("Page not found: ", params.slug);
		throw error(404, "Page not found: " + params.slug);
	}

	return {
		page: response?.data?.page || response?.page || null
	};
}

