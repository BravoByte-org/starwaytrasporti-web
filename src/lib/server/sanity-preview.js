/**
 * Enhanced Sanity client for preview dataset support
 * Handles both production and preview datasets with automatic switching
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_PREVIEW_DATASET
} from '$env/static/public';
import {
	SANITY_PROJECT_ID,
	SANITY_DATASET,
	SANITY_PREVIEW_DATASET,
	SANITY_API_VERSION,
	SANITY_TOKEN,
	SANITY_PREVIEW_TOKEN
} from '$env/static/private';

// Production client (default)
export const productionClient = createClient({
	projectId: SANITY_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID,
	dataset: SANITY_DATASET || PUBLIC_SANITY_DATASET,
	apiVersion: SANITY_API_VERSION || '2024-01-01',
	useCdn: true,
	token: SANITY_TOKEN
});

// Preview client (private dataset)
export const previewClient = createClient({
	projectId: SANITY_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID,
	dataset: SANITY_PREVIEW_DATASET || PUBLIC_SANITY_PREVIEW_DATASET,
	apiVersion: SANITY_API_VERSION || '2024-01-01',
	useCdn: false, // Always get fresh data for previews
	token: SANITY_PREVIEW_TOKEN || SANITY_TOKEN
});

// Image URL builders for both datasets
export const productionImageBuilder = imageUrlBuilder({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET
});

export const previewImageBuilder = imageUrlBuilder({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_PREVIEW_DATASET
});

/**
 * Get the appropriate Sanity client based on preview mode
 * @param {Object} options - Options object
 * @param {boolean} options.preview - Whether to use preview mode
 * @returns {Object} Sanity client instance
 */
export function getSanityClient(options = { preview: true }) {
	const { preview = false } = options;
	return preview ? previewClient : productionClient;
}

/**
 * Get the appropriate image URL builder based on preview mode
 * @param {Object} options - Options object
 * @param {boolean} options.preview - Whether to use preview mode
 * @returns {Object} Image URL builder instance
 */
export function getImageBuilder(options = { preview: true }) {
	const { preview = false } = options;
	return preview ? previewImageBuilder : productionImageBuilder;
}

/**
 * Enhanced fetchSanity function with preview support
 * @param {string} query - GROQ query string
 * @param {Object} params - Query parameters
 * @param {Object} options - Fetch options
 * @param {boolean} options.preview - Whether to use preview mode
 * @param {boolean} options.useCache - Whether to cache results (disabled for preview)
 * @returns {Promise<any>} Query results
 */
export async function fetchSanityWithPreview(
	query,
	params = {},
	options = { preview: true, useCache: true }
) {
	const { preview = false, useCache = true, ...otherOptions } = options;

	const client = getSanityClient({ preview });

	try {
		// Add debug info for preview queries
		if (preview) {
			console.log(`[Sanity Preview] Fetching from ${SANITY_PREVIEW_DATASET} dataset:`, {
				query: query.substring(0, 100) + '...',
				params: Object.keys(params)
			});
		}

		const result = await client.fetch(query, params, {
			...otherOptions,
			// Disable caching for preview to ensure fresh data
			cache: preview ? 'no-store' : useCache ? 'default' : 'no-store'
		});

		if (preview) {
			console.log(
				`[Sanity Preview] Results found:`,
				Array.isArray(result) ? result.length : typeof result
			);
		}

		return result;
	} catch (error) {
		console.error(`[Sanity ${preview ? 'Preview' : 'Production'}] Fetch error:`, error);
		throw error;
	}
}

/**
 * Enhanced image URL generation with preview support
 * @param {Object} source - Sanity image source object
 * @param {Object} options - Image options
 * @param {boolean} options.preview - Whether to use preview mode
 * @returns {string} Image URL
 */
export function getImageUrlWithPreview(source, options = { preview: true }) {
	const { preview = true, ...imageOptions } = options;

	if (!source) return '';

	const builder = getImageBuilder({ preview });
	let imageBuilder = builder.image(source);

	// Apply image transformations
	if (imageOptions.width) imageBuilder = imageBuilder.width(imageOptions.width);
	if (imageOptions.height) imageBuilder = imageBuilder.height(imageOptions.height);
	if (imageOptions.quality) imageBuilder = imageBuilder.quality(imageOptions.quality);
	if (imageOptions.format) imageBuilder = imageBuilder.format(imageOptions.format);
	if (imageOptions.fit) imageBuilder = imageBuilder.fit(imageOptions.fit);

	return imageBuilder.url();
}

/**
 * Check if preview mode is available (has valid token)
 * @returns {boolean} Whether preview mode is available
 */
export function isPreviewModeAvailable() {
	return !!(SANITY_PREVIEW_TOKEN && SANITY_PREVIEW_DATASET);
}

/**
 * Get dataset information for debugging
 * @param {boolean} preview - Whether to get preview dataset info
 * @returns {Object} Dataset information
 */
export function getDatasetInfo(preview = false) {
	return {
		projectId: PUBLIC_SANITY_PROJECT_ID,
		dataset: preview ? PUBLIC_SANITY_PREVIEW_DATASET : PUBLIC_SANITY_DATASET,
		apiVersion: SANITY_API_VERSION,
		hasToken: preview ? !!SANITY_PREVIEW_TOKEN : !!SANITY_TOKEN,
		isPreview: preview
	};
}
