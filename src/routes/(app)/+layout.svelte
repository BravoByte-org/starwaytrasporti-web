<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import MainNav, { type NavItem } from '$components/navigation/MainNav.svelte';

	import type { LayoutData } from './$types';
	let { data, children }: { data: LayoutData; children: any } = $props();

	let site = $derived((data.site as { title?: string; description?: string } | null) ?? null);
	let navigation = $derived((data.navigation ?? []) as NavItem[]);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{site?.title ?? 'Starway Trasporti'}</title>
	<meta name="description" content={site?.description ?? ''} />
</svelte:head>

<div class="app-shell">
	<header class="app-header">
		<div class="app-header__inner">
			<div class="app-header__bar">
				<a href="/" class="app-header__brand">
					<span class="app-header__title">
						{site?.title ?? 'Starway Trasporti'}
					</span>
				</a>
				<MainNav items={navigation} />
			</div>
		</div>
	</header>

	<main class="app-main">
		{@render children?.()}
	</main>

	<footer class="app-footer">
		<div class="app-footer__inner">
			<p>
				&copy; {new Date().getFullYear()}
				{site?.title ?? 'Starway Trasporti'}. Tutti i diritti riservati.
			</p>
		</div>
	</footer>
</div>

<style lang="postcss">
	@reference "../../app.css";

	.app-shell {
		@apply flex min-h-screen flex-col bg-white dark:bg-gray-950;
	}

	.app-header {
		@apply sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900;
	}

	.app-header__inner {
		@apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
	}

	.app-header__bar {
		@apply flex h-16 items-center justify-between;
	}

	.app-header__brand {
		@apply flex items-center gap-2;
	}

	.app-header__title {
		@apply text-xl font-bold text-gray-900 dark:text-white;
	}

	.app-main {
		@apply flex-1;
	}

	.app-footer {
		@apply bg-gray-900 py-12 text-gray-400;
	}

	.app-footer__inner {
		@apply mx-auto max-w-7xl px-4 text-center text-sm sm:px-6 lg:px-8;
	}
</style>
