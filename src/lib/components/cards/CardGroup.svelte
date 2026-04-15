<script lang="ts">
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import { servicesMock } from '$mocks/services';

	export type CardItem = {
		id: string;
		title: string;
		summary: string;
		icon?: string;
		meta?: string;
		badge?: string;
		cta?: { label: string; href: string };
		tone?: 'sunset' | 'seafoam' | 'violet';
	};

	let {
		items = servicesMock,
		eyebrow = 'Transport & Logistics',
		title = 'Services that keep your supply chain moving',
		intro = 'Blend speed, control, and visibility with options shaped for your trade lanes.'
	}: {
		items?: CardItem[];
		eyebrow?: string;
		title?: string;
		intro?: string;
	} = $props();

	// Track animation and hover state per card
	let cardStates = $state(items.map(() => ({ visible: false, hovered: false })));

	// Staggered entrance animation on mount
	onMount(() => {
		items.forEach((_, index) => {
			setTimeout(() => {
				cardStates[index].visible = true;
			}, 85 * index);
		});
	});

	const handleHover = (idx: number, isHovered: boolean) => {
		cardStates[idx].hovered = isHovered;
	};
</script>

<section class="cards-section">
	<div class="content-well">
		<div class="section-head">
			<p class="eyebrow">{eyebrow}</p>
			<h2>{title}</h2>
			<p class="lede">{intro}</p>
		</div>

		<div class="grid">
		{#each items as card, index (card.id ?? card.title)}
			<div
				class="card-wrapper"
				class:visible={cardStates[index]?.visible}
				class:hovered={cardStates[index]?.hovered}
				style="--delay: {index * 85}ms"
				role="presentation"
				onmouseenter={() => handleHover(index, true)}
				onmouseleave={() => handleHover(index, false)}
			>
				<Card
					icon={card.icon}
					title={card.title}
					summary={card.summary}
					meta={card.meta}
					cta={card.cta}
					tone={card.tone ?? 'sunset'}
				/>
			</div>
		{/each}
		</div>
	</div>
</section>

<style>
	section.cards-section {
		width: 100%;
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
		gap: 0.4rem;
	}

	.eyebrow {
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #5ee6d0;
		font-weight: 700;
		font-size: 0.85rem;
		margin: 0;
	}

	h2 {
		font-size: clamp(1.8rem, 3vw, 2.6rem);
		margin: 0;
		letter-spacing: -0.01em;
	}

	.lede {
		color: #b7c1d9;
		margin: 0;
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

	.card-wrapper {
		flex: 0 0 calc(75% - 0.5rem);
		scroll-snap-align: start;
		opacity: 0;
		transform: translateY(20px);
		transition: opacity 400ms ease-out, transform 400ms ease-out;
	}

	.card-wrapper.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card-wrapper.hovered {
		transform: translateY(-6px);
	}

	.card-wrapper.visible.hovered {
		transform: translateY(-6px);
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

		.card-wrapper {
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

		.card-wrapper {
			flex: 0 0 calc(50% - 0.75rem); /* 2 per row with gap */
			max-width: 400px;
		}
	}
</style>
