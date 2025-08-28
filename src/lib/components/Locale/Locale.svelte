<script lang="ts">
	import { locales, setLocale, getLocale } from '$paraglide/runtime';
	import * as m from '$paraglide/messages';
	
	let currentLocale = $state(getLocale());
	
	$effect(() => {
		if (currentLocale !== getLocale()) {
			setLocale(currentLocale);
		}
	});

	const localeNames: Record<string, string> = {
		it: 'Italiano',
		en: 'English'
	};
</script>

<div class="locale-switcher">
	<label for="locale-select" class="sr-only">
		{m.language_switch()}
	</label>
	<select 
		id="locale-select"
		bind:value={currentLocale}
		class="locale-select"
		aria-label={m.language_switch()}
		data-testid="locale-switcher"
	>
		{#each locales as locale}
			<option value={locale}>
				{localeNames[locale] ?? locale}
			</option>
		{/each}
	</select>
</div>

<style lang="postcss">
	@reference "tailwindcss";
	
	.locale-switcher {
		position: relative;
		display: inline-block;
	}

	.locale-select {
		@apply text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 text-gray-900 dark:text-gray-100;
		@apply focus:ring-2 focus:ring-blue-500 focus:border-transparent;
		@apply hover:bg-gray-50 dark:hover:bg-gray-700;
		cursor: pointer;
		min-width: 120px;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>