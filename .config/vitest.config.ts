import { sveltekit } from '@sveltejs/kit/vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	plugins: [
		sveltekit(),
		svelte({
			hot: !process.env.VITEST,
			compilerOptions: {
				runes: true
			}
		})
	],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./test.setup.js'],
		include: ['../src/**/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/',
				'tests/',
				'**/*.stories.*',
				'**/__STORIES__/**',
				'src/app.html',
				'src/routes/**/+*.{js,ts}'
			]
		}
	},
	resolve: {
		alias: {
			$components: path.resolve(__dirname, '../src/lib/components'),
			$layouts: path.resolve(__dirname, '../src/lib/layouts'),
			$styles: path.resolve(__dirname, '../src/lib/styles'),
			$util: path.resolve(__dirname, '../src/lib/util'),
			$lib: path.resolve(__dirname, '../src/lib')
		},
		// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
		// This fixes @testing-library/svelte compatibility with Svelte 5 runes
		conditions: process.env.VITEST ? ['browser'] : undefined
	}
})
