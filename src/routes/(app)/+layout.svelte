<script lang="ts">
	import '../../app.css';
	import favicon from '$lib/assets/favicon.svg';

	import type { LayoutData } from './$types';
	let { data, children }: { data: LayoutData, children: any } = $props();

	const { title, description } = data.global;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

<!-- Navbar with global data -->
<div class="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<h1 class="text-2xl font-bold text-gray-900 dark:text-white">
						{title}
					</h1>
				</div>
			</div>
		</div>
	</div>
</div>


{@render children?.()}