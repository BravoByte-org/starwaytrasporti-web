<script>
	import { getImageUrl, createLocationUrl, formatDate } from '$lib/utils/sanity.js';
	import * as m from '$paraglide/messages';

	let { data } = $props();

	const locations = data.locations || [];
	const featuredLocations = data.featuredLocations || [];

	// Group locations by type
	const locationsByType = locations.reduce((acc, location) => {
		const type = location.type || 'other';
		if (!acc[type]) acc[type] = [];
		acc[type].push(location);
		return acc;
	}, {});

	// Type labels
	const typeLabels = {
		headquarters: 'Headquarters',
		branch: 'Branch Offices',
		warehouse: 'Warehouses',
		service: 'Service Points',
		partner: 'Partner Locations'
	};

	// Filter active locations
	const activeLocations = locations.filter(location => location.active !== false);

	// Contact info helper
	function formatAddress(address) {
		if (!address) return '';
		const parts = [
			address.street,
			`${address.city}${address.province ? ', ' + address.province : ''}`,
			address.postalCode,
			address.country
		].filter(Boolean);
		return parts.join(', ');
	}

	function formatHours(hours) {
		if (!hours || hours.length === 0) return 'Hours not available';
		
		const today = new Date().toLocaleLowerCase().slice(0, 3);
		const todayHours = hours.find(h => h.day === today);
		
		if (todayHours) {
			return todayHours.closed 
				? 'Closed today'
				: `Open today: ${todayHours.open} - ${todayHours.close}`;
		}
		
		return 'See full hours';
	}
</script>

<svelte:head>
	<title>Our Locations - {m.site_title()}</title>
	<meta name="description" content="Find StarwayTrasporti locations across Italy and Europe. Visit our offices, warehouses, and service points." />
</svelte:head>

