import { QuoteScraperFactory } from "../core/factory/QuoteScraperFactory";
import { IAnimeQuote } from "../types/animeQuotes";

/**
 * Retrieves a random anime quote from available sources.
 *
 * This function creates an anime quote scraper instance using the factory pattern
 * and returns a randomly selected anime quote. It serves as a simple, high-level
 * interface for obtaining random anime quotes without needing to manage scraper
 * instances directly.
 *
 * The function handles all the complexity of scraper creation and quote retrieval,
 * providing a clean API for consumers who just want a random anime quote.
 *
 * @returns {Promise<IAnimeQuote | null>} A random anime quote object if available,
 *   or null if no quotes could be retrieved
 *
 * @throws {ScrapingException} When there's an error during the scraping process,
 *   such as network failures, parsing errors, or service unavailability
 *
 * @example
 * ```typescript
 * // Get a random anime quote
 * try {
 *   const quote = await randomAnimeQuote();
 *
 *   if (quote) {
 *     console.log(`"${quote.quote}"`);
 *     console.log(`- ${quote.character} from ${quote.anime}`);
 *
 *     if (quote.episode) {
 *       console.log(`Episode: ${quote.episode}`);
 *     }
 *
 *     if (quote.image) {
 *       console.log(`Character image: ${quote.image}`);
 *     }
 *
 *     console.log(`Source: ${quote.link}`);
 *   } else {
 *     console.log('No anime quotes available at the moment.');
 *   }
 * } catch (error) {
 *   console.error('Failed to fetch anime quote:', error.message);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Use in a web application
 * async function displayRandomQuote() {
 *   try {
 *     const quote = await randomAnimeQuote();
 *
 *     if (quote) {
 *       document.getElementById('quote-text').textContent = quote.quote;
 *       document.getElementById('quote-character').textContent = quote.character;
 *       document.getElementById('quote-anime').textContent = quote.anime;
 *     } else {
 *       document.getElementById('quote-text').textContent = 'No quotes available';
 *     }
 *   } catch (error) {
 *     document.getElementById('quote-text').textContent = 'Error loading quote';
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Get multiple random quotes
 * async function getMultipleQuotes(count: number): Promise<IAnimeQuote[]> {
 *   const quotes: IAnimeQuote[] = [];
 *
 *   for (let i = 0; i < count; i++) {
 *     try {
 *       const quote = await randomAnimeQuote();
 *       if (quote) {
 *         quotes.push(quote);
 *       }
 *     } catch (error) {
 *       console.warn(`Failed to fetch quote ${i + 1}:`, error.message);
 *     }
 *   }
 *
 *   return quotes;
 * }
 *
 * // Usage
 * const quotes = await getMultipleQuotes(5);
 * console.log(`Retrieved ${quotes.length} quotes`);
 * ```
 *
 * @see {@link QuoteScraperFactory} For the factory used to create scraper instances
 * @see {@link IAnimeQuote} For the structure of the returned quote object
 * @see {@link IQuoteScraper} For the underlying scraper interface
 *
 * @public
 * @async
 * @author FANNYMU
 */
export async function randomAnimeQuote(): Promise<IAnimeQuote | null> {
  const scraper = QuoteScraperFactory.createAnimeQuoteScraper();
  return await scraper.getRandomQuote();
}
