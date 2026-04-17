<script lang="ts">
	import { base } from '$app/paths';

	let { data }: { data: Record<string, unknown> } = $props();

	const headline = data.headline as string | null;
	const description = data.description as string | null;
	const buttonText = data.button_text as string | null;
	const buttonUrl = data.button_url as string | null;
	const bgColor = (data.background_color as string) || '#1e40af';

	function ctaHref(url: string): string {
		if (/^https?:\/\//i.test(url) || url.startsWith('//') || url.startsWith('mailto:')) return url;
		const path = url.startsWith('/') ? url : `/${url}`;
		return `${base}${path}`;
	}
</script>

<section class="cta-block" style="background-color: {bgColor}">
	<div class="cta-block__inner">
		{#if headline}
			<h2 class="cta-block__headline">{headline}</h2>
		{/if}
		{#if description}
			<p class="cta-block__description">{description}</p>
		{/if}
		{#if buttonText && buttonUrl}
			<a href={ctaHref(buttonUrl)} class="cta-block__button">
				{buttonText}
			</a>
		{/if}
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.cta-block {
		@apply py-16;
	}

	.cta-block__inner {
		@apply mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8;
	}

	.cta-block__headline {
		@apply text-3xl font-bold md:text-4xl;
	}

	.cta-block__description {
		@apply mt-4 text-lg text-white/80;
	}

	.cta-block__button {
		@apply mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100;
	}
</style>
