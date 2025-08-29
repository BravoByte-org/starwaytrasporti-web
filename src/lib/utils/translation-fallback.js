/**
 * Production-ready translation fallback utility
 * Provides automatic translations when content is missing in requested locale
 * Features: caching, comprehensive dictionary, performance optimization, error handling
 */

// In-memory cache for translated content
const translationCache = new Map();

// Cache timeout (5 minutes)
const CACHE_TIMEOUT = 5 * 60 * 1000;

// Comprehensive translation dictionary for transportation industry
const translationDict = {
	// Navigation and basic terms
	Home: { it: 'Home' },
	Services: { it: 'Servizi' },
	Locations: { it: 'Sedi' },
	'About Us': { it: 'Chi Siamo' },
	Contact: { it: 'Contatti' },
	'Get Quote': { it: 'Richiedi Preventivo' },
	'Learn More': { it: 'Scopri di Più' },
	'Get Your Quote': { it: 'Richiedi Preventivo' },
	'Get Free Quote': { it: 'Preventivo Gratuito' },
	'View Our Services': { it: 'Vedi i Servizi' },

	// Homepage content
	'Professional Transportation in Italy': {
		it: 'Trasporto Professionale in Italia'
	},
	'Professional Transportation Solutions Across Italy & Europe': {
		it: 'Soluzioni di Trasporto Professionale in Italia ed Europa'
	},
	'Reliable logistics solutions for your business': {
		it: 'Soluzioni logistiche affidabili per la tua azienda'
	},
	'Reliable, efficient, and secure logistics services tailored to your business needs. From local deliveries to international shipping.':
		{
			it: 'Servizi logistici affidabili, efficienti e sicuri su misura per le esigenze della tua azienda. Dalle consegne locali alle spedizioni internazionali.'
		},

	// Services
	'Our Services': { it: 'I Nostri Servizi' },
	'Our Transportation Services': { it: 'I Nostri Servizi di Trasporto' },
	'Complete transportation solutions for every business need': {
		it: 'Soluzioni di trasporto complete per ogni esigenza aziendale'
	},
	'Comprehensive logistics solutions designed for businesses of all sizes': {
		it: 'Soluzioni logistiche complete progettate per aziende di ogni dimensione'
	},
	'National Transport': { it: 'Trasporto Nazionale' },
	'International Logistics': { it: 'Logistica Internazionale' },
	'Express Deliveries': { it: 'Consegne Express' },
	'Express Delivery': { it: 'Consegne Express' },
	'Warehousing Solutions': { it: 'Soluzioni di Magazzinaggio' },

	// Service descriptions
	'Fast and secure deliveries throughout Italy with real-time tracking.': {
		it: 'Consegne veloci e sicure in tutta Italia con tracciamento in tempo reale.'
	},
	'Fast and reliable shipping across Italy with real-time tracking and guaranteed delivery times.':
		{
			it: 'Spedizioni veloci e affidabili in tutta Italia con tracciamento in tempo reale e tempi di consegna garantiti.'
		},
	'Shipments to Europe and beyond with complete customs management.': {
		it: 'Spedizioni in Europa e oltre con gestione doganale completa.'
	},
	'Seamless cross-border transportation throughout Europe with customs clearance and documentation.':
		{
			it: 'Trasporti transfrontalieri senza problemi in tutta Europa con gestione doganale e documentazione completa.'
		},
	'24/7 urgent service for your most critical needs.': {
		it: 'Servizio urgente 24/7 per le tue esigenze più critiche.'
	},
	'Urgent shipments delivered within 24-48 hours with priority handling and dedicated support.': {
		it: 'Spedizioni urgenti consegnate entro 24-48 ore con gestione prioritaria e supporto dedicato.'
	},
	'Secure storage facilities with inventory management and distribution services.': {
		it: 'Strutture di stoccaggio sicure con gestione inventario e servizi di distribuzione.'
	},

	// Stats
	"Our Clients' Trust": { it: 'La Fiducia dei Nostri Clienti' },
	'Trusted by Businesses Across Italy': { it: 'La Fiducia delle Aziende Italiane' },
	'Over 15 years of experience in the transportation sector': {
		it: 'Oltre 15 anni di esperienza nel settore dei trasporti'
	},
	'Our numbers speak for our commitment to excellence': {
		it: "I nostri numeri parlano del nostro impegno per l'eccellenza"
	},
	'Active Clients': { it: 'Clienti Attivi' },
	'Deliveries per Month': { it: 'Consegne Mensili' },
	'Monthly Deliveries': { it: 'Consegne Mensili' },
	'On-Time Delivery': { it: 'Consegne Puntuali' },
	'Punctuality Rate': { it: 'Tasso di Puntualità' },
	'Customer Support': { it: 'Supporto Clienti' },
	'Trusted by businesses across Italy': { it: 'La fiducia delle aziende in tutta Italia' },
	'Businesses trust us with their logistics': { it: 'Le aziende si fidano della nostra logistica' },
	'Reliable and on-time delivery': { it: 'Consegne affidabili e puntuali' },
	'Packages delivered every month': { it: 'Pacchi consegnati ogni mese' },
	'Commitment to punctuality': { it: 'Impegno per la puntualità' },
	'Punctuality you can count on': { it: 'Puntualità su cui puoi contare' },
	'Available when you need us': { it: 'Disponibili quando ne hai bisogno' },
	'Always available when you need us': { it: 'Sempre disponibili quando ne hai bisogno' },

	// CTA
	'Ready to Get Started?': { it: 'Pronto per Iniziare?' },
	'Ready to Optimize Your Logistics?': { it: 'Pronto a Ottimizzare la Tua Logistica?' },
	'Contact us today for a free consultation and discover how we can optimize your transportation.':
		{
			it: 'Contattaci oggi per una consulenza gratuita e scopri come possiamo ottimizzare i tuoi trasporti.'
		},
	'Get a personalized quote for your transportation needs. Fast, reliable, and competitively priced.':
		{
			it: 'Ottieni un preventivo personalizzato per le tue esigenze di trasporto. Veloce, affidabile e competitivo.'
		},

	// Company info
	'Professional transportation solutions throughout Italy and Europe. We make logistics simple and reliable.':
		{
			it: 'Soluzioni di trasporto professionale in tutta Italia ed Europa. Rendiamo la logistica semplice e affidabile.'
		},

	// Location-specific terms
	'Our Locations': { it: 'Le Nostre Sedi' },
	'Find Our Offices': { it: 'Trova i Nostri Uffici' },
	Headquarters: { it: 'Sede Centrale' },
	'Branch Office': { it: 'Filiale' },
	Warehouse: { it: 'Magazzino' },
	'Logistics Center': { it: 'Centro Logistico' },
	'Distribution Center': { it: 'Centro di Distribuzione' },
	'Featured Locations': { it: 'Sedi in Evidenza' },
	'All Locations': { it: 'Tutte le Sedi' },
	'Milan Headquarters': { it: 'Sede di Milano' },
	'Rome Branch Office': { it: 'Filiale di Roma' },
	'Turin Logistics Center': { it: 'Centro Logistico di Torino' },

	// Contact and operational info
	'Contact Information': { it: 'Informazioni di Contatto' },
	'Opening Hours': { it: 'Orari di Apertura' },
	'Services Available': { it: 'Servizi Disponibili' },
	'Get Directions': { it: 'Ottieni Indicazioni' },
	'Call Now': { it: 'Chiama Ora' },
	'Send Email': { it: 'Invia Email' },
	'Visit Website': { it: 'Visita il Sito' },
	Monday: { it: 'Lunedì' },
	Tuesday: { it: 'Martedì' },
	Wednesday: { it: 'Mercoledì' },
	Thursday: { it: 'Giovedì' },
	Friday: { it: 'Venerdì' },
	Saturday: { it: 'Sabato' },
	Sunday: { it: 'Domenica' },
	Closed: { it: 'Chiuso' },
	Open: { it: 'Aperto' },

	// Error messages and states
	'Loading...': { it: 'Caricamento...' },
	'No locations found': { it: 'Nessuna sede trovata' },
	'Error loading content': { it: 'Errore nel caricamento del contenuto' },
	'Try again': { it: 'Riprova' },
	'Coming Soon': { it: 'Prossimamente' },

	// General business terms
	Address: { it: 'Indirizzo' },
	Phone: { it: 'Telefono' },
	Email: { it: 'Email' },
	Website: { it: 'Sito Web' },
	'View Details': { it: 'Vedi Dettagli' },
	'View Location': { it: 'Vedi Sede' },
	'More Information': { it: 'Maggiori Informazioni' },
	'Back to Locations': { it: 'Torna alle Sedi' },

	// Action buttons and CTAs
	'Book Service': { it: 'Prenota Servizio' },
	'Request Quote': { it: 'Richiedi Preventivo' },
	'Schedule Pickup': { it: 'Programma Ritiro' },
	'Track Shipment': { it: 'Traccia Spedizione' },
	'Customer Service': { it: 'Servizio Clienti' },

	// Status indicators
	Active: { it: 'Attivo' },
	Inactive: { it: 'Inattivo' },
	Available: { it: 'Disponibile' },
	Unavailable: { it: 'Non Disponibile' },
	Online: { it: 'Online' },
	Offline: { it: 'Offline' }
};

