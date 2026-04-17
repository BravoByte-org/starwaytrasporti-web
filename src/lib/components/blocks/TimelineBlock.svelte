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

<section class="timeline-block">
	<div class="timeline-block__inner">
		{#if title}
			<h2 class="timeline-block__title">{title}</h2>
		{/if}
		<div class="timeline-block__timeline">
			<div class="timeline-block__line"></div>
			{#each items as item, i (`tl-${i}-${item.year}`)}
				<div
					class="timeline-block__entry"
					class:timeline-block__entry--reverse={i % 2 === 0}
				>
					<div class="timeline-block__dot"></div>
					<div
						class="timeline-block__content"
						class:timeline-block__content--reverse={i % 2 === 0}
					>
						<span class="timeline-block__year">{item.year}</span>
						<h3 class="timeline-block__entry-title">{item.title}</h3>
						{#if item.description}
							<p class="timeline-block__description">{item.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.timeline-block {
		@apply py-16;
	}

	.timeline-block__inner {
		@apply mx-auto max-w-4xl px-4 sm:px-6 lg:px-8;
	}

	.timeline-block__title {
		@apply mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white;
	}

	.timeline-block__timeline {
		@apply relative;
	}

	.timeline-block__line {
		@apply absolute bottom-0 top-0 left-4 w-0.5 bg-gray-200 dark:bg-gray-700 md:left-1/2;
	}

	.timeline-block__entry {
		@apply relative mb-12 flex items-start;
	}

	.timeline-block__entry--reverse {
		@apply md:flex-row-reverse;
	}

	.timeline-block__dot {
		@apply absolute left-4 mt-2 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-600 md:left-1/2;
	}

	.timeline-block__content {
		@apply ml-12 md:ml-0 md:w-1/2 md:pl-12;
	}

	.timeline-block__content--reverse {
		@apply md:pr-12 md:text-right;
	}

	.timeline-block__year {
		@apply text-sm font-bold text-blue-600;
	}

	.timeline-block__entry-title {
		@apply mt-1 text-lg font-semibold text-gray-900 dark:text-white;
	}

	.timeline-block__description {
		@apply mt-2 text-gray-600 dark:text-gray-400;
	}
</style>
