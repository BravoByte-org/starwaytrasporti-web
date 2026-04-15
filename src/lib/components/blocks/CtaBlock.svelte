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

<section class="py-16" style="background-color: {bgColor}">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
		{#if headline}
			<h2 class="text-3xl md:text-4xl font-bold">{headline}</h2>
		{/if}
		{#if description}
			<p class="mt-4 text-lg text-white/80">{description}</p>
		{/if}
		{#if buttonText && buttonUrl}
			<a href={ctaHref(buttonUrl)} class="mt-8 inline-flex items-center px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
				{buttonText}
			</a>
		{/if}
	</div>
</section>
