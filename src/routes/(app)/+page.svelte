<script lang="ts">
	import type { PageData } from './$types';
	import BlockRenderer from '$components/blocks/BlockRenderer.svelte';

	let { data }: { data: PageData } = $props();

	let page = $derived(
		((data.pages?.[0] as Record<string, unknown> | undefined) ?? {}) as Record<string, unknown>
	);
	let title = $derived((page.title as string | undefined) ?? 'Starway Trasporti');
	let blocks = $derived(
		(page.blocks as Array<{ collection: string; item: Record<string, unknown> }> | undefined) ?? []
	);
</script>

<svelte:head>
	<title>{(page.seo_title as string | undefined) ?? title} | Starway Trasporti</title>
	{#if page.seo_description}
		<meta name="description" content={page.seo_description as string} />
	{/if}
</svelte:head>

{#if blocks.length > 0}
	<BlockRenderer {blocks} />
{:else}
	<section class="page-fallback">
		<div class="page-fallback__inner">
			<h1 class="page-fallback__title">{title}</h1>
		</div>
	</section>
{/if}

<style lang="postcss">
	@reference "../../app.css";

	.page-fallback {
		@apply py-16;
	}

	.page-fallback__inner {
		@apply mx-auto max-w-4xl px-4 sm:px-6 lg:px-8;
	}

	.page-fallback__title {
		@apply text-4xl font-bold text-gray-900 dark:text-white;
	}
</style>
