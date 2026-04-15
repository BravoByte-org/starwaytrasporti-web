<script module lang="ts">
	export type NavChild = {
		id: string;
		title: string;
		url?: string;
		open_in_new_tab?: boolean;
		page?: { slug: string; title: string } | null;
	};

	export type NavItem = NavChild & {
		children?: NavChild[];
	};
</script>

<script lang="ts">
	import { base } from '$app/paths';

	let { items = [] }: { items: NavItem[] } = $props();
	let openDropdown = $state<string | null>(null);

	function getHref(item: NavChild): string {
		if (item.url) {
			const u = item.url;
			if (/^https?:\/\//i.test(u) || u.startsWith('//') || u.startsWith('mailto:')) return u;
			const path = u.startsWith('/') ? u : `/${u}`;
			return `${base}${path}`;
		}
		if (item.page?.slug) {
			const s = item.page.slug.startsWith('/') ? item.page.slug : `/${item.page.slug}`;
			return `${base}${s}`;
		}
		return '#';
	}

	function toggleDropdown(id: string) {
		openDropdown = openDropdown === id ? null : id;
	}

	function closeDropdowns() {
		openDropdown = null;
	}
</script>

<svelte:window onclick={closeDropdowns} />

<nav class="hidden md:flex items-center gap-1">
	{#each items as item (item.id)}
		{@const hasChildren = item.children && item.children.length > 0}
		{#if hasChildren}
			<div class="relative">
				<button
					onclick={(e) => { e.stopPropagation(); toggleDropdown(item.id); }}
					class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
				>
					{item.title}
					<svg class="w-4 h-4 transition-transform {openDropdown === item.id ? 'rotate-180' : ''}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				{#if openDropdown === item.id}
					<div
						class="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-50"
						onclick={(e) => e.stopPropagation()}
					>
						<a
							href={getHref(item)}
							class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
							onclick={closeDropdowns}
						>
							{item.title}
						</a>
						<div class="border-t border-gray-100 dark:border-gray-700 my-1"></div>
						{#each item.children ?? [] as child (child.id)}
							<a
								href={getHref(child)}
								target={child.open_in_new_tab ? '_blank' : undefined}
								rel={child.open_in_new_tab ? 'noopener noreferrer' : undefined}
								class="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
								onclick={closeDropdowns}
							>
								{child.title}
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{:else}
			<a
				href={getHref(item)}
				target={item.open_in_new_tab ? '_blank' : undefined}
				rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
				class="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				{item.title}
			</a>
		{/if}
	{/each}
</nav>
