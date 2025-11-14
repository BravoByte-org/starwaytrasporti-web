<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-container flex items-center justify-center h-screen flex-col gap-4">
	<h1 class="text-4xl font-bold">Oops! Something went wrong</h1>
	<p class="text-2xl">Error code: {page.status}</p>
	<p class="text-2xl">{page.error?.message}</p>
</div>

<style>
	.error-container {
		background-color: #f0f0f0;
		padding: 2rem;
		border-radius: 0.5rem;
	}
</style>