/**
 * Generates cache key for translated content
 * @param {string} text - Original text
 * @param {string} fromLocale - Source locale
 * @param {string} toLocale - Target locale
 * @returns {string} Cache key
 */
function getCacheKey(text, fromLocale, toLocale) {
	return `${fromLocale}-${toLocale}-${text.substring(0, 50)}`;
}

/**
 * Checks if cached translation is still valid
 * @param {Object} cacheEntry - Cache entry object
 * @returns {boolean} Whether cache is valid
 */
function isCacheValid(cacheEntry) {
	return cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_TIMEOUT;
}

/**
 * Enhanced text translation with caching and performance optimization
 * @param {string} text - The text to translate
 * @param {string} fromLocale - Source locale (e.g., 'en')
 * @param {string} toLocale - Target locale (e.g., 'it')
 * @param {Object} options - Translation options
 * @param {boolean} options.useCache - Whether to use caching (default: true)
 * @param {boolean} options.logMisses - Whether to log missing translations (default: false)
 * @returns {string} Translated text or original text if no translation found
 */
export function translateText(text, fromLocale, toLocale, options = {}) {
	const { useCache = true, logMisses = false } = options;

	// Early returns for performance
	if (!text || typeof text !== 'string' || fromLocale === toLocale) {
		return text;
	}

	const cacheKey = getCacheKey(text, fromLocale, toLocale);

	// Check cache first
	if (useCache) {
		const cached = translationCache.get(cacheKey);
		if (isCacheValid(cached)) {
			return cached.translation;
		}
	}

	let translation = text; // Default to original

	try {
		// Direct lookup (most common case)
		const directTranslation = translationDict[text];
		if (directTranslation && directTranslation[toLocale]) {
			translation = directTranslation[toLocale];
		} else {
			// Partial matches for compound texts (fallback)
			for (const [key, translations] of Object.entries(translationDict)) {
				if (text.includes(key) && translations[toLocale]) {
					translation = text.replace(
						new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
						translations[toLocale]
					);
					break; // Use first match
				}
			}
		}

		// Log missing translations in development
		if (logMisses && translation === text && fromLocale !== toLocale) {
			console.warn(`[Translation] Missing translation: "${text}" (${fromLocale} → ${toLocale})`);
		}

		// Cache the result
		if (useCache) {
			translationCache.set(cacheKey, {
				translation,
				timestamp: Date.now()
			});
		}
	} catch (error) {
		console.error('[Translation] Error translating text:', error);
		// Return original text on error
	}

	return translation;
}

