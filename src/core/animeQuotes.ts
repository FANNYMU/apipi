import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { Element } from "domhandler";
import {
  IAnimeQuote,
  IQuoteScraper,
  ScrapingException,
} from "../types/animeQuotes";

/**
 * Concrete implementation of the IQuoteScraper interface for scraping anime quotes.
 *
 * This class scrapes anime quotes from the otakotaku.com website by parsing HTML content
 * and extracting quote information including character names, anime titles, episodes,
 * quotes text, images, and links.
 *
 * @implements {IQuoteScraper}
 *
 * @example
 * ```typescript
 * const scraper = new AnimeQuoteScraper();
 *
 * // Get a random quote
 * const randomQuote = await scraper.getRandomQuote();
 * console.log(randomQuote);
 *
 * // Get all available quotes
 * const allQuotes = await scraper.getAllQuotes();
 * console.log(`Found ${allQuotes.length} quotes`);
 * ```
 *
 * @author FANNYMU
 */
export class AnimeQuoteScraper implements IQuoteScraper {
  /**
   * Base URL for the otakotaku.com website.
   * @private
   * @readonly
   */
  private readonly baseUrl: string = "https://otakotaku.com";

  /**
   * Complete URL for the quote feed endpoint.
   * @private
   * @readonly
   */
  private readonly quoteFeedUrl: string = `${this.baseUrl}/quote/feed`;

  /**
   * Axios HTTP client instance configured with timeout and headers.
   * @private
   * @readonly
   */
  private readonly httpClient: AxiosInstance;

  /**
   * Request timeout in milliseconds for HTTP requests.
   * @private
   * @readonly
   */
  private readonly requestTimeout: number = 10000; // 10 seconds

