import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import { Element } from "domhandler";
import {
  IAnimeQuote,
  IQuoteScraper,
  ScrapingException,
} from "../types/animeQuotes";

export class AnimeQuoteScraper implements IQuoteScraper {
  private readonly baseUrl: string = "https://otakotaku.com";
  private readonly quoteFeedUrl: string = `${this.baseUrl}/quote/feed`;
  private readonly httpClient: AxiosInstance;
  private readonly requestTimeout: number = 10000; // 10 seconds

  constructor() {
    this.httpClient = axios.create({
      timeout: this.requestTimeout,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
  }

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

  private async fetchQuotePage(): Promise<AxiosResponse<string>> {
    return await this.httpClient.get<string>(this.quoteFeedUrl);
  }

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

  private buildFullUrl(relativePath: string): string {
    return relativePath.startsWith("http")
      ? relativePath
      : `${this.baseUrl}${relativePath}`;
  }
}
