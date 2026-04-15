<script lang="ts">
	import { base } from '$app/paths';

	let { data }: { data: Record<string, unknown> } = $props();

	const headline = data.headline as string;
	const subheadline = data.subheadline as string | null;
	const image = data.image as string | null;
	const videoUrl = data.video_url as string | null;
	const ctaPrimaryText = data.cta_primary_text as string | null;
	const ctaPrimaryUrl = data.cta_primary_url as string | null;
	const ctaSecondaryText = data.cta_secondary_text as string | null;
	const ctaSecondaryUrl = data.cta_secondary_url as string | null;

	function ctaHref(url: string): string {
		if (/^https?:\/\//i.test(url) || url.startsWith('//') || url.startsWith('mailto:')) return url;
		const path = url.startsWith('/') ? url : `/${url}`;
		return `${base}${path}`;
	}
</script>

<section class="relative bg-gray-900 text-white py-24 md:py-32">
	{#if videoUrl}
		<div class="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
			<iframe
				src={videoUrl}
				title=""
				class="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-150"
			></iframe>
		</div>
	{:else if image}
		<div
			class="absolute inset-0 bg-cover bg-center opacity-30"
			style="background-image: url({image})"
		></div>
	{/if}
	<div class="relative z-[1] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-3xl">
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
				{headline}
			</h1>
			{#if subheadline}
				<p class="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
					{subheadline}
				</p>
			{/if}
			{#if ctaPrimaryText || ctaSecondaryText}
				<div class="mt-10 flex flex-wrap gap-4">
					{#if ctaPrimaryText && ctaPrimaryUrl}
						<a href={ctaHref(ctaPrimaryUrl)} class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
							{ctaPrimaryText}
						</a>
					{/if}
					{#if ctaSecondaryText && ctaSecondaryUrl}
						<a href={ctaHref(ctaSecondaryUrl)} class="inline-flex items-center px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white font-semibold rounded-lg transition-colors">
							{ctaSecondaryText}
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>
