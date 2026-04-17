<script lang="ts">
	let { data }: { data: Record<string, unknown> } = $props();

	const content = data.content as string;
</script>

<section class="rich-text-block">
	<div class="rich-text-block__content">
		<!-- Trusted HTML from Directus rich text; sanitize upstream if editors are not fully trusted. -->
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html content}
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.rich-text-block {
		@apply py-16;
	}

	.rich-text-block__content {
		@apply prose prose-lg mx-auto max-w-4xl px-4 dark:prose-invert sm:px-6 lg:px-8;
	}
</style>
