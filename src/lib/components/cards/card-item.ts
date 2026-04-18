export type CardItem = {
	id: string;
	title: string;
	summary: string;
	icon?: string;
	meta?: string;
	badge?: string;
	cta?: { label: string; href: string };
	tone?: 'sunset' | 'seafoam' | 'violet';
};
