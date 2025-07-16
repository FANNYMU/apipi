/**
 * Represents an anime quote with associated metadata.
 *
 * This interface defines the structure for anime quotes containing character information,
 * source anime details, episode context, the actual quote text, and optional visual
 * and reference elements. It serves as the primary data model for anime quote objects
 * throughout the application.
 *
 * @interface IAnimeQuote
 *
 * @example
 * ```typescript
 * const quote: IAnimeQuote = {
 *   character: "Naruto Uzumaki",
 *   anime: "Naruto",
 *   episode: "Episode 1",
 *   quote: "I'm gonna be the Hokage!",
 *   image: "https://example.com/naruto.jpg",
 *   link: "https://example.com/quote/123"
 * };
 *
 * console.log(`${quote.character} from ${quote.anime}: "${quote.quote}"`);
 * ```
 *
 * @example
 * ```typescript
 * // Processing quote data
 * function displayQuote(quote: IAnimeQuote): string {
 *   let display = `"${quote.quote}"\n`;
 *   display += `- ${quote.character}`;
 *
 *   if (quote.anime) {
 *     display += ` (${quote.anime}`;
 *     if (quote.episode) {
 *       display += `, ${quote.episode}`;
 *     }
 *     display += ')';
 *   }
 *
 *   return display;
 * }
 * ```
 *
 * @author FANNYMU
 */
export interface IAnimeQuote {
  /**
   * The name of the character who spoke the quote.
   *
   * Contains the full name or commonly used name of the anime character
   * who originally said the quote. This should be the character's name
   * as it appears in the source material.
   *
   * @example "Naruto Uzumaki", "Edward Elric", "Monkey D. Luffy"
   */
  character: string;

  /**
   * The title of the anime series where the quote originates.
   *
   * The official title of the anime series, movie, or OVA where this
   * quote was spoken. Should match the commonly recognized title.
   *
   * @example "Naruto", "Fullmetal Alchemist", "One Piece"
   */
  anime: string;

  /**
   * The episode or context where the quote was spoken.
   *
   * Identifies the specific episode, chapter, or scene context where
   * the quote appears. May include episode numbers, chapter references,
   * or general context like "Movie" or "OVA".
   *
   * @example "Episode 1", "Chapter 5", "Movie: Spirited Away", "Unknown"
   */
  episode: string;

  /**
   * The actual quote text spoken by the character.
   *
   * The verbatim text of what the character said, preserving the
   * original meaning and context. Should be clean and properly formatted.
   *
   * @example "Believe it!", "I'm gonna be the Hokage!", "People's dreams never end!"
   */
  quote: string;

  /**
   * Optional URL to an image of the character or scene.
   *
   * A URL pointing to an image related to the quote, typically showing
   * the character who spoke it or a scene from the anime. May be undefined
   * if no image is available.
   *
   * @optional
   * @example "https://example.com/characters/naruto.jpg"
   */
  image?: string;

  /**
   * URL link to the source or more information about the quote.
   *
   * A reference URL that provides additional context, source verification,
   * or leads to the original content where the quote was found. This could
   * link to the scraping source, anime database entry, or related content.
   *
   * @example "https://otakotaku.com/quote/12345", "https://myanimelist.net/anime/20"
   */
  link: string;
}

/**
 * Interface defining the contract for anime quote scraping services.
 *
 * This interface establishes the standard methods that any anime quote scraper
 * implementation must provide. It ensures consistency across different scraping
 * implementations and enables easy swapping of scraper services through
 * polymorphism and dependency injection.
 *
 * @interface IQuoteScraper
 *
 * @example
 * ```typescript
 * class CustomQuoteScraper implements IQuoteScraper {
 *   async getRandomQuote(): Promise<IAnimeQuote | null> {
 *     // Implementation for getting random quote
 *     const quotes = await this.getAllQuotes();
 *     return quotes.length > 0 ? quotes[Math.floor(Math.random() * quotes.length)] : null;
 *   }
 *
 *   async getAllQuotes(): Promise<IAnimeQuote[]> {
 *     // Implementation for getting all quotes
 *     return [];
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Using the interface with dependency injection
 * class QuoteService {
 *   constructor(private scraper: IQuoteScraper) {}
 *
 *   async getQuoteOfTheDay(): Promise<IAnimeQuote | null> {
 *     return await this.scraper.getRandomQuote();
 *   }
 *
 *   async searchQuotes(): Promise<IAnimeQuote[]> {
 *     return await this.scraper.getAllQuotes();
 *   }
 * }
 *
 * const service = new QuoteService(new CustomQuoteScraper());
 * ```
 *
 * @author FANNYMU
 */
