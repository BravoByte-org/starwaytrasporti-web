<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { id, slug, status, title } = data.pages[0];
</script>

<h1>{title}</h1>