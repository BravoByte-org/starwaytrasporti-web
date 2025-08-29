<script>
	import { getImageUrl, getOptimizedImageSet } from '$lib/utils/sanity.js';
	import * as m from '$paraglide/messages';

	let { data } = $props();

	const location = data.location;

	// Type labels
	const typeLabels = {
		headquarters: 'Headquarters',
		branch: 'Branch Office',
		warehouse: 'Warehouse',
		service: 'Service Point',
		partner: 'Partner Location'
	};

	// Service labels
	const serviceLabels = {
		national: 'National Transport',
		international: 'International Logistics',
		express: 'Express Delivery',
		warehousing: 'Warehousing',
		customs: 'Customs Clearance',
		'customer-service': 'Customer Service'
	};

	// Days of week
	const dayNames = {
		monday: 'Monday',
		tuesday: 'Tuesday',
		wednesday: 'Wednesday',
		thursday: 'Thursday',
		friday: 'Friday',
		saturday: 'Saturday',
		sunday: 'Sunday'
	};

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

	function getMapUrl(coordinates, address) {
		if (coordinates?.latitude && coordinates?.longitude) {
			return `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`;
		}
		if (address) {
			const addressString = formatAddress(address);
			return `https://www.google.com/maps/search/${encodeURIComponent(addressString)}`;
		}
		return null;
	}

	// Get optimized images
	const heroImage = location.images?.[0];
	const additionalImages = location.images?.slice(1) || [];
</script>

<svelte:head>
	<title>{location.name} - Our Locations - {m.site_title()}</title>
	<meta name="description" content="{location.description || `${location.name} - ${typeLabels[location.type] || location.type} located in ${location.address?.city || ''}. Contact us for transportation services.`}" />
</svelte:head>

