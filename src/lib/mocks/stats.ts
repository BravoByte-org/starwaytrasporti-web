export type StatTrend = 'up' | 'down' | 'neutral';

export type StatDelta = {
	value: string;
	trend?: StatTrend;
	ariaLabel?: string;
};

export type StatData = {
	id: string;
	icon?: string;
	iconLabel?: string;
	header?: string;
	value: number | string;
	prefix?: string;
	suffix?: string;
	label: string;
	description: string;
	delta?: StatDelta;
	ariaLabel?: string;
};

export const stats: StatData[] = [
	{
		id: 'delivered-packages',
		icon: '📦',
		iconLabel: 'Packages icon',
		header: 'Our Impact & Achievements',
		value: 101_273,
		suffix: '+',
		label: 'Delivered Packages',
		description: 'Reliable deliveries completed worldwide with tracked milestones.',
		delta: { value: 'Up YoY', trend: 'up', ariaLabel: 'Trending up year over year' }
	},
	{
		id: 'km-per-year',
		icon: '🛣️',
		iconLabel: 'Road icon',
		value: 673_754,
		suffix: ' km/yr',
		label: 'Kilometers Per Year',
		description: 'Extensive overland coverage across primary European corridors.'
	},
	{
		id: 'happy-clients',
		icon: '😊',
		iconLabel: 'Smiling face icon',
		value: 16_714,
		suffix: '+',
		label: 'Happy Clients',
		description: 'Satisfied partners served with on-time and transparent logistics.'
	},
	{
		id: 'countries-served',
		icon: '🌍',
		iconLabel: 'Globe icon',
		header: 'Delivery',
		value: 160,
		suffix: '+',
		label: 'Countries Served',
		description: 'Global reach with customs-ready operations and localized support.'
	}
];
