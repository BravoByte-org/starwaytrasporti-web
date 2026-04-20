<script lang="ts">
	import { resolveAssetUrl, type DirectusFileRef } from '$lib/util/cms/assets';

	type CardItem = {
		title: string;
		description?: string;
		icon?: string;
		image?: DirectusFileRef;
		link_url?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	let title = $derived((data.title as string | null | undefined) ?? null);
	let items = $derived((data.items as CardItem[] | undefined) ?? []);
</script>

<section class="card-group-block">
	<div class="card-group-block__inner">
		{#if title}
			<h2 class="card-group-block__title">{title}</h2>
		{/if}
		<div class="card-group-block__grid">
			{#each items as item, i (`card-${i}-${item.title}`)}
				{@const Tag = item.link_url ? 'a' : 'div'}
				{@const imageUrl = resolveAssetUrl(item.image)}
				<svelte:element
					this={Tag}
					href={item.link_url || undefined}
					class="card-group-block__item"
					class:card-group-block__item--has-image={imageUrl}
				>
					{#if imageUrl}
						<div
							class="card-group-block__media"
							style="background-image: url({imageUrl})"
							aria-hidden="true"
						></div>
						<div class="card-group-block__overlay" aria-hidden="true"></div>
					{/if}
					<div class="card-group-block__content">
						{#if item.icon}
							<div class="card-group-block__icon">{item.icon}</div>
						{/if}
						<h3 class="card-group-block__item-title">
							{item.title}
						</h3>
						{#if item.description}
							<p class="card-group-block__description">{item.description}</p>
						{/if}
					</div>
				</svelte:element>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.card-group-block {
		@apply py-16;
	}

	.card-group-block__inner {
		@apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
	}

	.card-group-block__title {
		@apply mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white;
	}

	.card-group-block__grid {
		@apply grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3;
	}

	.card-group-block__item {
		@apply relative block overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800;
	}

	/* Image-backed variant: min-height so the media layer has something to fill,
	   text color flipped to white for contrast over the dark overlay. */
	.card-group-block__item--has-image {
		@apply min-h-64 border-transparent bg-transparent text-white;
	}

	.card-group-block__item:hover .card-group-block__item-title {
		@apply text-blue-600;
	}

	.card-group-block__item--has-image:hover .card-group-block__item-title {
		@apply text-white;
	}

	.card-group-block__media {
		@apply absolute inset-0 bg-cover bg-center transition-transform duration-300;
	}

	.card-group-block__item--has-image:hover .card-group-block__media {
		transform: scale(1.04);
	}

	.card-group-block__overlay {
		@apply absolute inset-0;
		background: linear-gradient(180deg, rgba(15, 23, 42, 0.25) 0%, rgba(15, 23, 42, 0.75) 100%);
	}

	.card-group-block__content {
		@apply relative;
	}

	.card-group-block__item--has-image .card-group-block__content {
		@apply flex h-full flex-col justify-end;
	}

	.card-group-block__icon {
		@apply mb-4 text-3xl;
	}

	.card-group-block__item-title {
		@apply text-xl font-semibold text-gray-900 transition-colors dark:text-white;
	}

	.card-group-block__item--has-image .card-group-block__item-title {
		@apply text-white;
	}

	.card-group-block__description {
		@apply mt-3 leading-relaxed text-gray-600 dark:text-gray-400;
	}

	.card-group-block__item--has-image .card-group-block__description {
		@apply text-white/90;
	}
</style>