export interface IQuoteScraper {
  /**
   * Retrieves a random anime quote from available sources.
   *
   * This method should return a randomly selected anime quote from the
   * scraper's available quote collection. The implementation should handle
   * cases where no quotes are available by returning null.
   *
   * @returns {Promise<IAnimeQuote | null>} A random anime quote object, or null if no quotes are available
   *
   * @throws {ScrapingException} When scraping fails due to network issues, parsing errors, or service unavailability
   *
   * @example
   * ```typescript
   * const scraper: IQuoteScraper = new AnimeQuoteScraper();
   *
   * try {
   *   const randomQuote = await scraper.getRandomQuote();
   *
   *   if (randomQuote) {
   *     console.log(`Random quote: "${randomQuote.quote}" - ${randomQuote.character}`);
   *   } else {
   *     console.log('No quotes available');
   *   }
   * } catch (error) {
   *   if (error instanceof ScrapingException) {
   *     console.error('Scraping failed:', error.message);
   *   }
   * }
   * ```
   *
   * @async
   * @author FANNYMU
   */
  getRandomQuote(): Promise<IAnimeQuote | null>;

  /**
   * Retrieves all available anime quotes from the source.
   *
   * This method should fetch and return all anime quotes available from
   * the scraper's target source. The implementation should handle pagination,
   * rate limiting, and other source-specific constraints.
   *
   * @returns {Promise<IAnimeQuote[]>} An array of all available anime quotes
   *
   * @throws {ScrapingException} When scraping fails due to network issues, parsing errors, or service unavailability
   *
   * @example
   * ```typescript
   * const scraper: IQuoteScraper = new AnimeQuoteScraper();
   *
   * try {
   *   const allQuotes = await scraper.getAllQuotes();
   *
   *   console.log(`Found ${allQuotes.length} quotes`);
   *
   *   // Group quotes by anime
   *   const quotesByAnime = allQuotes.reduce((acc, quote) => {
   *     if (!acc[quote.anime]) {
   *       acc[quote.anime] = [];
   *     }
   *     acc[quote.anime].push(quote);
   *     return acc;
   *   }, {} as Record<string, IAnimeQuote[]>);
   *
   *   Object.entries(quotesByAnime).forEach(([anime, quotes]) => {
   *     console.log(`${anime}: ${quotes.length} quotes`);
   *   });
   * } catch (error) {
   *   if (error instanceof ScrapingException) {
   *     console.error('Failed to fetch quotes:', error.message);
   *     console.error('Status code:', error.statusCode);
   *   }
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Filter and process all quotes
   * const allQuotes = await scraper.getAllQuotes();
   *
   * // Find quotes from specific anime
   * const narutoQuotes = allQuotes.filter(quote =>
   *   quote.anime.toLowerCase().includes('naruto')
   * );
   *
   * // Find quotes by character
   * const characterQuotes = allQuotes.filter(quote =>
   *   quote.character.toLowerCase().includes('edward')
   * );
   *
   * // Get unique characters
   * const uniqueCharacters = [...new Set(allQuotes.map(quote => quote.character))];
   * ```
   *
   * @async
   * @author FANNYMU
   */
  getAllQuotes(): Promise<IAnimeQuote[]>;
}

