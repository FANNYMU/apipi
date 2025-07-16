export interface IAnimeQuote {
  character: string;
  anime: string;
  episode: string;
  quote: string;
  image?: string;
  link: string;
}

export interface IQuoteScraper {
  getRandomQuote(): Promise<IAnimeQuote | null>;
  getAllQuotes(): Promise<IAnimeQuote[]>;
}

export class ScrapingException extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = "ScrapingException";
  }
}