  /**
   * Creates a new instance of AnimeQuoteScraper.
   *
   * Initializes the HTTP client with appropriate timeout settings and headers
   * to mimic a real browser request and avoid being blocked by the target website.
   *
   * @constructor
   * @author FANNYMU
   */
  constructor() {
    this.httpClient = axios.create({
      timeout: this.requestTimeout,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
  }

  /**
   * Retrieves a random anime quote from the available quotes.
   *
   * This method fetches all available quotes and returns a randomly selected one.
   * If no quotes are available, it returns null.
   *
   * @returns {Promise<IAnimeQuote | null>} A random anime quote or null if no quotes are available
   *
   * @throws {ScrapingException} When there's an error fetching or processing quotes
   *
   * @example
   * ```typescript
   * const scraper = new AnimeQuoteScraper();
   * try {
   *   const quote = await scraper.getRandomQuote();
   *   if (quote) {
   *     console.log(`${quote.character} from ${quote.anime}: "${quote.quote}"`);
   *   } else {
   *     console.log('No quotes available');
   *   }
   * } catch (error) {
   *   console.error('Failed to get random quote:', error);
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  public async getRandomQuote(): Promise<IAnimeQuote | null> {
    try {
      const quotes = await this.getAllQuotes();
      return quotes.length > 0
        ? quotes[Math.floor(Math.random() * quotes.length)]
        : null;
    } catch (error) {
      throw new ScrapingException(
        "Failed to get random quote",
        undefined,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Retrieves all available anime quotes from the target website.
   *
   * This method fetches the quote feed page, parses the HTML content,
   * and extracts all anime quotes with their associated metadata.
   *
   * @returns {Promise<IAnimeQuote[]>} An array of all available anime quotes
   *
   * @throws {ScrapingException} When HTTP request fails or HTML parsing encounters errors
   *
   * @example
   * ```typescript
   * const scraper = new AnimeQuoteScraper();
   * try {
   *   const quotes = await scraper.getAllQuotes();
   *   quotes.forEach(quote => {
   *     console.log(`${quote.character}: ${quote.quote}`);
   *   });
   * } catch (error) {
   *   console.error('Failed to fetch quotes:', error);
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  public async getAllQuotes(): Promise<IAnimeQuote[]> {
    try {
      const response = await this.fetchQuotePage();
      return this.parseQuotes(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new ScrapingException(
          `HTTP request failed: ${error.message}`,
          error.response?.status,
          error
        );
      }
      throw new ScrapingException(
        "Unexpected error occurred while fetching quotes",
        undefined,
        error instanceof Error ? error : new Error(String(error))
      );
    }
  }

  /**
   * Fetches the quote page HTML content from the target website.
   *
   * @returns {Promise<AxiosResponse<string>>} The HTTP response containing the HTML content
   *
   * @throws {AxiosError} When the HTTP request fails
   *
   * @private
   * @async
   * @author FANNYMU
   */
  private async fetchQuotePage(): Promise<AxiosResponse<string>> {
    return await this.httpClient.get<string>(this.quoteFeedUrl);
  }

  /**
   * Parses HTML content and extracts anime quotes.
   *
   * Uses Cheerio to parse the HTML and extract quote information from elements
   * with the class "kotodama-list". Each quote is validated before being added
   * to the results array.
   *
   * @param {string} html - The HTML content to parse
   * @returns {IAnimeQuote[]} An array of parsed and validated anime quotes
   *
   * @private
   * @author FANNYMU
   */
  private parseQuotes(html: string): IAnimeQuote[] {
    const $ = cheerio.load(html);
    const quotes: IAnimeQuote[] = [];

    $(".kotodama-list").each((_, element) => {
      const quoteData = this.extractQuoteData($, element);

      if (this.isValidQuote(quoteData)) {
        quotes.push(this.normalizeQuoteData(quoteData));
      }
    });

    return quotes;
  }

  /**
   * Extracts quote data from a DOM element.
   *
   * Parses individual quote elements to extract character name, anime title,
   * episode information, quote text, character image, and quote link.
   *
   * @param {cheerio.CheerioAPI} $ - The Cheerio instance for DOM manipulation
   * @param {Element} element - The DOM element containing quote information
   * @returns {Partial<IAnimeQuote>} Partially populated quote object
   *
   * @private
   * @author FANNYMU
   */
  private extractQuoteData(
    $: cheerio.CheerioAPI,
    element: Element
  ): Partial<IAnimeQuote> {
    const $el = $(element);

    return {
      character: $el.find(".char-name").text().trim(),
      anime: $el.find(".anime-title").text().trim(),
      episode: $el.find(".meta").text().trim(),
      quote: $el.find(".quote").text().trim(),
      image: $el.find(".char-img img").attr("data-src"),
      link: $el.find("a.kuroi").attr("href"),
    };
  }

  /**
   * Validates whether a quote object contains all required fields.
   *
   * Type guard function that checks if the partial quote object has all
   * the required properties to be considered a valid anime quote.
   *
   * @param {Partial<IAnimeQuote>} quoteData - The quote data to validate
   * @returns {quoteData is IAnimeQuote} True if the quote is valid, false otherwise
   *
   * @private
   * @author FANNYMU
   */
  private isValidQuote(
    quoteData: Partial<IAnimeQuote>
  ): quoteData is IAnimeQuote {
    return !!(
      quoteData.character &&
      quoteData.anime &&
      quoteData.quote &&
      quoteData.link
    );
  }

  /**
   * Normalizes and completes quote data with default values.
   *
   * Ensures all required fields are present and converts relative URLs to absolute URLs.
   * Provides default values for optional fields when they are missing.
   *
   * @param {Partial<IAnimeQuote>} quoteData - The partial quote data to normalize
   * @returns {IAnimeQuote} A complete and normalized anime quote object
   *
   * @private
   * @author FANNYMU
   */
  private normalizeQuoteData(quoteData: Partial<IAnimeQuote>): IAnimeQuote {
    return {
      character: quoteData.character!,
      anime: quoteData.anime!,
      episode: quoteData.episode || "Unknown",
      quote: quoteData.quote!,
      image: quoteData.image,
      link: this.buildFullUrl(quoteData.link!),
    };
  }

  /**
   * Builds a full URL from a relative path.
   *
   * Converts relative URLs to absolute URLs by prepending the base URL.
   * If the path is already an absolute URL, it returns the path unchanged.
   *
   * @param {string} relativePath - The relative path or absolute URL
   * @returns {string} The complete absolute URL
   *
   * @example
   * ```typescript
   * // Returns: "https://otakotaku.com/quote/123"
   * const fullUrl = this.buildFullUrl("/quote/123");
   *
   * // Returns: "https://example.com/image.jpg" (unchanged)
   * const absoluteUrl = this.buildFullUrl("https://example.com/image.jpg");
   * ```
   *
   * @private
   * @author FANNYMU
   */
  private buildFullUrl(relativePath: string): string {
    return relativePath.startsWith("http")
      ? relativePath
      : `${this.baseUrl}${relativePath}`;
  }
}
