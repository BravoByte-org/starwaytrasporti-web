<script lang="ts">
	import StatCard from './Stat.svelte';
	import type { StatData } from '$lib/mocks/stats';

	let {
		stats = [],
		heading,
		description
	}: {
		stats?: StatData[];
		heading?: string;
		description?: string;
	} = $props();
</script>

<section class="stats-section">
	<div class="content-well">
		{#if heading || description}
			<header class="section-head">
				{#if heading}
					<h2>{heading}</h2>
				{/if}
				{#if description}
					<p class="lede">{description}</p>
				{/if}
			</header>
		{/if}

		<div class="grid">
			{#each stats as stat (stat.id)}
				<div class="stat-wrapper">
					<StatCard {stat} />
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.stats-section {
		width: 100%;
		padding: clamp(2rem, 5vw, 4rem) 0;
		background: linear-gradient(to bottom right, #020617, #0f172a);
		color: #e8eef8;
	}

	.content-well {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 clamp(1rem, 4vw, 2rem);
		display: grid;
		gap: 2rem;
	}

	.section-head {
		max-width: 720px;
		margin: 0 auto;
		text-align: center;
		display: grid;
		gap: 0.5rem;
	}

	h2 {
		font-size: clamp(1.8rem, 3vw, 2.6rem);
		font-weight: 600;
		margin: 0;
		letter-spacing: -0.01em;
		color: #fff;
	}

	.lede {
		color: #b7c1d9;
		margin: 0;
		font-size: 1rem;
	}

	/* Mobile: horizontal scroll carousel showing 1.5 cards */
	.grid {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		padding-bottom: 0.5rem;
		/* Hide scrollbar but keep functionality */
		scrollbar-width: none;
		-ms-overflow-style: none;
		/* Fade effect on right edge */
		mask-image: linear-gradient(to right, black 70%, transparent 100%);
		-webkit-mask-image: linear-gradient(to right, black 70%, transparent 100%);
	}

	.grid::-webkit-scrollbar {
		display: none;
	}

	.stat-wrapper {
		flex: 0 0 calc(75% - 0.5rem);
		scroll-snap-align: start;
	}

	/* Tablet portrait and above: 2 columns grid */
	@media (min-width: 768px) {
		.grid {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			overflow-x: visible;
			scroll-snap-type: none;
			mask-image: none;
			-webkit-mask-image: none;
		}

		.stat-wrapper {
			flex: none;
		}
	}

	/* Desktop: flex-wrap with centered cards for balanced rows */
	@media (min-width: 1024px) {
		.grid {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 1.5rem;
		}

		.stat-wrapper {
			flex: 0 0 calc(25% - 1.125rem); /* 4 per row with gap */
			min-width: 220px;
		}
	}

	/* Large desktop: ensure 4 columns don't get too wide */
	@media (min-width: 1280px) {
		.stat-wrapper {
			flex: 0 0 calc(25% - 1.125rem);
			max-width: 280px;
		}
	}
</style>
