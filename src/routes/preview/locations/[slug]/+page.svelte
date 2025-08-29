<!--
	Preview Location Page - English Preview Mode
	Displays location content in preview mode for English users
-->

<script>
	import { onMount } from 'svelte';
	
	export let data;
	
	$: ({ location, navigation, previewInfo } = data);
	
	onMount(() => {
		console.log('[Preview Location EN] Component mounted:', {
			locationName: location?.name,
			previewInfo
		});
		
		// Add preview-specific meta tags
		if (typeof document !== 'undefined') {
			document.title = `[PREVIEW] ${location?.name || 'Location'} - StarwayTrasporti`;
		}
	});
</script>

<!-- Page Head -->
<svelte:head>
	<title>[PREVIEW] {location?.name || 'Location'} - StarwayTrasporti</title>
	<meta name="description" content="Preview mode - {location?.description || 'Location preview'}" />
	<meta name="robots" content="noindex, nofollow" />
	<meta name="preview-mode" content="true" />
	<meta name="preview-locale" content="en" />
	<meta name="preview-type" content="location" />
</svelte:head>

<!-- Main Content -->
{#if location}
	<div class="location-preview">
		<!-- Location Hero -->
		<section class="location-hero">
			<div class="hero-content">
				<div class="hero-text">
					<h1>{location.name}</h1>
					{#if location.description}
						<p class="hero-description">{location.description}</p>
					{/if}
					
					<!-- Location Details -->
					<div class="location-details">
						{#if location.address}
							<div class="detail-item">
								<strong>Address:</strong> {location.address}
							</div>
						{/if}
						
						{#if location.phone}
							<div class="detail-item">
								<strong>Phone:</strong> 
								<a href="tel:{location.phone}">{location.phone}</a>
							</div>
						{/if}
						
						{#if location.email}
							<div class="detail-item">
								<strong>Email:</strong> 
								<a href="mailto:{location.email}">{location.email}</a>
							</div>
						{/if}
						
						{#if location.operatingHours}
							<div class="detail-item">
								<strong>Operating Hours:</strong> {location.operatingHours}
							</div>
						{/if}
						
						{#if location.featured}
							<div class="featured-badge">
								<span>⭐ Featured Location</span>
							</div>
						{/if}
					</div>
				</div>
				
				{#if location.image}
					<div class="hero-image">
						<img 
							src={location.image} 
							alt={location.name}
							loading="lazy"
						/>
					</div>
				{/if}
			</div>
		</section>
		
		<!-- Additional Content -->
		{#if location.services && location.services.length > 0}
			<section class="location-services">
				<div class="container">
					<h2>Services Available</h2>
					<div class="services-grid">
						{#each location.services as service}
							<div class="service-item">
								<h3>{service.name}</h3>
								{#if service.description}
									<p>{service.description}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</section>
		{/if}
		
		<!-- Preview Debug Info -->
		<section class="preview-debug">
			<div class="container">
				<details>
					<summary>Preview Debug Information</summary>
					<pre>{JSON.stringify(previewInfo, null, 2)}</pre>
					<pre>{JSON.stringify({ 
						name: location.name,
						slug: location.slug,
						featured: location.featured,
						hasImage: !!location.image,
						servicesCount: location.services?.length || 0
					}, null, 2)}</pre>
				</details>
			</div>
		</section>
	</div>
{:else}
	<div class="location-not-found">
		<h1>Location Not Found</h1>
		<p>The requested location could not be found in preview mode.</p>
		<a href="/preview">Return to Preview Homepage</a>
	</div>
{/if}

<style>
	.location-preview {
		padding-top: 2rem;
	}
	
	.location-hero {
		padding: 2rem 0 4rem;
		background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
	}
	
	.hero-content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		align-items: center;
	}
	
	.hero-text h1 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1e293b;
		margin-bottom: 1rem;
	}
	
	.hero-description {
		font-size: 1.125rem;
		color: #64748b;
		margin-bottom: 2rem;
		line-height: 1.6;
	}
	
	.location-details {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	
	.detail-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
	}
	
	.detail-item strong {
		color: #1e293b;
		min-width: 100px;
	}
	
	.detail-item a {
		color: #2563eb;
		text-decoration: none;
	}
	
	.detail-item a:hover {
		text-decoration: underline;
	}
	
	.featured-badge {
		margin-top: 1rem;
	}
	
	.featured-badge span {
		background: #fbbf24;
		color: #92400e;
		padding: 0.375rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
	}
	
	.hero-image {
		border-radius: 0.75rem;
		overflow: hidden;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}
	
	.hero-image img {
		width: 100%;
		height: 400px;
		object-fit: cover;
	}
	
	.location-services {
		padding: 4rem 0;
	}
	
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}
	
	.location-services h2 {
		font-size: 2rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 2rem;
		text-align: center;
	}
	
	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}
	
	.service-item {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		padding: 1.5rem;
	}
	
	.service-item h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1e293b;
		margin-bottom: 0.5rem;
	}
	
	.service-item p {
		color: #64748b;
		line-height: 1.5;
	}
	
	.preview-debug {
		padding: 2rem 0;
		background: #f1f5f9;
		border-top: 1px solid #e2e8f0;
	}
	
	.preview-debug details {
		background: white;
		border: 1px solid #e2e8f0;
		border-radius: 0.5rem;
		padding: 1rem;
	}
	
	.preview-debug summary {
		font-weight: 600;
		color: #1e293b;
		cursor: pointer;
		margin-bottom: 1rem;
	}
	
	.preview-debug pre {
		background: #f8fafc;
		border: 1px solid #e2e8f0;
		border-radius: 0.25rem;
		padding: 1rem;
		overflow-x: auto;
		font-size: 0.875rem;
		margin-bottom: 1rem;
	}
	
	.location-not-found {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		text-align: center;
		padding: 2rem;
	}
	
	.location-not-found h1 {
		font-size: 2rem;
		color: #dc2626;
		margin-bottom: 1rem;
	}
	
	.location-not-found p {
		color: #64748b;
		margin-bottom: 2rem;
	}
	
	.location-not-found a {
		background: #2563eb;
		color: white;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		font-weight: 500;
	}
	
	.location-not-found a:hover {
		background: #1d4ed8;
	}
	
	/* Responsive */
	@media (max-width: 768px) {
		.hero-content {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		
		.hero-text h1 {
			font-size: 2rem;
		}
		
		.services-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