<main class="locations-page">
	<!-- Hero Section -->
	<section class="locations-hero">
		<div class="container">
			<h1 class="page-title">Our Locations</h1>
			<p class="page-subtitle">
				We operate across Italy and Europe with strategically located offices, warehouses, and service points to serve you better.
			</p>
		</div>
	</section>

	<!-- Featured Locations -->
	{#if featuredLocations.length > 0}
		<section class="featured-locations">
			<div class="container">
				<h2 class="section-title">Featured Locations</h2>
				
				<div class="featured-grid">
					{#each featuredLocations as location}
						<div class="featured-card">
							{#if location.images && location.images[0]}
								<div class="location-image">
									<img 
										src={getImageUrl(location.images[0], { width: 600, height: 400 })}
										alt={location.images[0].alt || location.name}
										loading="lazy"
									/>
									<div class="location-type-badge">
										{typeLabels[location.type] || location.type}
									</div>
								</div>
							{/if}
							
							<div class="location-info">
								<h3 class="location-name">{location.name}</h3>
								
								{#if location.address}
									<p class="location-address">
										📍 {formatAddress(location.address)}
									</p>
								{/if}
								
								{#if location.description}
									<p class="location-description">{location.description}</p>
								{/if}
								
								{#if location.services && location.services.length > 0}
									<div class="location-services">
										<strong>Services:</strong>
										{location.services.join(', ')}
									</div>
								{/if}
								
								<div class="location-actions">
									<a href={createLocationUrl(location)} class="btn btn-primary">
										View Details
									</a>
									
									{#if location.contact?.phone}
										<a href="tel:{location.contact.phone}" class="btn btn-outline">
											📞 Call
										</a>
									{/if}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- All Locations by Type -->
	<section class="all-locations">
		<div class="container">
			<h2 class="section-title">All Locations</h2>
			
			{#each Object.entries(locationsByType) as [type, typeLocations]}
				{#if typeLocations.length > 0}
					<div class="location-type-section">
						<h3 class="type-title">{typeLabels[type] || type}</h3>
						
						<div class="locations-grid">
							{#each typeLocations as location}
								{#if location.active !== false}
									<div class="location-card">
										<div class="location-header">
											<h4 class="location-name">{location.name}</h4>
											<span class="location-type">{typeLabels[location.type] || location.type}</span>
										</div>
										
										{#if location.address}
											<div class="location-address">
												📍 {location.address.street}<br>
												{location.address.city}{#if location.address.province}, {location.address.province}{/if}<br>
												{location.address.postalCode} {location.address.country}
											</div>
										{/if}
										
										{#if location.contact}
											<div class="location-contact">
												{#if location.contact.phone}
													<div>📞 <a href="tel:{location.contact.phone}">{location.contact.phone}</a></div>
												{/if}
												{#if location.contact.email}
													<div>✉️ <a href="mailto:{location.contact.email}">{location.contact.email}</a></div>
												{/if}
											</div>
										{/if}
										
										{#if location.hours}
											<div class="location-hours">
												🕐 {formatHours(location.hours)}
											</div>
										{/if}
										
										{#if location.services && location.services.length > 0}
											<div class="location-services">
												<strong>Services:</strong> {location.services.slice(0, 3).join(', ')}{#if location.services.length > 3}...{/if}
											</div>
										{/if}
										
										<div class="location-actions">
											<a href={createLocationUrl(location)} class="btn btn-small btn-primary">
												View Details
											</a>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</section>

	<!-- Contact CTA -->
	<section class="contact-cta">
		<div class="container">
			<h2>Need a Location Near You?</h2>
			<p>Contact us to discuss your transportation needs and find the best service point for your business.</p>
			<a href="/contact" class="btn btn-primary btn-large">Contact Us</a>
		</div>
	</section>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	.locations-page {
		@apply min-h-screen;
	}

	.container {
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
	}

	/* Hero Section */
	.locations-hero {
		@apply py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white;
	}

	.page-title {
		@apply text-4xl md:text-5xl font-bold text-center mb-6;
	}

	.page-subtitle {
		@apply text-xl text-center text-blue-100 max-w-3xl mx-auto;
	}

	/* Section Titles */
	.section-title {
		@apply text-3xl font-bold text-gray-900 mb-12 text-center;
	}

	.type-title {
		@apply text-2xl font-semibold text-gray-800 mb-8;
	}

	/* Featured Locations */
	.featured-locations {
		@apply py-20 bg-gray-50;
	}

	.featured-grid {
		@apply grid gap-8 md:grid-cols-2 lg:grid-cols-3;
	}

	.featured-card {
		@apply bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300;
	}

	.location-image {
		@apply relative h-48 overflow-hidden;
	}

	.location-image img {
		@apply w-full h-full object-cover;
	}

	.location-type-badge {
		@apply absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium;
	}

	.location-info {
		@apply p-6;
	}

	.location-name {
		@apply text-xl font-semibold text-gray-900 mb-2;
	}

	.location-address {
		@apply text-gray-600 mb-3;
	}

	.location-description {
		@apply text-gray-700 mb-4;
	}

	.location-services {
		@apply text-sm text-gray-600 mb-4;
	}

	.location-actions {
		@apply flex gap-3;
	}

	/* All Locations */
	.all-locations {
		@apply py-20;
	}

	.location-type-section {
		@apply mb-16;
	}

	.locations-grid {
		@apply grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
	}

	.location-card {
		@apply bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300;
	}

	.location-header {
		@apply flex justify-between items-start mb-4;
	}

	.location-card .location-name {
		@apply text-lg font-semibold text-gray-900;
	}

	.location-type {
		@apply text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded;
	}

	.location-contact {
		@apply space-y-1 text-sm text-gray-600 mb-3;
	}

	.location-contact a {
		@apply text-blue-600 hover:text-blue-700;
	}

	.location-hours {
		@apply text-sm text-gray-600 mb-3;
	}

	/* Contact CTA */
	.contact-cta {
		@apply py-20 bg-blue-600 text-white text-center;
	}

	.contact-cta h2 {
		@apply text-3xl font-bold mb-4;
	}

	.contact-cta p {
		@apply text-xl text-blue-100 mb-8 max-w-2xl mx-auto;
	}

	/* Buttons */
	.btn {
		@apply inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300;
		@apply focus:outline-none focus:ring-4 focus:ring-offset-2;
	}

	.btn-small {
		@apply px-3 py-1.5 text-xs;
	}

	.btn-large {
		@apply px-8 py-4 text-lg;
	}

	.btn-primary {
		@apply bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl;
		@apply focus:ring-blue-300;
	}

	.btn-outline {
		@apply border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white;
		@apply focus:ring-blue-300;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.locations-hero {
			@apply py-16;
		}

		.page-title {
			@apply text-3xl;
		}

		.featured-locations,
		.all-locations {
			@apply py-16;
		}

		.featured-grid {
			@apply grid-cols-1;
		}

		.locations-grid {
			@apply grid-cols-1 md:grid-cols-2;
		}

		.location-actions {
			@apply flex-col;
		}

		.contact-cta {
			@apply py-16;
		}
	}
</style>
