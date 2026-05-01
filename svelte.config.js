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
			// Pin the deployed serverless runtime so adapter-vercel skips its
			// `process.version`-based auto-detection. Without this, a Vercel
			// build runner on a Node version not yet supported by adapter-vercel
			// (e.g. 24.x) errors with `Unsupported Node.js version` even when
			// the project's Node setting and `package.json#engines.node` are
			// pinned to 22. Aligns with `engines.node` in `package.json`.
			runtime: 'nodejs22.x',
			images: {
				sizes: [640, 828, 1200, 1920, 3840],
				formats: ['image/avif', 'image/webp'],
				minimumCacheTTL: 300,
				domains: []
			}
		}),
		alias: {
			$components: './src/lib/components',
			$config: './src/lib/config',
			$layouts: './src/lib/layouts',
			$mocks: './src/lib/mocks',
			$styles: './src/lib/styles',
			$util: './src/lib/util',
			$mocks: './src/lib/mocks'
		}
	}
};

export default config;
