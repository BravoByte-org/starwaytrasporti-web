/*--------------------------------- Imports ---------------------------------*/
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
/*---------------------------------------------------------------------------*/

/*--------------------------------- Plugins ---------------------------------*/
import tailwindcss from '@tailwindcss/vite';
/*---------------------------------------------------------------------------*/

/*--------------------------------- Config ---------------------------------*/
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			$lib: './src/lib',
			$components: './src/lib/components',
			$config: './src/lib/config',
			$styles: './src/lib/styles',
			$utils: './src/lib/utils'
		}
	},
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
/*---------------------------------------------------------------------------*/