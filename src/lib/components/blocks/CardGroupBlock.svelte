<script lang="ts">
	type CardItem = {
		title: string;
		description?: string;
		icon?: string;
		image?: string;
		link_url?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	const title = data.title as string | null;
	const items = (data.items as CardItem[]) ?? [];
</script>

<section class="card-group-block">
	<div class="card-group-block__inner">
		{#if title}
			<h2 class="card-group-block__title">{title}</h2>
		{/if}
		<div class="card-group-block__grid">
			{#each items as item, i (`card-${i}-${item.title}`)}
				{@const Tag = item.link_url ? 'a' : 'div'}
				<svelte:element
					this={Tag}
					href={item.link_url || undefined}
					class="card-group-block__item"
				>
					{#if item.icon}
						<div class="card-group-block__icon">{item.icon}</div>
					{/if}
					<h3 class="card-group-block__item-title">
						{item.title}
					</h3>
					{#if item.description}
						<p class="card-group-block__description">{item.description}</p>
					{/if}
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
		@apply block rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800;
	}

	.card-group-block__item:hover .card-group-block__item-title {
		@apply text-blue-600;
	}

	.card-group-block__icon {
		@apply mb-4 text-3xl;
	}

	.card-group-block__item-title {
		@apply text-xl font-semibold text-gray-900 transition-colors dark:text-white;
	}

	.card-group-block__description {
		@apply mt-3 leading-relaxed text-gray-600 dark:text-gray-400;
	}
</style>
