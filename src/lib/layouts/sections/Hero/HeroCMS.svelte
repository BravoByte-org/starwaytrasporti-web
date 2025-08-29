<script>
	import { getImageUrl } from '$lib/utils/sanity.js';
	import * as m from '$paraglide/messages';

	let { heroData = null } = $props();

	// Fallback content when no CMS data is available
	const fallbackHero = {
		title: m.hero_title(),
		subtitle: m.hero_subtitle(),
		ctaButton: {
			text: m.hero_cta(),
			url: '/contact',
			style: 'primary'
		},
		enableParallax: true,
		showScrollIndicator: true,
		variant: 'default'
	};

	// Use CMS data or fallback
	const hero = heroData || fallbackHero;

	// Handle background images
	const backgroundImages = hero.backgroundImages || [];
	const hasBackgroundImages = backgroundImages.length > 0;

	// Get optimized image URLs
	const bgLayers = backgroundImages.map((img, index) => ({
		...img,
		url: getImageUrl(img, { width: 1920, height: 1080, format: 'webp', quality: 85 }),
		style: getLayerStyle(img.layer, index)
	}));

	function getLayerStyle(layer, index) {
		const speeds = {
			'bg-1': 0.3, // Slowest (background)
			'bg-2': 0.6, // Medium
			'bg-3': 0.9  // Fastest (foreground)
		};
		return `transform: translateY(calc(var(--scroll) * ${speeds[layer] || speeds['bg-2']}px));`;
	}

	// Scroll handling for parallax
	let scrollY = $state(0);
	let innerHeight = $state(0);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const updateScroll = () => {
				scrollY = window.scrollY;
			};
			
			window.addEventListener('scroll', updateScroll, { passive: true });
			window.addEventListener('resize', () => {
				innerHeight = window.innerHeight;
			});
			
			innerHeight = window.innerHeight;
			
			return () => {
				window.removeEventListener('scroll', updateScroll);
			};
		}
	});

	// Apply CSS variable for scroll position
	$effect(() => {
		if (typeof document !== 'undefined' && hero.enableParallax) {
			document.documentElement.style.setProperty('--scroll', scrollY * 0.5);
		}
	});

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
	const animationsEnabled = hero.enableParallax && !reducedMotion;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<section 
	class="hero-section {hero.variant || 'default'}" 
	class:reduced-motion={reducedMotion}
	data-testid="hero-section"
>
	<!-- Background layers for parallax -->
	{#if hasBackgroundImages && animationsEnabled}
		{#each bgLayers as layer}
			<div 
				class="parallax-layer bg-layer-{layer.layer}" 
				style="background-image: url('{layer.url}'); {layer.style}"
			></div>
		{/each}
	{:else if hasBackgroundImages}
		<!-- Static background for reduced motion -->
		<div 
			class="static-background"
			style="background-image: url('{getImageUrl(backgroundImages[0], { width: 1920, height: 1080 })}');"
		></div>
	{/if}

	<!-- Content overlay -->
	<div class="hero-content">
		<div class="container">
			<div class="hero-text">
				<h1 class="hero-title">
					{hero.title}
				</h1>
				
				{#if hero.subtitle}
					<p class="hero-subtitle">
						{hero.subtitle}
					</p>
				{/if}
				
				{#if hero.ctaButton?.text}
					<div class="hero-cta">
						<a 
							href={hero.ctaButton.url || '/contact'} 
							class="btn btn-{hero.ctaButton.style || 'primary'}"
						>
							{hero.ctaButton.text}
						</a>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	{#if hero.showScrollIndicator}
		<div class="scroll-indicator" class:animate={animationsEnabled}>
			<div class="scroll-arrow"></div>
		</div>
	{/if}
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.hero-section {
		@apply relative min-h-screen flex items-center justify-center overflow-hidden;
		background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
	}

	.hero-section.compact {
		@apply min-h-[60vh];
	}

	.hero-section.fullscreen {
		@apply h-screen;
	}

	/* Parallax layers */
	.parallax-layer {
		@apply absolute inset-0 bg-cover bg-center bg-no-repeat;
		will-change: transform;
	}

	.bg-layer-bg-1 {
		z-index: 1;
	}

	.bg-layer-bg-2 {
		z-index: 2;
	}

	.bg-layer-bg-3 {
		z-index: 3;
	}

	.static-background {
		@apply absolute inset-0 bg-cover bg-center bg-no-repeat;
		z-index: 1;
	}

	/* Content */
	.hero-content {
		@apply relative z-10 w-full;
		background: rgba(0, 0, 0, 0.4);
	}

	.container {
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
	}

	.hero-text {
		@apply text-center text-white py-20;
	}

	.hero-title {
		@apply text-4xl md:text-5xl lg:text-6xl font-bold mb-6;
		animation: fadeInUp 1s ease-out 0.2s both;
	}

	.hero-subtitle {
		@apply text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto;
		animation: fadeInUp 1s ease-out 0.4s both;
	}

	.hero-cta {
		animation: fadeInUp 1s ease-out 0.6s both;
	}

	.btn {
		@apply inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300;
	}

	.btn-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl;
	}

	.btn-secondary {
		@apply bg-white text-blue-600 hover:bg-gray-50 shadow-lg hover:shadow-xl;
	}

	.btn-outline {
		@apply border-2 border-white text-white hover:bg-white hover:text-blue-600 shadow-lg hover:shadow-xl;
	}

	/* Scroll indicator */
	.scroll-indicator {
		@apply absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-70;
		z-index: 10;
	}

	.scroll-indicator.animate {
		animation: bounce 2s infinite;
	}

	.scroll-arrow {
		@apply w-6 h-6 border-b-2 border-r-2 border-white transform rotate-45;
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

	@keyframes bounce {
		0%, 20%, 53%, 80%, 100% {
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
			transform: translate3d(-50%, 0, 0);
		}
		40%, 43% {
			animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
			transform: translate3d(-50%, -10px, 0);
		}
		70% {
			animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
			transform: translate3d(-50%, -5px, 0);
		}
		90% {
			transform: translate3d(-50%, -2px, 0);
		}
	}

	/* Reduced motion */
	.reduced-motion .hero-title,
	.reduced-motion .hero-subtitle,
	.reduced-motion .hero-cta {
		animation: none;
	}

	.reduced-motion .scroll-indicator {
		animation: none;
	}

	.reduced-motion .parallax-layer {
		transform: none !important;
	}

	/* Responsive adjustments */
	@media (max-width: 640px) {
		.hero-text {
			@apply py-16;
		}
		
		.hero-title {
			@apply text-3xl;
		}
		
		.hero-subtitle {
			@apply text-lg;
		}
	}
</style>
