import { env } from '$env/dynamic/public';

/**
 * Shape accepted for any Directus Files reference surfaced by our deep
 * queries: either the raw UUID string (when a field is deep-fetched as a
 * scalar) or a partial file record (when deep-fetched as an object).
 */
export type DirectusFileRef = string | { id?: string | null } | null | undefined;

/**
 * Build a public `/assets/<uuid>` URL for a Directus File.
 *
 * Returns `null` when the reference is empty or when `PUBLIC_DIRECTUS_URL` is
 * not configured, so callers can fall back to no-image rendering.
 */
export function resolveAssetUrl(file: DirectusFileRef): string | null {
	if (!file) return null;
	const id = typeof file === 'string' ? file : file?.id;
	if (!id) return null;
	const base = (env.PUBLIC_DIRECTUS_URL ?? '').replace(/\/$/, '');
	return base ? `${base}/assets/${id}` : null;
}
