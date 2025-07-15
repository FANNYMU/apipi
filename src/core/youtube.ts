import { execa } from "execa";
import { InfoResponseYT, DownloadResponseYT } from "../types/youtube";

// DISCLAMER: MAKE SURE TO INSTALL YT-DLP BEFORE USING THIS CLASS "pip install -U yt-dlp --break-system-packages"

export class YoutubeService {
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

  private handleError(message: string, error: unknown): void {
    console.error(`${message}:`, error);
  }
}
