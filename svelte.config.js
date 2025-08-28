import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { escapeSvelte, mdsvex } from 'mdsvex';

import remarkGfm from 'remark-gfm';
import { bundledThemes, bundledLanguages, createHighlighter } from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkGfm],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: Object.keys(bundledThemes),
				langs: Object.keys(bundledLanguages)
			});

			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang: lang,
					theme: 'nord'
				})
			);

			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const viteOptions = {
	scss: {
		includePaths: ['src/lib/styles']
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md', '.mdx'],
	preprocess: [vitePreprocess(viteOptions), mdsvex(mdsvexOptions)],
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
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found' && referrer === '/blog/how-we-built-our-docs-site') {
					return;
				}
				// otherwise fail the build
				throw new Error(message);
			}
		},
		alias: {
			$components: './src/lib/components',
			$layouts: './src/lib/layouts',
			$styles: './src/lib/styles',
			$utils: './src/lib/utils',
			$paraglide: './src/lib/paraglide'
		}
	}
};

export default config;