/**
 * Enhanced recursive object translation with performance optimization
 * @param {any} obj - Object to translate
 * @param {string} fromLocale - Source locale
 * @param {string} toLocale - Target locale
 * @param {Object} options - Translation options
 * @param {boolean} options.useCache - Whether to use caching (default: true)
 * @param {boolean} options.logMisses - Whether to log missing translations (default: false)
 * @param {boolean} options.preserveStructure - Whether to preserve object structure (default: true)
 * @param {Set} options.skipKeys - Set of keys to skip translation (e.g., '_id', '_type')
 * @returns {any} Object with translated text properties
 */
export function translateObject(obj, fromLocale, toLocale, options = {}) {
	const {
		useCache = true,
		logMisses = false,
		preserveStructure = true,
		skipKeys = new Set([
			'_id',
			'_type',
			'_key',
			'_rev',
			'slug',
			'href',
			'url',
			'email',
			'phone',
			'coordinates',
			'publishedAt',
			'_createdAt',
			'_updatedAt'
		])
	} = options;

	// Early returns for performance
	if (!obj || fromLocale === toLocale) return obj;

	// Handle primitives
	if (typeof obj === 'string') {
		return translateText(obj, fromLocale, toLocale, { useCache, logMisses });
	}

	if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
		return obj;
	}

	// Handle arrays
	if (Array.isArray(obj)) {
		return obj.map((item) => translateObject(item, fromLocale, toLocale, options));
	}

	// Handle objects
	if (typeof obj === 'object') {
		const translated = preserveStructure ? { ...obj } : {};

		for (const [key, value] of Object.entries(obj)) {
			// Skip certain keys that shouldn't be translated
			if (skipKeys.has(key)) {
				translated[key] = value;
				continue;
			}

			// Recursively translate values
			translated[key] = translateObject(value, fromLocale, toLocale, options);
		}

		return translated;
	}

	return obj;
}

