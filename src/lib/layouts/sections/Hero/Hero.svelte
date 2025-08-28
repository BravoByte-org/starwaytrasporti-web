<script>
	import * as m from '$paraglide/messages';
	import { onMount } from 'svelte';

	let {
		showScrollIndicator = true,
		enableParallax = true,
		variant = 'default'
	} = $props();

	let scrollY = $state(0);
	let innerHeight = $state(0);
	let reducedMotion = $state(false);

	onMount(() => {
		// Check for reduced motion preference
		reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (enableParallax) {
			const updateScrollY = () => scrollY = window.scrollY;
			window.addEventListener('scroll', updateScrollY);

			return () => {
				window.removeEventListener('scroll', updateScrollY);
			};
		}
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<!-- Hero Section with Multi-Level Parallax -->
<section class="hero-section" class:reduced-motion={reducedMotion} class:variant-{variant} data-testid="hero-section">
	{#if enableParallax}
		<!-- Background Layer 1 - Slowest (Mountains/Distant) -->
		<div
			class="parallax-bg parallax-layer bg-1"
			style="transform: translate3d(0, {reducedMotion ? 0 : scrollY * 0.2}px, 0)"
		></div>

		<!-- Background Layer 2 - Medium (Roads/Infrastructure) -->
		<div
			class="parallax-bg parallax-layer bg-2"
			style="transform: translate3d(0, {reducedMotion ? 0 : scrollY * 0.4}px, 0)"
		></div>

		<!-- Background Layer 3 - Fast (Foreground Elements) -->
		<div
			class="parallax-bg parallax-layer bg-3"
			style="transform: translate3d(0, {reducedMotion ? 0 : scrollY * 0.6}px, 0)"
		></div>
	{:else}
		<div class="parallax-bg bg-1"></div>
	{/if}

	<!-- Hero Content -->
	<div class="hero-content">
		<div class="container mx-auto px-4 py-16">
			<div class="text-center max-w-4xl mx-auto">
				<h1 class="hero-title text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
					{m.hero_title()}
				</h1>
				<p class="hero-subtitle text-xl md:text-2xl mb-12 text-gray-100 leading-relaxed">
					{m.hero_subtitle()}
				</p>
				<button class="hero-cta bg-white text-blue-600 hover:bg-gray-100 font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105">
					{m.hero_cta()}
				</button>
			</div>
		</div>
	</div>

	{#if showScrollIndicator}
		<!-- Scroll Indicator -->
		<div class="scroll-indicator">
			<div class="scroll-arrow"></div>
		</div>
	{/if}
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.hero-section {
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.parallax-bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 120%;
		z-index: 1;
		will-change: transform;
	}

	.bg-1 {
		background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 50%, #581c87 100%);
		z-index: 1;
	}

	.bg-2 {
		background:
			radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%),
			radial-gradient(circle at 40% 40%, rgba(34, 197, 94, 0.2) 0%, transparent 50%);
		z-index: 2;
	}

	.bg-3 {
		background:
			linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%),
			repeating-linear-gradient(
				90deg,
				transparent,
				transparent 100px,
				rgba(255, 255, 255, 0.03) 100px,
				rgba(255, 255, 255, 0.03) 101px
			);
		z-index: 3;
	}

	.hero-content {
		position: relative;
		z-index: 10;
		width: 100%;
	}

	.hero-title {
		font-family: var(--font-sans);
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
		animation: fadeInUp 1s ease-out;
	}

	.hero-subtitle {
		font-family: var(--font-serif);
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
		animation: fadeInUp 1s ease-out 0.2s both;
	}

	.hero-cta {
		animation: fadeInUp 1s ease-out 0.4s both;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.hero-cta:hover {
		@apply shadow-2xl;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		animation: bounce 2s infinite;
	}

	.scroll-arrow {
		width: 24px;
		height: 24px;
		border: 2px solid white;
		border-top: none;
		border-left: none;
		transform: rotate(45deg);
		opacity: 0.7;
	}

	/* Variant: Compact */
	.variant-compact {
		min-height: 70vh;
	}

	.variant-compact .hero-title {
		font-size: 3rem;
	}

	.variant-compact .hero-subtitle {
		font-size: 1.25rem;
	}

	/* Accessibility: Respect reduced motion preference */
	@media (prefers-reduced-motion: reduce) {
		.parallax-bg,
		.hero-title,
		.hero-subtitle,
		.hero-cta,
		.scroll-indicator {
			animation: none !important;
			transform: none !important;
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

	@keyframes bounce {
		0%, 20%, 53%, 80%, 100% {
			transform: translateX(-50%) translateY(0);
		}
		40%, 43% {
			transform: translateX(-50%) translateY(-10px);
		}
		70% {
			transform: translateX(-50%) translateY(-5px);
		}
		90% {
			transform: translateX(-50%) translateY(-2px);
		}
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.hero-title {
			font-size: 3rem;
		}

		.hero-subtitle {
			font-size: 1.25rem;
		}

		.parallax-bg {
			transform: none !important;
		}
	}
</style>
