<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import MainNav, { type NavItem } from '$components/navigation/MainNav.svelte';

	import type { LayoutData } from './$types';
	let { data, children }: { data: LayoutData; children: any } = $props();

	const site = data.site as { title?: string; description?: string } | null;
	const navigation = (data.navigation ?? []) as NavItem[];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{site?.title ?? 'Starway Trasporti'}</title>
	<meta name="description" content={site?.description ?? ''} />
</svelte:head>

<div class="min-h-screen flex flex-col bg-white dark:bg-gray-950">
	<header class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<a href="/" class="flex items-center gap-2">
					<span class="text-xl font-bold text-gray-900 dark:text-white">
						{site?.title ?? 'Starway Trasporti'}
					</span>
				</a>
				<MainNav items={navigation} />
			</div>
		</div>
	</header>

	<main class="flex-1">
		{@render children?.()}
	</main>

	<footer class="bg-gray-900 text-gray-400 py-12">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
			<p>&copy; {new Date().getFullYear()} {site?.title ?? 'Starway Trasporti'}. Tutti i diritti riservati.</p>
		</div>
	</footer>
</div>