<script>
	import '../app.css';
	import { Header, Footer, PreviewMode } from '$components';

	let { children, data } = $props();
	
	const previewMode = data?.previewMode || false;
</script>

<!-- Preview mode banner (appears above everything when active) -->
<PreviewMode {previewMode} />

<!-- Main layout with conditional top spacing for preview banner -->
<div class="min-h-screen bg-gray-50 dark:bg-gray-900" class:preview-active={previewMode}>
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.preview-active {
		padding-top: 60px; /* Account for preview banner height */
	}

	@media (max-width: 768px) {
		.preview-active {
			padding-top: 80px; /* Account for taller mobile preview banner */
		}
	}
</style>
