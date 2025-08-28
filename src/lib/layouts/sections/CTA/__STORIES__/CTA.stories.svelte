<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from 'storybook/test';
	import CTA from '../CTA.svelte';

	const { Story } = defineMeta({
		title: 'Layouts/Sections/CTA',
		component: CTA,
		parameters: {
			layout: 'fullscreen',
			docs: {
				description: {
					component: 'Call-to-action section with customizable layouts, backgrounds, and button configurations.'
				}
			}
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'compact', 'split'],
				description: 'Layout variant of the CTA section'
			},
			backgroundColor: {
				control: { type: 'select' },
				options: ['dark', 'blue', 'white'],
				description: 'Background color theme'
			},
			buttonsLayout: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical', 'single'],
				description: 'Button arrangement'
			},
			primaryAction: {
				control: { type: 'select' },
				options: ['contact', 'quote'],
				description: 'Primary button action type'
			},
			showSecondaryButton: {
				control: 'boolean',
				description: 'Show secondary action button'
			}
		},
		args: {
			variant: 'default',
			backgroundColor: 'dark',
			buttonsLayout: 'horizontal',
			primaryAction: 'contact',
			showSecondaryButton: true
		}
	});
</script>

<!-- Default centered layout -->
<Story 
	name="Default"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		
		// Check that CTA elements are present
		const heading = canvas.getByRole('heading', { level: 2 });
		const buttons = canvas.getAllByRole('button');
		
		await expect(heading).toBeInTheDocument();
		await expect(buttons.length).toBeGreaterThan(0);
		
		// Test button interaction
		if (buttons[0]) {
			await userEvent.click(buttons[0]);
			// Could add console.log assertions here
		}
	}}
/>

<!-- Split layout -->
<Story 
	name="Split Layout" 
	args={{ 
		variant: 'split'
	}}
	parameters={{
		docs: {
			description: {
				story: 'Split layout with content on the left and buttons on the right.'
			}
		}
	}}
/>

<!-- Compact variant -->
<Story 
	name="Compact" 
	args={{ 
		variant: 'compact'
	}}
/>

<!-- Blue background -->
<Story 
	name="Blue Background" 
	args={{ 
		backgroundColor: 'blue'
	}}
/>

<!-- White background -->
<Story 
	name="White Background" 
	args={{ 
		backgroundColor: 'white'
	}}
/>

<!-- Vertical buttons -->
<Story 
	name="Vertical Buttons" 
	args={{ 
		buttonsLayout: 'vertical'
	}}
/>

<!-- Single button -->
<Story 
	name="Single Button" 
	args={{ 
		buttonsLayout: 'single',
		showSecondaryButton: false
	}}
/>

<!-- Quote primary action -->
<Story 
	name="Quote Primary" 
	args={{ 
		primaryAction: 'quote'
	}}
/>

<!-- Split + Blue combination -->
<Story 
	name="Split Blue" 
	args={{ 
		variant: 'split',
		backgroundColor: 'blue',
		buttonsLayout: 'vertical'
	}}
/>

<!-- Minimal white version -->
<Story 
	name="Minimal White" 
	args={{ 
		variant: 'compact',
		backgroundColor: 'white',
		buttonsLayout: 'single',
		showSecondaryButton: false
	}}
	parameters={{
		docs: {
			description: {
				story: 'Minimal CTA with white background and single button.'
			}
		}
	}}
/>
