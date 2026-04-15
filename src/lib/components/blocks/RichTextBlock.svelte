<script lang="ts">
	let { data }: { data: Record<string, unknown> } = $props();

	const content = data.content as string;
</script>

<section class="py-16">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg dark:prose-invert">
		<!-- Trusted HTML from Directus rich text; sanitize upstream if editors are not fully trusted. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</div>
</section>
