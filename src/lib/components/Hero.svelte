<script lang="ts">
	import type { HeroContent } from '$mocks/hero';
	import { heroMock } from '$mocks/hero';

	// Accept optional content prop, fall back to mock data
	let { content = heroMock }: { content?: HeroContent } = $props();

	// Merge with defaults to ensure all fields are present
	let heroContent = $derived({
		...heroMock,
		...content,
		primaryCta: { ...heroMock.primaryCta, ...content?.primaryCta },
		secondaryCta: { ...heroMock.secondaryCta, ...content?.secondaryCta },
		media: { ...heroMock.media, ...content?.media }
	});
</script>

<section class="hero">
	<div class="hero__beam" aria-hidden="true"></div>

	<div class="hero__grid">
		<div class="hero__copy">
			<p class="hero__eyebrow">
				<span class="hero__eyebrow-dot"></span>
				{heroContent.eyebrow}
			</p>

			<h1 class="hero__headline">{heroContent.headline}</h1>
			<p class="hero__sub">{heroContent.subHeadline}</p>

			<div class="hero__actions">
				<a class="hero__primary" href={heroContent.primaryCta.href}
					>{heroContent.primaryCta.label}</a
				>
				<a class="hero__secondary" href={heroContent.secondaryCta.href}>
					{heroContent.secondaryCta.label}
				</a>
			</div>
		</div>

		<div class="hero__media">
			<picture>
				<source srcset={heroContent.media.fleetImage} type="image/webp" />
				<img
					class="hero__image"
					src={heroContent.media.fleetImage}
					alt={heroContent.media.fleetAlt}
					loading="lazy"
					decoding="async"
				/>
			</picture>

			<div class="hero__map" aria-hidden="true">
				<img
					class="hero__map-image"
					src={heroContent.media.mapOverlay}
					alt=""
					loading="lazy"
					decoding="async"
				/>
			</div>

			<div class="hero__scrim" aria-hidden="true"></div>
		</div>
	</div>

	<div class="hero__stats">
		{#each heroContent.trustStats as stat, index (index)}
			<div class="hero__stat">
				<span class="hero__stat-dot" aria-hidden="true"></span>
				<span>{stat}</span>
			</div>
		{/each}
	</div>
</section>

<style lang="postcss">
	@reference "../../app.css";

	.hero {
		@apply relative overflow-hidden bg-slate-950 text-slate-50;
	}

	.hero__beam {
		@apply absolute top-10 left-1/2 h-72 w-[110%] -translate-x-1/2 rounded-[999px] bg-linear-to-r from-sky-500/15 via-cyan-400/10 to-blue-500/15 blur-3xl;
	}

	.hero__grid {
		@apply relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pt-16 pb-10 sm:px-8 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:pt-20 lg:pb-14 xl:px-12;
	}

	.hero__copy {
		@apply relative z-10;
	}

	.hero__eyebrow {
		@apply inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs font-semibold tracking-[0.08em] text-slate-200 uppercase ring-1 ring-white/15;
	}

	.hero__eyebrow-dot {
		@apply h-2 w-2 rounded-full bg-sky-400;
	}

	.hero__headline {
		@apply mt-4 text-3xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-4xl lg:text-5xl;
	}

	.hero__sub {
		@apply mt-4 max-w-2xl text-base leading-relaxed text-pretty text-slate-200 sm:text-lg;
	}

	.hero__actions {
		@apply mt-8 flex flex-wrap gap-3;
	}

	.hero__primary {
		@apply inline-flex items-center justify-center rounded-full bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/25 transition hover:bg-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300;
	}

	.hero__secondary {
		@apply inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white;
	}

	.hero__media {
		@apply relative isolate h-72 overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-1 ring-white/10 lg:h-112;
	}

	.hero__image {
		@apply h-full w-full object-cover;
	}

	.hero__scrim {
		@apply absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/30 to-transparent;
	}

	.hero__map {
		@apply pointer-events-none absolute inset-0 opacity-60 mix-blend-screen;
	}

	.hero__map-image {
		@apply h-full w-full object-cover;
	}

	.hero__stats {
		@apply relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-3 px-6 pb-14 sm:grid-cols-3 sm:px-8 xl:px-12;
	}

	.hero__stat {
		@apply flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur;
	}

	.hero__stat-dot {
		@apply h-2.5 w-2.5 rounded-full bg-emerald-400;
	}
</style>
