import { fetchSanity } from '../sanity.js';
import { getContentWithFallback } from '../../utils/translation-fallback.js';
import {
	PAGE_QUERY,
	HOMEPAGE_QUERY,
	PAGES_LIST_QUERY,
	NAVIGATION_QUERY,
	LOCATIONS_QUERY,
	LOCATION_QUERY,
	FEATURED_LOCATIONS_QUERY,
	TESTIMONIALS_QUERY,
	FEATURED_TESTIMONIALS_QUERY,
	SECTION_QUERY,
	SECTIONS_BY_TYPE_QUERY,
	SEARCH_QUERY,
	PREVIEW_PAGE_QUERY
} from './queries.js';

// Page content functions
export async function getPage(slug, locale = 'en', options = {}) {
	return await fetchSanity(PAGE_QUERY, { slug, locale }, options);
}

export async function getHomepage(locale = 'en', options = {}) {
	const content = await fetchSanity(HOMEPAGE_QUERY, { locale }, options);

	// Enhanced fallback with translation and better error handling
	if (!content) {
		const fallbackLocale = locale === 'en' ? 'it' : 'en';
		const fallbackContent = await fetchSanity(HOMEPAGE_QUERY, { locale: fallbackLocale }, options);
		return getContentWithFallback(null, fallbackContent, locale, fallbackLocale, {
			logFallbacks: true,
			preserveStructure: true
		});
	}

	return content;
}

export async function getPages(locale = 'en', options = {}) {
	return await fetchSanity(PAGES_LIST_QUERY, { locale }, options);
}

// Navigation functions
export async function getNavigation(placement = 'header', locale = 'en', options = {}) {
	let items = await fetchSanity(NAVIGATION_QUERY, { placement, locale }, options);

	// Enhanced fallback with translation
	if (!items || items.length === 0) {
		const fallbackLocale = locale === 'en' ? 'it' : 'en';
		const fallbackItems = await fetchSanity(
			NAVIGATION_QUERY,
			{ placement, locale: fallbackLocale },
			options
		);
		items =
			getContentWithFallback(null, fallbackItems, locale, fallbackLocale, {
				logFallbacks: true
			}) || [];
	}

	// Process navigation items to build hierarchy
	const processedItems = items.map((item) => ({
		...item,
		href: item.pageReference?.slug?.current ? `/${item.pageReference.slug.current}` : item.url
	}));

	return processedItems;
}

// Location functions
export async function getLocations(options = {}) {
	return await fetchSanity(LOCATIONS_QUERY, {}, options);
}

export async function getLocation(slug, options = {}) {
	return await fetchSanity(LOCATION_QUERY, { slug }, options);
}

export async function getFeaturedLocations(options = {}) {
	return await fetchSanity(FEATURED_LOCATIONS_QUERY, {}, options);
}

// Testimonial functions
export async function getTestimonials(locale = 'en', options = {}) {
	let testimonials = await fetchSanity(TESTIMONIALS_QUERY, { locale }, options);

	// If no testimonials found in requested locale, try fallback with translation
	if (!testimonials || testimonials.length === 0) {
		const fallbackLocale = locale === 'en' ? 'it' : 'en';
		const fallbackTestimonials = await fetchSanity(
			TESTIMONIALS_QUERY,
			{ locale: fallbackLocale },
			options
		);
		testimonials = getContentWithFallback(null, fallbackTestimonials, locale, fallbackLocale) || [];
	}

	return testimonials;
}

export async function getFeaturedTestimonials(locale = 'en', options = {}) {
	let testimonials = await fetchSanity(FEATURED_TESTIMONIALS_QUERY, { locale }, options);

	// Enhanced fallback with translation
	if (!testimonials || testimonials.length === 0) {
		const fallbackLocale = locale === 'en' ? 'it' : 'en';
		const fallbackTestimonials = await fetchSanity(
			FEATURED_TESTIMONIALS_QUERY,
			{ locale: fallbackLocale },
			options
		);
		testimonials =
			getContentWithFallback(null, fallbackTestimonials, locale, fallbackLocale, {
				logFallbacks: true,
				preserveStructure: true
			}) || [];
	}

	return testimonials;
}

// Section functions
export async function getSection(identifier, locale = 'en', options = {}) {
	return await fetchSanity(SECTION_QUERY, { identifier, locale }, options);
}

export async function getSectionsByType(type, locale = 'en', options = {}) {
	return await fetchSanity(SECTIONS_BY_TYPE_QUERY, { type, locale }, options);
}

// Search function
export async function searchContent(searchTerm, locale = 'en', options = {}) {
	if (!searchTerm || searchTerm.trim().length < 2) {
		return [];
	}

	return await fetchSanity(SEARCH_QUERY, { searchTerm: searchTerm.trim(), locale }, options);
}

// Preview functions (for CMS preview mode)
export async function getPagePreview(id, options = {}) {
	return await fetchSanity(
		PREVIEW_PAGE_QUERY,
		{ id },
		{ ...options, previewMode: true, useCache: false }
	);
}

// Helper functions for common content needs
export async function getPageData(slug, locale = 'en', options = {}) {
	// Try to get page by slug first
	let page = await getPage(slug, locale, options);

	// If not found and slug is empty/home, try homepage
	if (!page && (!slug || slug === 'home' || slug === '')) {
		page = await getHomepage(locale, options);
	}

	return page;
}

export async function getSiteNavigation(locale = 'en', options = {}) {
	const [headerNav, footerNav, footerLegal] = await Promise.all([
		getNavigation('header', locale, options),
		getNavigation('footer', locale, options),
		getNavigation('footer-legal', locale, options)
	]);

	return {
		header: headerNav,
		footer: footerNav,
		footerLegal: footerLegal
	};
}
// Content preparation helpers
/**
 * @param {Array} sections
 * @returns {Array}
 */
export function preparePageSections(sections = []) {
	return sections.map((section) => {
		// If it's a reference, the content is already resolved by the query
		if (section._type === 'reference') {
			return section;
		}

		// For inline sections, ensure they have the correct structure
		return {
			...section,
			_id: section._id || `inline-${Date.now()}-${Math.random()}`
		};
	});
}

export function prepareSectionContent(section) {
	if (!section) return null;

	// Process different section types
	switch (section._type) {
		case 'heroSection':
			return {
				...section,
				backgroundImages:
					section.backgroundImages?.map((img) => ({
						...img,
						url: img.asset?.url
					})) || []
			};

		case 'servicesSection':
			return {
				...section,
				services:
					section.services?.map((service) => ({
						...service,
						iconName: service.icon || 'default'
					})) || []
			};

		case 'statsSection':
			return {
				...section,
				stats:
					section.stats?.map((stat) => ({
						...stat,
						formattedValue: stat.value
					})) || []
			};

		case 'ctaSection':
			return {
				...section,
				buttons:
					section.buttons?.map((button) => ({
						...button,
						href: button.url
					})) || []
			};

		default:
			return section;
	}
}
