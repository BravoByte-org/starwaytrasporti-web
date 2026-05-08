import { requestDirectus, requestDirectusPreview, readItems } from '$lib/server/directus';

/** M2A `pages.blocks` → nested block payloads (Directus many-to-any field syntax). */
const PAGE_BLOCK_FIELDS = [
	'blocks.id',
	'blocks.sort',
	'blocks.collection',
	'blocks.item:block_hero.*',
	'blocks.item:block_rich_text.*',
	'blocks.item:block_stats.*',
	'blocks.item:block_stats.items.*',
	'blocks.item:block_card_group.*',
	'blocks.item:block_card_group.items.*',
	'blocks.item:block_team.*',
	'blocks.item:block_team.members.*',
	'blocks.item:block_timeline.*',
	'blocks.item:block_timeline.items.*',
	'blocks.item:block_cta.*',
	'blocks.item:block_image_gallery.*',
	'blocks.item:block_image_gallery.items.*'
] as const;

/*
 * Site scoping (`site.key === 'starway'`) stays in both modes — preview only
 * loosens the publication filter so editors can render `draft` pages, never
 * the cross-site filter.
 */
const STARWAY_SITE_FILTER = { site: { key: { _eq: 'starway' } } } as const;

function buildStatusFilter(preview: boolean) {
	return preview ? { status: { _in: ['draft', 'published'] } } : { status: { _eq: 'published' } };
}

function buildStarwayPageFilter(preview: boolean) {
	return { ...STARWAY_SITE_FILTER, ...buildStatusFilter(preview) };
}

function buildPageSlugFilter(slug: string) {
	const normalized = slug === '/' ? '/' : slug.startsWith('/') ? slug : `/${slug}`;

	if (normalized === '/') {
		return { slug: { _eq: '/' } };
	}

	return {
		_or: [{ slug: { _eq: normalized } }, { slug: { _eq: normalized.slice(1) } }]
	};
}

export type PreviewOptions = { preview?: boolean };

export async function fetchNavigation(fetch: typeof globalThis.fetch, key: string) {
	const navs = await requestDirectus<Record<string, unknown>[]>(
		readItems('navigation', {
			filter: { key: { _eq: key }, is_active: { _eq: true } },
			fields: ['id', 'key'],
			limit: 1
		}),
		fetch
	);

	if (!navs || navs.length === 0) return [];

	return requestDirectus<Record<string, unknown>[]>(
		readItems('navigation_items', {
			filter: { navigation: { _eq: navs[0].id }, parent: { _null: true } },
			fields: [
				'id',
				'title',
				'url',
				'open_in_new_tab',
				'sort',
				'page.slug',
				'page.title',
				'children.id',
				'children.title',
				'children.url',
				'children.open_in_new_tab',
				'children.sort',
				'children.page.slug',
				'children.page.title'
			],
			sort: ['sort']
		}),
		fetch
	);
}

export async function fetchHomepage(
	fetch: typeof globalThis.fetch,
	options: PreviewOptions = {}
) {
	const preview = options.preview ?? false;
	return requestDirectusPreview<Record<string, unknown>[]>(
		readItems('pages', {
			filter: { _and: [buildStarwayPageFilter(preview), { slug: { _eq: '/' } }] } as any,
			fields: [
				'id',
				'slug',
				'status',
				'title',
				'template_type',
				'site',
				'seo_title',
				'seo_description',
				...PAGE_BLOCK_FIELDS
			]
		}),
		fetch,
		{ preview }
	);
}

export async function fetchPage(
	fetch: typeof globalThis.fetch,
	slug: string,
	options: PreviewOptions = {}
) {
	const preview = options.preview ?? false;
	return requestDirectusPreview<Record<string, unknown>[]>(
		readItems('pages', {
			filter: { _and: [buildStarwayPageFilter(preview), buildPageSlugFilter(slug)] } as any,
			fields: [
				'id',
				'slug',
				'status',
				'title',
				'template_type',
				'seo_title',
				'seo_description',
				'featured_image',
				'taxonomy_context.*',
				'term.*',
				'site.name',
				'site.key',
				...PAGE_BLOCK_FIELDS
			]
		}),
		fetch,
		{ preview }
	);
}
