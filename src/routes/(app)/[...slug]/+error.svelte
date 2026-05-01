<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-container">
	<h1 class="error-title">Oops! Something went wrong</h1>
	<p class="error-copy">Error code: {page.status}</p>
	<p class="error-copy">{page.error?.message}</p>
</div>

<style lang="postcss">
	@reference "../../../app.css";

	.error-container {
		@apply flex min-h-screen flex-col items-center justify-center gap-4 bg-surface p-8 text-center text-fg;
	}

	.error-title {
		@apply font-display text-h2 tracking-[0.02em] text-accent uppercase;
	}

	.error-copy {
		@apply text-lede text-fg-muted;
	}
</style>
