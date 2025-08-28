<script>
	import * as m from '$paraglide/messages';

	let {
		variant = 'default', // 'default', 'compact', 'split'
		backgroundColor = 'dark', // 'dark', 'blue', 'white'
		buttonsLayout = 'horizontal', // 'horizontal', 'vertical', 'single'
		primaryAction = 'contact', // 'contact', 'quote'
		showSecondaryButton = true
	} = $props();

	const backgroundClasses = {
		dark: 'bg-gray-900',
		blue: 'bg-blue-600',
		white: 'bg-white'
	};

	const textClasses = {
		dark: 'text-white',
		blue: 'text-white',
		white: 'text-gray-900'
	};

	const subtitleClasses = {
		dark: 'text-gray-300',
		blue: 'text-blue-100',
		white: 'text-gray-600'
	};

	function handlePrimaryAction() {
		console.log(`Primary action: ${primaryAction}`);
		// Implement navigation or modal logic
	}

	function handleSecondaryAction() {
		console.log('Secondary action: quote');
		// Implement navigation or modal logic
	}
</script>

<!-- CTA Section -->
<section class="cta-section py-20 {backgroundClasses[backgroundColor]}" class:variant-{variant} data-testid="cta-section">
	<div class="container mx-auto px-4">
		{#if variant === 'split'}
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div class="text-left">
					<h2 class="text-4xl font-bold {textClasses[backgroundColor]} mb-6">
						{m.cta_title()}
					</h2>
					<p class="text-xl {subtitleClasses[backgroundColor]} mb-8">
						{m.cta_subtitle()}
					</p>
				</div>
				<div class="cta-buttons layout-{buttonsLayout}">
					<button 
						class="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
						on:click={handlePrimaryAction}
					>
						{primaryAction === 'contact' ? m.nav_contact() : m.hero_cta()}
					</button>
					{#if showSecondaryButton}
						<button 
							class="btn-secondary border-2 border-white {textClasses[backgroundColor]} hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
							on:click={handleSecondaryAction}
						>
							{m.hero_cta()}
						</button>
					{/if}
				</div>
			</div>
		{:else}
			<div class="text-center" class:compact={variant === 'compact'}>
				<h2 class="text-4xl font-bold {textClasses[backgroundColor]} mb-6">
					{m.cta_title()}
				</h2>
				<p class="text-xl {subtitleClasses[backgroundColor]} mb-8 max-w-2xl mx-auto">
					{m.cta_subtitle()}
				</p>
				<div class="cta-buttons layout-{buttonsLayout}">
					<button 
						class="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
						on:click={handlePrimaryAction}
					>
						{primaryAction === 'contact' ? m.nav_contact() : m.hero_cta()}
					</button>
					{#if showSecondaryButton && buttonsLayout !== 'single'}
						<button 
							class="btn-secondary border-2 border-white {textClasses[backgroundColor]} hover:bg-white hover:text-gray-900 font-semibold py-4 px-8 rounded-lg transition-colors duration-200"
							on:click={handleSecondaryAction}
						>
							{m.hero_cta()}
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	.cta-buttons.layout-horizontal {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		justify-content: center;
	}

	.cta-buttons.layout-vertical {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		max-width: 300px;
		margin: 0 auto;
	}

	.cta-buttons.layout-single {
		display: flex;
		justify-content: center;
	}

	.variant-split .cta-buttons.layout-horizontal,
	.variant-split .cta-buttons.layout-vertical {
		justify-content: flex-start;
		margin: 0;
	}

	/* Compact variant */
	.variant-compact {
		padding: 3rem 0;
	}

	.compact h2 {
		font-size: 2.5rem;
		margin-bottom: 1rem;
	}

	.compact p {
		font-size: 1.125rem;
		margin-bottom: 1.5rem;
	}

	/* Button styling */
	.btn-primary,
	.btn-secondary {
		transition: all 0.3s ease;
		min-width: 150px;
	}

	.btn-primary:hover,
	.btn-secondary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.cta-buttons.layout-horizontal {
			flex-direction: column;
			align-items: center;
		}

		.variant-split .cta-buttons.layout-horizontal {
			align-items: flex-start;
		}

		h2 {
			font-size: 2.5rem;
		}

		p {
			font-size: 1.125rem;
		}
	}

	/* Accessibility: Focus states */
	.btn-primary:focus,
	.btn-secondary:focus {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.btn-primary:hover,
		.btn-secondary:hover {
			transform: none;
		}
	}
</style>
