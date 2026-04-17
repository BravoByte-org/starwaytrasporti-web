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

<section class="image-gallery-block">
	<div class="image-gallery-block__inner">
		{#if title}
			<h2 class="image-gallery-block__title">{title}</h2>
		{/if}
		<div class="image-gallery-block__grid">
			{#each items as item, i (`gallery-${i}`)}
				<figure class="image-gallery-block__figure">
					{#if item.video_url}
						<div class="image-gallery-block__frame">
							<iframe src={item.video_url} title={item.caption ?? 'Video'} class="image-gallery-block__media" allowfullscreen></iframe>
						</div>
					{:else if item.image}
						<img src={item.image} alt={item.caption ?? ''} class="image-gallery-block__image" />
					{/if}
					{#if item.caption}
						<figcaption class="image-gallery-block__caption">{item.caption}</figcaption>
					{/if}
				</figure>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.image-gallery-block {
		@apply py-16;
	}

	.image-gallery-block__inner {
		@apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
	}

	.image-gallery-block__title {
		@apply mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white;
	}

	.image-gallery-block__grid {
		@apply grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3;
	}

	.image-gallery-block__figure {
		@apply overflow-hidden rounded-lg;
	}

	.image-gallery-block__frame {
		@apply aspect-video bg-gray-100 dark:bg-gray-800;
	}

	.image-gallery-block__media {
		@apply h-full w-full;
	}

	.image-gallery-block__image {
		@apply h-64 w-full object-cover;
	}

	.image-gallery-block__caption {
		@apply mt-2 text-sm text-gray-500 dark:text-gray-400;
	}
</style>
