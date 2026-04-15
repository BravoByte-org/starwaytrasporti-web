/**
 * CMS Data Adapters
 *
 * Transform Directus CMS responses to match component prop types.
 * Handles field name mapping, nested object construction, and fallbacks.
 */

import { env } from '$env/dynamic/private';
import type { HeroContent } from '$mocks/hero';
import type { Service } from '$mocks/services';
import type { StatData, StatTrend } from '$mocks/stats';
import { heroMock } from '$mocks/hero';
import { servicesMock } from '$mocks/services';
import { stats as statsMock } from '$mocks/stats';

const DIRECTUS_URL = env.PRIVATE_DIRECTUS_URL || env.DIRECTUS_URL || '';

/**
 * Build a Directus asset URL from a file object.
 */
const buildAssetUrl = (file: { id: string; filename_disk?: string } | null): string => {
	if (!file?.id) return '';
	return `${DIRECTUS_URL}/assets/${file.id}`;
};

/* ---------------------------------------- CMS RESPONSE TYPES ---------------------------------------- */

/**
 * CMS Button structure (from buttons JSON field)
 */
type CmsButton = {
	label?: string;
	href?: string;
	variant?: 'primary' | 'secondary';
};

/**
 * block_hero collection
 */
type CmsHeroBlock = {
	id: string;
	eyebrow?: string;
	headline?: string;
	subheading?: string;
	subHeadline?: string;
	content?: string;
	buttons?: CmsButton[] | string;
	trustStats?: string[] | string;
	heroMedia?: { id: string; filename_disk?: string };
	heroBackground?: { id: string; filename_disk?: string };
};

/**
 * services collection (individual service item)
 */
type CmsService = {
	id: string;
	status?: string;
	sort?: number;
	title?: string;
	summary?: string;
	icon?: string;
	category?: string;
	link?: { label?: string; href?: string } | string;
	tone?: string;
};

/**
 * block_services collection response (wrapper with junction)
 */
type CmsServicesBlock = {
	id: string;
	headline?: string;
	layout?: string;
	max_items?: number;
	services?: Array<{ services_id: CmsService | null }>;
};

/**
 * stats collection (individual stat item)
 */
type CmsStat = {
	id: string;
	status?: string;
	icon?: string;
	header?: string;
	value?: string | number;
	prefix?: string;
	suffix?: string;
	label?: string;
	description?: string;
	delta_value?: string;
	delta_trend?: string;
};

/**
 * block_stats collection response (wrapper with junction)
 */
type CmsStatsBlock = {
	id: string;
	headline?: string;
	layout?: string;
	stats?: Array<{ stats_id: CmsStat | null }>;
};

/* ---------------------------------------- ADAPTERS ---------------------------------------- */

/**
 * Parse JSON field that might be a string or already parsed.
 */
function parseJsonField<T>(field: T | string | null | undefined): T | null {
	if (!field) return null;
	if (typeof field === 'string') {
		try {
			return JSON.parse(field) as T;
		} catch {
			return null;
		}
	}
	return field;
}

/**
 * Transform CMS hero block response to HeroContent type.
 * Falls back to mock data for missing fields.
 */
export function adaptHero(cmsData: CmsHeroBlock | null | undefined): HeroContent {
	if (!cmsData) {
		return heroMock;
	}

	// Parse buttons JSON - expect array of {label, href, variant}
	const buttons = parseJsonField<CmsButton[]>(cmsData.buttons) || [];
	const primaryButton = buttons.find((b) => b.variant === 'primary') || buttons[0];
	const secondaryButton = buttons.find((b) => b.variant === 'secondary') || buttons[1];

	// Parse trustStats - can be JSON string or array
	let trustStats: string[] = heroMock.trustStats;
	const parsedTrustStats = parseJsonField<string[]>(cmsData.trustStats);
	if (parsedTrustStats && Array.isArray(parsedTrustStats)) {
		trustStats = parsedTrustStats;
	}

	// Use subHeadline (camelCase) or fallback to subheading
	const subHeadline = cmsData.subHeadline || cmsData.subheading || heroMock.subHeadline;

	return {
		id: cmsData.id || heroMock.id,
		eyebrow: cmsData.eyebrow || heroMock.eyebrow,
		headline: cmsData.headline || heroMock.headline,
		subHeadline,
		primaryCta: {
			label: primaryButton?.label || heroMock.primaryCta.label,
			href: primaryButton?.href || heroMock.primaryCta.href
		},
		secondaryCta: {
			label: secondaryButton?.label || heroMock.secondaryCta.label,
			href: secondaryButton?.href || heroMock.secondaryCta.href
		},
		trustStats,
		media: {
			fleetImage: buildAssetUrl(cmsData.heroMedia ?? null) || heroMock.media.fleetImage,
			fleetAlt: heroMock.media.fleetAlt, // No alt field in CMS, use mock
			mapOverlay: buildAssetUrl(cmsData.heroBackground ?? null) || heroMock.media.mapOverlay
		}
	};
}

