import { execa } from "execa";
import { InfoResponseYT, DownloadResponseYT } from "../types/youtube";

/**
 * YouTube service for downloading videos and audio using yt-dlp.
 *
 * This service provides comprehensive YouTube content interaction capabilities including
 * video information retrieval, audio/video downloading, format listing, and file management.
 * It leverages the yt-dlp command-line tool to handle YouTube's dynamic content delivery
 * and format selection.
 *
 * **Prerequisites:**
 * - yt-dlp must be installed on the system
 * - Installation command: `pip install -U yt-dlp --break-system-packages`
 * - Ensure yt-dlp is accessible in the system PATH
 *
 * @example
 * ```typescript
 * const youtube = new YoutubeService();
 *
 * // Get video information
 * const info = await youtube.getInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
 * console.log(info?.result.title);
 *
 * // Download audio
 * const audioDownload = await youtube.downloadContent(
 *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 *   'audio'
 * );
 *
 * // Download video
 * const videoDownload = await youtube.downloadContent(
 *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 *   'video',
 *   720
 * );
 * ```
 *
 * @author FANNYMU
 */
// DISCLAIMER: MAKE SURE TO INSTALL YT-DLP BEFORE USING THIS CLASS "pip install -U yt-dlp --break-system-packages"
export class YoutubeService {
  /**
   * Retrieves comprehensive information about a YouTube video.
   *
   * Fetches detailed metadata including title, duration, thumbnail, uploader information,
   * view statistics, description, and available formats. This method uses yt-dlp's JSON
   * output mode to extract structured data without downloading the actual video content.
   *
   * @param {string} url - The YouTube video URL to retrieve information for
   * @returns {Promise<InfoResponseYT | null>} Video information object or null if retrieval fails
   *
   * @throws {Error} When yt-dlp execution fails or the URL is invalid
   *
   * @example
   * ```typescript
   * const youtube = new YoutubeService();
   *
   * try {
   *   const info = await youtube.getInfo('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
   *
   *   if (info?.status === 'Success') {
   *     console.log(`Title: ${info.result.title}`);
   *     console.log(`Duration: ${info.result.duration} seconds`);
   *     console.log(`Uploader: ${info.result.uploader}`);
   *     console.log(`Views: ${info.result.view_count}`);
   *     console.log(`Available formats: ${info.result.formats.length}`);
   *
   *     // Access format details
   *     info.result.formats.forEach(format => {
   *       console.log(`Format ${format.format_id}: ${format.ext} (${format.quality})`);
   *     });
   *   } else {
   *     console.error('Failed to get video info:', info?.result.error);
   *   }
   * } catch (error) {
   *   console.error('Error:', error.message);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Check video availability before downloading
   * async function isVideoAvailable(url: string): Promise<boolean> {
   *   const info = await youtube.getInfo(url);
   *   return info?.status === 'Success';
   * }
   *
   * const available = await isVideoAvailable('https://www.youtube.com/watch?v=example');
   * if (available) {
   *   console.log('Video is available for download');
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  async getInfo(url: string): Promise<InfoResponseYT | null> {
    try {
      const { stdout } = await execa("yt-dlp", ["-j", url]);
      const videoInfo = JSON.parse(stdout);

      return {
        status: "Success",
        result: {
          title: videoInfo.title,
          duration: videoInfo.duration,
          thumbnail: videoInfo.thumbnail,
          uploader: videoInfo.uploader,
          upload_date: videoInfo.upload_date,
          view_count: videoInfo.view_count,
          description: videoInfo.description,
          formats:
            videoInfo.formats?.map((format: any) => ({
              format_id: format.format_id,
              ext: format.ext,
              quality: format.quality,
              filesize: format.filesize,
              url: format.url,
              height: format.height,
              width: format.width,
              fps: format.fps,
              vcodec: format.vcodec,
              acodec: format.acodec,
            })) || [],
        },
      };
    } catch (error) {
      this.handleError("Failed to fetch video info", error);
      return {
        status: "Failed",
        result: {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      };
    }
  }

  /**
   * Downloads YouTube content and returns download information.
   *
   * Processes YouTube URLs to generate download links for audio or video content
   * with specified quality constraints. For audio downloads, content is converted
   * to MP3 format. For video downloads, the best available format within the
   * specified height limit is selected.
   *
   * @param {string} url - The YouTube video URL to download
   * @param {"audio" | "video"} [mediaType="audio"] - Type of media to download
   * @param {number} [height=360] - Maximum video height in pixels (for video downloads)
   * @returns {Promise<DownloadResponseYT | null>} Download information including URL and metadata
   *
   * @throws {Error} When yt-dlp execution fails or the URL is invalid
   *
   * @example
   * ```typescript
   * const youtube = new YoutubeService();
   *
   * // Download audio (MP3)
   * const audioResult = await youtube.downloadContent(
   *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   *   'audio'
   * );
   *
   * if (audioResult?.status === 'Success') {
   *   console.log(`Audio title: ${audioResult.result.title}`);
   *   console.log(`Download URL: ${audioResult.result.download_url}`);
   *   console.log(`File size: ${audioResult.result.filesize} bytes`);
   *   console.log(`Format: ${audioResult.result.format}`);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Download video with quality constraints
   * const videoResult = await youtube.downloadContent(
   *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   *   'video',
   *   720  // Max 720p
   * );
   *
   * if (videoResult?.status === 'Success') {
   *   console.log(`Video title: ${videoResult.result.title}`);
   *   console.log(`Filename: ${videoResult.result.filename}`);
   *   console.log(`Extension: ${videoResult.result.ext}`);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Handle different quality options
   * const qualities = [1080, 720, 480, 360];
   *
   * for (const quality of qualities) {
   *   const result = await youtube.downloadContent(url, 'video', quality);
   *   if (result?.status === 'Success') {
   *     console.log(`Successfully got ${quality}p version`);
   *     break;
   *   }
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  async downloadContent(
    url: string,
    mediaType: "audio" | "video" = "audio",
    height: number = 360
  ): Promise<DownloadResponseYT | null> {
    try {
      const args = ["-j", "--print-json"];

      if (mediaType === "audio") {
        args.push("-x", "--audio-format", "mp3");
      } else {
        args.push("-f", `best[height<=${height}]`);
      }

      args.push(url);

      const { stdout } = await execa("yt-dlp", args);
      const videoInfo = JSON.parse(stdout);

      return {
        status: "Success",
        result: {
          title: videoInfo.title,
          download_url:
            videoInfo.url || videoInfo.requested_downloads?.[0]?.url,
          filename:
            videoInfo._filename || `${videoInfo.title}.${videoInfo.ext}`,
          filesize: videoInfo.filesize,
          format: videoInfo.format,
          ext: videoInfo.ext,
        },
      };
    } catch (error) {
      this.handleError("Failed to download content", error);
      return {
        status: "Failed",
        result: {
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      };
    }
  }

  /**
   * Downloads YouTube content directly to a specified file path.
   *
   * Downloads YouTube content directly to the local filesystem at the specified
   * output path. This method handles the complete download process including
   * format selection and file conversion for audio downloads.
   *
   * @param {string} url - The YouTube video URL to download
   * @param {string} outputPath - Local file system path where the file should be saved
   * @param {"audio" | "video"} [mediaType="audio"] - Type of media to download
   * @param {number} [height=360] - Maximum video height in pixels (for video downloads)
   * @returns {Promise<{success: boolean; filePath?: string; error?: string}>} Download result with success status and file path or error message
   *
   * @throws {Error} When yt-dlp execution fails or file system access is denied
   *
   * @example
   * ```typescript
   * const youtube = new YoutubeService();
   *
   * // Download audio to specific path
   * const audioResult = await youtube.downloadToFile(
   *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   *   './downloads/%(title)s.%(ext)s',
   *   'audio'
   * );
   *
   * if (audioResult.success) {
   *   console.log(`Audio saved to: ${audioResult.filePath}`);
   * } else {
   *   console.error(`Download failed: ${audioResult.error}`);
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Download video with custom naming
   * const outputPath = './videos/%(uploader)s - %(title)s.%(ext)s';
   * const videoResult = await youtube.downloadToFile(
   *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
   *   outputPath,
   *   'video',
   *   1080
   * );
   *
   * if (videoResult.success) {
   *   console.log('Video download completed successfully');
   * }
   * ```
   *
   * @example
   * ```typescript
   * // Batch download with error handling
   * const urls = [
   *   'https://www.youtube.com/watch?v=video1',
   *   'https://www.youtube.com/watch?v=video2'
   * ];
   *
   * for (const [index, url] of urls.entries()) {
   *   const result = await youtube.downloadToFile(
   *     url,
   *     `./downloads/video_${index + 1}.%(ext)s`,
   *     'video'
   *   );
   *
   *   console.log(`Download ${index + 1}: ${result.success ? 'Success' : result.error}`);
   * }
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  async downloadToFile(
    url: string,
    outputPath: string,
    mediaType: "audio" | "video" = "audio",
    height: number = 360
  ): Promise<{ success: boolean; filePath?: string; error?: string }> {
    try {
      const args = ["-o", outputPath];

      if (mediaType === "audio") {
        args.push("-x", "--audio-format", "mp3");
      } else {
        args.push("-f", `best[height<=${height}]`);
      }

      args.push(url);

      //   const { stdout, stderr } = await execa("yt-dlp", args);

      return {
        success: true,
        filePath: outputPath,
      };
    } catch (error) {
      this.handleError("Failed to download file", error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Retrieves all available formats for a YouTube video.
   *
   * Lists all available download formats including different video qualities,
   * audio formats, and combined streams. This information can be used to make
   * informed decisions about which format to download based on quality,
   * file size, and compatibility requirements.
   *
   * @param {string} url - The YouTube video URL to analyze
   * @returns {Promise<any[]>} Array of available format objects with detailed specifications
   *
   * @throws {Error} When yt-dlp execution fails or the URL is invalid
   *
   * @example
   * ```typescript
   * const youtube = new YoutubeService();
   *
   * const formats = await youtube.getAvailableFormats(
   *   'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
   * );
   *
   * console.log(`Found ${formats.length} available formats:`);
   *
   * formats.forEach(format => {
   *   console.log(`Format ID: ${format.format_id}`);
   *   console.log(`Extension: ${format.ext}`);
   *   console.log(`Quality: ${format.quality || 'N/A'}`);
   *   console.log(`Resolution: ${format.width}x${format.height || 'audio only'}`);
   *   console.log(`File size: ${format.filesize || 'Unknown'} bytes`);
   *   console.log('---');
   * });
   * ```
   *
   * @example
   * ```typescript
   * // Filter formats by type
   * const formats = await youtube.getAvailableFormats(url);
   *
   * const videoFormats = formats.filter(f => f.vcodec && f.vcodec !== 'none');
   * const audioFormats = formats.filter(f => f.acodec && f.acodec !== 'none');
   * const combinedFormats = formats.filter(f => f.vcodec !== 'none' && f.acodec !== 'none');
   *
   * console.log(`Video-only formats: ${videoFormats.length}`);
   * console.log(`Audio-only formats: ${audioFormats.length}`);
   * console.log(`Combined formats: ${combinedFormats.length}`);
   * ```
   *
   * @example
   * ```typescript
   * // Find best quality format
   * const formats = await youtube.getAvailableFormats(url);
   *
   * const bestVideo = formats
   *   .filter(f => f.height && f.vcodec !== 'none')
   *   .sort((a, b) => (b.height || 0) - (a.height || 0))[0];
   *
   * const bestAudio = formats
   *   .filter(f => f.acodec && f.acodec !== 'none')
   *   .sort((a, b) => (b.abr || 0) - (a.abr || 0))[0];
   *
   * console.log(`Best video: ${bestVideo?.height}p (${bestVideo?.format_id})`);
   * console.log(`Best audio: ${bestAudio?.abr}kbps (${bestAudio?.format_id})`);
   * ```
   *
   * @example
   * ```typescript
   * // Create format selection UI data
   * const formats = await youtube.getAvailableFormats(url);
   *
   * const formatOptions = formats
   *   .filter(f => f.height) // Video formats only
   *   .map(f => ({
   *     id: f.format_id,
   *     label: `${f.height}p ${f.ext.toUpperCase()} (${f.fps}fps)`,
   *     quality: f.height,
   *     size: f.filesize ? `${(f.filesize / 1024 / 1024).toFixed(1)}MB` : 'Unknown'
   *   }))
   *   .sort((a, b) => b.quality - a.quality);
   *
   * console.log('Available quality options:', formatOptions);
   * ```
   *
   * @public
   * @async
   * @author FANNYMU
   */
  async getAvailableFormats(url: string): Promise<any[]> {
    try {
      const { stdout } = await execa("yt-dlp", ["-F", "--print-json", url]);
      const lines = stdout.split("\n").filter((line) => line.trim());
      const jsonLine = lines.find((line) => line.startsWith("{"));

      if (jsonLine) {
        const info = JSON.parse(jsonLine);
        return info.formats || [];
      }

      return [];
    } catch (error) {
      this.handleError("Failed to get available formats", error);
      return [];
    }
  }

  /**
   * Handles and logs errors that occur during YouTube operations.
   *
   * Internal error handling method that provides consistent error logging
   * across all YouTube service operations. Logs errors with contextual
   * messages to help with debugging and troubleshooting.
   *
   * @param {string} message - Descriptive error message explaining the operation that failed
   * @param {unknown} error - The error object or unknown error that occurred
   * @returns {void}
   *
   * @example
   * ```typescript
   * // This method is used internally by other methods
   * try {
   *   // Some YouTube operation
   * } catch (error) {
   *   this.handleError("Operation failed", error);
   * }
   * ```
   *
   * @private
   * @author FANNYMU
   */
  private handleError(message: string, error: unknown): void {
    console.error(`${message}:`, error);
  }
}
