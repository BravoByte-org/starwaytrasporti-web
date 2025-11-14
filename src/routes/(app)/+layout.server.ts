import type { LoadEvent } from "@sveltejs/kit";

import { getDirectusData } from "$lib/server/directus";
import { GLOBAL_QUERY } from "$util/cms/queries";

export async function load({ fetch }: LoadEvent) {
	const response = await getDirectusData({fetch}, GLOBAL_QUERY);
	return {
		global: response?.data?.global || response?.global || null
	};
}