/**
 * Represents a video format with technical specifications.
 *
 * This interface defines the structure for individual video format entries
 * containing quality, codec, and file information used by video download services.
 *
 * @interface VideoFormat
 * @author FANNYMU
 */
export interface VideoFormat {
  /**
   * Unique identifier for the video format.
   * @example "137", "22", "18"
   */
  format_id: string;

  /**
   * File extension for the video format.
   * @example "mp4", "webm", "mkv"
   */
  ext: string;

  /**
   * Quality descriptor or resolution height.
   * @example "720p", "1080p", 720, 1080
   */
  quality: string | number;

  /**
   * File size in bytes, if available.
   * @optional
   * @example 25165824, 52428800
   */
  filesize?: number;

  /**
   * Direct download URL for the video format.
   * @example "https://video-url.com/video.mp4"
   */
  url: string;

  /**
   * Video height in pixels.
   * @optional
   * @example 720, 1080, 480
   */
  height?: number;

  /**
   * Video width in pixels.
   * @optional
   * @example 1280, 1920, 854
   */
  width?: number;

  /**
   * Frames per second.
   * @optional
   * @example 30, 60, 24
   */
  fps?: number;

  /**
   * Video codec identifier.
   * @optional
   * @example "avc1.640028", "vp9", "h264"
   */
  vcodec?: string;

  /**
   * Audio codec identifier.
   * @optional
   * @example "mp4a.40.2", "opus", "aac"
   */
  acodec?: string;
}

/**
 * Comprehensive video information and metadata.
 *
 * This interface contains all relevant information about a video including
 * metadata, statistics, and available download formats.
 *
 * @interface VideoInfo
 * @author FANNYMU
 */
export interface VideoInfo {
  /**
   * Video title or name.
   * @example "Amazing Video Title"
   */
  title: string;

  /**
   * Video duration in seconds.
   * @example 180, 3600, 45
   */
  duration: number;

  /**
   * URL to the video thumbnail image.
   * @example "https://img.youtube.com/vi/abc123/maxresdefault.jpg"
   */
  thumbnail: string;

  /**
   * Name of the video uploader or channel.
   * @example "Channel Name", "Creator Username"
   */
  uploader: string;

  /**
   * Upload date in string format.
   * @example "20231215", "2023-12-15"
   */
  upload_date: string;

  /**
   * Total number of video views.
   * @example 1000000, 50000, 999
   */
  view_count: number;

  /**
   * Video description text.
   * @example "This is an amazing video about..."
   */
  description: string;

  /**
   * Array of available video formats.
   */
  formats: VideoFormat[];
}

/**
 * Response wrapper for video information requests.
 *
 * This interface wraps video information responses with status indicators
 * and handles both successful results and error conditions.
 *
 * @interface InfoResponseYT
 * @author FANNYMU
 */
export interface InfoResponseYT {
  /**
   * Request status indicator.
   * @example "Success", "Failed"
   */
  status: "Success" | "Failed";

  /**
   * Response payload containing video info or error details.
   */
  result: VideoInfo | { error: string };
}

/**
 * Download operation result with file information.
 *
 * This interface contains the result of a successful download operation
 * including file details and download URLs.
 *
 * @interface DownloadResult
 * @author FANNYMU
 */
export interface DownloadResult {
  /**
   * Title of the downloaded content.
   * @example "Video Title"
   */
  title: string;

  /**
   * Direct download URL for the processed content.
   * @example "https://download-server.com/file.mp3"
   */
  download_url: string;

  /**
   * Generated filename for the download.
   * @example "Video Title.mp3", "audio_file.mp3"
   */
  filename: string;

  /**
   * File size in bytes, if available.
   * @optional
   * @example 5242880, 10485760
   */
  filesize?: number;

  /**
   * Format description or quality information.
   * @example "audio only", "720p video"
   */
  format: string;

  /**
   * File extension for the download.
   * @example "mp3", "mp4", "webm"
   */
  ext: string;
}

/**
 * Response wrapper for download operations.
 *
 * This interface wraps download responses with status indicators
 * and handles both successful downloads and error conditions.
 *
 * @interface DownloadResponseYT
 * @author FANNYMU
 */
export interface DownloadResponseYT {
  /**
   * Download operation status.
   * @example "Success", "Failed"
   */
  status: "Success" | "Failed";

