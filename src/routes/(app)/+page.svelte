<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import ServicesSection from '$layouts/ServicesSection.svelte';
	import { StatGroup, stats } from '$lib';
</script>

<main class="page">
	<Hero />
	<ServicesSection />
	<StatGroup
		heading="Our Impact & Achievements"
		description="Delivering excellence across the globe with industry-leading standards."
		{stats}
	/>
</main>

<style>
	main.page {
		display: grid;
		gap: clamp(1.5rem, 4vw, 2.5rem);
	}
</style>
