<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import type { StatData } from '$lib/mocks/stats';

	let { stat }: { stat: StatData } = $props();

	let cardEl: HTMLElement | null = null;
	let animatedValue: number | null = null;
	let prefersReducedMotion = false;
	let hasAnimated = false;
	let observer: IntersectionObserver | null = null;

	let isNumber = $derived(typeof stat.value === 'number');
	let targetValue = $derived(isNumber ? (stat.value as number) : null);

	const withUnits = (value: string | number) => `${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`;

	const formatNumber = (value: number) => new Intl.NumberFormat('en-US').format(Math.round(value));

	const displayedValue = () => {
		if (!isNumber) return withUnits(stat.value);
		const current = animatedValue ?? targetValue ?? 0;
		return withUnits(formatNumber(current));
	};

	const animateValue = () => {
		if (!isNumber || targetValue === null) {
			return;
		}

		if (prefersReducedMotion) {
			animatedValue = targetValue;
			return;
		}

		const duration = 1200;
		const startTime = performance.now();
		const startValue = 0;

		const step = (timestamp: number) => {
			const progress = Math.min((timestamp - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
			animatedValue = startValue + (targetValue - startValue) * eased;

			if (progress < 1) {
				requestAnimationFrame(step);
			} else {
				animatedValue = targetValue;
			}
		};

		requestAnimationFrame(step);
	};

	$effect(() => {
		animatedValue = isNumber ? 0 : null;
		hasAnimated = false;
	});

	onMount(() => {
		if (typeof window === 'undefined') {
			return;
		}

		prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

		if (!isNumber || targetValue === null) {
			return;
		}

		if (!('IntersectionObserver' in window)) {
			animatedValue = targetValue;
			return;
		}

		observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				if (entry?.isIntersecting && !hasAnimated) {
					hasAnimated = true;
					animateValue();
					observer?.disconnect();
				}
			},
			{ threshold: 0.35 }
		);

		if (cardEl) {
			observer.observe(cardEl);
		}
	});

	onDestroy(() => {
		observer?.disconnect();
	});
</script>

<article bind:this={cardEl} class="stat-card">
	<div class="stat-card__header">
		{#if stat.icon}
			<span
				class="stat-card__icon"
				aria-hidden={stat.iconLabel ? undefined : 'true'}
				aria-label={stat.iconLabel}
			>
				{stat.icon}
			</span>
		{/if}

		{#if stat.header}
			<span class="stat-card__eyebrow">
				{stat.header}
			</span>
		{/if}
	</div>

	<div class="stat-card__body">
		<div class="stat-card__value-row">
			<p
				class="stat-card__value"
				aria-label={stat.ariaLabel ?? `${stat.label}: ${displayedValue()}`}
			>
				{displayedValue()}
			</p>

			{#if stat.delta}
				<span
					class="stat-card__delta"
					aria-label={stat.delta.ariaLabel ?? `Delta: ${stat.delta.value}`}
				>
					{#if stat.delta.trend === 'up'}
						<span aria-hidden="true">▲</span>
					{:else if stat.delta.trend === 'down'}
						<span aria-hidden="true">▼</span>
					{:else}
						<span aria-hidden="true">•</span>
					{/if}
					{stat.delta.value}
				</span>
			{/if}
		</div>

		<p class="stat-card__label">{stat.label}</p>
	</div>

	<p class="stat-card__description">{stat.description}</p>
</article>

<style lang="postcss">
	@reference "../../../app.css";

	.stat-card {
		@apply flex min-h-[180px] flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:bg-white/10;
	}

	.stat-card__header {
		@apply flex items-center gap-3 text-sm font-medium text-white/80;
	}

	.stat-card__icon {
		@apply inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg;
	}

	.stat-card__eyebrow {
		@apply text-xs font-semibold tracking-wide text-white/70 uppercase;
	}

	.stat-card__body {
		@apply flex flex-col gap-2;
	}

	.stat-card__value-row {
		@apply flex items-baseline gap-3;
	}

	.stat-card__value {
		@apply text-4xl leading-tight font-semibold sm:text-5xl;
	}

	.stat-card__delta {
		@apply inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold tracking-tight text-white/80 uppercase;
	}

	.stat-card__label {
		@apply text-base font-medium text-white/90;
	}

	.stat-card__description {
		@apply text-sm leading-relaxed text-white/70;
	}
</style>