<main class="location-detail">
	<!-- Breadcrumb -->
	<nav class="breadcrumb">
		<div class="container">
			<a href="/" class="breadcrumb-link">Home</a>
			<span class="breadcrumb-separator">›</span>
			<a href="/locations" class="breadcrumb-link">Locations</a>
			<span class="breadcrumb-separator">›</span>
			<span class="breadcrumb-current">{location.name}</span>
		</div>
	</nav>

	<!-- Hero Section -->
	<section class="location-hero">
		{#if heroImage}
			<div class="hero-image">
				<img 
					{...getOptimizedImageSet(heroImage, [800, 1200, 1600])}
					alt={heroImage.alt || location.name}
					class="hero-img"
				/>
			</div>
		{/if}
		
		<div class="hero-content">
			<div class="container">
				<div class="hero-info">
					<span class="location-type-badge">
						{typeLabels[location.type] || location.type}
					</span>
					<h1 class="location-title">{location.name}</h1>
					{#if location.address}
						<p class="location-address">
							📍 {formatAddress(location.address)}
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<div class="container">
		<div class="location-content">
			<!-- Main Info -->
			<div class="main-info">
				<!-- Description -->
				{#if location.description}
					<section class="info-section">
						<h2>About This Location</h2>
						<p class="description">{location.description}</p>
					</section>
				{/if}

				<!-- Services -->
				{#if location.services && location.services.length > 0}
					<section class="info-section">
						<h2>Available Services</h2>
						<div class="services-grid">
							{#each location.services as service}
								<div class="service-item">
									<span class="service-icon">✓</span>
									<span class="service-name">
										{serviceLabels[service] || service}
									</span>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Operating Hours -->
				{#if location.hours && location.hours.length > 0}
					<section class="info-section">
						<h2>Operating Hours</h2>
						<div class="hours-list">
							{#each location.hours as hour}
								<div class="hour-row">
									<span class="day">{dayNames[hour.day] || hour.day}</span>
									<span class="time">
										{#if hour.closed}
											<span class="closed">Closed</span>
										{:else}
											{hour.open} - {hour.close}
										{/if}
									</span>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Additional Images -->
				{#if additionalImages.length > 0}
					<section class="info-section">
						<h2>Gallery</h2>
						<div class="gallery-grid">
							{#each additionalImages as image}
								<div class="gallery-item">
									<img 
										src={getImageUrl(image, { width: 400, height: 300 })}
										alt={image.alt || location.name}
										loading="lazy"
										class="gallery-img"
									/>
								</div>
							{/each}
						</div>
					</section>
				{/if}
			</div>

			<!-- Sidebar -->
			<aside class="sidebar">
				<!-- Contact Card -->
				<div class="contact-card">
					<h3>Contact Information</h3>
					
					{#if location.contact?.phone}
						<div class="contact-item">
							<span class="contact-icon">📞</span>
							<div>
								<strong>Phone</strong><br>
								<a href="tel:{location.contact.phone}" class="contact-link">
									{location.contact.phone}
								</a>
							</div>
						</div>
					{/if}
					
					{#if location.contact?.email}
						<div class="contact-item">
							<span class="contact-icon">✉️</span>
							<div>
								<strong>Email</strong><br>
								<a href="mailto:{location.contact.email}" class="contact-link">
									{location.contact.email}
								</a>
							</div>
						</div>
					{/if}
					
					{#if location.contact?.website}
						<div class="contact-item">
							<span class="contact-icon">🌐</span>
							<div>
								<strong>Website</strong><br>
								<a href={location.contact.website} target="_blank" rel="noopener noreferrer" class="contact-link">
									Visit Website
								</a>
							</div>
						</div>
					{/if}
					
					{#if location.address}
						<div class="contact-item">
							<span class="contact-icon">📍</span>
							<div>
								<strong>Address</strong><br>
								<span class="address-text">{formatAddress(location.address)}</span>
							</div>
						</div>
					{/if}
				</div>

				<!-- Map -->
				{#if location.coordinates || location.address}
					<div class="map-card">
						<h3>Location Map</h3>
						<a 
							href={getMapUrl(location.coordinates, location.address)} 
							target="_blank" 
							rel="noopener noreferrer"
							class="map-link"
						>
							<div class="map-placeholder">
								<span class="map-icon">🗺️</span>
								<span>View on Google Maps</span>
							</div>
						</a>
					</div>
				{/if}

				<!-- CTA -->
				<div class="cta-card">
					<h3>Need Transportation Services?</h3>
					<p>Contact this location directly or reach out to our main office for assistance.</p>
					<div class="cta-buttons">
						<a href="/contact" class="btn btn-primary">Get Quote</a>
						<a href="tel:{location.contact?.phone || ''}" class="btn btn-outline">Call Now</a>
					</div>
				</div>
			</aside>
		</div>
	</div>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	.location-detail {
		@apply min-h-screen;
	}

	.container {
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
	}

	/* Breadcrumb */
	.breadcrumb {
		@apply py-4 bg-gray-50 border-b;
	}

	.breadcrumb-link {
		@apply text-blue-600 hover:text-blue-700;
	}

	.breadcrumb-separator {
		@apply mx-3 text-gray-400;
	}

	.breadcrumb-current {
		@apply text-gray-600;
	}

	/* Hero Section */
	.location-hero {
		@apply relative h-96 bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden;
	}

	.hero-image {
		@apply absolute inset-0;
	}

	.hero-img {
		@apply w-full h-full object-cover;
	}

	.hero-content {
		@apply absolute inset-0 bg-black/40 flex items-end;
	}

	.hero-info {
		@apply text-white pb-8;
	}

	.location-type-badge {
		@apply inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4;
	}

	.location-title {
		@apply text-4xl md:text-5xl font-bold mb-4;
	}

	.location-address {
		@apply text-xl text-blue-100;
	}

	/* Content Layout */
	.location-content {
		@apply grid lg:grid-cols-3 gap-12 py-16;
	}

	.main-info {
		@apply lg:col-span-2;
	}

	.sidebar {
		@apply lg:col-span-1 space-y-8;
	}

	/* Info Sections */
	.info-section {
		@apply mb-12;
	}

	.info-section h2 {
		@apply text-2xl font-bold text-gray-900 mb-6;
	}

	.description {
		@apply text-lg text-gray-700 leading-relaxed;
	}

	/* Services */
	.services-grid {
		@apply grid gap-4 md:grid-cols-2;
	}

	.service-item {
		@apply flex items-center space-x-3 p-4 bg-green-50 rounded-lg;
	}

	.service-icon {
		@apply text-green-600 font-bold;
	}

	.service-name {
		@apply text-gray-800 font-medium;
	}

	/* Hours */
	.hours-list {
		@apply space-y-2;
	}

	.hour-row {
		@apply flex justify-between items-center py-2 border-b border-gray-200;
	}

	.day {
		@apply font-medium text-gray-900;
	}

	.time {
		@apply text-gray-600;
	}

	.closed {
		@apply text-red-600 font-medium;
	}

	/* Gallery */
	.gallery-grid {
		@apply grid gap-4 md:grid-cols-2 lg:grid-cols-3;
	}

	.gallery-item {
		@apply rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300;
	}

	.gallery-img {
		@apply w-full h-48 object-cover;
	}

	/* Sidebar Cards */
	.contact-card,
	.map-card,
	.cta-card {
		@apply bg-white border border-gray-200 rounded-xl p-6 shadow-lg;
	}

	.contact-card h3,
	.map-card h3,
	.cta-card h3 {
		@apply text-lg font-semibold text-gray-900 mb-4;
	}

	/* Contact Items */
	.contact-item {
		@apply flex items-start space-x-3 mb-4 last:mb-0;
	}

	.contact-icon {
		@apply text-xl flex-shrink-0 mt-1;
	}

	.contact-link {
		@apply text-blue-600 hover:text-blue-700;
	}

	.address-text {
		@apply text-gray-600;
	}

	/* Map */
	.map-link {
		@apply block;
	}

	.map-placeholder {
		@apply flex flex-col items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors;
	}

	.map-icon {
		@apply text-2xl mb-2;
	}

	/* CTA */
	.cta-card p {
		@apply text-gray-600 mb-4;
	}

	.cta-buttons {
		@apply space-y-3;
	}

	/* Buttons */
	.btn {
		@apply w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300;
		@apply focus:outline-none focus:ring-4 focus:ring-offset-2;
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
	@media (max-width: 1024px) {
		.location-content {
			@apply grid-cols-1;
		}

		.sidebar {
			@apply grid md:grid-cols-2 lg:grid-cols-3 gap-8;
		}
	}

	@media (max-width: 768px) {
		.location-hero {
			@apply h-80;
		}

		.location-title {
			@apply text-3xl;
		}

		.location-content {
			@apply py-12;
		}

		.sidebar {
			@apply grid-cols-1;
		}

		.services-grid {
			@apply grid-cols-1;
		}

		.gallery-grid {
			@apply grid-cols-1 md:grid-cols-2;
		}
	}
</style>
