import { QuoteScraperFactory } from "../core/factory/QuoteScraperFactory";
import { IAnimeQuote } from "../types/animeQuotes";

export async function randomAnimeQuote(): Promise<IAnimeQuote | null> {
  const scraper = QuoteScraperFactory.createAnimeQuoteScraper();
  return await scraper.getRandomQuote();
}
