/**
 * Mock hero data aligned to the planned Directus schema.
 * Replace with live CMS payload when available.
 */
export type HeroContent = {
	id: string;
	eyebrow: string;
	headline: string;
	subHeadline: string;
	primaryCta: { label: string; href: string };
	secondaryCta: { label: string; href: string };
	trustStats: string[];
	media: {
		fleetImage: string;
		fleetAlt: string;
		mapOverlay: string;
	};
};

export const heroMock: HeroContent = {
	id: 'home-hero',
	eyebrow: 'Trusted European freight',
	headline: 'Global goods transport, from Italy to the world.',
	subHeadline: 'Reliable. Transparent. Delivered on time.',
	primaryCta: { label: 'Get a Quote', href: '#quote' },
	secondaryCta: { label: 'View Our Fleet', href: '#fleet' },
	trustStats: ['25 years experience', '5000+ shipments/year', '100% real-time tracking'],
	media: {
		fleetImage:
			'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=70&fm=webp',
		fleetAlt: 'Starway Trasporti trucks lined up at dusk ready to depart.',
		mapOverlay:
			'https://images.unsplash.com/photo-1502920917128-1aa500764b84?auto=format&fit=crop&w=1600&q=60&fm=webp'
	}
};

