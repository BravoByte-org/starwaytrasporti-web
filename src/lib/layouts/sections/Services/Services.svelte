<script>
	import * as m from '$paraglide/messages';
	import { onMount } from 'svelte';

	let {
		enableAnimations = true,
		layout = 'grid', // 'grid' or 'list'
		variant = 'default' // 'default', 'compact', 'detailed'
	} = $props();

	let servicesSection = $state(null);
	let servicesVisible = $state(false);
	let reducedMotion = $state(false);

	onMount(() => {
		// Check for reduced motion preference
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (enableAnimations && !reducedMotion) {
			const updateScrollY = () => {
				if (servicesSection && !servicesVisible) {
					const rect = servicesSection.getBoundingClientRect();
					if (rect.top < window.innerHeight * 0.8) {
						servicesVisible = true;
					}
				}
			};

			window.addEventListener('scroll', updateScrollY);
			// Initial check
			updateScrollY();

			return () => {
				window.removeEventListener('scroll', updateScrollY);
			};
		} else {
			// Show immediately if animations disabled
			servicesVisible = true;
		}
	});

	const services = [
		{
			icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
			color: 'blue',
			titleKey: 'service_national_title',
			descKey: 'service_national_desc'
		},
		{
			icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064',
			color: 'green',
			titleKey: 'service_international_title',
			descKey: 'service_international_desc'
		},
		{
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
			color: 'purple',
			titleKey: 'service_express_title',
			descKey: 'service_express_desc'
		}
	];

	const colorClasses = {
		blue: 'bg-blue-600',
		green: 'bg-green-600',
		purple: 'bg-purple-600'
	};
</script>

<!-- Services Section -->
<section class="services-section bg-white dark:bg-gray-900 py-20" bind:this={servicesSection} class:variant-{variant} data-testid="services-section">
	<div class="container mx-auto px-4">
		<div class="text-center mb-16" class:animate-in={servicesVisible && enableAnimations}>
			<h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				{m.nav_services()}
			</h2>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				{m.services_subtitle()}
			</p>
		</div>

		<div class="services-container" class:layout-{layout}>
			{#each services as service, index}
				<div class="service-card bg-gray-50 dark:bg-gray-800 p-8 rounded-xl" 
					 class:animate-in={servicesVisible && enableAnimations} 
					 style="animation-delay: {(index + 1) * 0.1}s">
					<div class="service-icon w-16 h-16 {colorClasses[service.color]} rounded-lg flex items-center justify-center mb-6">
						<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={service.icon}/>
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">{m[service.titleKey]()}</h3>
					<p class="text-gray-600 dark:text-gray-300">{m[service.descKey]()}</p>
					
					{#if variant === 'detailed'}
						<div class="mt-6">
							<button class="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
								Learn More →
							</button>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.services-section {
		position: relative;
		z-index: 5;
	}

	.services-container.layout-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
	}

	.services-container.layout-list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.layout-list .service-card {
		display: flex;
		align-items: flex-start;
		gap: 1.5rem;
		text-align: left;
	}

	.layout-list .service-icon {
		flex-shrink: 0;
	}

	.service-card {
		transition: all 0.3s ease;
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.service-card:hover {
		@apply transform -translate-y-2 shadow-xl;
	}

	/* Compact variant */
	.variant-compact {
		padding: 3rem 0;
	}

	.variant-compact .service-card {
		padding: 1.5rem;
	}

	.variant-compact .service-icon {
		width: 3rem;
		height: 3rem;
	}

	.variant-compact h3 {
		font-size: 1.125rem;
		margin-bottom: 0.75rem;
	}

	.variant-compact p {
		font-size: 0.875rem;
	}

	/* Detailed variant */
	.variant-detailed .service-card {
		padding: 2.5rem;
	}

	/* Scroll-triggered animations */
	.animate-in {
		animation: slideInUp 0.8s ease-out both;
	}

	/* Accessibility: Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.animate-in {
			animation: none !important;
			transform: none !important;
			opacity: 1 !important;
		}

		.service-card:hover {
			transform: none !important;
		}
	}

	@keyframes slideInUp {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.services-container.layout-grid {
			grid-template-columns: 1fr;
		}

		.layout-list .service-card {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
