<!--
	Anteprima Layout Component - Italian Preview Mode
	Provides preview-specific UI and layout for Italian preview routes
-->

<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	let data = $props();
	
	// Preview mode data
	let { preview, locale, documentId, isDraft, previewMode } = data;
	
	// Handle preview mode initialization
	onMount(() => {
		// Set global preview flag
		if (typeof window !== 'undefined') {
			window.__PREVIEW_MODE__ = true;
			window.__PREVIEW_LOCALE__ = locale;
			window.__PREVIEW_DOCUMENT_ID__ = documentId;
		}
		
		console.log('[Anteprima Layout IT] Inizializzato:', {
			locale,
			documentId,
			isDraft,
			url: $page.url.pathname
		});
	});
	
	// Function to exit preview mode
	function exitPreview() {
		if (typeof window !== 'undefined') {
			// Clear preview cookies and redirect to production
			document.cookie = '__preview=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			document.cookie = '__preview_locale=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			
			// Redirect to production site
			const currentPath = $page.url.pathname.replace('/anteprima', '');
			window.location.href = currentPath || '/';
		}
	}
</script>

<!-- Preview Banner -->
<div class="preview-banner">
	<div class="preview-banner-content">
		<div class="preview-info">
			<span class="preview-flag">🇮🇹</span>
			<span class="preview-text">
				<strong>Modalità Anteprima</strong> - Italiano
				{#if isDraft}
					<span class="draft-indicator">• Contenuto Bozza</span>
				{/if}
			</span>
			{#if documentId}
				<span class="document-id">ID: {documentId.split('-')[0]}...</span>
			{/if}
		</div>
		
		<div class="preview-actions">
			<button 
				type="button" 
				class="exit-preview-btn"
				onClick={exitPreview}
			>
				Esci dall'Anteprima
			</button>
		</div>
	</div>
</div>

<!-- Main Content -->
<main class="preview-content">
	{@render children()}
</main>

<style>
	.preview-banner {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: linear-gradient(135deg, #059669 0%, #047857 100%);
		color: white;
		padding: 0.75rem 1rem;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		border-bottom: 2px solid rgba(255, 255, 255, 0.2);
	}
	
	.preview-banner-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
	}
	
	.preview-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 0.875rem;
	}
	
	.preview-flag {
		font-size: 1.25rem;
	}
	
	.preview-text {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.draft-indicator {
		background: rgba(255, 255, 255, 0.2);
		padding: 0.125rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 500;
	}
	
	.document-id {
		font-family: 'Monaco', 'Consolas', monospace;
		font-size: 0.75rem;
		background: rgba(255, 255, 255, 0.15);
		padding: 0.125rem 0.375rem;
		border-radius: 0.25rem;
	}
	
	.preview-actions {
		display: flex;
		gap: 0.5rem;
	}
	
	.exit-preview-btn {
		background: rgba(255, 255, 255, 0.2);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.375rem 0.75rem;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.exit-preview-btn:hover {
		background: rgba(255, 255, 255, 0.3);
		border-color: rgba(255, 255, 255, 0.5);
	}
	
	.exit-preview-btn:active {
		transform: translateY(1px);
	}
	
	.preview-content {
		margin-top: 4rem; /* Account for fixed banner */
		min-height: calc(100vh - 4rem);
	}
	
	/* Responsive adjustments */
	@media (max-width: 768px) {
		.preview-banner-content {
			flex-direction: column;
			gap: 0.5rem;
			padding: 0.5rem;
		}
		
		.preview-info {
			font-size: 0.8rem;
		}
		
		.preview-content {
			margin-top: 5rem;
			min-height: calc(100vh - 5rem);
		}
	}
</style>
