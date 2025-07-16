import axios from "axios";
import { TiktokDown, TiktokSearch } from "../types/tiktok";

/**
 * TikTok API client for downloading videos and searching content.
 *
 * This class provides methods to interact with TikTok content through the tikwm.com API,
 * offering functionality to download TikTok videos in various qualities and search for
 * videos based on keywords. The class handles API communication, parameter encoding,
 * and error management for TikTok-related operations.
 *
 * @example
 * ```typescript
 * const tiktok = new Tiktok();
 *
 * // Download a TikTok video
 * const downloadResult = await tiktok.downloadVideo('https://www.tiktok.com/@user/video/1234567890');
 * console.log(downloadResult.data.play); // Video download URL
 *
 * // Search for TikTok videos
 * const searchResult = await tiktok.searchVideos('funny cats');
 * console.log(searchResult.data.videos); // Array of video results
 * ```
 *
 * @author FANNYMU
 */
export class Tiktok {
  /**
   * Downloads a TikTok video from the provided URL.
   *
   * This method fetches video information and download URLs from a TikTok video URL.
   * It supports both standard and high-definition video downloads, and returns
   * comprehensive video metadata including title, author, statistics, and download links.
   *
   * @param {string} url - The TikTok video URL to download
   * @param {boolean} [highDefinition=false] - Whether to request high-definition video quality
   * @returns {Promise<TiktokDown>} Object containing video information and download URLs
   *
   * @throws {Error} When the API request fails, returns invalid data, or the URL is invalid
   *
   * @example
   * ```typescript
   * const tiktok = new Tiktok();
   *
   * // Download standard quality video
   * try {
   *   const result = await tiktok.downloadVideo('https://www.tiktok.com/@user/video/1234567890');
   *
   *   if (result.code === 0) {
   *     console.log(`Title: ${result.data.title}`);
   *     console.log(`Author: ${result.data.author.nickname}`);
   *     console.log(`Play count: ${result.data.play_count}`);
   *     console.log(`Download URL: ${result.data.play}`);
   *
   *     // Download without watermark
   *     console.log(`HD URL: ${result.data.hdplay}`);
   *   } else {
   *     console.error('Failed to download video:', result.msg);
   *   }
   * } catch (error) {
   *   console.error('Download error:', error.message);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Download high-definition video
   * const hdResult = await tiktok.downloadVideo(
   *   'https://www.tiktok.com/@user/video/1234567890',
   *   true
   * );
   *
   * if (hdResult.code === 0) {
   *   console.log(`HD Video URL: ${hdResult.data.hdplay}`);
   *   console.log(`Audio URL: ${hdResult.data.music}`);
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  public async downloadVideo(
    url: string,
    highDefinition: boolean = false
  ): Promise<TiktokDown> {
    try {
      const params = new URLSearchParams();
      params.append("url", url);
      if (highDefinition) params.append("hd", "1");

      const response = await axios.post<TiktokDown>(
        "https://tikwm.com/api/",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: "current_language=en",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
          },
        }
      );

      const data = response.data;
      if (!data || typeof data.code !== "number") {
        throw new Error("Invalid API response");
      }

      return data;
    } catch (error) {
      throw new Error(`Tiktok API Error: ${(error as Error).message}`);
    }
  }

  /**
   * Searches for TikTok videos based on keywords.
   *
   * This method searches the TikTok platform for videos matching the provided query string.
   * It returns a collection of video results with metadata including video information,
   * author details, engagement statistics, and download URLs. The search is limited to
   * 10 results per request and includes high-definition content when available.
   *
   * @param {string} query - The search keywords to find TikTok videos
   * @returns {Promise<TiktokSearch>} Object containing search results and video data
   *
   * @throws {Error} When the API request fails, returns invalid data, or the search query is invalid
   *
   * @example
   * ```typescript
   * const tiktok = new Tiktok();
   *
   * // Search for videos by keyword
   * try {
   *   const searchResult = await tiktok.searchVideos('funny cats');
   *
   *   if (searchResult.code === 0) {
   *     console.log(`Found ${searchResult.data.videos.length} videos`);
   *
   *     searchResult.data.videos.forEach((video, index) => {
   *       console.log(`${index + 1}. ${video.title}`);
   *       console.log(`   Author: ${video.author.nickname}`);
   *       console.log(`   Views: ${video.play_count}`);
   *       console.log(`   Likes: ${video.digg_count}`);
   *       console.log(`   URL: ${video.play}`);
   *       console.log('---');
   *     });
   *   } else {
   *     console.error('Search failed:', searchResult.msg);
   *   }
   * } catch (error) {
   *   console.error('Search error:', error.message);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Filter search results by engagement
   * const searchResult = await tiktok.searchVideos('dance challenge');
   *
   * if (searchResult.code === 0) {
   *   const popularVideos = searchResult.data.videos.filter(
   *     video => video.play_count > 100000
   *   );
   *
   *   console.log(`Found ${popularVideos.length} popular videos`);
   *
   *   popularVideos.forEach(video => {
   *     console.log(`${video.title} - ${video.play_count} views`);
   *   });
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Extract download URLs from search results
   * const searchResult = await tiktok.searchVideos('tutorial');
   *
   * if (searchResult.code === 0) {
   *   const downloadUrls = searchResult.data.videos.map(video => ({
   *     title: video.title,
   *     author: video.author.nickname,
   *     standardUrl: video.play,
   *     hdUrl: video.hdplay,
   *     audioUrl: video.music
   *   }));
   *
   *   console.log('Available downloads:', downloadUrls);
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  public async searchVideos(query: string): Promise<TiktokSearch> {
    try {
      const response = await axios({
        method: "POST",
        url: "https://tikwm.com/api/feed/search",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Cookie: "current_language=en",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36",
        },
        data: `keywords=${encodeURIComponent(query)}&count=10&cursor=0&HD=1`,
      });

      const data = response.data;
      if (!data || typeof data.code !== "number" || data.code !== 0) {
        throw new Error("Invalid API response");
      }

      if (!data.data || !Array.isArray(data.data.videos)) {
        throw new Error("Invalid API response structure");
      }

      return data as TiktokSearch;
    } catch (error: any) {
      throw new Error(
        "Failed to get results from TikTok API: " + error.message
      );
    }
  }
}
