<script lang="ts">
	/**
	 * Reusable card component with optional icon, title, summary, meta, and CTA.
	 * Tone controls accent glow colors (sunset, seafoam, violet).
	 */
	let {
		icon = '',
		title = '',
		summary = '',
		meta = '',
		cta = undefined as { label: string; href: string } | undefined,
		tone = 'sunset' as 'sunset' | 'seafoam' | 'violet',
		style = '',
		class: className = '',
		...restProps
	} = $props();
</script>

<article class={`card card--${tone} ${className}`} style={style} {...restProps}>
	<div class="backdrop"></div>

	{#if icon}
		<div class="icon" aria-hidden="true">
			{icon}
		</div>
	{/if}

	<div class="content">
		{#if title}
			<h3 class="title">{title}</h3>
		{/if}

		{#if summary}
			<p class="summary">{summary}</p>
		{/if}

		{#if meta}
			<p class="meta">{meta}</p>
		{/if}
	</div>

	{#if cta}
		<a class="cta" href={cta.href}>
			{cta.label}
			<span aria-hidden="true">↗</span>
		</a>
	{/if}
</article>

<style>
	:global(:root) {
		--card-bg: rgba(255, 255, 255, 0.05);
		--card-stroke: rgba(255, 255, 255, 0.16);
		--card-text: #eef3ff;
		--card-muted: #c8d2ec;
		--card-cta: rgba(255, 255, 255, 0.2);
	}

	article.card {
		position: relative;
		isolation: isolate;
		background: var(--card-bg);
		color: var(--card-text);
		border: 1px solid var(--card-stroke);
		border-radius: 16px;
		padding: 1.15rem 1.05rem;
		display: grid;
		gap: 0.8rem;
		box-shadow: 0 18px 42px rgba(0, 0, 0, 0.35);
		overflow: hidden;
		transition: border-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
	}

	article.card:hover {
		border-color: rgba(255, 255, 255, 0.32);
		box-shadow: 0 28px 56px rgba(0, 0, 0, 0.45);
		transform: translateY(-2px);
	}

	.backdrop {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at 12% 20%, rgba(255, 255, 255, 0.04), transparent 50%),
			radial-gradient(circle at 85% 10%, rgba(255, 255, 255, 0.05), transparent 40%);
		z-index: -2;
	}

	.card--sunset::before,
	.card--sunset::after,
	.card--seafoam::before,
	.card--seafoam::after,
	.card--violet::before,
	.card--violet::after {
		content: '';
		position: absolute;
		width: 160px;
		height: 160px;
		border-radius: 999px;
		filter: blur(48px);
		opacity: 0.6;
		z-index: -1;
	}

	.card--sunset::before {
		background: #ff7b57;
		top: -42px;
		left: -26px;
	}

	.card--sunset::after {
		background: #ffd166;
		bottom: -52px;
		right: -20px;
	}

	.card--seafoam::before {
		background: #5ee6d0;
		top: -35px;
		left: -30px;
	}

	.card--seafoam::after {
		background: #3fb0ff;
		bottom: -42px;
		right: -18px;
	}

	.card--violet::before {
		background: #a78bfa;
		top: -46px;
		left: -32px;
	}

	.card--violet::after {
		background: #7dd3fc;
		bottom: -50px;
		right: -24px;
	}

	.icon {
		width: 44px;
		height: 44px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.02));
		font-size: 1.25rem;
	}

	.content {
		display: grid;
		gap: 0.35rem;
	}

	.title {
		margin: 0;
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}

	.summary {
		margin: 0;
		color: var(--card-muted);
		line-height: 1.45;
	}

	.meta {
		margin: 0;
		color: rgba(255, 255, 255, 0.72);
		font-weight: 600;
		letter-spacing: 0.04em;
		font-size: 0.82rem;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		padding: 0.55rem 0.9rem;
		border-radius: 999px;
		border: 1px solid var(--card-cta);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
		color: var(--card-text);
		font-weight: 700;
		text-decoration: none;
		width: fit-content;
		cursor: pointer;
		transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
	}

	.cta:hover {
		transform: translateY(-1px);
		border-color: rgba(255, 255, 255, 0.32);
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
	}
</style>
