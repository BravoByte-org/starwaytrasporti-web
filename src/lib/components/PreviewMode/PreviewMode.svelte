<script>
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';

	let { previewMode = false } = $props();

	async function exitPreview() {
		try {
			// Call the exit preview endpoint
			const response = await fetch('/api/exit-preview', {
				method: 'GET'
			});

			if (response.ok) {
				// Refresh the page data and navigate
				await invalidateAll();
				goto($page.url.pathname, { replaceState: true });
			}
		} catch (error) {
			console.error('Error exiting preview mode:', error);
		}
	}

	// Show draft status if content is in draft mode
	const isDraft = $page.url.searchParams.has('id') || $page.data?.content?.status === 'draft';
	const isScheduled = $page.data?.content?.status === 'scheduled';
</script>

{#if previewMode}
	<div class="preview-banner" role="banner" aria-label="Preview mode is active">
		<div class="preview-content">
			<div class="preview-info">
				<span class="preview-icon" aria-hidden="true">👁️</span>
				<span class="preview-text">
					<strong>Preview Mode</strong>
					{#if isDraft}
						- Draft Content
					{:else if isScheduled}
						- Scheduled Content
					{:else}
						- Live Preview
					{/if}
				</span>
			</div>
			
			<div class="preview-actions">
				<button 
					onclick={exitPreview}
					class="exit-button"
					type="button"
					aria-label="Exit preview mode"
				>
					Exit Preview
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	.preview-banner {
		@apply fixed top-0 left-0 right-0 z-50 bg-yellow-500 border-b-2 border-yellow-600;
		@apply shadow-lg;
	}

	.preview-content {
		@apply flex items-center justify-between px-4 py-3 max-w-7xl mx-auto;
	}

	.preview-info {
		@apply flex items-center space-x-2 text-yellow-900;
	}

	.preview-icon {
		@apply text-lg;
	}

	.preview-text {
		@apply text-sm font-medium;
	}

	.preview-actions {
		@apply flex items-center space-x-2;
	}

	.exit-button {
		@apply bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium;
		@apply px-4 py-2 rounded-md transition-colors duration-200;
		@apply focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.preview-content {
			@apply flex-col space-y-2 py-2;
		}

		.preview-info {
			@apply justify-center;
		}
	}

	@media (max-width: 480px) {
		.preview-text {
			@apply text-xs;
		}

		.exit-button {
			@apply text-xs px-3 py-1;
		}
	}
</style>
