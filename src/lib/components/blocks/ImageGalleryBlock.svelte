<script lang="ts">
	type GalleryItem = {
		image?: string;
		caption?: string;
		video_url?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	const title = data.title as string | null;
	const items = (data.items as GalleryItem[]) ?? [];
</script>

<section class="py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if title}
			<h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{title}</h2>
		{/if}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each items as item, i (`gallery-${i}`)}
				<figure class="overflow-hidden rounded-lg">
					{#if item.video_url}
						<div class="aspect-video bg-gray-100 dark:bg-gray-800">
							<iframe src={item.video_url} title={item.caption ?? 'Video'} class="w-full h-full" allowfullscreen></iframe>
						</div>
					{:else if item.image}
						<img src={item.image} alt={item.caption ?? ''} class="w-full h-64 object-cover" />
					{/if}
					{#if item.caption}
						<figcaption class="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.caption}</figcaption>
					{/if}
				</figure>
			{/each}
		</div>
	</div>
</section>
