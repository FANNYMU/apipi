import { IQuoteScraper } from "../../types/animeQuotes";
import { AnimeQuoteScraper } from "../animeQuotes";

export class QuoteScraperFactory {
  public static createAnimeQuoteScraper(): IQuoteScraper {
    return new AnimeQuoteScraper();
  }
}
