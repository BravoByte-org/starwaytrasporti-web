<!--
	Anteprima Homepage - Italian Preview Mode
	Displays homepage content in preview mode for Italian users
-->

<script>
	import { Homepage } from '$lib/pages/index.js';
	import { onMount } from 'svelte';
	
	let data = $props();
	
	let { homepage, navigation, testimonials, previewInfo } = data;
	
	onMount(() => {
		console.log('[Anteprima Homepage IT] Componente montato:', {
			hasHomepage: !!homepage,
			sectionsCount: homepage?.sections?.length || 0,
			previewInfo
		});
		
		// Add preview-specific meta tags
		if (typeof document !== 'undefined') {
			document.title = `[ANTEPRIMA] ${homepage?.metaTitle || 'StarwayTrasporti'}`;
			
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
	<title>[ANTEPRIMA] {homepage?.metaTitle || 'StarwayTrasporti - Modalità Anteprima'}</title>
	<meta name="description" content="Modalità anteprima - {homepage?.metaDescription || 'Anteprima del contenuto'}" />
	<meta name="robots" content="noindex, nofollow" />
	<meta name="preview-mode" content="true" />
	<meta name="preview-locale" content="it" />
	{#if previewInfo?.documentId}
		<meta name="preview-document-id" content={previewInfo.documentId} />
	{/if}
</svelte:head>

<!-- Main Content -->
{#if homepage}
	<Homepage 
		data={{
			homepage,
			navigation,
			testimonials,
			isPreview: true,
			previewLocale: "it"
		}}
	/>
{:else if previewInfo?.error}
	<!-- Error State -->
	<div class="preview-error">
		<div class="error-container">
			<h1>Errore Anteprima</h1>
			<p>Impossibile caricare il contenuto dell'anteprima:</p>
			<code>{previewInfo.error}</code>
			<div class="error-actions">
				<button onClick={() => window.location.reload()}>Riprova</button>
				<a href="/studio" target="_blank">Apri Studio</a>
			</div>
		</div>
	</div>
{:else}
	<!-- Loading State -->
	<div class="preview-loading">
		<div class="loading-container">
			<div class="loading-spinner"></div>
			<h2>Caricamento Anteprima...</h2>
			<p>Recupero del contenuto dal dataset di anteprima</p>
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
		border-top: 4px solid #059669;
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
