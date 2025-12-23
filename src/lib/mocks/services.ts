/**
 * Mock services data aligned to the planned Directus schema.
 * Swap this with live CMS data once available.
 */
export type Service = {
	id: string;
	title: string;
	summary: string;
	icon: string;
	meta: string;
	category: string;
	cta: { label: string; href: string };
	tone: 'sunset' | 'seafoam' | 'violet';
};

export const servicesMock: Service[] = [
	{
		id: 'express-road',
		title: 'Express Road Freight',
		summary: 'Same-day and overnight coverage with cross-dock options and proactive alerts.',
		icon: '🚚',
		meta: 'Road · Europe',
		category: 'Road',
		cta: { label: 'Discover express', href: '/services/road/express' },
		tone: 'sunset'
	},
	{
		id: 'air-priority',
		title: 'Air Priority',
		summary: 'Time-definite uplift, customs coordination, and secured ULD handling.',
		icon: '✈️',
		meta: 'Air · Global',
		category: 'Air',
		cta: { label: 'Book priority', href: '/services/air/priority' },
		tone: 'violet'
	},
	{
		id: 'sea-intermodal',
		title: 'Sea & Intermodal',
		summary: 'Balanced FCL/LCL schedules with inland rail and barge partners.',
		icon: '🚢',
		meta: 'Ocean · Global',
		category: 'Ocean',
		cta: { label: 'Plan a sailing', href: '/services/sea/intermodal' },
		tone: 'seafoam'
	},
	{
		id: 'contract-logistics',
		title: 'Contract Logistics',
		summary: 'Ambient & temp-controlled warehousing with value-added services.',
		icon: '🏭',
		meta: 'Warehousing',
		category: 'Warehousing',
		cta: { label: 'Tour a site', href: '/services/warehousing/contract' },
		tone: 'sunset'
	}
];

