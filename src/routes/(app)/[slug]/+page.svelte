<script lang="ts">
	type PageData = {
		page: {
			id: number;
			slug: string;
			status: string;
			page_name: string;
		}
	}

	let { data }: { data: PageData } = $props();

	const { page } = data;

	console.log(page);
</script>