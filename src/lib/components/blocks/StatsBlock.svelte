<script lang="ts">
	type StatItem = {
		value: string;
		label: string;
		description?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	let title = $derived((data.title as string | null | undefined) ?? null);
	let items = $derived((data.items as StatItem[] | undefined) ?? []);
</script>

<section class="stats-block">
	<div class="stats-block__inner">
		{#if title}
			<h2 class="stats-block__title">{title}</h2>
		{/if}
		<div class="stats-block__grid">
			{#each items as item, i (`stat-${i}-${item.label}`)}
				<div class="stats-block__item">
					<div class="stats-block__value">{item.value}</div>
					<div class="stats-block__label">{item.label}</div>
					{#if item.description}
						<p class="stats-block__description">{item.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.stats-block {
		@apply bg-gray-50 py-16 dark:bg-gray-900;
	}

	.stats-block__inner {
		@apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
	}

	.stats-block__title {
		@apply mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white;
	}

	.stats-block__grid {
		@apply grid grid-cols-2 gap-8 md:grid-cols-4;
	}

	.stats-block__item {
		@apply text-center;
	}

	.stats-block__value {
		@apply text-4xl font-bold text-blue-600 md:text-5xl;
	}

	.stats-block__label {
		@apply mt-2 text-lg font-semibold text-gray-900 dark:text-white;
	}

	.stats-block__description {
		@apply mt-1 text-sm text-gray-500 dark:text-gray-400;
	}
</style>
