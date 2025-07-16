import { IQuoteScraper } from "../../types/animeQuotes";
import { AnimeQuoteScraper } from "../animeQuotes";

/**
 * Factory class for creating quote scraper instances.
 *
 * This factory provides a centralized way to create different types of quote scrapers,
 * promoting loose coupling and making it easier to manage scraper instantiation.
 *
 * @example
 * ```typescript
 * const scraper = QuoteScraperFactory.createAnimeQuoteScraper();
 * const quotes = await scraper.getQuotes();
 * ```
 *
 * @since 1.0.0
 * @author FANNYMU
 */
export class QuoteScraperFactory {
  /**
   * Creates and returns a new instance of an anime quote scraper.
   *
   * This method implements the Factory Method pattern to create an anime quote scraper
   * that implements the IQuoteScraper interface. The returned scraper can be used to
   * fetch anime quotes from various sources.
   *
   * @returns {IQuoteScraper} A new instance of AnimeQuoteScraper that implements the IQuoteScraper interface
   *
   * @example
   * ```typescript
   * // Create an anime quote scraper
   * const animeQuoteScraper = QuoteScraperFactory.createAnimeQuoteScraper();
   *
   * // Use the scraper to fetch quotes
   * try {
   *   const quotes = await animeQuoteScraper.getQuotes();
   *   console.log(quotes);
   * } catch (error) {
   *   console.error('Failed to fetch anime quotes:', error);
   * }
   * ```
   *
   * @throws {Error} May throw an error if the AnimeQuoteScraper constructor fails
   *
   * @see {@link IQuoteScraper} For the interface definition
   * @see {@link AnimeQuoteScraper} For the concrete implementation
   *
   * @since 1.0.0
   * @public
   * @static
   */
  public static createAnimeQuoteScraper(): IQuoteScraper {
    return new AnimeQuoteScraper();
  }
}
