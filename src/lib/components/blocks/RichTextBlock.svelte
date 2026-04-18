<script lang="ts">
	let { data }: { data: Record<string, unknown> } = $props();

	let content = $derived((data.content as string | undefined) ?? '');
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
		@apply mx-auto prose prose-lg max-w-4xl px-4 sm:px-6 lg:px-8 dark:prose-invert;
	}
</style>