/**
 * Production-ready content fallback with translation, caching, and error handling
 * @param {any} content - Content object (could be null/undefined)
 * @param {any} fallbackContent - Fallback content in different locale
 * @param {string} requestedLocale - The locale that was requested
 * @param {string} fallbackLocale - The locale of the fallback content
 * @param {Object} options - Fallback options
 * @param {boolean} options.useCache - Whether to use caching (default: true)
 * @param {boolean} options.logFallbacks - Whether to log fallback usage (default: true in dev)
 * @param {boolean} options.preserveStructure - Whether to preserve object structure (default: true)
 * @returns {any} Content with translations applied
 */
export function getContentWithFallback(
	content,
	fallbackContent,
	requestedLocale,
	fallbackLocale,
	options = {}
) {
	const {
		useCache = true,
		logFallbacks = typeof process !== 'undefined' && process.env.NODE_ENV === 'development',
		preserveStructure = true
	} = options;

	// If we have content in the requested locale, return it
	if (content && (Array.isArray(content) ? content.length > 0 : true)) {
		return content;
	}

	// If no fallback content available, return appropriate fallback
	if (!fallbackContent) {
		if (logFallbacks) {
			console.warn(`[Translation] No content or fallback available for locale: ${requestedLocale}`);
		}
		return Array.isArray(content) ? [] : null;
	}

	try {
		// Log fallback usage
		if (logFallbacks) {
			const contentType = Array.isArray(fallbackContent) ? 'array' : typeof fallbackContent;
			console.log(
				`[Translation] Using fallback content (${contentType}) from ${fallbackLocale} → ${requestedLocale}`
			);
		}

		// Translate fallback content to requested locale
		const translatedContent = translateObject(fallbackContent, fallbackLocale, requestedLocale, {
			useCache,
			logMisses: logFallbacks,
			preserveStructure
		});

		return translatedContent;
	} catch (error) {
		console.error('[Translation] Error in content fallback:', error);

		// Return fallback content without translation as last resort
		if (logFallbacks) {
			console.warn('[Translation] Returning untranslated fallback content due to error');
		}
		return fallbackContent;
	}
}

