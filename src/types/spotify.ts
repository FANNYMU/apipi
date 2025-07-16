/**
 * Represents comprehensive information about a Spotify track.
 *
 * This interface defines the structure for Spotify track metadata including
 * identification, content type, naming, visual assets, artist information,
 * and duration details. It serves as the primary data model for Spotify
 * track objects throughout the application.
 *
 * @interface InfoSpotify
 *
 * @example
 * ```typescript
 * const trackInfo: InfoSpotify = {
 *   id: "4iV5W9uYEdYUVa79Axb7Rh",
 *   type: "track",
 *   name: "Shape of You",
 *   image: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
 *   artists: "Ed Sheeran",
 *   duration_ms: 233713,
 *   gid: 12345678
 * };
 *
 * console.log(`${trackInfo.name} by ${trackInfo.artists}`);
 * console.log(`Duration: ${Math.floor(trackInfo.duration_ms / 60000)}:${Math.floor((trackInfo.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`);
 * ```
 *
 * @example
 * ```typescript
 * // Converting duration to human-readable format
 * function formatDuration(durationMs: number): string {
 *   const minutes = Math.floor(durationMs / 60000);
 *   const seconds = Math.floor((durationMs % 60000) / 1000);
 *   return `${minutes}:${seconds.toString().padStart(2, '0')}`;
 * }
 *
 * console.log(`Track length: ${formatDuration(trackInfo.duration_ms)}`);
 * ```
 *
 * @author FANNYMU
 */
export interface InfoSpotify {
  /**
   * Unique Spotify track identifier.
   *
   * The Spotify track ID that uniquely identifies this track within the
   * Spotify platform. This ID is used for API calls and track references.
   *
   * @example "4iV5W9uYEdYUVa79Axb7Rh", "7qiZfU4dY1lWllzX7mPBI3"
   */
  id: string;

  /**
   * The type of Spotify content.
   *
   * Indicates the type of content this object represents within the Spotify
   * ecosystem. Typically "track" for individual songs, but may include other
   * types like "episode" for podcasts.
   *
   * @example "track", "episode"
   */
  type: string;

  /**
   * The name or title of the track.
   *
   * The official title of the song as it appears on Spotify. This is the
   * primary display name for the track.
   *
   * @example "Shape of You", "Bohemian Rhapsody", "Imagine"
   */
  name: string;

  /**
   * URL to the track's album artwork or cover image.
   *
   * A direct URL pointing to the album cover image associated with this track.
   * Typically points to Spotify's CDN with high-resolution artwork.
   *
   * @example "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96"
   */
  image: string;

  /**
   * Comma-separated string of artist names.
   *
   * Contains all artists associated with the track, formatted as a single
   * string with comma separation for multiple artists. Includes primary
   * artists and featured artists.
   *
   * @example "Ed Sheeran", "The Beatles", "Drake, Future"
   */
  artists: string;

  /**
   * Track duration in milliseconds.
   *
   * The total length of the track expressed in milliseconds. This provides
   * precise duration information that can be converted to minutes and seconds
   * for display purposes.
   *
   * @example 233713 (3:53), 180000 (3:00), 367000 (6:07)
   */
  duration_ms: number;

  /**
   * Internal group identifier.
   *
   * An internal numeric identifier used for grouping or categorization
   * purposes. This may be used for internal tracking, database relations,
   * or API organization.
   *
   * @example 12345678, 87654321
   */
  gid: number;
}

/**
 * Represents the response from a Spotify download operation.
 *
 * This interface defines the structure for download operation results,
 * including error status and the resulting download URL. It provides
 * a simple success/failure indicator along with the download link
 * when the operation succeeds.
 *
 * @interface DownSpotify
 *
 * @example
 * ```typescript
 * const downloadResult: DownSpotify = {
 *   erorr: false,
 *   url: "https://example.com/downloads/track.mp3"
 * };
 *
 * if (!downloadResult.erorr) {
 *   console.log(`Download available at: ${downloadResult.url}`);
 * } else {
 *   console.log('Download failed');
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Processing download results
 * function handleDownloadResult(result: DownSpotify): string | null {
 *   if (result.erorr) {
 *     console.error('Download operation failed');
 *     return null;
 *   }
 *
 *   if (!result.url) {
 *     console.error('No download URL provided');
 *     return null;
 *   }
 *
 *   return result.url;
 * }
 * ```
 *
 * @author FANNYMU
 */
export interface DownSpotify {
  /**
   * Indicates whether an error occurred during the download operation.
   *
   * Boolean flag that shows the success status of the download operation.
   * When true, indicates that the download failed and the URL may not be
   * available or valid. When false, indicates successful processing.
   *
   * Note: The property name contains a typo ("erorr" instead of "error")
   * but is maintained for API compatibility.
   *
   * @example true (download failed), false (download succeeded)
   */
  erorr: boolean;

  /**
   * The download URL for the processed track.
   *
   * Contains the direct download link for the Spotify track after processing.
   * This URL can be used to download the actual audio file. May be empty
   * or invalid if the error flag is true.
   *
   * @example "https://example.com/downloads/track.mp3", "https://cdn.example.com/audio/12345.mp3"
   */
  url: string;
}

