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

<section class="py-16">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if title}
			<h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{title}</h2>
		{/if}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each items as item, i (`card-${i}-${item.title}`)}
				{@const Tag = item.link_url ? 'a' : 'div'}
				<svelte:element
					this={Tag}
					href={item.link_url || undefined}
					class="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-gray-700"
				>
					{#if item.icon}
						<div class="text-3xl mb-4">{item.icon}</div>
					{/if}
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
						{item.title}
					</h3>
					{#if item.description}
						<p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
					{/if}
				</svelte:element>
			{/each}
		</div>
	</div>
</section>
