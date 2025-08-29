<script>
	import * as m from '$paraglide/messages';
	import { getHeroSection, getServicesSection, getStatsSection, getCtaSection } from '$lib/utils/sanity.js';
	
	// Import CMS-aware components
	import HeroCMS from '$lib/layouts/sections/Hero/HeroCMS.svelte';
	import ServicesCMS from '$lib/layouts/sections/Services/ServicesCMS.svelte';
	import StatsCMS from '$lib/layouts/sections/Stats/StatsCMS.svelte';
	import CTACMS from '$lib/layouts/sections/CTA/CTACMS.svelte';

	let { data } = $props();

	// Extract section data from homepage content
	const sections = data?.homepage?.sections || [];
	const heroData = getHeroSection(sections);
	const servicesData = getServicesSection(sections);
	const statsData = getStatsSection(sections);
	const ctaData = getCtaSection(sections);

	// Page metadata
	const pageTitle = data?.homepage?.metaTitle || data?.homepage?.title || m.site_title();
	const pageDescription = data?.homepage?.metaDescription || m.hero_subtitle();
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<!-- Homepage Layout -->
<main>
	<!-- CMS-powered sections with fallbacks -->
	<HeroCMS {heroData} />
	<ServicesCMS {servicesData} />
	<StatsCMS {statsData} />
	<CTACMS {ctaData} />
</main>