/**
 * Combined result object containing track information and download URL.
 *
 * This interface represents the complete result of a successful Spotify
 * download operation, combining both the track metadata and the actual
 * download URL. It provides all necessary information for displaying
 * track details and initiating downloads.
 *
 * @interface SpotifyDownloadResult
 *
 * @example
 * ```typescript
 * const downloadResult: SpotifyDownloadResult = {
 *   info: {
 *     id: "4iV5W9uYEdYUVa79Axb7Rh",
 *     type: "track",
 *     name: "Shape of You",
 *     image: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
 *     artists: "Ed Sheeran",
 *     duration_ms: 233713,
 *     gid: 12345678
 *   },
 *   url: "https://example.com/downloads/shape-of-you.mp3"
 * };
 *
 * console.log(`Downloading: ${downloadResult.info.name} by ${downloadResult.info.artists}`);
 * console.log(`From: ${downloadResult.url}`);
 * ```
 *
 * @example
 * ```typescript
 * // Creating a download interface
 * function createDownloadInterface(result: SpotifyDownloadResult): void {
 *   const trackInfo = result.info;
 *
 *   console.log('Track Information:');
 *   console.log(`Title: ${trackInfo.name}`);
 *   console.log(`Artist(s): ${trackInfo.artists}`);
 *   console.log(`Duration: ${formatDuration(trackInfo.duration_ms)}`);
 *   console.log(`Spotify ID: ${trackInfo.id}`);
 *   console.log(`Download URL: ${result.url}`);
 *
 *   if (trackInfo.image) {
 *     console.log(`Cover Art: ${trackInfo.image}`);
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Downloading and organizing files
 * async function downloadTrack(result: SpotifyDownloadResult): Promise<void> {
 *   const filename = `${result.info.artists} - ${result.info.name}.mp3`
 *     .replace(/[^a-zA-Z0-9\-_\. ]/g, '') // Remove invalid filename characters
 *     .trim();
 *
 *   console.log(`Downloading "${filename}" from ${result.url}`);
 *
 *   // Download logic would go here
 *   // await downloadFile(result.url, filename);
 * }
 * ```
 *
 * @author FANNYMU
 */
export interface SpotifyDownloadResult {
  /**
   * Comprehensive track information from Spotify.
   *
   * Contains all the metadata about the Spotify track including identification,
   * title, artists, duration, artwork, and other relevant information needed
   * for display and organization purposes.
   */
  info: InfoSpotify;

  /**
   * Direct download URL for the track.
   *
   * The processed download link that can be used to download the actual
   * audio file. This URL is generated after successful processing of the
   * Spotify track through the download service.
   *
   * @example "https://example.com/downloads/track.mp3"
   */
  url: string;
}

/**
 * HTTP headers structure specifically for Spotify-related requests.
 *
 * This interface extends a generic headers object with specific support
 * for Set-Cookie headers that are commonly used in Spotify scraping
 * operations. It provides type safety for header manipulation while
 * maintaining flexibility for various header types.
 *
 * @interface SpotifyHeaders
 *
 * @example
 * ```typescript
 * const headers: SpotifyHeaders = {
 *   'content-type': 'application/json',
 *   'user-agent': 'Mozilla/5.0...',
 *   'set-cookie': [
 *     'session=abc123; Path=/',
 *     'csrf_token=xyz789; HttpOnly'
 *   ]
 * };
 *
 * // Accessing cookies
 * if (headers['set-cookie']) {
 *   headers['set-cookie'].forEach(cookie => {
 *     console.log('Cookie:', cookie);
 *   });
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Processing response headers
 * function extractCookies(headers: SpotifyHeaders): string {
 *   const setCookieHeader = headers['set-cookie'];
 *   if (!setCookieHeader) return '';
 *
 *   return setCookieHeader
 *     .map(cookie => cookie.split(';')[0])
 *     .join('; ');
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Building request headers
 * function buildRequestHeaders(csrfToken?: string): SpotifyHeaders {
 *   const headers: SpotifyHeaders = {
 *     'Content-Type': 'application/json',
 *     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
 *   };
 *
 *   if (csrfToken) {
 *     headers['X-CSRF-TOKEN'] = csrfToken;
 *   }
 *
 *   return headers;
 * }
 * ```
 *
 * @author FANNYMU
 */
export interface SpotifyHeaders {
  /**
   * Generic header fields with flexible value types.
   *
   * Allows for any header name with values that can be strings, string arrays,
   * or undefined. This provides flexibility for various HTTP header scenarios
   * while maintaining type safety.
   *
   * @example
   * {
   *   'content-type': 'application/json',
   *   'authorization': 'Bearer token123',
   *   'custom-header': ['value1', 'value2']
   * }
   */
  [key: string]: string | string[] | undefined;

  /**
   * Set-Cookie headers for session management.
   *
   * Specifically typed array of Set-Cookie header values that are commonly
   * used in Spotify scraping operations for maintaining session state and
   * authentication tokens. Each string represents a complete cookie definition.
   *
   * @optional
   * @example
   * [
   *   "session=abc123def456; Path=/; HttpOnly",
   *   "csrf_token=xyz789; Path=/; SameSite=Strict",
   *   "user_preference=dark_mode; Path=/; Max-Age=3600"
   * ]
   */
  "set-cookie"?: string[];
}
