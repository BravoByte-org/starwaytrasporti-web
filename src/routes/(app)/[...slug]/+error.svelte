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
		@apply flex h-screen flex-col items-center justify-center gap-4 rounded-lg bg-gray-100 p-8;
	}

	.error-title {
		@apply text-4xl font-bold;
	}

	.error-copy {
		@apply text-2xl;
	}
</style>
