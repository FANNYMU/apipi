import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";
import {
  DownSpotify,
  InfoSpotify,
  SpotifyDownloadResult,
  SpotifyHeaders,
} from "../types/spotify";

/**
 * Spotify track downloader class that handles downloading Spotify tracks.
 *
 * This class provides functionality to download Spotify tracks by extracting track information,
 * managing authentication tokens, and interfacing with the spowload.com service to convert
 * Spotify tracks to downloadable formats.
 *
 * @example
 * ```typescript
 * const downloader = new SpotifyDownloader();
 * const result = await downloader.download('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh');
 * console.log(result.info.title); // Track title
 * console.log(result.url); // Download URL
 * ```
 *
 * @author FANNYMU
 */
class SpotifyDownloader {
  /**
   * Base URL for the spowload.com service.
   * @private
   * @readonly
   */
  private readonly baseUrl = "https://spowload.com";

  /**
   * API URL for fetching Spotify track information.
   * @private
   * @readonly
   */
  private readonly apiUrl = "https://api.fabdl.com/spotify/get";

  /**
   * Extracts the track ID from a Spotify URL.
   *
   * Parses the Spotify URL to extract the unique track identifier,
   * handling both standard and internationalized URLs.
   *
   * @param {string} url - The Spotify track URL
   * @returns {string} The extracted track ID
   *
   * @example
   * ```typescript
   * const trackId = this.extractTrackId('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh?si=abc123');
   * // Returns: '4iV5W9uYEdYUVa79Axb7Rh'
   * ```
   *
   * @private
   * @author FANNYMU
   */
  private extractTrackId(url: string): string {
    const cleanUrl = url.replace("intl-id/", "");
    return cleanUrl.split("track/")[1].split("?")[0];
  }

  /**
   * Extracts and formats cookies from HTTP response headers.
   *
   * Processes the Set-Cookie headers from the HTTP response and formats them
   * into a cookie string suitable for subsequent requests.
   *
   * @param {SpotifyHeaders} headers - HTTP response headers containing Set-Cookie data
   * @returns {string} Formatted cookie string for use in requests
   *
   * @example
   * ```typescript
   * const headers = { 'set-cookie': ['session=abc123; Path=/', 'token=xyz789; HttpOnly'] };
   * const cookies = this.extractCookies(headers);
   * // Returns: 'session=abc123; token=xyz789'
   * ```
   *
   * @private
   * @author FANNYMU
   */
  private extractCookies(headers: SpotifyHeaders): string {
    const setCookieHeader = headers["set-cookie"];
    if (!setCookieHeader) return "";

    return setCookieHeader
      .map((cookie: string) => cookie.split(";")[0])
      .join("; ");
  }

  /**
   * Extracts the CSRF token from HTML content.
   *
   * Parses the HTML page to find and extract the CSRF token from the meta tag,
   * which is required for authenticated requests to the download service.
   *
   * @param {string} html - The HTML content to parse
   * @returns {string | undefined} The CSRF token if found, undefined otherwise
   *
   * @example
   * ```typescript
   * const html = '<meta name="csrf-token" content="abc123token">';
   * const token = this.extractCsrfToken(html);
   * // Returns: 'abc123token'
   * ```
   *
   * @private
   * @author FANNYMU
   */
  private extractCsrfToken(html: string): string | undefined {
    return cheerio.load(html)('meta[name="csrf-token"]').attr("content");
  }

  /**
   * Fetches the track page from spowload.com.
   *
   * Makes an HTTP GET request to the spowload.com service to retrieve the track page,
   * which contains necessary authentication tokens and cookies for the download process.
   *
   * @param {string} trackId - The Spotify track ID
   * @returns {Promise<AxiosResponse>} The HTTP response containing the track page
   *
   * @throws {Error} When the HTTP request fails
   *
   * @private
   * @async
   * @author FANNYMU
   */
  private async fetchTrackPage(trackId: string): Promise<AxiosResponse> {
    return axios.get(`${this.baseUrl}/spotify/track-${trackId}`, {
      withCredentials: true,
    });
  }