/**
 * Transform CMS services block response to Service[] type.
 * Falls back to mock data if empty or null.
 */
export function adaptServices(cmsData: CmsServicesBlock | null | undefined): Service[] {
	if (!cmsData?.services || cmsData.services.length === 0) {
		return servicesMock;
	}

	// Extract services from junction table structure, filter out nulls
	const serviceItems = cmsData.services
		.map((junction) => junction.services_id)
		.filter((s): s is CmsService => s !== null && s.status !== 'archived')
		.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

	if (serviceItems.length === 0) {
		return servicesMock;
	}

	return serviceItems.map((item, index): Service => {
		const fallback = servicesMock[index] || servicesMock[0];

		// Parse link JSON field
		const link = parseJsonField<{ label?: string; href?: string }>(item.link);

		// Validate tone
		const validTones = ['sunset', 'seafoam', 'violet'] as const;
		const tone = validTones.includes(item.tone as (typeof validTones)[number])
			? (item.tone as Service['tone'])
			: fallback.tone;

		return {
			id: item.id || fallback.id,
			title: item.title || fallback.title,
			summary: item.summary || fallback.summary,
			icon: item.icon || fallback.icon,
			meta: fallback.meta, // No meta field in CMS
			category: item.category || fallback.category,
			cta: {
				label: link?.label || fallback.cta.label,
				href: link?.href || fallback.cta.href
			},
			tone
		};
	});
}

/**
 * Transform CMS stats block response to StatData[] type.
 * Falls back to mock data if empty or null.
 */
export function adaptStats(cmsData: CmsStatsBlock | null | undefined): StatData[] {
	if (!cmsData?.stats || cmsData.stats.length === 0) {
		return statsMock;
	}

	// Extract stats from junction table structure, filter out nulls and archived
	const statItems = cmsData.stats
		.map((junction) => junction.stats_id)
		.filter((s): s is CmsStat => s !== null && s.status !== 'archived');

	if (statItems.length === 0) {
		return statsMock;
	}

	return statItems.map((item, index): StatData => {
		const fallback = statsMock[index] || statsMock[0];

		// Parse value - could be string or number
		let value: number | string = fallback.value;
		if (item.value !== undefined && item.value !== null) {
			const numericValue = typeof item.value === 'string' ? parseFloat(item.value) : item.value;
			value = isNaN(numericValue) ? item.value : numericValue;
		}

		// Parse delta/trend
		const validTrends: StatTrend[] = ['up', 'down', 'neutral'];
		const deltaTrend = validTrends.includes(item.delta_trend as StatTrend)
			? (item.delta_trend as StatTrend)
			: undefined;

		const delta = item.delta_value
			? {
					value: item.delta_value,
					trend: deltaTrend,
					ariaLabel: deltaTrend ? `Trending ${deltaTrend}` : undefined
				}
			: fallback.delta;

		return {
			id: item.id || fallback.id,
			icon: item.icon || fallback.icon,
			iconLabel: fallback.iconLabel, // No icon_label in CMS
			header: item.header || fallback.header,
			value,
			prefix: item.prefix || fallback.prefix,
			suffix: item.suffix || fallback.suffix,
			label: item.label || fallback.label,
			description: item.description || fallback.description,
			delta,
			ariaLabel: fallback.ariaLabel
		};
	});
}
