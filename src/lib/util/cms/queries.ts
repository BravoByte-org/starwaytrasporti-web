



/* ---------------------------------------- GRAPHQL QUERIES ---------------------------------------- */

export const HOMEPAGE_QUERY = `
query {
	pages(filter: {slug: {_eq: "/"}}) {
		id
		slug
		status
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
		status
		page_name
	}
}`;