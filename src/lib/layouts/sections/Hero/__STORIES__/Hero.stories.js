import Hero from '../Hero.svelte';

export default {
	title: 'Layouts/Sections/Hero',
	component: Hero,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Hero section with multi-level parallax effect and scroll animations. Supports reduced motion preferences and different variants.'
			}
		}
	},
	argTypes: {
		showScrollIndicator: {
			control: 'boolean',
			description: 'Show the animated scroll indicator at the bottom'
		},
		enableParallax: {
			control: 'boolean',
			description: 'Enable parallax background effects'
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'compact'],
			description: 'Visual variant of the hero section'
		}
	},
	args: {
		showScrollIndicator: true,
		enableParallax: true,
		variant: 'default'
	}
};

export const Default = {
	args: {
		showScrollIndicator: true,
		enableParallax: true,
		variant: 'default'
	}
};

export const Compact = {
	args: {
		variant: 'compact',
		showScrollIndicator: false
	}
};

export const NoParallax = {
	args: {
		enableParallax: false,
		showScrollIndicator: false
	},
	parameters: {
		docs: {
			description: {
				story: 'Hero section with parallax disabled - useful for reduced motion preferences or performance optimization.'
			}
		}
	}
};

export const NoScrollIndicator = {
	args: {
		showScrollIndicator: false
	}
};

export const Minimal = {
	args: {
		variant: 'compact',
		enableParallax: false,
		showScrollIndicator: false
	},
	parameters: {
		docs: {
			description: {
				story: 'Minimal hero section with no animations or scroll indicator - optimal for accessibility and performance.'
			}
		}
	}
};
