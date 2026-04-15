<script lang="ts">
	type TimelineItem = {
		year: string;
		title: string;
		description?: string;
	};

	let { data }: { data: Record<string, unknown> } = $props();

	const title = data.title as string | null;
	const items = (data.items as TimelineItem[]) ?? [];
</script>

<section class="py-16">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if title}
			<h2 class="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">{title}</h2>
		{/if}
		<div class="relative">
			<div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
			{#each items as item, i (`tl-${i}-${item.year}`)}
				<div class="relative flex items-start mb-12 {i % 2 === 0 ? 'md:flex-row-reverse' : ''}">
					<div class="absolute left-4 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-600 mt-2"></div>
					<div class="ml-12 md:ml-0 md:w-1/2 {i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}">
						<span class="text-sm font-bold text-blue-600">{item.year}</span>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-1">{item.title}</h3>
						{#if item.description}
							<p class="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
