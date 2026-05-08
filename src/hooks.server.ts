import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

/*
 * Headers applied only when the request hostname matches a configured preview
 * host:
 * - Content-Security-Policy: frame-ancestors — lets Directus Studio embed
 *   the response in the Live Preview / Visual Editor iframe.
 * - X-Robots-Tag: noindex, nofollow — keeps preview content out of search
 *   engines without changing the production-domain robots.txt.
 *
 * `PREVIEW_HOSTS` is a comma-separated list of substrings (e.g.
 * "preview.starwaytrasporti.com"). The check uses substring match so
 * Vercel preview branch URLs (`<branch>--preview.starwaytrasporti.com`)
 * are covered by the same rule.
 *
 * See `.ai/playbooks/directus-preview-setup.md` in the bravobyte monorepo
 * for the full rollout pattern.
 */

const DEFAULT_PREVIEW_HOSTS = ['preview.starwaytrasporti.com'];
const DEFAULT_DIRECTUS_URL = 'https://cms.bravobyte.co';

const PREVIEW_HOSTS = (env.PREVIEW_HOSTS ?? DEFAULT_PREVIEW_HOSTS.join(','))
	.split(',')
	.map((h) => h.trim())
	.filter((h) => h.length > 0);

function directusOrigin(): string {
	const url = env.DIRECTUS_URL ?? env.PRIVATE_DIRECTUS_URL ?? DEFAULT_DIRECTUS_URL;
	try {
		return new URL(url).origin;
	} catch {
		return DEFAULT_DIRECTUS_URL;
	}
}

function isPreviewHost(host: string): boolean {
	return PREVIEW_HOSTS.some((needle) => host.includes(needle));
}

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		filterSerializedResponseHeaders: (key) => key.toLowerCase() === 'content-type'
	});

	const host = event.request.headers.get('host') ?? '';
	if (isPreviewHost(host)) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow');
		response.headers.set(
			'Content-Security-Policy',
			`frame-ancestors 'self' ${directusOrigin()}`
		);
	}

	return response;
};
