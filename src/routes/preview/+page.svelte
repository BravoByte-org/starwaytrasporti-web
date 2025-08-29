<!--
	Preview Homepage - English Preview Mode
	Displays homepage content in preview mode for English users
-->

<script>
	import { Page } from '$lib/components/index.js';
	import { onMount } from 'svelte';
	
	export let data;
	
	$: ({ homepage, navigation, testimonials, previewInfo } = data);
	
	onMount(() => {
		console.log('[Preview Homepage EN] Component mounted:', {
			hasHomepage: !!homepage,
			sectionsCount: homepage?.sections?.length || 0,
			previewInfo
		});
		
		// Add preview-specific meta tags
		if (typeof document !== 'undefined') {
			document.title = `[PREVIEW] ${homepage?.metaTitle || 'StarwayTrasporti'}`;
			
			// Add preview meta tag
			const previewMeta = document.createElement('meta');
			previewMeta.name = 'robots';
			previewMeta.content = 'noindex, nofollow';
			document.head.appendChild(previewMeta);
		}
	});
</script>

<!-- Page Head -->
<svelte:head>
	<title>[PREVIEW] {homepage?.metaTitle || 'StarwayTrasporti - Preview Mode'}</title>
	<meta name="description" content="Preview mode - {homepage?.metaDescription || 'Content preview'}" />
	<meta name="robots" content="noindex, nofollow" />
	<meta name="preview-mode" content="true" />
	<meta name="preview-locale" content="en" />
	{#if previewInfo?.documentId}
		<meta name="preview-document-id" content={previewInfo.documentId} />
	{/if}
</svelte:head>

<!-- Main Content -->
{#if homepage}
	<Page 
		{homepage} 
		{navigation} 
		{testimonials}
		isPreview={true}
		previewLocale="en"
	/>
{:else if previewInfo?.error}
	<!-- Error State -->
	<div class="preview-error">
		<div class="error-container">
			<h1>Preview Error</h1>
			<p>Unable to load preview content:</p>
			<code>{previewInfo.error}</code>
			<div class="error-actions">
				<button onclick="window.location.reload()">Retry</button>
				<a href="/studio" target="_blank">Open Studio</a>
			</div>
		</div>
	</div>
{:else}
	<!-- Loading State -->
	<div class="preview-loading">
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<h2>Loading Preview...</h2>
			<p>Fetching content from preview dataset</p>
		</div>
	</div>
{/if}

<style>
	.preview-error {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		padding: 2rem;
	}
	
	.error-container {
		text-align: center;
		max-width: 500px;
		background: #fef2f2;
		border: 1px solid #fecaca;
		border-radius: 0.5rem;
		padding: 2rem;
	}
	
	.error-container h1 {
		color: #dc2626;
		margin-bottom: 1rem;
	}
	
	.error-container code {
		background: #fee2e2;
		color: #991b1b;
		padding: 0.5rem;
		border-radius: 0.25rem;
		display: block;
		margin: 1rem 0;
		font-family: 'Monaco', 'Consolas', monospace;
		font-size: 0.875rem;
	}
	
	.error-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1.5rem;
	}
	
	.error-actions button,
	.error-actions a {
		padding: 0.5rem 1rem;
		border-radius: 0.375rem;
		text-decoration: none;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.error-actions button {
		background: #dc2626;
		color: white;
		border: none;
	}
	
	.error-actions a {
		background: #f3f4f6;
		color: #374151;
		border: 1px solid #d1d5db;
	}
	
	.error-actions button:hover {
		background: #b91c1c;
	}
	
	.error-actions a:hover {
		background: #e5e7eb;
	}
	
	.preview-loading {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 50vh;
		padding: 2rem;
	}
	
	.loading-container {
		text-align: center;
	}
	
	.loading-spinner {
		width: 3rem;
		height: 3rem;
		border: 4px solid #e5e7eb;
		border-top: 4px solid #2563eb;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}
	
	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}
	
	.loading-container h2 {
		color: #374151;
		margin-bottom: 0.5rem;
	}
	
	.loading-container p {
		color: #6b7280;
		font-size: 0.875rem;
	}
</style>
