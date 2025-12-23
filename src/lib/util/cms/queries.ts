/* ---------------------------------------- GRAPHQL QUERIES ---------------------------------------- */

// Page metadata queries
export const HOMEPAGE_QUERY = `
query {
	pages(filter: {slug: {_eq: "/"}}) {
		id
		slug
		Status
		page_name
	}
}`;

export const GLOBAL_QUERY = `
query {
	global {
		title
		description
	}
}`;

export const PAGE_QUERY = (slug: string) => `
query {
	pages(filter: {slug: {_eq: "${slug}"}}) {
		id
		slug
		Status
		page_name
	}
}`;

/* ---------------------------------------- BLOCK QUERIES ---------------------------------------- */

/**
 * Fetch hero block data.
 * Collection: block_hero
 * Fields match Directus schema with camelCase naming.
 */
export const HERO_BLOCK_QUERY = `
query {
	block_hero(limit: 1) {
		id
		eyebrow
		headline
		subheading
		subHeadline
		content
		buttons
		trustStats
		heroMedia {
			id
			filename_disk
		}
		heroBackground {
			id
			filename_disk
		}
	}
}`;

/**
 * Fetch services block with related service items.
 * Collection: block_services (wrapper) + services (items via junction)
 * Junction table: block_services_services
 */
export const SERVICES_BLOCK_QUERY = `
query {
	block_services(limit: 1) {
		id
		headline
		layout
		max_items
		services {
			services_id {
				id
				status
				sort
				title
				summary
				icon
				category
				link
				tone
			}
		}
	}
}`;

/**
 * Fetch stats block with related stat items.
 * Collection: block_stats (wrapper) + stats (items via junction)
 * Junction table: block_stats_stats
 */
export const STATS_BLOCK_QUERY = `
query {
	block_stats(limit: 1) {
		id
		headline
		layout
		stats {
			stats_id {
				id
				status
				icon
				header
				value
				prefix
				suffix
				label
				description
				delta_value
				delta_trend
			}
		}
	}
}`;