/**
 * Processes CMS sections with translation fallbacks
 * @param {Array} sections - Array of section objects
 * @param {string} requestedLocale - The locale that was requested
 * @param {string} fallbackLocale - The locale to fall back to
 * @returns {Array} Sections with translations applied
 */
export function processSectionsWithFallback(sections, requestedLocale, fallbackLocale = 'en') {
	if (!sections || !Array.isArray(sections)) return [];

	return sections.map((section) => {
		if (!section) return section;

		// If section is already in requested locale, return as-is
		if (section.locale === requestedLocale) {
			return section;
		}

		// Apply translation to section content
		return translateObject(section, fallbackLocale, requestedLocale);
	});
}

/**
 * Cache management utilities for production monitoring
 */

/**
 * Gets current cache statistics
 * @returns {Object} Cache statistics
 */
export function getCacheStats() {
	const now = Date.now();
	let validEntries = 0;
	let expiredEntries = 0;

	for (const entry of translationCache.values()) {
		if (isCacheValid(entry)) {
			validEntries++;
		} else {
			expiredEntries++;
		}
	}

	return {
		totalEntries: translationCache.size,
		validEntries,
		expiredEntries,
		cacheHitRate: (validEntries / Math.max(translationCache.size, 1)) * 100
	};
}

/**
 * Clears expired cache entries
 * @returns {number} Number of entries cleared
 */
export function clearExpiredCache() {
	let cleared = 0;
	const now = Date.now();

	for (const [key, entry] of translationCache.entries()) {
		if (!isCacheValid(entry)) {
			translationCache.delete(key);
			cleared++;
		}
	}

	return cleared;
}

/**
 * Clears all cache entries
 * @returns {number} Number of entries cleared
 */
export function clearAllCache() {
	const size = translationCache.size;
	translationCache.clear();
	return size;
}

/**
 * Pre-warms cache with common translations
 * @param {Array} commonTexts - Array of commonly used texts
 * @param {string} fromLocale - Source locale
 * @param {string} toLocale - Target locale
 */
export function preWarmCache(commonTexts, fromLocale, toLocale) {
	console.log(`[Translation] Pre-warming cache with ${commonTexts.length} entries`);

	for (const text of commonTexts) {
		translateText(text, fromLocale, toLocale, { useCache: true });
	}

	console.log('[Translation] Cache pre-warming completed');
}

/**
 * Debug function to log translation attempts
 * @param {string} originalText - Original text
 * @param {string} translatedText - Translated text
 * @param {string} fromLocale - Source locale
 * @param {string} toLocale - Target locale
 */
export function logTranslation(originalText, translatedText, fromLocale, toLocale) {
	if (originalText !== translatedText) {
		console.log(`[Translation] ${fromLocale}→${toLocale}: "${originalText}" → "${translatedText}"`);
	}
}

/**
 * Development helper to identify missing translations
 * @param {string} locale - Target locale to check
 * @returns {Array} Array of texts that need translation
 */
export function getMissingTranslations(locale = 'it') {
	const missing = [];
	const sourceLocale = 'en';

	// Sample common texts to check
	const commonTexts = [
		'Loading...',
		'Error',
		'Success',
		'Cancel',
		'Save',
		'Delete',
		'Edit',
		'View',
		'Back',
		'Next',
		'Previous',
		'Search',
		'Filter',
		'Sort',
		'Export',
		'Import'
	];

	for (const text of commonTexts) {
		const translated = translateText(text, sourceLocale, locale, { logMisses: false });
		if (translated === text) {
			missing.push(text);
		}
	}

	return missing;
}
