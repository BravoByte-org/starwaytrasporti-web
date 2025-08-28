import Services from '../Services.svelte';

export default {
	title: 'Layouts/Sections/Services',
	component: Services,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: 'Services section showcasing transportation solutions with customizable layouts and animations.'
			}
		}
	},
	argTypes: {
		enableAnimations: {
			control: 'boolean',
			description: 'Enable scroll-triggered animations'
		},
		layout: {
			control: { type: 'select' },
			options: ['grid', 'list'],
			description: 'Layout style for service cards'
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'compact', 'detailed'],
			description: 'Visual variant affecting spacing and content'
		}
	},
	args: {
		enableAnimations: true,
		layout: 'grid',
		variant: 'default'
	}
};

export const DefaultGrid = {
	args: {
		enableAnimations: true,
		layout: 'grid',
		variant: 'default'
	}
};

export const ListLayout = {
	args: {
		layout: 'list'
	},
	parameters: {
		docs: {
			description: {
				story: 'Services displayed in a vertical list layout with icons on the side.'
			}
		}
	}
};

export const Compact = {
	args: {
		variant: 'compact'
	},
	parameters: {
		docs: {
			description: {
				story: 'Compact version with reduced padding and smaller elements.'
			}
		}
	}
};

export const Detailed = {
	args: {
		variant: 'detailed'
	},
	parameters: {
		docs: {
			description: {
				story: 'Detailed version with "Learn More" buttons for each service.'
			}
		}
	}
};

export const ListCompact = {
	args: {
		layout: 'list',
		variant: 'compact'
	}
};

export const NoAnimations = {
	args: {
		enableAnimations: false
	},
	parameters: {
		docs: {
			description: {
				story: 'Services section with animations disabled for accessibility or performance.'
			}
		}
	}
};
