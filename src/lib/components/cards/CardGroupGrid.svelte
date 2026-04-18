<script lang="ts">
	import { onMount } from 'svelte';

	import Card from './Card.svelte';
	import type { CardItem } from './card-item';

	let { items }: { items: CardItem[] } = $props();

	// Parent uses `{#key itemsKey}` so this instance remounts when `items` changes; initial map is intentional.
	// svelte-ignore state_referenced_locally
	let cardStates = $state(items.map(() => ({ visible: false, hovered: false })));

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

<style>
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
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
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
