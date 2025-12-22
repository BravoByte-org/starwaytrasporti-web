<script lang="ts">
        import CardGroup from '$lib/components/cards/CardGroup.svelte';
        import { servicesMock } from '$mocks/services';

        let { items = servicesMock } = $props();
</script>

<section class="page-section">
        <CardGroup items={items} />
</section>

<style>
        section.page-section {
                width: 100%;
                padding: clamp(2rem, 5vw, 4rem) 0;
        }
</style>
