import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import {
	SANITY_PROJECT_ID,
	SANITY_DATASET,
	SANITY_API_VERSION,
	SANITY_TOKEN
} from '$env/static/private';
import {
	getSanityClient,
	getImageBuilder,
	fetchSanityWithPreview,
	getImageUrlWithPreview
} from './sanity-preview.js';

// Configure Sanity client
export const sanityClient = createClient({
	projectId: SANITY_PROJECT_ID || '2z040zj1',
	dataset: SANITY_DATASET || 'production',
	apiVersion: SANITY_API_VERSION || '2024-01-01',
	useCdn: true, // Enable CDN for better performance
	token: SANITY_TOKEN // Only needed for write operations or preview
});

// Configure image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source, options = { preview: false }) {
	const { preview = false } = options;

	if (preview) {
		// Use preview-aware image URL generation
		return getImageUrlWithPreview(source, { preview: true });
	}

	return builder.image(source);
}

// Enhanced image URL function with preview support
export { getImageUrlWithPreview as urlForPreview };

// Cache configuration
const CACHE_DURATION = 60 * 5; // 5 minutes
const cache = new Map();

function getCacheKey(query, params) {
	return `${query}:${JSON.stringify(params || {})}`;
}

function isCacheValid(timestamp) {
	return Date.now() - timestamp < CACHE_DURATION * 1000;
}

// Enhanced fetch with caching and preview support
export async function fetchSanity(query, params = {}, options = {}) {
	const {
		useCache = true,
		cacheDuration = CACHE_DURATION,
		previewMode = false,
		preview = false
	} = options;

	// Use new preview system if preview mode is enabled
	const isPreview = previewMode || preview;

	if (isPreview) {
		// Use the enhanced preview fetch function
		return await fetchSanityWithPreview(query, params, { preview: true, useCache: false });
	}

	// Create cache key for production queries
	const cacheKey = getCacheKey(query, params);

	// Check cache first
	if (useCache && cache.has(cacheKey)) {
		const cached = cache.get(cacheKey);
		if (isCacheValid(cached.timestamp)) {
			console.log(`[Sanity] Cache hit for query: ${query.substring(0, 50)}...`);
			return cached.data;
		} else {
			// Remove stale cache entry
			cache.delete(cacheKey);
		}
	}

	try {
		console.log(`[Sanity] Fetching data for query: ${query.substring(0, 50)}...`);

		const data = await sanityClient.fetch(query, params);

		// Cache the result
		if (useCache) {
			cache.set(cacheKey, {
				data,
				timestamp: Date.now()
			});
		}

		return data;
	} catch (error) {
		console.error('[Sanity] Fetch error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		throw new Error(`Failed to fetch from Sanity: ${errorMessage}`);
	}
}

// Clear cache utility
export function clearSanityCache() {
	cache.clear();
	console.log('[Sanity] Cache cleared');
}

// Cache stats utility (for debugging)
export function getCacheStats() {
	const entries = Array.from(cache.entries());
	const validEntries = entries.filter(([key, value]) => isCacheValid(value.timestamp));

	return {
		total: cache.size,
		valid: validEntries.length,
		stale: cache.size - validEntries.length
	};
}