/**
 * Custom exception class for anime quote scraping operations.
 *
 * This specialized exception class provides detailed error information for
 * scraping-related failures, including HTTP status codes and original error
 * context. It extends the standard Error class to maintain compatibility
 * while adding scraping-specific metadata.
 *
 * @extends Error
 *
 * @example
 * ```typescript
 * // Throwing a scraping exception
 * throw new ScrapingException(
 *   "Failed to parse quote data from HTML",
 *   500,
 *   originalError
 * );
 * ```
 *
 * @example
 * ```typescript
 * // Handling scraping exceptions
 * try {
 *   const quotes = await scraper.getAllQuotes();
 * } catch (error) {
 *   if (error instanceof ScrapingException) {
 *     console.error(`Scraping failed: ${error.message}`);
 *
 *     if (error.statusCode) {
 *       console.error(`HTTP Status: ${error.statusCode}`);
 *     }
 *
 *     if (error.originalError) {
 *       console.error('Original error:', error.originalError.message);
 *     }
 *   } else {
 *     console.error('Unexpected error:', error);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Creating exceptions for different scenarios
 *
 * // Network error
 * const networkError = new ScrapingException(
 *   "Network request failed",
 *   503,
 *   new Error("ENOTFOUND")
 * );
 *
 * // Parsing error
 * const parseError = new ScrapingException(
 *   "Failed to parse HTML content",
 *   200
 * );
 *
 * // Rate limiting
 * const rateLimitError = new ScrapingException(
 *   "Rate limit exceeded",
 *   429
 * );
 * ```
 *
 * @author FANNYMU
 */
export class ScrapingException extends Error {
  /**
   * Creates a new ScrapingException instance.
   *
   * Constructs a specialized exception for scraping operations with optional
   * HTTP status code and original error context. The exception name is
   * automatically set to "ScrapingException" for easy identification.
   *
   * @param {string} message - Descriptive error message explaining what went wrong
   * @param {number} [statusCode] - Optional HTTP status code associated with the error
   * @param {Error} [originalError] - Optional original error that caused this exception
   *
   * @example
   * ```typescript
   * // Basic exception
   * throw new ScrapingException("Quote parsing failed");
   *
   * // Exception with status code
   * throw new ScrapingException("Server error", 500);
   *
   * // Exception with full context
   * try {
   *   await fetchData();
   * } catch (originalError) {
   *   throw new ScrapingException(
   *     "Failed to fetch quote data",
   *     503,
   *     originalError as Error
   *   );
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Exception handling in scraper implementation
   * class AnimeQuoteScraper implements IQuoteScraper {
   *   async getAllQuotes(): Promise<IAnimeQuote[]> {
   *     try {
   *       const response = await this.httpClient.get(this.apiUrl);
   *       return this.parseQuotes(response.data);
   *     } catch (error) {
   *       if (axios.isAxiosError(error)) {
   *         throw new ScrapingException(
   *           `HTTP request failed: ${error.message}`,
   *           error.response?.status,
   *           error
   *         );
   *       }
   *       throw new ScrapingException(
   *         "Unexpected error during scraping",
   *         undefined,
   *         error instanceof Error ? error : new Error(String(error))
   *       );
   *     }
   *   }
   * }
   * ```
   *
   * @constructor
   * @author FANNYMU
   */
  constructor(
    message: string,
    /**
     * Optional HTTP status code associated with the scraping error.
     *
     * Provides additional context about the nature of the error when it
     * originates from an HTTP request. Common values include 404 (not found),
     * 500 (server error), 429 (rate limited), etc.
     *
     * @readonly
     * @example 404, 500, 503, 429
     */
    public readonly statusCode?: number,
    /**
     * The original error that caused this scraping exception.
     *
     * Preserves the original error context for debugging and logging purposes.
     * This allows developers to access the full error chain when troubleshooting
     * scraping issues.
     *
     * @readonly
     * @example new Error("ENOTFOUND"), AxiosError, TypeError
     */
    public readonly originalError?: Error
  ) {
    super(message);
    /**
     * The name of this exception type.
     *
     * Set to "ScrapingException" to distinguish this error type from
     * standard Error objects and enable specific error handling patterns.
     *
     * @readonly
     */
    this.name = "ScrapingException";
  }
}
