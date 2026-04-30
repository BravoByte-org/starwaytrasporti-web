<script lang="ts">
	import { base } from '$app/paths';
	import { resolveAssetUrl, type DirectusFileRef } from '$lib/util/cms/assets';

	let { data }: { data: Record<string, unknown> } = $props();

	let headline = $derived((data.headline as string | undefined) ?? '');
	let subheadline = $derived((data.subheadline as string | null | undefined) ?? null);
	let image = $derived(resolveAssetUrl(data.image as DirectusFileRef));
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
		@apply relative bg-surface-inverse py-24 text-fg-inverse md:py-32;
	}

	.hero-block__media {
		@apply absolute inset-0;
	}

	.hero-block__media--video {
		@apply pointer-events-none overflow-hidden opacity-40;
	}

	.hero-block__media--image {
		@apply bg-cover bg-center opacity-25;
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
		@apply font-display text-h1 leading-tight tracking-[0.01em] text-fg-inverse uppercase;
	}

	.hero-block__subheadline {
		@apply mt-6 max-w-2xl text-lede leading-relaxed text-fg-inverse-muted;
	}

	.hero-block__actions {
		@apply mt-10 flex flex-wrap gap-4;
	}

	.hero-block__action {
		@apply inline-flex items-center rounded-md px-6 py-3 font-semibold tracking-wide uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fg-inverse;
	}

	.hero-block__action--primary {
		@apply bg-accent text-accent-fg hover:bg-accent-hover;
	}

	.hero-block__action--secondary {
		@apply border-2 border-fg-inverse/40 text-fg-inverse hover:border-fg-inverse hover:bg-fg-inverse/5;
	}
</style>
