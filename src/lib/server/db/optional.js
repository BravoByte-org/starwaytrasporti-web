/**
 * Optional Database Configuration
 * Allows the app to run without database for CMS-only functionality
 */

import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

// Check if database is available
export const isDatabaseAvailable = () => {
	return !!(
		env.DATABASE_URL ||
		env.POSTGRES_URL ||
		env.POSTGRES_PRISMA_URL ||
		env.POSTGRES_URL_NON_POOLING
	);
};

// Get database instance only if available
export const getDatabase = async () => {
	if (!isDatabaseAvailable()) {
		console.warn('[Database] No database URL found - running in CMS-only mode');
		return null;
	}

	try {
		const { db } = await import('./index.js');
		return db;
	} catch (error) {
		console.error('[Database] Failed to initialize database:', error.message);

		if (dev) {
			throw error;
		}

		// In production, return null to allow CMS-only operation
		console.warn('[Database] Continuing without database functionality');
		return null;
	}
};

// Safe database operations
export const safeDbOperation = async (operation, fallback = null) => {
	const db = await getDatabase();

	if (!db) {
		console.warn('[Database] Operation skipped - database not available');
		return fallback;
	}

	try {
		return await operation(db);
	} catch (error) {
		console.error('[Database] Operation failed:', error.message);

		if (dev) {
			throw error;
		}

		return fallback;
	}
};
