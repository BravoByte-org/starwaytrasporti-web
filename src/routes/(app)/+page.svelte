<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import ServicesSection from '$layouts/ServicesSection.svelte';
	import { StatGroup } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<main class="page">
	<Hero content={data.hero} />
	<ServicesSection items={data.services} />
	<StatGroup
		heading="Our Impact & Achievements"
		description="Delivering excellence across the globe with industry-leading standards."
		stats={data.stats}
	/>
</main>

<style>
	main.page {
		display: grid;
		gap: clamp(1.5rem, 4vw, 2.5rem);
	}
</style>
