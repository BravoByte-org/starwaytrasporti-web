<script>
	import * as m from '$paraglide/messages';
	import { onMount } from 'svelte';

	let {
		enableAnimations = true,
		backgroundColor = 'blue', // 'blue', 'dark', 'gradient'
		layout = 'horizontal' // 'horizontal', 'vertical'
	} = $props();

	let statsSection = $state(null);
	let statsVisible = $state(false);
	let reducedMotion = $state(false);

	onMount(() => {
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (enableAnimations && !reducedMotion) {
			const updateScrollY = () => {
				if (statsSection && !statsVisible) {
					const rect = statsSection.getBoundingClientRect();
					if (rect.top < window.innerHeight * 0.8) {
						statsVisible = true;
					}
				}
			};

			window.addEventListener('scroll', updateScrollY);
			updateScrollY();

			return () => {
				window.removeEventListener('scroll', updateScrollY);
			};
		} else {
			statsVisible = true;
		}
	});

	const stats = [
		{ value: '500+', labelKey: 'stats_clients' },
		{ value: '10K+', labelKey: 'stats_deliveries' },
		{ value: '98%', labelKey: 'stats_punctuality' },
		{ value: '24/7', labelKey: 'stats_support' }
	];

	const backgroundClasses = {
		blue: 'bg-blue-600',
		dark: 'bg-gray-900',
		gradient: 'bg-gradient-to-r from-blue-600 to-purple-600'
	};
</script>

<!-- Stats Section -->
<section class="stats-section py-20 {backgroundClasses[backgroundColor]}" bind:this={statsSection} data-testid="stats-section">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16" class:animate-in={statsVisible && enableAnimations}>
			<h2 class="text-4xl font-bold text-white mb-4">
				{m.stats_title()}
			</h2>
			<p class="text-xl text-blue-100 max-w-2xl mx-auto">
				{m.stats_subtitle()}
			</p>
		</div>

		<div class="stats-container layout-{layout}">
			{#each stats as stat, index}
				<div class="stat-item" 
					 class:animate-in={statsVisible && enableAnimations} 
					 style="animation-delay: {(index + 1) * 0.1}s">
					<div class="text-5xl font-bold text-white mb-2">{stat.value}</div>
					<p class="text-blue-100">{m[stat.labelKey]()}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.stats-container.layout-horizontal {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
		text-align: center;
	}

	.stats-container.layout-vertical {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 600px;
		margin: 0 auto;
	}

	.layout-vertical .stat-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 0.75rem;
	}

	.layout-vertical .stat-item div {
		font-size: 2.5rem;
		margin-bottom: 0;
	}

	.stat-item {
		opacity: 0;
		transform: translateY(30px);
	}

	.stat-item.animate-in {
		animation: fadeInUp 0.6s ease-out both;
	}

	/* Accessibility: Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.animate-in,
		.stat-item {
			animation: none !important;
			transform: none !important;
			opacity: 1 !important;
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.stats-container.layout-horizontal {
			grid-template-columns: repeat(2, 1fr);
		}

		.layout-vertical .stat-item {
			flex-direction: column;
			text-align: center;
		}

		.layout-vertical .stat-item div {
			font-size: 2rem;
			margin-bottom: 0.5rem;
		}
	}
</style>
