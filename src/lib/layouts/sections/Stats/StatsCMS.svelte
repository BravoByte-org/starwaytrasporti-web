<script>
	import * as m from '$paraglide/messages';

	let { statsData = null } = $props();

	// Fallback content when no CMS data is available
	const fallbackStats = {
		title: m.stats_title(),
		subtitle: m.stats_subtitle(),
		stats: [
			{
				value: m.stats_clients(),
				label: 'Active Clients',
				description: 'Trusted by businesses across Italy',
				icon: 'users',
				animationType: 'fadein'
			},
			{
				value: m.stats_deliveries(),
				label: 'Deliveries per Month',
				description: 'Reliable and on-time delivery',
				icon: 'truck',
				animationType: 'fadein'
			},
			{
				value: m.stats_punctuality(),
				label: 'On-Time Delivery',
				description: 'Commitment to punctuality',
				icon: 'clock',
				animationType: 'fadein'
			},
			{
				value: m.stats_support(),
				label: 'Customer Support',
				description: 'Available when you need us',
				icon: 'heart',
				animationType: 'fadein'
			}
		],
		backgroundColor: 'blue',
		layout: 'horizontal',
		enableAnimations: true
	};

	// Use CMS data or fallback
	const stats = statsData || fallbackStats;

	// Icon mapping
	const iconMap = {
		users: '👥',
		truck: '🚛',
		clock: '⏰',
		shield: '🛡️',
		star: '⭐',
		heart: '❤️'
	};

	// Background color classes
	const backgroundClasses = {
		blue: 'bg-gradient-to-r from-blue-600 to-blue-800',
		dark: 'bg-gradient-to-r from-gray-800 to-gray-900',
		gradient: 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600'
	};

	// Accessibility: Detect reduced motion preference
	let reducedMotion = $state(false);
	
	// Intersection observer for animation triggers
	let sectionElement = $state();
	let isVisible = $state(false);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
			reducedMotion = mediaQuery.matches;
			
			const handleChange = (e) => {
				reducedMotion = e.matches;
			};
			
			mediaQuery.addEventListener('change', handleChange);
			
			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	});

	$effect(() => {
		if (sectionElement && typeof window !== 'undefined') {
			const observer = new IntersectionObserver(
				([entry]) => {
					isVisible = entry.isIntersecting;
				},
				{ threshold: 0.3 }
			);

			observer.observe(sectionElement);

			return () => {
				observer.disconnect();
			};
		}
	});

	// Determine if animations should be enabled
	const animationsEnabled = stats.enableAnimations && !reducedMotion;
</script>

<section 
	bind:this={sectionElement}
	class="stats-section layout-{stats.layout || 'horizontal'} {backgroundClasses[stats.backgroundColor] || backgroundClasses.blue}" 
	class:reduced-motion={reducedMotion}
	data-testid="stats-section"
>
	<div class="container">
		<!-- Section header -->
		<div class="section-header">
			<h2 class="section-title" class:animate={animationsEnabled && isVisible}>
				{stats.title}
			</h2>
			
			{#if stats.subtitle}
				<p class="section-subtitle" class:animate={animationsEnabled && isVisible}>
					{stats.subtitle}
				</p>
			{/if}
		</div>

		<!-- Stats grid -->
		<div class="stats-container">
			{#each stats.stats || [] as stat, index}
				<div 
					class="stat-card"
					class:animate={animationsEnabled && isVisible}
					style="animation-delay: {animationsEnabled ? (index * 0.15) : 0}s"
				>
					{#if stat.icon}
						<div class="stat-icon">
							<span class="icon-emoji" role="img" aria-label={stat.label}>
								{iconMap[stat.icon] || iconMap.star}
							</span>
						</div>
					{/if}

					<div class="stat-content">
						<div class="stat-value" class:countup={stat.animationType === 'countup' && animationsEnabled && isVisible}>
							{stat.value}
						</div>
						<p class="stat-label">{stat.label}</p>
						
						{#if stat.description}
							<p class="stat-description">{stat.description}</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.stats-section {
		@apply py-20 text-white;
	}

	.container {
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
	}

	/* Section header */
	.section-header {
		@apply text-center mb-16;
	}

	.section-title {
		@apply text-3xl md:text-4xl font-bold mb-4;
	}

	.section-title.animate {
		animation: fadeInUp 0.8s ease-out;
	}

	.section-subtitle {
		@apply text-xl text-blue-100 max-w-3xl mx-auto;
	}

	.section-subtitle.animate {
		animation: fadeInUp 0.8s ease-out 0.2s both;
	}

	/* Stats container */
	.stats-container {
		@apply grid gap-8;
	}

	.layout-horizontal .stats-container {
		@apply md:grid-cols-2 lg:grid-cols-4;
	}

	.layout-vertical .stats-container {
		@apply md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto;
	}

	/* Stat cards */
	.stat-card {
		@apply text-center p-6;
	}

	.stat-card.animate {
		animation: fadeInUp 0.8s ease-out both;
	}

	.layout-vertical .stat-card {
		@apply flex items-center text-left space-x-6 bg-white/10 rounded-xl p-8;
	}

	/* Stat icon */
	.stat-icon {
		@apply mb-4;
	}

	.layout-vertical .stat-icon {
		@apply mb-0 flex-shrink-0;
	}

	.icon-emoji {
		@apply text-4xl;
	}

	/* Stat content */
	.stat-content {
		@apply flex-1;
	}

	.stat-value {
		@apply text-4xl md:text-5xl font-bold mb-2;
	}

	.stat-value.countup {
		animation: countUp 2s ease-out;
	}

	.stat-label {
		@apply text-lg font-semibold mb-2;
	}

	.stat-description {
		@apply text-blue-100 text-sm;
	}

	.layout-vertical .stat-description {
		@apply text-white/80;
	}

	/* Animations */
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

	@keyframes countUp {
		from {
			opacity: 0;
			transform: scale(0.5);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* Reduced motion */
	.reduced-motion .section-title,
	.reduced-motion .section-subtitle,
	.reduced-motion .stat-card {
		animation: none;
	}

	.reduced-motion .stat-value.countup {
		animation: none;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.stats-section {
			@apply py-16;
		}

		.section-header {
			@apply mb-12;
		}

		.section-title {
			@apply text-2xl md:text-3xl;
		}

		.section-subtitle {
			@apply text-lg;
		}

		.stats-container {
			@apply gap-6;
		}

		.layout-horizontal .stats-container {
			@apply grid-cols-1 sm:grid-cols-2;
		}

		.layout-vertical .stats-container {
			@apply grid-cols-1;
		}

		.stat-value {
			@apply text-3xl md:text-4xl;
		}

		.layout-vertical .stat-card {
			@apply p-6;
		}
	}

	@media (max-width: 480px) {
		.layout-vertical .stat-card {
			@apply flex-col text-center space-x-0 space-y-4;
		}
	}
</style>
