export interface VideoFormat {
  format_id: string;
  ext: string;
  quality: string | number;
  filesize?: number;
  url: string;
  height?: number;
  width?: number;
  fps?: number;
  vcodec?: string;
  acodec?: string;
}

export interface VideoInfo {
  title: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  upload_date: string;
  view_count: number;
  description: string;
  formats: VideoFormat[];
}

export interface InfoResponseYT {
  status: "Success" | "Failed";
  result: VideoInfo | { error: string };
}

export interface DownloadResult {
  title: string;
  download_url: string;
  filename: string;
  filesize?: number;
  format: string;
  ext: string;
}

export interface DownloadResponseYT {
  status: "Success" | "Failed";
  result: DownloadResult | { error: string };
}

export interface DownloadToFileResult {
  success: boolean;
  filePath?: string;
  error?: string;
}

export type MediaType = "audio" | "video";

// Additional types for yt-dlp raw response (optional, for internal use)
export interface YtDlpVideoInfo {
  title: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  upload_date: string;
  view_count: number;
  description: string;
  formats?: YtDlpFormat[];
  url?: string;
  requested_downloads?: Array<{ url: string }>;
  _filename?: string;
  filesize?: number;
  format: string;
  ext: string;
}

export interface YtDlpFormat {
  format_id: string;
  ext: string;
  quality: string | number;
  filesize?: number;
  url: string;
  height?: number;
  width?: number;
  fps?: number;
  vcodec?: string;
  acodec?: string;
}
