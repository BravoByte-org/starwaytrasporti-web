<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const { id, slug, status, page_name } = data.pages[0];
</script>

<h1>{page_name}</h1>