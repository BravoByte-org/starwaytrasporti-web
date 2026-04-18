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

<nav class="main-nav">
	{#each items as item (item.id)}
		{@const hasChildren = item.children && item.children.length > 0}
		{#if hasChildren}
			<div class="main-nav__group">
				<button
					onclick={(e) => { e.stopPropagation(); toggleDropdown(item.id); }}
					class="main-nav__trigger"
				>
					{item.title}
					<svg
						class="main-nav__icon"
						class:main-nav__icon--open={openDropdown === item.id}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				{#if openDropdown === item.id}
					<div class="main-nav__menu">
						<a
							href={getHref(item)}
							class="main-nav__menu-link main-nav__menu-link--primary"
							onclick={closeDropdowns}
						>
							{item.title}
						</a>
						<div class="main-nav__divider"></div>
						{#each item.children ?? [] as child (child.id)}
							<a
								href={getHref(child)}
								target={child.open_in_new_tab ? '_blank' : undefined}
								rel={child.open_in_new_tab ? 'noopener noreferrer' : undefined}
								class="main-nav__menu-link"
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
				class="main-nav__link"
			>
				{item.title}
			</a>
		{/if}
	{/each}
</nav>

<style lang="postcss">
	@reference "../../../app.css";

	.main-nav {
		@apply hidden items-center gap-1 md:flex;
	}

	.main-nav__group {
		@apply relative;
	}

	.main-nav__trigger,
	.main-nav__link {
		@apply rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white;
	}

	.main-nav__trigger {
		@apply flex items-center gap-1;
	}

	.main-nav__icon {
		@apply h-4 w-4 transition-transform;
	}

	.main-nav__icon--open {
		@apply rotate-180;
	}

	.main-nav__menu {
		@apply absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-gray-100 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800;
	}

	.main-nav__menu-link {
		@apply block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
	}

	.main-nav__menu-link--primary {
		@apply font-medium text-gray-700 dark:text-gray-300;
	}

	.main-nav__divider {
		@apply my-1 border-t border-gray-100 dark:border-gray-700;
	}
</style>