  /**
   * Response payload containing download info or error details.
   */
  result: DownloadResult | { error: string };
}

/**
 * Result of file download operations to local storage.
 *
 * This interface represents the outcome of downloading content
 * directly to the local file system.
 *
 * @interface DownloadToFileResult
 * @author FANNYMU
 */
export interface DownloadToFileResult {
  /**
   * Whether the download operation succeeded.
   * @example true, false
   */
  success: boolean;

  /**
   * Path to the downloaded file, if successful.
   * @optional
   * @example "./downloads/video.mp4", "/home/user/music.mp3"
   */
  filePath?: string;

  /**
   * Error message if the download failed.
   * @optional
   * @example "Network error", "Permission denied"
   */
  error?: string;
}

/**
 * Type definition for supported media types.
 *
 * Defines the available media types for download operations,
 * limiting choices to audio or video content.
 *
 * @type MediaType
 * @author FANNYMU
 */
export type MediaType = "audio" | "video";

/**
 * Raw video information from yt-dlp tool.
 *
 * This interface represents the direct output structure from yt-dlp
 * command-line tool, used internally for processing video data.
 *
 * @interface YtDlpVideoInfo
 * @author FANNYMU
 */
export interface YtDlpVideoInfo {
  /**
   * Video title from yt-dlp.
   * @example "Video Title"
   */
  title: string;

  /**
   * Duration in seconds from yt-dlp.
   * @example 180, 3600
   */
  duration: number;

  /**
   * Thumbnail URL from yt-dlp.
   * @example "https://thumbnail-url.com/image.jpg"
   */
  thumbnail: string;

  /**
   * Uploader name from yt-dlp.
   * @example "Channel Name"
   */
  uploader: string;

  /**
   * Upload date from yt-dlp.
   * @example "20231215"
   */
  upload_date: string;

  /**
   * View count from yt-dlp.
   * @example 1000000
   */
  view_count: number;

  /**
   * Video description from yt-dlp.
   * @example "Video description text"
   */
  description: string;

  /**
   * Available formats from yt-dlp, if present.
   * @optional
   */
  formats?: YtDlpFormat[];

  /**
   * Direct video URL from yt-dlp, if available.
   * @optional
   * @example "https://video-url.com/video.mp4"
   */
  url?: string;

  /**
   * Requested downloads array from yt-dlp.
   * @optional
   */
  requested_downloads?: Array<{ url: string }>;

  /**
   * Generated filename from yt-dlp.
   * @optional
   * @example "Video Title.mp4"
   */
  _filename?: string;

  /**
   * File size from yt-dlp, if available.
   * @optional
   * @example 25165824
   */
  filesize?: number;

  /**
   * Format description from yt-dlp.
   * @example "720p"
   */
  format: string;

  /**
   * File extension from yt-dlp.
   * @example "mp4", "webm"
   */
  ext: string;
}

/**
 * Raw format information from yt-dlp tool.
 *
 * This interface represents individual format entries as returned
 * by yt-dlp, used for internal format processing and selection.
 *
 * @interface YtDlpFormat
 * @author FANNYMU
 */
export interface YtDlpFormat {
  /**
   * Format ID from yt-dlp.
   * @example "137", "22"
   */
  format_id: string;

  /**
   * File extension from yt-dlp.
   * @example "mp4", "webm"
   */
  ext: string;

  /**
   * Quality information from yt-dlp.
   * @example "720p", 720
   */
  quality: string | number;

  /**
   * File size from yt-dlp, if available.
   * @optional
   * @example 25165824
   */
  filesize?: number;

  /**
   * Format URL from yt-dlp.
   * @example "https://video-url.com/video.mp4"
   */
  url: string;

  /**
   * Video height from yt-dlp.
   * @optional
   * @example 720, 1080
   */
  height?: number;

  /**
   * Video width from yt-dlp.
   * @optional
   * @example 1280, 1920
   */
  width?: number;

  /**
   * Frame rate from yt-dlp.
   * @optional
   * @example 30, 60
   */
  fps?: number;

  /**
   * Video codec from yt-dlp.
   * @optional
   * @example "avc1.640028"
   */
  vcodec?: string;

  /**
   * Audio codec from yt-dlp.
   * @optional
   * @example "mp4a.40.2"
   */
  acodec?: string;
}
