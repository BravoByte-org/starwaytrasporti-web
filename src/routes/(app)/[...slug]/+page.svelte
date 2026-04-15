<script lang="ts">
	import type { PageData } from './$types';
	import BlockRenderer from '$components/blocks/BlockRenderer.svelte';

	let { data }: { data: PageData } = $props();

	const { page } = data;
	const title = (page as Record<string, unknown>).title as string;
	const blocks = ((page as Record<string, unknown>).blocks as Array<{ collection: string; item: Record<string, unknown> }>) ?? [];
</script>

<svelte:head>
	<title>{(page as Record<string, unknown>).seo_title ?? title} | Starway Trasporti</title>
	{#if (page as Record<string, unknown>).seo_description}
		<meta name="description" content={(page as Record<string, unknown>).seo_description as string} />
	{/if}
</svelte:head>

{#if blocks.length > 0}
	<BlockRenderer {blocks} />
{:else}
	<section class="py-16">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white">{title}</h1>
		</div>
	</section>
{/if}
