import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import {
  DownSpotify,
  InfoSpotify,
  SpotifyDownloadResult,
  SpotifyHeaders,
} from "../types/spotify";

class SpotifyDownloader {
  private readonly baseUrl = "https://spowload.com";
  private readonly apiUrl = "https://api.fabdl.com/spotify/get";

  private extractTrackId(url: string): string {
    const cleanUrl = url.replace("intl-id/", "");
    return cleanUrl.split("track/")[1].split("?")[0];
  }

  private extractCookies(headers: SpotifyHeaders): string {
    const setCookieHeader = headers["set-cookie"];
    if (!setCookieHeader) return "";

    return setCookieHeader
      .map((cookie: string) => cookie.split(";")[0])
      .join("; ");
  }

  private extractCsrfToken(html: string): string | undefined {
    return cheerio.load(html)('meta[name="csrf-token"]').attr("content");
  }

  private async fetchTrackPage(trackId: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/spotify/track-${trackId}`, {
      withCredentials: true,
    });
  }

  private async fetchTrackInfo(url: string): Promise<InfoSpotify> {
    const response = await axios.get(`${this.apiUrl}?url=${url}`);
    return response.data.result;
  }

  private async downloadTrack(
    trackId: string,
    imageUrl: string,
    csrf: string,
    cookies: string
  ): Promise<DownSpotify> {
    const response = await axios.post(
      `${this.baseUrl}/convert`,
      {
        urls: `https://open.spotify.com/track/${trackId}`,
        cover: imageUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrf,
          Cookie: cookies,
        },
      }
    );
    return response.data;
  }

  async download(url: string): Promise<SpotifyDownloadResult> {
    try {
      const trackId = this.extractTrackId(url);

      const [pageResponse, trackInfo] = await Promise.all([
        this.fetchTrackPage(trackId),
        this.fetchTrackInfo(url),
      ]);

      const cookies = this.extractCookies(
        pageResponse.headers as SpotifyHeaders
      );
      const csrf = this.extractCsrfToken(pageResponse.data);

      if (!csrf) {
        throw new Error("CSRF token not found");
      }

      const downloadResult = await this.downloadTrack(
        trackId,
        trackInfo.image,
        csrf,
        cookies
      );

      if (downloadResult.erorr) {
        throw new Error("Data not found");
      }

      return {
        info: trackInfo,
        url: downloadResult.url,
      };
    } catch (error) {
      throw new Error(
        `Failed to download Spotify track: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const spotifydl = async (
  url: string
): Promise<SpotifyDownloadResult> => {
  const downloader = new SpotifyDownloader();
  return downloader.download(url);
};
