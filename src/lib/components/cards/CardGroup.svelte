<script lang="ts">
	import CardGroupGrid from './CardGroupGrid.svelte';
	import { servicesMock } from '$mocks/services';

	export type { CardItem } from './card-item';

	let {
		items = servicesMock,
		eyebrow = 'Transport & Logistics',
		title = 'Services that keep your supply chain moving',
		intro = 'Blend speed, control, and visibility with options shaped for your trade lanes.'
	}: {
		items?: import('./card-item').CardItem[];
		eyebrow?: string;
		title?: string;
		intro?: string;
	} = $props();

	let itemsKey = $derived(items.map((c) => c.id).join('|'));
</script>

<section class="cards-section">
	<div class="content-well">
		<div class="section-head">
			<p class="eyebrow">{eyebrow}</p>
			<h2>{title}</h2>
			<p class="lede">{intro}</p>
		</div>

		{#key itemsKey}
			<CardGroupGrid {items} />
		{/key}
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
</style>
