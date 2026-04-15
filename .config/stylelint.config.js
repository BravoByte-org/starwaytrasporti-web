/**
 * Stylelint Configuration
 * @see https://stylelint.io/user-guide/configure
 *
 * Configured for:
 * - SCSS support
 * - Svelte component styles
 * - Tailwind CSS v4 directives (@apply, @reference, @theme, etc.)
 */

/** @type {import('stylelint').Config} */
export default {
	extends: ['stylelint-config-standard-scss', 'stylelint-config-tailwindcss'],
	overrides: [
		{
			files: ['**/*.svelte'],
			customSyntax: 'postcss-html'
		}
	],
	rules: {
		// Allow Tailwind CSS v4 at-rules
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					// Tailwind v3 directives
					'tailwind',
					'apply',
					'layer',
					'config',
					'plugin',
					// Tailwind v4 directives
					'theme',
					'source',
					'utility',
					'variant',
					'custom-variant',
					'reference',
					'import'
				]
			}
		],
		// SCSS-specific rule for unknown at-rules
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					// Tailwind v3 directives
					'tailwind',
					'apply',
					'layer',
					'config',
					'plugin',
					// Tailwind v4 directives
					'theme',
					'source',
					'utility',
					'variant',
					'custom-variant',
					'reference',
					'import'
				]
			}
		],
		// Disable selector-class-pattern to allow BEM and Tailwind utility classes
		'selector-class-pattern': null,
		// Allow Tailwind's @import syntax
		'import-notation': null
	}
};
