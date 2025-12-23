// place files you want to import through the `$lib` alias in this folder.

// Stats block components
export type { Stat, StatDelta, StatTrend } from './mocks/stats';
export { stats } from './mocks/stats';
export { default as Stat } from './components/stats/Stat.svelte';
export { default as StatGroup } from './components/stats/StatGroup.svelte';
