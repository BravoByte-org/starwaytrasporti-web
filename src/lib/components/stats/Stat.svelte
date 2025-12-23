<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import type { Stat } from '$lib/mocks/stats';

	let { stat }: { stat: Stat } = $props();

	let cardEl: HTMLElement | null = null;
	let animatedValue: number | null = typeof stat.value === 'number' ? 0 : null;
	let prefersReducedMotion = false;
	let hasAnimated = false;
	let observer: IntersectionObserver | null = null;

	const isNumber = typeof stat.value === 'number';
	const targetValue = isNumber ? (stat.value as number) : null;

	const withUnits = (value: string | number) =>
		`${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`;

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

	onMount(() => {
		if (typeof window === 'undefined') {
			return;
		}

		prefersReducedMotion =
			window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

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

<article
	bind:this={cardEl}
	class="flex min-h-[180px] flex-col justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
>
	<div class="flex items-center gap-3 text-sm font-medium text-white/80">
		{#if stat.icon}
			<span
				class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg"
				aria-hidden={stat.iconLabel ? undefined : 'true'}
				aria-label={stat.iconLabel}
			>
				{stat.icon}
			</span>
		{/if}

		{#if stat.header}
			<span class="text-xs font-semibold uppercase tracking-wide text-white/70">
				{stat.header}
			</span>
		{/if}
	</div>

	<div class="flex flex-col gap-2">
		<div class="flex items-baseline gap-3">
			<p
				class="text-4xl font-semibold leading-tight sm:text-5xl"
				aria-label={stat.ariaLabel ?? `${stat.label}: ${displayedValue()}`}
			>
				{displayedValue()}
			</p>

			{#if stat.delta}
				<span
					class="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-2 py-1 text-xs font-semibold uppercase tracking-tight text-white/80"
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

		<p class="text-base font-medium text-white/90">{stat.label}</p>
	</div>

	<p class="text-sm leading-relaxed text-white/70">{stat.description}</p>
</article>
