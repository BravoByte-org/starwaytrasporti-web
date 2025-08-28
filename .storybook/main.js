/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
	stories: [
		'../src/lib/**/__STORIES__/*.mdx',
		'../src/lib/**/__STORIES__/*.stories.@(js|ts|tsx|svelte|mdx)'
	],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-vitest'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	},
	aliases: {
		$components: '../../../apps/web/src/lib/components'
	}
};
export default config;
