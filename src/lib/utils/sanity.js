import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

// Client-side Sanity client (no token for security)
export const sanityClient = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID || '2z040zj1',
	dataset: PUBLIC_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: true // Use CDN for better performance on client-side
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
	return builder.image(source);
}

// Utility functions for working with Sanity content on the client

export function getImageUrl(image, options = {}) {
	if (!image || !image.asset) return null;

	const { width = 800, height = null, format = 'webp', quality = 85, fit = 'max' } = options;

	let url = urlFor(image).format(format).quality(quality).fit(fit).width(width);

	if (height) {
		url = url.height(height);
	}

	return url.url();
}

export function getOptimizedImageSet(image, sizes = [400, 800, 1200, 1600]) {
	if (!image || !image.asset) return null;

	const srcSet = sizes.map((size) => `${getImageUrl(image, { width: size })} ${size}w`).join(', ');

	return {
		src: getImageUrl(image, { width: sizes[1] || 800 }),
		srcSet,
		sizes: '(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px'
	};
}

// Convert portable text to plain text
export function toPlainText(blocks = []) {
	if (!Array.isArray(blocks)) return '';

	return blocks
		.filter((block) => block._type === 'block')
		.map(
			(block) =>
				block.children
					?.filter((child) => child._type === 'span')
					?.map((span) => span.text)
					?.join('') || ''
		)
		.join(' ');
}

// Extract first image from portable text content
export function getFirstImage(blocks = []) {
	if (!Array.isArray(blocks)) return null;

	const imageBlock = blocks.find(
		(block) => block._type === 'mediaAsset' || block._type === 'image'
	);

	return imageBlock?.asset ? imageBlock : null;
}

// Format date helpers
export function formatDate(dateString, locale = 'en', options = {}) {
	if (!dateString) return '';

	const defaultOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};

	return new Date(dateString).toLocaleDateString(locale, {
		...defaultOptions,
		...options
	});
}

export function formatDateTime(dateString, locale = 'en') {
	if (!dateString) return '';

	return new Date(dateString).toLocaleString(locale, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

// URL/slug helpers
export function createPageUrl(page, locale = 'en') {
	if (!page?.slug?.current) return '/';

	// For homepage, return root
	if (page.isHomepage) return '/';

	// For other pages, return slug
	const slug = page.slug.current;
	return slug.startsWith('/') ? slug : `/${slug}`;
}

export function createLocationUrl(location) {
	if (!location?.slug?.current) return '/locations';

	const slug = location.slug.current;
	return `/locations/${slug}`;
}

// Content structure helpers
export function getSectionsByType(sections = [], type) {
	return sections.filter((section) => section._type === type || section.type === type);
}

export function getHeroSection(sections = []) {
	return getSectionsByType(sections, 'heroSection')[0] || null;
}

export function getServicesSection(sections = []) {
	return getSectionsByType(sections, 'servicesSection')[0] || null;
}

export function getStatsSection(sections = []) {
	return getSectionsByType(sections, 'statsSection')[0] || null;
}

export function getCtaSection(sections = []) {
	return getSectionsByType(sections, 'ctaSection')[0] || null;
}

// Validation helpers
export function isValidPage(page) {
	return page && page._id && page.title && page.status === 'published';
}

export function isValidLocation(location) {
	return location && location._id && location.name && location.address && location.active !== false;
}

// Preview mode helpers
export function isPreviewMode() {
	if (typeof window === 'undefined') return false;
	return new URLSearchParams(window.location.search).has('preview');
}

export function getPreviewData() {
	if (typeof window === 'undefined') return null;

	const params = new URLSearchParams(window.location.search);
	return {
		preview: params.has('preview'),
		token: params.get('token'),
		id: params.get('id')
	};
}
