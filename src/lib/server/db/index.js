import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

// Database URL with fallback and better error handling
const getDatabaseUrl = () => {
	// Check multiple possible environment variable names
	const url =
		env.DATABASE_URL || env.POSTGRES_URL || env.POSTGRES_PRISMA_URL || env.POSTGRES_URL_NON_POOLING;

	if (!url) {
		const errorMsg =
			'Database URL not found. Please set one of: DATABASE_URL, POSTGRES_URL, POSTGRES_PRISMA_URL, or POSTGRES_URL_NON_POOLING';
		console.error('[Database]', errorMsg);

		if (!dev) {
			console.error(
				'[Database] Available env vars:',
				Object.keys(env).filter((k) => k.includes('POSTGRES') || k.includes('DATABASE'))
			);
		}

		throw new Error(errorMsg);
	}

	return url;
};

const databaseUrl = getDatabaseUrl();
const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
