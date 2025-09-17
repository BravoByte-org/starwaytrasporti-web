import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const viteOptions = {
	scss: {
		includePaths: ['src/lib/styles']
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(viteOptions),
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: vercel({
			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: []
			}
		}),
		alias: {
			$config: './src/lib/config',
			$components: './src/lib/components',
			$layouts: './src/lib/layouts',
			$styles: './src/lib/styles',
			$utils: './src/lib/utils'
		}
	}
};

export default config;
