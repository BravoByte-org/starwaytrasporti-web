import type { LoadEvent } from "@sveltejs/kit";

import { error } from "@sveltejs/kit";
import { getDirectusData } from "$lib/server/directus";
import { HOMEPAGE_QUERY } from "$util/cms/queries";

export async function load({ fetch }: LoadEvent) {
	let homepageData = null;

	try {
		homepageData = await getDirectusData({fetch}, HOMEPAGE_QUERY);
	} catch (err) {
		console.error(err);
		throw error(500, "Failed to load homepage data: " + err);
	}
	
	return homepageData;
}

