<script lang="ts">
	import { base } from '$app/paths';

	let { data }: { data: Record<string, unknown> } = $props();

	let headline = $derived((data.headline as string | undefined) ?? '');
	let subheadline = $derived((data.subheadline as string | null | undefined) ?? null);
	let image = $derived((data.image as string | null | undefined) ?? null);
	let videoUrl = $derived((data.video_url as string | null | undefined) ?? null);
	let ctaPrimaryText = $derived((data.cta_primary_text as string | null | undefined) ?? null);
	let ctaPrimaryUrl = $derived((data.cta_primary_url as string | null | undefined) ?? null);
	let ctaSecondaryText = $derived((data.cta_secondary_text as string | null | undefined) ?? null);
	let ctaSecondaryUrl = $derived((data.cta_secondary_url as string | null | undefined) ?? null);

	function ctaHref(url: string): string {
		if (/^https?:\/\//i.test(url) || url.startsWith('//') || url.startsWith('mailto:')) return url;
		const path = url.startsWith('/') ? url : `/${url}`;
		return `${base}${path}`;
	}
</script>

<section class="hero-block">
	{#if videoUrl}
		<div class="hero-block__media hero-block__media--video">
			<iframe src={videoUrl} title="" class="hero-block__video-frame"></iframe>
		</div>
	{:else if image}
		<div
			class="hero-block__media hero-block__media--image"
			style="background-image: url({image})"
		></div>
	{/if}
	<div class="hero-block__inner">
		<div class="hero-block__content">
			<h1 class="hero-block__headline">
				{headline}
			</h1>
			{#if subheadline}
				<p class="hero-block__subheadline">
					{subheadline}
				</p>
			{/if}
			{#if ctaPrimaryText || ctaSecondaryText}
				<div class="hero-block__actions">
					{#if ctaPrimaryText && ctaPrimaryUrl}
						<a href={ctaHref(ctaPrimaryUrl)} class="hero-block__action hero-block__action--primary">
							{ctaPrimaryText}
						</a>
					{/if}
					{#if ctaSecondaryText && ctaSecondaryUrl}
						<a
							href={ctaHref(ctaSecondaryUrl)}
							class="hero-block__action hero-block__action--secondary"
						>
							{ctaSecondaryText}
						</a>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "../../../app.css";

	.hero-block {
		@apply relative bg-gray-900 py-24 text-white md:py-32;
	}

	.hero-block__media {
		@apply absolute inset-0;
	}

	.hero-block__media--video {
		@apply pointer-events-none overflow-hidden opacity-40;
	}

	.hero-block__media--image {
		@apply bg-cover bg-center opacity-30;
	}

	.hero-block__video-frame {
		@apply absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-150;
	}

	.hero-block__inner {
		@apply relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
	}

	.hero-block__content {
		@apply max-w-3xl;
	}

	.hero-block__headline {
		@apply text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl;
	}

	.hero-block__subheadline {
		@apply mt-6 text-lg leading-relaxed text-gray-300 md:text-xl;
	}

	.hero-block__actions {
		@apply mt-10 flex flex-wrap gap-4;
	}

	.hero-block__action {
		@apply inline-flex items-center rounded-lg px-6 py-3 font-semibold transition-colors;
	}

	.hero-block__action--primary {
		@apply bg-blue-600 text-white hover:bg-blue-700;
	}

	.hero-block__action--secondary {
		@apply border-2 border-white/30 text-white hover:border-white/60;
	}
</style>
