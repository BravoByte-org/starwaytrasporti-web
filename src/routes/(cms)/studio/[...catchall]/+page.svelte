<script lang="ts">
	import config from '$config/cms/sanity.config';
	import SanityStudio from '$components/CMS/SanityStudio.svelte';
</script>

<!-- @ts-ignore -->
<SanityStudio {config} />