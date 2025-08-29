<script>
	import { getImageUrl } from '$lib/utils/sanity.js';
	import * as m from '$paraglide/messages';

	let { ctaData = null } = $props();

	// Fallback content when no CMS data is available
	const fallbackCta = {
		title: m.cta_title(),
		subtitle: m.cta_subtitle(),
		buttons: [
			{
				text: 'Get Quote',
				url: '/contact',
				style: 'primary',
				openInNewTab: false
			},
			{
				text: 'Learn More',
				url: '/services',
				style: 'outline',
				openInNewTab: false
			}
		],
		backgroundColor: 'blue',
		variant: 'center',
		enableAnimations: true
	};

	// Use CMS data or fallback
	const cta = ctaData || fallbackCta;

	// Background color classes
	const backgroundClasses = {
		blue: 'bg-gradient-to-r from-blue-600 to-blue-800',
		dark: 'bg-gradient-to-r from-gray-800 to-gray-900',
		gradient: 'bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600',
		white: 'bg-white'
	};

	// Button style classes
	const buttonClasses = {
		primary: 'bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl',
		secondary: 'bg-blue-700 text-white hover:bg-blue-800 shadow-lg hover:shadow-xl',
		outline: 'border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl'
	};

	// Handle background image
	const backgroundImage = cta.backgroundImage 
		? getImageUrl(cta.backgroundImage, { width: 1920, height: 600, format: 'webp', quality: 85 })
		: null;

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
	const animationsEnabled = cta.enableAnimations && !reducedMotion;

	// Determine text color based on background
	const isLightBackground = cta.backgroundColor === 'white';
	const textColorClass = isLightBackground ? 'text-gray-900' : 'text-white';
	const subtitleColorClass = isLightBackground ? 'text-gray-600' : 'text-blue-100';
</script>

<section 
	bind:this={sectionElement}
	class="cta-section variant-{cta.variant || 'center'} {backgroundClasses[cta.backgroundColor] || backgroundClasses.blue}" 
	class:reduced-motion={reducedMotion}
	class:has-background-image={backgroundImage}
	style={backgroundImage ? `background-image: url('${backgroundImage}');` : ''}
	data-testid="cta-section"
>
	{#if backgroundImage}
		<div class="background-overlay"></div>
	{/if}

	<div class="container">
		<div class="cta-content">
			<!-- Split layout -->
			{#if cta.variant === 'split'}
				<div class="split-layout">
					<div class="content-side">
						<h2 class="cta-title {textColorClass}" class:animate={animationsEnabled && isVisible}>
							{cta.title}
						</h2>
						
						{#if cta.subtitle}
							<p class="cta-subtitle {subtitleColorClass}" class:animate={animationsEnabled && isVisible}>
								{cta.subtitle}
							</p>
						{/if}
					</div>
					
					<div class="buttons-side">
						{#if cta.buttons && cta.buttons.length > 0}
							<div class="cta-buttons" class:animate={animationsEnabled && isVisible}>
								{#each cta.buttons as button, index}
									<a 
										href={button.url}
										class="btn btn-{button.style || 'primary'} {buttonClasses[button.style] || buttonClasses.primary}"
										target={button.openInNewTab ? '_blank' : '_self'}
										rel={button.openInNewTab ? 'noopener noreferrer' : ''}
										style="animation-delay: {animationsEnabled ? (index * 0.1) : 0}s"
									>
										{button.text}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>

			<!-- Center or banner layout -->
			{:else}
				<div class="center-layout">
					<h2 class="cta-title {textColorClass}" class:animate={animationsEnabled && isVisible}>
						{cta.title}
					</h2>
					
					{#if cta.subtitle}
						<p class="cta-subtitle {subtitleColorClass}" class:animate={animationsEnabled && isVisible}>
							{cta.subtitle}
						</p>
					{/if}
					
					{#if cta.buttons && cta.buttons.length > 0}
						<div class="cta-buttons" class:animate={animationsEnabled && isVisible}>
							{#each cta.buttons as button, index}
								<a 
									href={button.url}
									class="btn btn-{button.style || 'primary'} {buttonClasses[button.style] || buttonClasses.primary}"
									target={button.openInNewTab ? '_blank' : '_self'}
									rel={button.openInNewTab ? 'noopener noreferrer' : ''}
									style="animation-delay: {animationsEnabled ? (index * 0.1) : 0}s"
								>
									{button.text}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.cta-section {
		@apply py-20 relative overflow-hidden;
	}

	.cta-section.variant-banner {
		@apply py-12;
	}

	.cta-section.has-background-image {
		@apply bg-cover bg-center bg-no-repeat;
	}

	.background-overlay {
		@apply absolute inset-0 bg-black/40;
	}

	.container {
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10;
	}

	/* Center layout */
	.center-layout {
		@apply text-center;
	}

	/* Split layout */
	.split-layout {
		@apply flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8;
	}

	.content-side {
		@apply flex-1 lg:pr-8;
	}

	.buttons-side {
		@apply flex-shrink-0;
	}

	/* Content */
	.cta-title {
		@apply text-3xl md:text-4xl lg:text-5xl font-bold mb-6;
	}

	.cta-title.animate {
		animation: fadeInUp 0.8s ease-out;
	}

	.cta-subtitle {
		@apply text-xl mb-8 max-w-3xl;
	}

	.center-layout .cta-subtitle {
		@apply mx-auto;
	}

	.cta-subtitle.animate {
		animation: fadeInUp 0.8s ease-out 0.2s both;
	}

	/* Buttons */
	.cta-buttons {
		@apply flex flex-wrap gap-4 justify-center;
	}

	.split-layout .cta-buttons {
		@apply justify-start lg:justify-end;
	}

	.cta-buttons.animate {
		animation: fadeInUp 0.8s ease-out 0.4s both;
	}

	.btn {
		@apply inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300;
		@apply focus:outline-none focus:ring-4 focus:ring-offset-2;
	}

	.btn.animate {
		animation: fadeInUp 0.8s ease-out both;
	}

	/* Button focus styles */
	.btn-primary {
		@apply focus:ring-blue-300;
	}

	.btn-secondary {
		@apply focus:ring-blue-300;
	}

	.btn-outline {
		@apply focus:ring-white;
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
	.reduced-motion .cta-title,
	.reduced-motion .cta-subtitle,
	.reduced-motion .cta-buttons,
	.reduced-motion .btn {
		animation: none;
	}

	/* Hover effects */
	.btn:hover {
		transform: translateY(-2px);
	}

	.reduced-motion .btn:hover {
		transform: none;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.cta-section {
			@apply py-16;
		}

		.cta-title {
			@apply text-2xl md:text-3xl;
		}

		.cta-subtitle {
			@apply text-lg mb-6;
		}

		.cta-buttons {
			@apply flex-col;
		}

		.split-layout .cta-buttons {
			@apply justify-center;
		}

		.btn {
			@apply w-full sm:w-auto px-6 py-3 text-base;
		}
	}

	@media (max-width: 480px) {
		.cta-section {
			@apply py-12;
		}

		.cta-title {
			@apply text-xl;
		}

		.btn {
			@apply px-6 py-3;
		}
	}
</style>
