import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount, unmount } from 'svelte';

import Stat from './Stat.svelte';
import StatGroup from './StatGroup.svelte';
import { stats as mockStats } from '$lib/mocks/stats';

const originalIntersectionObserver = globalThis.IntersectionObserver;
const originalMatchMedia = globalThis.matchMedia;

const renderStat = (stat = mockStats[0]) => {
	const target = document.createElement('div');
	const component = mount(Stat, { target, props: { stat } });
	return { container: target, component };
};

afterEach(() => {
	vi.restoreAllMocks();
	globalThis.IntersectionObserver = originalIntersectionObserver;
	globalThis.matchMedia = originalMatchMedia as typeof globalThis.matchMedia;
});

describe('Stat', () => {
	it('renders icon, header, label, and description', () => {
		const { container, component } = renderStat();
		expect(container.textContent).toContain('Our Impact & Achievements');
		expect(container.textContent).toContain('Delivered Packages');
		expect(container.textContent).toContain('Reliable deliveries completed worldwide');
		unmount(component);
	});

	it('respects reduced motion by skipping animation', async () => {
		vi.stubGlobal(
			'matchMedia',
			vi.fn(() => ({
				matches: true,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn()
			}))
		);

		const stat = {
			...mockStats[0],
			value: 5000,
			suffix: '+'
		};
		const { container, component } = renderStat(stat);

		await Promise.resolve();
		expect(container.textContent).toContain('5,000+');
		unmount(component);
	});

	it('falls back gracefully when IntersectionObserver is unavailable', async () => {
		vi.stubGlobal('IntersectionObserver', undefined as unknown as IntersectionObserver);

		const stat = {
			...mockStats[1],
			value: 1234,
			suffix: ' km'
		};
		const { container, component } = renderStat(stat);

		await Promise.resolve();
		expect(container.textContent).toContain('1,234 km');
		unmount(component);
	});
});

describe('StatGroup', () => {
	it('renders heading, description, and all stat cards', () => {
		const target = document.createElement('div');
		const component = mount(StatGroup, {
			target,
			props: {
				heading: 'Our Impact & Achievements',
				description: 'Delivering excellence across the globe.',
				stats: mockStats
			}
		});

		expect(target.textContent).toContain('Our Impact & Achievements');
		expect(target.textContent).toContain('Delivering excellence across the globe.');
		expect(target.querySelectorAll('article').length).toBe(mockStats.length);

		unmount(component);
	});
});
