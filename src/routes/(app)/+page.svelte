<script lang="ts">
	import Hero from '$components/Hero.svelte';
	import ServicesSection from '$layouts/ServicesSection.svelte';
	// let { data } = $props();
	// const { id, slug, status, page_name } = data.pages[0];
</script>

<main class="page">
	<Hero />
	<ServicesSection />
</main>

<style>
	main.page {
		display: grid;
		gap: clamp(1.5rem, 4vw, 2.5rem);
	}
</style>