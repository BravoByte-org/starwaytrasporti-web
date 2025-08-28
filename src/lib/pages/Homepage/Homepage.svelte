<script>
	import { Hero, Services, Stats, CTA } from '$lib/layouts/sections';
	import * as m from '$paraglide/messages';
</script>

<svelte:head>
	<title>{m.site_title()}</title>
	<meta name="description" content={m.hero_subtitle()} />
</svelte:head>

<!-- Homepage Layout -->
<main>
	<!-- Hero Section with Multi-Level Parallax -->
	<Hero />

	<!-- Services Preview Section -->
	<Services />

	<!-- Stats Section -->
	<Stats />

	<!-- CTA Section -->
	<CTA />
</main>