  /**
   * Fetches detailed track information from the Spotify API.
   *
   * Retrieves comprehensive track metadata including title, artist, album,
   * duration, and cover image URL from the fabdl.com API service.
   *
   * @param {string} url - The Spotify track URL
   * @returns {Promise<InfoSpotify>} Track information object containing metadata
   *
   * @throws {Error} When the API request fails or returns invalid data
   *
   * @example
   * ```typescript
   * const info = await this.fetchTrackInfo('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh');
   * console.log(info.title); // Track title
   * console.log(info.artists); // Artist names
   * ```
   *
   * @private
   * @async
   * @author FANNYMU
   */
  private async fetchTrackInfo(url: string): Promise<InfoSpotify> {
    const response = await axios.get(`${this.apiUrl}?url=${url}`);
    return response.data.result;
  }

  /**
   * Downloads the Spotify track using the conversion service.
   *
   * Initiates the track download process by sending a POST request to the conversion
   * endpoint with the necessary authentication tokens and track information.
   *
   * @param {string} trackId - The Spotify track ID
   * @param {string} imageUrl - URL of the track's cover image
   * @param {string} csrf - CSRF token for request authentication
   * @param {string} cookies - Session cookies for request authentication
   * @returns {Promise<DownSpotify>} Download response containing the download URL or error information
   *
   * @throws {Error} When the download request fails or authentication is invalid
   *
   * @private
   * @async
   * @author FANNYMU
   */
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

  /**
   * Downloads a Spotify track and returns the download information.
   *
   * Main method that orchestrates the entire download process:
   * 1. Extracts track ID from the URL
   * 2. Fetches track page and metadata in parallel
   * 3. Extracts authentication tokens
   * 4. Initiates the download process
   * 5. Returns the combined result with track info and download URL
   *
   * @param {string} url - The Spotify track URL to download
   * @returns {Promise<SpotifyDownloadResult>} Object containing track information and download URL
   *
   * @throws {Error} When any step of the download process fails
   *
   * @example
   * ```typescript
   * const downloader = new SpotifyDownloader();
   * try {
   *   const result = await downloader.download('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh');
   *   console.log(`Downloading: ${result.info.title} by ${result.info.artists}`);
   *   console.log(`Download URL: ${result.url}`);
   * } catch (error) {
   *   console.error('Download failed:', error.message);
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
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

/**
 * Downloads a Spotify track and returns the download information.
 *
 * Convenience function that creates a SpotifyDownloader instance and downloads
 * the specified Spotify track. This is the main entry point for the Spotify
 * download functionality.
 *
 * @param {string} url - The Spotify track URL to download
 * @returns {Promise<SpotifyDownloadResult>} Object containing track information and download URL
 *
 * @throws {Error} When the download process fails for any reason
 *
 * @example
 * ```typescript
 * // Download a Spotify track
 * try {
 *   const result = await spotifydl('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh');
 *
 *   // Access track information
 *   console.log(`Title: ${result.info.title}`);
 *   console.log(`Artist: ${result.info.artists}`);
 *   console.log(`Album: ${result.info.album}`);
 *   console.log(`Duration: ${result.info.duration_ms}ms`);
 *
 *   // Access download URL
 *   console.log(`Download from: ${result.url}`);
 * } catch (error) {
 *   console.error('Failed to download track:', error.message);
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Batch download multiple tracks
 * const trackUrls = [
 *   'https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh',
 *   'https://open.spotify.com/track/7qiZfU4dY1lWllzX7mPBI3'
 * ];
 *
 * const downloads = await Promise.all(
 *   trackUrls.map(url => spotifydl(url))
 * );
 *
 * downloads.forEach(result => {
 *   console.log(`${result.info.title} - ${result.url}`);
 * });
 * ```
 *
 * @public
 * @async
 * @author FANNYMU
 */
export const spotifydl = async (
  url: string
): Promise<SpotifyDownloadResult> => {
  const downloader = new SpotifyDownloader();
  return downloader.download(url);
};
