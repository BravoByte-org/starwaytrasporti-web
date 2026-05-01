<script lang="ts">
	/*
	 * BlockRenderer — binds Starway's Directus block schema to renderable
	 * components.
	 *
	 * Why per-app: the mapping from Directus collection → component +
	 * data adapter is inherently client-local (each app's CMS schema
	 * differs). Generic block markup lives in `@bravobyte-org/frontend-core`;
	 * brand-shell blocks (`HeroBlock`) stay here.
	 *
	 * Surface routing: blocks that should punch out as dark slabs in the
	 * editorial rhythm are tagged with `surface: 'inverse'` here. The role
	 * tokens swap with `prefers-color-scheme` (see ADR-007), so dark mode
	 * is automatic.
	 *
	 * Data adapters: per-block `adapt` functions normalise Directus item
	 * shapes onto the canonical `*BlockData` shapes shipped by frontend-core
	 * (`headline → title`, `photo → portrait_url`, etc.). Keeping this in
	 * one file makes the gap visible in PRs and easy to remove once the
	 * Directus schemas align with the canonical shapes.
	 */
	import {
		CardGroupBlock,
		CtaBlock,
		ImageGalleryBlock,
		RichTextBlock,
		StatsBlock,
		TeamBlock,
		TimelineBlock,
		type SectionSurface
	} from '@bravobyte-org/frontend-core';
	import type { Component } from 'svelte';
	import HeroBlock from './HeroBlock.svelte';

	type Block = {
		collection: string;
		item: Record<string, unknown>;
	};

	/*
	 * Each block has a different required `data` shape; the renderer is the
	 * single boundary that maps Directus collection → component + adapter,
	 * so a permissive component prop type is correct here. The `adapt`
	 * function is what actually enforces shape correctness at runtime.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type AnyBlockComponent = Component<{ data: any; surface?: SectionSurface }>;

	type BlockEntry = {
		component: AnyBlockComponent;
		surface?: SectionSurface;
		adapt?: (item: Record<string, unknown>) => Record<string, unknown>;
	};

	let { blocks = [] }: { blocks: Block[] } = $props();

	const componentMap: Record<string, BlockEntry> = {
		block_hero: { component: HeroBlock },

		block_rich_text: { component: RichTextBlock },

		block_stats: {
			component: StatsBlock,
			surface: 'inverse'
		},

		block_card_group: {
			component: CardGroupBlock,
			adapt: (item) => ({
				...item,
				/* Directus items expose `description`; frontend-core prefers `summary` but accepts both. */
				items: Array.isArray(item.items) ? item.items : []
				/* Note: card images aren't yet supported by frontend-core CardGroup —
				   tracked for `frontend-core@1.3.0` (see extraction-strategy.md). */
			})
		},

		block_team: {
			component: TeamBlock,
			adapt: (item) => ({
				...item,
				members: Array.isArray(item.members)
					? item.members.map((m: Record<string, unknown>) => ({
							...m,
							portrait_url: m.portrait_url ?? m.photo ?? null
						}))
					: []
			})
		},

		block_timeline: { component: TimelineBlock },

		block_cta: {
			component: CtaBlock,
			surface: 'inverse',
			adapt: (item) => ({
				eyebrow: item.eyebrow ?? null,
				title: item.title ?? item.headline ?? null,
				subtitle: item.subtitle ?? item.description ?? null,
				primary_label: item.primary_label ?? item.button_text ?? null,
				primary_url: item.primary_url ?? item.button_url ?? null,
				secondary_label: item.secondary_label ?? null,
				secondary_url: item.secondary_url ?? null
			})
		},

		block_image_gallery: {
			component: ImageGalleryBlock,
			adapt: (item) => ({
				...item,
				items: Array.isArray(item.items)
					? item.items.map((g: Record<string, unknown>) => ({
							...g,
							src: g.src ?? g.image ?? null
						}))
					: []
				/* Note: video URLs in galleries aren't yet supported by frontend-core ImageGallery —
				   tracked for `frontend-core@1.3.0` (see extraction-strategy.md). */
			})
		}
	};
</script>

{#each blocks as block, i (`${block.collection}-${i}`)}
	{@const entry = componentMap[block.collection]}
	{#if entry}
		{@const data = entry.adapt ? entry.adapt(block.item) : block.item}
		<entry.component {data} surface={entry.surface} />
	{/if}
{/each}
