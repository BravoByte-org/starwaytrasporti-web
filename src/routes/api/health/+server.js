/**
 * Health Check API Endpoint
 * Helps debug deployment issues by checking environment and dependencies
 */

import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';

export async function GET() {
	try {
		// Environment check
		const envCheck = {
			nodeEnv: process.env.NODE_ENV,
			isDev: dev,
			hasProjectId: !!process.env.SANITY_PROJECT_ID,
			hasDataset: !!process.env.SANITY_DATASET,
			hasToken: !!process.env.SANITY_TOKEN,
			hasDatabaseUrl: !!process.env.DATABASE_URL,
			hasSessionSecret: !!process.env.SESSION_SECRET,
			platform: process.platform,
			nodeVersion: process.version,
			timestamp: new Date().toISOString()
		};

		// Basic Sanity connection test
		let sanityStatus = 'not-tested';
		try {
			// Import here to avoid module-level errors
			const { sanityClient } = await import('$lib/server/sanity.js');

			// Simple query to test connection
			await sanityClient.fetch('*[_type == "page" && isHomepage == true][0]{ _id }');
			sanityStatus = 'connected';
		} catch (sanityError) {
			sanityStatus = `error: ${sanityError.message}`;
		}

		return json({
			status: 'ok',
			environment: envCheck,
			sanity: sanityStatus,
			message: 'Health check passed'
		});
	} catch (error) {
		console.error('[Health Check] Error:', error);

		return json(
			{
				status: 'error',
				error: error.message,
				stack: dev ? error.stack : undefined,
				timestamp: new Date().toISOString()
			},
			{
				status: 500
			}
		);
	}
}
