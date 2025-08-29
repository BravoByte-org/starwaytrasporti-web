<script>
	import * as m from '$paraglide/messages';

	let { servicesData = null } = $props();

	// Fallback content when no CMS data is available
	const fallbackServices = {
		title: m.services_title ? m.services_title() : 'Our Services',
		subtitle: m.services_subtitle ? m.services_subtitle() : 'Professional transportation solutions across Italy and Europe',
		services: [
			{
				title: m.service_national_title(),
				description: m.service_national_desc(),
				icon: 'truck',
				color: 'blue',
				link: { url: '/services/national', text: 'Learn More' }
			},
			{
				title: m.service_international_title(),
				description: m.service_international_desc(),
				icon: 'globe',
				color: 'green',
				link: { url: '/services/international', text: 'Learn More' }
			},
			{
				title: m.service_express_title(),
				description: m.service_express_desc(),
				icon: 'clock',
				color: 'purple',
				link: { url: '/services/express', text: 'Learn More' }
			}
		],
		layout: 'grid',
		variant: 'default',
		enableAnimations: true
	};

	// Use CMS data or fallback
	const services = servicesData || fallbackServices;

	// Icon mapping
	const iconMap = {
		truck: '🚛',
		globe: '🌍',
		clock: '⏰',
		warehouse: '🏭',
		shield: '🛡️'
	};

	// Color classes mapping
	const colorClasses = {
		blue: 'text-blue-600 bg-blue-50 border-blue-200',
		green: 'text-green-600 bg-green-50 border-green-200',
		purple: 'text-purple-600 bg-purple-50 border-purple-200',
		orange: 'text-orange-600 bg-orange-50 border-orange-200',
		red: 'text-red-600 bg-red-50 border-red-200'
	};

	// Accessibility: Detect reduced motion preference
	let reducedMotion = $state(false);

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

	// Determine if animations should be enabled
	const animationsEnabled = services.enableAnimations && !reducedMotion;
</script>

<section 
	class="services-section {services.variant || 'default'}" 
	class:reduced-motion={reducedMotion}
	data-testid="services-section"
>
	<div class="container">
		<!-- Section header -->
		<div class="section-header">
			<h2 class="section-title" class:animate={animationsEnabled}>
				{services.title}
			</h2>
			
			{#if services.subtitle}
				<p class="section-subtitle" class:animate={animationsEnabled}>
					{services.subtitle}
				</p>
			{/if}
		</div>

		<!-- Services grid/list -->
		<div class="services-container layout-{services.layout || 'grid'}">
			{#each services.services || [] as service, index}
				<div 
					class="service-card"
					class:animate={animationsEnabled}
					style="animation-delay: {animationsEnabled ? (index * 0.1) : 0}s"
				>
					<!-- Service icon -->
					<div class="service-icon {colorClasses[service.color] || colorClasses.blue}">
						<span class="icon-emoji" role="img" aria-label={service.title}>
							{iconMap[service.icon] || iconMap.truck}
						</span>
					</div>

					<!-- Service content -->
					<div class="service-content">
						<h3 class="service-title">{service.title}</h3>
						<p class="service-description">{service.description}</p>
						
						{#if service.link?.url && service.link?.text}
							<a 
								href={service.link.url} 
								class="service-link"
								aria-label="Learn more about {service.title}"
							>
								{service.link.text}
								<span class="link-arrow" aria-hidden="true">→</span>
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.services-section {
		@apply py-20 bg-white;
	}

	.services-section.compact {
		@apply py-12;
	}

	.container {
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
	}

	/* Section header */
	.section-header {
		@apply text-center mb-16;
	}

	.section-title {
		@apply text-3xl md:text-4xl font-bold text-gray-900 mb-4;
	}

	.section-title.animate {
		animation: fadeInUp 0.8s ease-out;
	}

	.section-subtitle {
		@apply text-xl text-gray-600 max-w-3xl mx-auto;
	}

	.section-subtitle.animate {
		animation: fadeInUp 0.8s ease-out 0.2s both;
	}

	/* Services container */
	.services-container.layout-grid {
		@apply grid gap-8 md:grid-cols-2 lg:grid-cols-3;
	}

	.services-container.layout-list {
		@apply space-y-8;
	}

	/* Service cards */
	.service-card {
		@apply bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300;
		@apply border border-gray-100 hover:border-gray-200;
	}

	.service-card.animate {
		animation: fadeInUp 0.8s ease-out both;
	}

	.layout-list .service-card {
		@apply flex items-start space-x-6;
	}

	.layout-grid .service-card {
		@apply text-center;
	}

	/* Service icon */
	.service-icon {
		@apply w-16 h-16 rounded-full flex items-center justify-center border-2 mb-6;
	}

	.layout-list .service-icon {
		@apply mb-0 flex-shrink-0;
	}

	.icon-emoji {
		@apply text-2xl;
	}

	/* Service content */
	.service-content {
		@apply flex-1;
	}

	.service-title {
		@apply text-xl font-semibold text-gray-900 mb-3;
	}

	.service-description {
		@apply text-gray-600 mb-4 leading-relaxed;
	}

	.service-link {
		@apply inline-flex items-center text-blue-600 hover:text-blue-700 font-medium;
		@apply transition-colors duration-200;
	}

	.link-arrow {
		@apply ml-2 transform transition-transform duration-200;
	}

	.service-link:hover .link-arrow {
		@apply translate-x-1;
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

	/* Reduced motion */
	.reduced-motion .section-title,
	.reduced-motion .section-subtitle,
	.reduced-motion .service-card {
		animation: none;
	}

	.reduced-motion .service-card {
		transform: none;
	}

	/* Hover effects */
	.service-card:hover {
		transform: translateY(-4px);
	}

	.reduced-motion .service-card:hover {
		transform: none;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.services-section {
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

		.service-card {
			@apply p-6;
		}

		.layout-list .service-card {
			@apply flex-col space-x-0 space-y-4 text-center;
		}

		.layout-list .service-icon {
			@apply mx-auto;
		}
	}
</style>
