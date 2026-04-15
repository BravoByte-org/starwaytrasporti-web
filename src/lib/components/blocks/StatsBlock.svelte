<script lang="ts">
	type StatItem = {
		value: string;
		label: string;
		description?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	const title = data.title as string | null;
	const items = (data.items as StatItem[]) ?? [];
</script>

<section class="py-16 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if title}
			<h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{title}</h2>
		{/if}
		<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
			{#each items as item, i (`stat-${i}-${item.label}`)}
				<div class="text-center">
					<div class="text-4xl md:text-5xl font-bold text-blue-600">{item.value}</div>
					<div class="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{item.label}</div>
					{#if item.description}
						<p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
