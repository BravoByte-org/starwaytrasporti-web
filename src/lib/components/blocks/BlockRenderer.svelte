<script lang="ts">
	import HeroBlock from './HeroBlock.svelte';
	import RichTextBlock from './RichTextBlock.svelte';
	import StatsBlock from './StatsBlock.svelte';
	import CardGroupBlock from './CardGroupBlock.svelte';
	import TeamBlock from './TeamBlock.svelte';
	import TimelineBlock from './TimelineBlock.svelte';
	import CtaBlock from './CtaBlock.svelte';
	import ImageGalleryBlock from './ImageGalleryBlock.svelte';

	type Block = {
		collection: string;
		item: Record<string, unknown>;
	};

	let { blocks = [] }: { blocks: Block[] } = $props();

	const componentMap: Record<string, typeof HeroBlock> = {
		block_hero: HeroBlock,
		block_rich_text: RichTextBlock,
		block_stats: StatsBlock,
		block_card_group: CardGroupBlock,
		block_team: TeamBlock,
		block_timeline: TimelineBlock,
		block_cta: CtaBlock,
		block_image_gallery: ImageGalleryBlock
	};
</script>

{#each blocks as block, i (`${block.collection}-${i}`)}
	{@const Component = componentMap[block.collection]}
	{#if Component}
		<Component data={block.item} />
	{/if}
{/each}
