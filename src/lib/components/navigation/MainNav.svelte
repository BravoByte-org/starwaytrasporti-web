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
	import HamburgerButton from './HamburgerButton.svelte';

	let { items = [] }: { items: NavItem[] } = $props();

	/* ----- state ----- */
	let openDropdown = $state<string | null>(null);
	let mobileOpen = $state(false);
	let mobileAccordion = $state<string | null>(null);

	let hamburgerWrapperRef: HTMLDivElement | null = $state(null);
	let panelRef: HTMLDivElement | null = $state(null);

	const MOBILE_PANEL_ID = 'main-nav-mobile-panel';

	/* ----- href resolution ----- */
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

	/* ----- desktop dropdown handlers ----- */
	function toggleDropdown(id: string) {
		openDropdown = openDropdown === id ? null : id;
	}

	function closeDropdowns() {
		openDropdown = null;
	}

	/* ----- mobile panel handlers ----- */
	function toggleMobile() {
		mobileOpen = !mobileOpen;
		if (!mobileOpen) mobileAccordion = null;
	}

	function closeMobile() {
		mobileOpen = false;
		mobileAccordion = null;
	}

	function toggleAccordion(id: string) {
		mobileAccordion = mobileAccordion === id ? null : id;
	}

	function onMobileKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && mobileOpen) {
			e.preventDefault();
			closeMobile();
			hamburgerWrapperRef?.querySelector<HTMLButtonElement>('button')?.focus();
		}
	}

	/* ----- body scroll lock while mobile panel is open ----- */
	$effect(() => {
		if (typeof document === 'undefined') return;
		const cls = 'overflow-hidden';
		if (mobileOpen) {
			document.body.classList.add(cls);
			const firstLink = panelRef?.querySelector<HTMLElement>('a, button');
			firstLink?.focus();
		} else {
			document.body.classList.remove(cls);
		}
		return () => document.body.classList.remove(cls);
	});
</script>

<svelte:window onclick={closeDropdowns} onkeydown={onMobileKey} />

<nav class="main-nav" class:main-nav--mobile-open={mobileOpen}>
	<!-- Desktop nav (>= --md) -->
	<div class="main-nav__desktop">
		{#each items as item (item.id)}
			{@const hasChildren = item.children && item.children.length > 0}
			{#if hasChildren}
				<div class="main-nav__group">
					<button
						type="button"
						onclick={(e) => {
							e.stopPropagation();
							toggleDropdown(item.id);
						}}
						class="main-nav__trigger"
						aria-expanded={openDropdown === item.id}
					>
						{item.title}
						<svg
							class="main-nav__caret"
							class:main-nav__caret--open={openDropdown === item.id}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
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
	</div>

	<!-- Mobile trigger (< --md) -->
	<div class="main-nav__mobile-trigger" bind:this={hamburgerWrapperRef}>
		<HamburgerButton open={mobileOpen} controls={MOBILE_PANEL_ID} onclick={toggleMobile} />
	</div>
</nav>

<!-- Mobile panel (< --md). Rendered outside the nav flex so it can cover the viewport. -->
{#if mobileOpen}
	<button
		type="button"
		class="main-nav__scrim"
		aria-label="Chiudi menu"
		onclick={closeMobile}
	></button>
{/if}
<div
	id={MOBILE_PANEL_ID}
	class="main-nav__panel"
	class:main-nav__panel--open={mobileOpen}
	role="dialog"
	aria-modal="true"
	aria-label="Menu principale"
	aria-hidden={!mobileOpen}
	inert={!mobileOpen}
	bind:this={panelRef}
>
	<ul class="main-nav__panel-list">
		{#each items as item (item.id)}
			{@const hasChildren = item.children && item.children.length > 0}
			<li class="main-nav__panel-item">
				{#if hasChildren}
					<button
						type="button"
						class="main-nav__panel-trigger"
						aria-expanded={mobileAccordion === item.id}
						aria-controls={`accordion-${item.id}`}
						onclick={() => toggleAccordion(item.id)}
					>
						<span class="main-nav__panel-label">{item.title}</span>
						<svg
							class="main-nav__caret"
							class:main-nav__caret--open={mobileAccordion === item.id}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
					{#if mobileAccordion === item.id}
						<ul class="main-nav__panel-sublist" id={`accordion-${item.id}`}>
							<li>
								<a
									href={getHref(item)}
									class="main-nav__panel-sublink main-nav__panel-sublink--primary"
									onclick={closeMobile}
								>
									{item.title}
								</a>
							</li>
							{#each item.children ?? [] as child (child.id)}
								<li>
									<a
										href={getHref(child)}
										target={child.open_in_new_tab ? '_blank' : undefined}
										rel={child.open_in_new_tab ? 'noopener noreferrer' : undefined}
										class="main-nav__panel-sublink"
										onclick={closeMobile}
									>
										{child.title}
									</a>
								</li>
							{/each}
						</ul>
					{/if}
				{:else}
					<a
						href={getHref(item)}
						target={item.open_in_new_tab ? '_blank' : undefined}
						rel={item.open_in_new_tab ? 'noopener noreferrer' : undefined}
						class="main-nav__panel-link"
						onclick={closeMobile}
					>
						{item.title}
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style lang="postcss">
	@reference '../../../app.css';

	/*
	 * BEM (flat class selectors) + nested pseudo/modifier/@media only.
	 * Svelte's CSS analyzer does not resolve `&__suffix` / `&--suffix`
	 * nesting, so element/modifier classes stay flat. See
	 * bravobyte-ai/rules/tailwind-svelte.md -> "Nested BEM".
	 */

	.main-nav {
		@apply flex items-center gap-1;
	}

	.main-nav__desktop {
		@apply hidden md:flex md:items-center md:gap-1;
	}

	.main-nav__mobile-trigger {
		@apply flex items-center md:hidden;
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

	.main-nav__caret {
		@apply h-4 w-4 transition-transform;
	}

	.main-nav__caret--open {
		@apply rotate-180;
	}

	.main-nav__menu {
		@apply absolute top-full left-0 z-50 mt-1 w-56 rounded-lg border border-gray-100 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800;
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

	/* ---------- mobile panel ---------- */

	.main-nav__scrim {
		@apply fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden;
	}

	.main-nav__panel {
		@apply pointer-events-none fixed inset-x-0 top-16 bottom-0 z-50 translate-x-full overflow-y-auto bg-white shadow-xl transition-transform duration-200 ease-out md:hidden dark:bg-gray-900;
	}

	.main-nav__panel--open {
		@apply pointer-events-auto translate-x-0;
	}

	.main-nav__panel-list {
		@apply flex flex-col divide-y divide-gray-100 dark:divide-gray-800;
	}

	.main-nav__panel-item {
		@apply flex flex-col;
	}

	.main-nav__panel-link,
	.main-nav__panel-trigger {
		@apply flex w-full items-center justify-between px-6 py-4 text-left text-base font-medium text-gray-800 transition-colors hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800;
	}

	.main-nav__panel-sublist {
		@apply flex flex-col bg-gray-50 dark:bg-gray-800;
	}

	.main-nav__panel-sublink {
		@apply block px-10 py-3 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white;
	}

	.main-nav__panel-sublink--primary {
		@apply font-semibold text-gray-800 dark:text-gray-100;
	}
</style>
